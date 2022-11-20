const express = require('express');
const Handlebars = require('handlebars');
const sequelize = require('./src/database/database').sequelize;
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const { engine } = require('express-handlebars');
const path = require('path');

// Controller 
const homeController = require('./src/controllers/homeController');
const bookController = require('./src/controllers/bookController');
const authorController = require('./src/controllers/authorController');
const editorialController = require('./src/controllers/editorialController');
const errorController = require('./src/controllers/errorController');



const app = express();

app.engine(
  'hbs',
  engine({
    layoutsDir: './src/views/layouts/',
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('views engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/', homeController);
app.use('/books', bookController);
app.use('/authors', authorController);
app.use('/editorials', editorialController);
app.use(errorController.get404);
sequelize
  .sync()
  .then(function (result) {
    app.listen(3000, function () {
      console.log(
        `Server is running on http://localhost:${this.address().port}`
      );
    });
  })
  .catch(function (err) {
    console.log(`Error: ${err}`);
  });
