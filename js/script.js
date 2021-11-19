'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';


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

    function generateTitleLinks(customSelector = ''){
        console.log('Function enabled');
    /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
    /* for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        let html = '';
        for(let article of articles){
            console.log('show articles', articles);
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

    function generateTags(){
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log('all articles:', articles);
        /* START LOOP: for every article: */
        for(let article of articles){
          /* find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleTagsSelector);
            console.log('show tags wrapper:', tagsWrapper);
          /* make html variable with empty string */
            let html = '';
            console.log('show html for tags:', html);
          /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            console.log('data-tag attribute:', articleTags);
          /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            console.log('Split tags into array:', articleTagsArray);
          /* START LOOP: for each tag */
            for(let tag of articleTagsArray){
                console.log('show articleTagsArray:', articleTagsArray);
            /* generate HTML of the link */
                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                console.log('show link of tag:', linkHTML);
            /* add generated code to html variable */
                html = html + linkHTML;
                console.log('show html:', html);
          /* END LOOP: for each tag */
            }
          /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;
            console.log('html in wrapper:', html);
        /* END LOOP: for every article: */
        }
    }

    generateTags();

    const tagClickHandler = function(event){
        /* prevent default action for this event */
        event.preventDefault();
        console.log('show event:', event);
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        console.log('show clickedElement', clickedElement);
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log('show href with attribute href:', href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        console.log('show extract tag from href:', tag);
        /* find all tag links with class active */
        const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        console.log('show activeLinks:', activeTagsLinks);
        /* START LOOP: for each active tag link */
        for(let activeTagsLink of activeTagsLinks){
          /* remove class active */
            activeTagsLink.classList.remove('active');
            console.log('show remove active in activeTagLink', activeTagsLinks);
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log('show tagLinks:', tagLinks);
        /* START LOOP: for each found tag link */
        for(let tagLink of tagLinks){
          /* add class active */
            clickedElement.classList.add('active');
            console.log('Add active:', clickedElement);
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
        console.log('generateTitleLinks:', generateTitleLinks); 
    }
      
    function addClickListenersToTags(){
        /* find all links to tags */
        const allLinksTag = document.querySelectorAll('a[href^="#tag-"]');
        console.log('Show all links to tags:', allLinksTag);
        /* START LOOP: for each link */
        for(let linkTag of allLinksTag){
          /* add tagClickHandler as event listener for that link */
            linkTag.addEventListener('click', tagClickHandler);
            console.log('show linkTag:', linkTag);
        /* END LOOP: for each link */
        }
    }

    addClickListenersToTags();
      
  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('show articles:', articles);
    for(let article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('show authorWrapper:', authorWrapper);
      let html = '';
      const articleAuthors = article.getAttribute('data-author');
      console.log('show attribute:', articleAuthors);
      const authorLinkHTML = '<a href=#"' + articleAuthors + '">' + articleAuthors + '</a>';
      console.log('show authorLinkHTML:', authorLinkHTML);
      authorWrapper.innerHTML = html + authorLinkHTML;
      console.log('show authorWrapper in HTML:', html);
    }
  }

  generateAuthors();
