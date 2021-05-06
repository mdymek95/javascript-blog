'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';


function titleClickHandler(event){
    const clickedElement = this;
    event.preventDefault();
    console.log('Link was clicked!');
    // [DONE] remove class 'active' from all articles links

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
    
    // [DONE] add class 'active' to the clicked link

    console.log('clickedElement', clickedElement);

    clickedElement.classList.add('active');

    // [DONE] remove class 'active' from all articles

    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }
    // [DONE] get 'href' attribute from the clicked link
    
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector)

    // find the correct article using the selector (value od 'href' attribute)
    
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    // add class 'active' to the correct article

    targetArticle.classList.add('active');

  }
  
function generateTitleLinks(){
const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

  let html = '';
  
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    article.querySelector(optArticleSelector);
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    html = html + linkHTML;
  }
  console.log(articles);
  titleList.innerHTML = html;
  }
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
console.log(links);