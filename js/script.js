'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';



function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  // console.log('Link was clicked!');
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  // console.log('clickedElement', clickedElement);
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    article.querySelector(optArticleSelector);
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  };
}
generateTitleLinks();

// const links = document.querySelectorAll('.titles a');
// for(let link of links){
//   link.addEventListener('click', titleClickHandler);
// }

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };
  for(let tag in tags){
    // console.log(tag + ' is use ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll('article');
  for (let article of articles){
    const tagList = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    let html = '';
    for (let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + linkHTML;
      // eslint-disable-next-line
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagList.innerHTML = html;
  }
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  for(let tag in allTags){
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    // console.log('taglinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    //(' + allTags[tag] + ')
  }
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log(clickedElement);
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks:', tagLinks);
  for(let tagLink of tagLinks){
    tagLink.classList.remove('active');
  }
  const targetTag = document.querySelector();
  console.log('targetTag:', targetTag);
  targetTag.classList.add('active');
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.list-horizontal a');
  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll('article');
  for(let article of articles){
    const authors = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    const linkHTML = '<p><a href="#author-' + articleAuthor + '">' + 'by ' + articleAuthor + '</a></p>';
    let html = '';
    html = html + linkHTML;
    // eslint-disable-next-line
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    // console.log(allAuthors);
    authors.innerHTML = html;
  }
  const authors = document.querySelector('.authors');
  let allAuthorsHTML = '';

  for(let articleAuthor in allAuthors){
    const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ') </a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  authors.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(authorLinks);
  for(let authorLink of authorLinks){
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('.post-author a');
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
