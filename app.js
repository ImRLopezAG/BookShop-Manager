const express = require('express');
const Handlebars = require('handlebars');
const sequelize = require('./src/server/database').sequelize;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const { engine } = require('express-handlebars');
const path = require('path');

// Controller
const bookController = require('./src/controllers/bookController');
const authorController = require('./src/controllers/authorController');
const editorialController = require('./src/controllers/editorialController');
const categoryController = require('./src/controllers/categoryController');
const errorController = require('./src/controllers/errorController');

// Models
const Book = require('./src/models/bookModel');
const Author = require('./src/models/authorModel');
const Editorial = require('./src/models/editorialModel');
const Category = require('./src/models/categoryModel');



// Helpers
const statusHelper = require('./src/controllers/helpers/statusHelper');
// Routes
const bookShopRouter = require('./src/routes/router');
const adminRoutes = require('./src/routes/admin');

// App

const app = express();

app.engine(
  'hbs',
  engine({
    layoutsDir: path.join(__dirname, '/src/views/layouts'),
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { IsEqual: statusHelper.EqualValue },
  })
);

// Settings
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/wwwroot');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname);
  },
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/wwwroot')));
app.use(multer({ storage: imageStorage }).single('Image'));

// View Routes
app.use(bookShopRouter);
app.use('/admin', adminRoutes);
app.use('/', errorController.Get404);

sequelize
  .sync(/*{ alert: true }*/)
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
