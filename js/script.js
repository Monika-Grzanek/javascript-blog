'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const opts ={
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TagsListSelector: '.tags',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
  AuthorsListSelector: '.authors'
};

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    console.log(activeLinks);
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
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
};

function generateTitleLinks(customSelector = '') {
  console.log('Function enabled');
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.TitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    console.log('show articles', articles);
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('Id downloaded', articleId);
    /* find the title element */
    const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);   
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

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {min: '999999', max: '0'};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] < params.min){
      params.min = tags[tag];
      console.log('show params.min:', params.min);
    }
    if(tags[tag] > params.max){
      params.max = tags[tag];
      console.log('show params.max:', params.max);
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  console.log('show normalizedCount:', normalizedCount);
  const normalizedMax = params.max - params.min;
  console.log('show normalizedMax:', normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  console.log('show percentage:', percentage);
  const classNumber = Math.floor( percentage * (opts.CloudClassCount - 1) + 1 );
  console.log('show classNumber:', classNumber);
  return normalizedCount, classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opts.ArticleSelector);
  console.log('all articles:', articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.ArticleTagsSelector);
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
    for (let tag of articleTagsArray) {
      console.log('show articleTagsArray:', articleTagsArray);
      /* generate HTML of the link */
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData); 
      console.log('show link of tag:', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('show html:', html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('html in wrapper:', html);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.TagsListSelector);
  console.log('show tagList:', tagList);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  //let allTagsHTML = '';
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li><a class="' + opts.CloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '">#' + tag + '</a></li>';
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    console.log('tagLinkHTML:', allTagsData);
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('show allTagsData', allTagsData);
}

generateTags();

const tagClickHandler = function (event) {
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
  for (let activeTagsLink of activeTagsLinks) {
    /* remove class active */
    activeTagsLink.classList.remove('active');
    console.log('show remove active in activeTagLink', activeTagsLinks);
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('show tagLinks:', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    clickedElement.classList.add('active');
    console.log('Add active:', clickedElement);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log('generateTitleLinks:', generateTitleLinks);
};

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinksTag = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Show all links to tags:', allLinksTag);
  /* START LOOP: for each link */
  for (let linkTag of allLinksTag) {
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
    console.log('show linkTag:', linkTag);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  let allAuthors = {};
  console.log('show allAuthors:', allAuthors);
  const articles = document.querySelectorAll(opts.ArticleSelector);
  console.log('show articles:', articles);
  for (let article of articles) {
    const authorWrapper = article.querySelector(opts.ArticleAuthorSelector);
    console.log('show authorWrapper:', authorWrapper);
    let html = '';
    const articleAuthors = article.getAttribute('data-author');
    console.log('show attribute:', articleAuthors);
    //const authorlinkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';
    const linkHTMLData = {id: articleAuthors, title: articleAuthors};
    const authorlinkHTML = templates.authorLink(linkHTMLData); 
    console.log('show authorLinkHTML:', authorlinkHTML);
    html = html + authorlinkHTML;
    console.log('show authorWrapper in HTML:', html);
    if(!allAuthors[articleAuthors]) {
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }
    console.log('show allAuthors:', allAuthors);
    authorWrapper.innerHTML = html;
  }
  const authorList = document.querySelector(opts.AuthorsListSelector);
  console.log('show authorList', authorList);
  //let allAuthorsHTML = '';
  const allAuthorsData = {author: []};
  for(let author in allAuthors){
    //const linkHTML = '<li><a href ="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
    //console.log('show authorLinkHTML:', linkHTML);
    //allAuthorsHTML += linkHTML;
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author],
    });
    console.log('show allAuthorsHTML:', allAuthorsData);
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('show authorList.innerHTML:', authorList);
}

generateAuthors();

const authorClickHandler = function (event) {
  event.preventDefault();
  console.log('show event:', event);
  const clickedElement = this;
  console.log('show clickedElement', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log('show href with attribute href:', href);
  const author = href.replace('#author-', '');
  console.log('show extract tag from href:', author);
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('show activeLinks:', activeAuthorLinks);
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
    console.log('show remove active in activeAuthorLink', activeAuthorLinks);
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('show authorLinks:', authorLinks);
  for (let authorLink of authorLinks) {
    clickedElement.classList.add('active');
    console.log('Add active:', clickedElement);
  }
  generateTitleLinks('[data-author="' + author + '"]');
  console.log('generateTitleLinks:', generateTitleLinks);
};

function addClickListenersToAuthors() {
  const allLinksAuthors = document.querySelectorAll('a[href^="#author-"]');
  console.log('Show all links to auhors:', allLinksAuthors);
  for (let linkAuthor of allLinksAuthors) {
    console.log('show:', allLinksAuthors);
    linkAuthor.addEventListener('click', authorClickHandler);
    console.log('show linkAuthor:', linkAuthor);
  }
}

addClickListenersToAuthors();

