const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers/');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// ** Set us up with custom middleware!! **
// Create a session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', exphbs ({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// For path finding set up this middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets up a path to use all public references for instances for a public folder
app.use(express.static(path.join(__dirname, 'public')));

// Sets up a path to use the images from the (public folder) / (images file).
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Create the routes controller
app.use(routes);

// Create the server to run the application
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to: http://localhost:3001/'));
});