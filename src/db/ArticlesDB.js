const fs = require('fs');
const fm = require('front-matter');
const path = require('path');
const moment = require('moment');

const generateContentAsHTML = require('../utils/generateContentAsHTML');
const config = JSON.parse(
  fs.readFileSync('./config.json', { encoding: 'utf8' })
);
class ArticleDB {
  constructor() {
    this.articles = [];
    this.articlesAttributes = [];

    const inputArticlesDir = path.join(__dirname, '../articles');

    const categoriesIndex = JSON.parse(
      fs.readFileSync(path.join(inputArticlesDir, 'index.json'), {
        encoding: 'utf-8',
      })
    );
    this.categoriesIndex = categoriesIndex;

    let filesPath = [];
    for (const index of categoriesIndex) {
      filesPath = [
        ...filesPath,
        ...fs
          .readdirSync(path.join(inputArticlesDir, index.id))
          .map((file) => path.join(inputArticlesDir, index.id, file)),
      ];
    }

    for (const path of filesPath) {
      const data = fs.readFileSync(path, {
        encoding: 'utf8',
      });
      const res = fm(data);
      const splitPath = path.split(/\\|\//);

      res.attributes.category = categoriesIndex.find(
        (index) => index.id === splitPath[splitPath.length - 2]
      ).category;

      res.attributes.slug = splitPath[splitPath.length - 1].replace(
        '.md',
        ''
      );

      moment.locale('ar');

      res.attributes.createAtTimestamp = moment(
        res.attributes.createAt
      ).unix();

      res.attributes.createAt = moment(res.attributes.createAt).format(
        'dddd، D MMMM YYYY'
      );
      this.articles.push(res);
      this.articlesAttributes.push(res.attributes);
    }
  }

  getCategoriesIndex = () => this.categoriesIndex;
  getAllArticles = () => this.articles;
  getAllAttributes = () =>
    this.articlesAttributes.sort(
      (a, b) => a.createAtTimestamp - b.createAtTimestamp
    );
  getBySlug = (slug) =>
    this.articles.find((ele) => ele.attributes.slug === slug);

  getDataOfOneArticle = (slug) => {
    const article = this.getBySlug(slug);
    return {
      article: generateContentAsHTML(article),
      title: article.attributes.title,
      slug: article.attributes.slug,
      description: article.attributes.description,
      tags: article.attributes.tags,
      config,
    };
  };

  getDataOfAllArticles = () => ({
    title: 'المقالات',
    articles: this.getAllAttributes(),
    categoriesIndex: this.getCategoriesIndex(),
    config,
  });
}

module.exports = ArticleDB;
