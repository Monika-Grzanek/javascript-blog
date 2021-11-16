'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        console.log(event);
        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');    
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
            console.log(activeLinks);
        }
        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);
        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts .active');
        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
            console.log(activeArticles);
        }
        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        console.log('Link was clicked!', articleSelector);
        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        console.log('Article selected', targetArticle);
        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
        console.log('Add class active:', targetArticle);
    }
    
    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks(){
        console.log('Function enabled');
    /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
    /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        let html = '';
        for(let article of articles){
            console.log(articles);
        /* get the article id */
            const articleId = article.getAttribute('id');
            console.log('Id downloaded', articleId);
        /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* get the title from the title element */

        /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log('generated link', linkHTML);
        /* insert link into titleList */
            //optTitleListSelector.insertAdjacentHTML('afterbegin', linkHTML);
            //console.log('Links:', linkHTML);
            html = html + linkHTML;
        }

        titleList.innerHTML = html;
        console.log('link', html);

        const links = document.querySelectorAll('.titles a');
        console.log('Show links', links);
    
        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    
    