const fs = require('fs');
const path = require('path');
const pug = require('pug');
const ArticleDB = require('../db/ArticlesDB');

const config = JSON.parse(
  fs.readFileSync('./config.json', { encoding: 'utf8' })
);

const _writeFile = (input, output, data) => {
  const html = pug.renderFile(input, { ...data, config });

  fs.writeFileSync(output, html, {
    flag: 'w',
  });
};

class BuildController {
  constructor() {
    console.log('Build init Starting');
    this.articleDB = new ArticleDB();
    this.destDir = path.join(__dirname, '../../dist');

    console.log('Recreate destination directory');
    fs.rmSync(this.destDir, { force: true, recursive: true });
    fs.mkdirSync(this.destDir);

    console.log('Move css, js and images in destination directory');
    fs.cpSync(path.join(__dirname, '../public'), this.destDir, {
      recursive: true,
    });
    console.log('Build init Finished');
  }

  buildHomePage = () => {
    console.log('Build home page');
    const indexFile = path.join(__dirname, '../views/index.pug');
    const outputIndexFile = path.join(this.destDir, '/index.html');

    _writeFile(indexFile, outputIndexFile, {
      title: 'الصفحة الرئيسية',
    });
    console.log('Finish build home page');
    return this;
  };

  build404Page = () => {
    console.log('Build 404 page');
    const err404File = path.join(__dirname, '../views/404.pug');
    const output404File = path.join(this.destDir, '/404.html');

    _writeFile(err404File, output404File, {
      title: 'صفحة من اعماق البحار',
    });
    console.log('Finish build 404 page');
    return this;
  };

  buildAllArticlesPage = () => {
    console.log('Build all articles page');
    const articlesFile = path.join(__dirname, '../views/articles.pug');
    const outputArticlesFile = path.join(this.destDir, '/articles.html');

    _writeFile(
      articlesFile,
      outputArticlesFile,
      this.articleDB.getDataOfAllArticles()
    );
    console.log('Finish build all articles page');
    return this;
  };

  buildPageForEveryArticle = () => {
    console.log('Build page for every article');
    const articleFile = path.join(__dirname, '../views/article.pug');

    fs.mkdirSync(path.join(this.destDir, '/articles'));

    this.articleDB.getAllAttributes().forEach((attributes) => {
      console.log(`Build page for ${attributes.slug} article`);
      const outputArticleFile = path.join(
        this.destDir,
        `/articles/${attributes.slug}.html`
      );

      _writeFile(
        articleFile,
        outputArticleFile,
        this.articleDB.getDataOfOneArticle(attributes.slug)
      );
      console.log(`Finish build page for ${attributes.slug} article`);
    });
    console.log('Finish build page for every article');
    return this;
  };
}

module.exports = new BuildController();
