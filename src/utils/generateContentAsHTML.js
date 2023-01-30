const markdownToHtml = require('./markdownToHtml');
const addTableOfContents = require('./tableOfContents/addTableOfContents');
const addTitleSection = require('./addTitleSection');
const addReadingTime = require('./addReadingTime');

module.exports = (article) => {
  article.asHTML = markdownToHtml(article.body);
  article.asHTML = addTableOfContents(article.asHTML);
  article.asHTML = addReadingTime(
    article.attributes.readingTime,
    article.asHTML
  );
  article.asHTML = addTitleSection(
    article.attributes.title,
    article.asHTML
  );

  return article.asHTML;
};
