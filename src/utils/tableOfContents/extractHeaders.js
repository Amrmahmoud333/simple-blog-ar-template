module.exports = (html) => {
  const headers = html.matchAll(/<h\d id=".*">.*<\/h\d>/g);

  const headerIds = [];
  const headerTitles = [];
  const headerLevels = [];
  for (const header of headers) {
    headerIds.push(header[0].match(/id="(.*)"/)[1]);
    headerTitles.push(header[0].match(/<h\d id=".*">(.*)<\/h\d>/)[1]);
    headerLevels.push(header[0].match(/<h(\d)/)[1]);
  }

  return { headerIds, headerTitles, headerLevels };
};
