const createTableOfContents = require('./createTableOfContents');
const extractHeaders = require('./extractHeaders');

module.exports = (html) => {
  html = `<h2 id="المقدمة">المقدمة</h2>` + html;

  const { headerIds, headerTitles, headerLevels } = extractHeaders(html);
  const tableOfContents = createTableOfContents(
    headerIds,
    headerTitles,
    headerLevels
  );

  return tableOfContents + html;
};
