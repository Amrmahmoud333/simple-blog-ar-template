const fs = require('fs')

const ArticleDB = require('../db/ArticlesDB');
const config = JSON.parse(
  fs.readFileSync('./config.json', { encoding: 'utf8' })
);
class ArticleController {
  constructor() {
    this.articleDB = new ArticleDB();
  }

  getAll = (req, res, next) => {
    res.render('articles', this.articleDB.getDataOfAllArticles());
  };

  getOne = (req, res, next) => {
    const articleData = this.articleDB.getDataOfOneArticle(
      req.params.slug
    );
    if (!articleData)
      return res.status(404).render('404', {
        title: 404,
        message: 'لا يوجد مقالة بهذا العنوان',
        config,
      });

    res.render('article', articleData);
  };
}

module.exports = new ArticleController();
