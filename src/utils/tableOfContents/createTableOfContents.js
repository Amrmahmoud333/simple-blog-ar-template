module.exports = (headerIds, headerTitles, headerLevels) => {
  const tableOfContentsList = [];
  let previousHeaderLevel = headerLevels[0];
  const n = headerLevels.length;
  for (let i = 0; i < n; ++i) {
    const headerId = headerIds[i];
    const headerTitle = headerTitles[i];
    const headerLevel = headerLevels[i];
    const li = `<li><a href="#${headerId}">${headerTitle}</a></li>`;

    if (headerLevel === previousHeaderLevel) {
      tableOfContentsList.push(li);
    } else if (headerLevel > previousHeaderLevel) {
      tableOfContentsList.push('<ul>');
      tableOfContentsList.push(li);
    } else if (headerLevel < previousHeaderLevel) {
      for (let j = 0; j < previousHeaderLevel - headerLevel; j++) {
        tableOfContentsList.push('</ul>');
      }
      tableOfContentsList.push(li);
    }
    previousHeaderLevel = headerLevel;
  }
  return `<div class="table-of-contents">
  <h2>الفهرس</h2>
  <ul>
      ${tableOfContentsList.join('')}
  </ul>
</div>`;
};
