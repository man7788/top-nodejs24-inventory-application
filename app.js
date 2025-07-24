const express = require('express');
const app = express();
const path = require('node:path');

const indexRouter = require('./routes/indexRouter');
const catalogRouter = require('./routes/catalogRouter');

const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
