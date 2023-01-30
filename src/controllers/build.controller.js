const fs = require('fs');
const path = require('path');
const pug = require('pug');
const ArticleDB = require('../db/ArticlesDB');

const config = JSON.parse(
  fs.readFileSync('./config.json', { encoding: 'utf8' })
);
const distDir = path.join(__dirname, '../../dist');

const _writeFile = (fileName, data) => {
  const input = path.join(__dirname, `../views/${fileName}.pug`);
  const output = path.join(distDir, `/${fileName}.html`);

  const html = pug.renderFile(input, { ...data, config });

  fs.writeFileSync(output, html, {
    flag: 'w',
  });
};

class BuildController {
  constructor() {
    this.articleDB = new ArticleDB();

    fs.rmSync(distDir, { force: true, recursive: true });
    fs.mkdirSync(distDir);

    fs.cpSync(path.join(__dirname, '../public'), distDir, {
      recursive: true,
    });
  }

  buildHomePage = () => {
    _writeFile('index', {
      title: 'الصفحة الرئيسية',
    });
    return this;
  };

  build404Page = () => {
    _writeFile('404', {
      title: 'صفحة من اعماق البحار',
    });
    return this;
  };

  buildAllArticlesPage = () => {
    _writeFile('articles', this.articleDB.getDataOfAllArticles());
    return this;
  };

  buildPageForEveryArticle = () => {
    const articleFile = path.join(__dirname, '../views/article.pug');

    fs.mkdirSync(path.join(distDir, '/articles'));

    this.articleDB.getAllAttributes().forEach((attributes) => {
      const outputArticleFile = path.join(
        distDir,
        `/articles/${attributes.slug}.html`
      );

      const html = pug.renderFile(
        articleFile,
        this.articleDB.getDataOfOneArticle(attributes.slug)
      );

      fs.writeFileSync(outputArticleFile, html, {
        flag: 'w',
      });
    });
    return this;
  };
}

module.exports = new BuildController();
