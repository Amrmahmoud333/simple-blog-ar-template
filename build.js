const builder = require('./src/controllers/build.controller');
builder
  .buildHomePage()
  .build404Page()
  .buildAllArticlesPage()
  .buildPageForEveryArticle();
