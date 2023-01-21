const addTableOfContents = require('./tableOfContents/addTableOfContents');

module.exports = (html, title) => {
  html = addTableOfContents(html);
  html = addTitleSection(title, html);
  return html;
};

const addTitleSection = (title, html) => {
  return (
    `<div align = "center">
    
    <h1> ${title} </h1>
    
    <h2> السلام عليكم ورحمة الله وبركاته </h2>
    
    </div>` + html
  );
};
