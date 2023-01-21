const fs = require('fs');
const path = require('path');

const markdownToHtml = require('./markdownToHtml');
const addTableOfContents = require('./tableOfContents/addTableOfContents');

module.exports = (article) => {
  article.asHTML = markdownToHtml(article.body);
  article.asHTML = addTableOfContents(article.asHTML);
  article.asHTML = addTitleSection(
    article.attributes.title,
    article.asHTML
  );

  return article.asHTML;
};

const addTitleSection = (title, html) => {
  return (
    `<div align = "center">
    
    <h1> ${title} </h1>
    
    <h2> السلام عليكم ورحمة الله وبركاته </h2>
    
    </div>` + html
  );
};
