const router = require('express').Router();
const articlesViewController = require('../controllers/articles.controller');

router.get('/', articlesViewController.getAll);
router.get('/:slug', articlesViewController.getOne);

module.exports = router;
