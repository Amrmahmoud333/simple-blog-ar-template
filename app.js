const express = require('express');
const fs = require('fs');
const app = express();

const articles = require('./src/routes/articles.routes');

const port = process.env.PORT || 5000;
const config = JSON.parse(
  fs.readFileSync('./config.json', { encoding: 'utf8' })
);

app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.static('src/public'));

app.get(/\.html$/, (req, res) => {
  res.redirect(req.originalUrl.replace('.html', ''));
});

app.use('/articles', articles);

app.get('/', (req, res) => {
  res.render('index', { title: 'الصفحة الرئيسية', config });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(port, () =>
  console.log('> Server is up and running on http://localhost:' + port)
);
