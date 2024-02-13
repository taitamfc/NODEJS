const express = require('express')
const morgan = require('morgan')
const engine = require('express-handlebars');
const app = express()
const port = 3000
const path = require('path');
const route = require('./routes')
const db = require('./config/db')
const methodOverride = require('method-override')
// connect db
db.connect();

//Allow method PUT,DELETE
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// static file
app.use(express.static(path.join(__dirname,'public')));

// Xu ly nhan du lieu post
app.use(express.urlencoded({ extended: true }));

// HTTP loger
app.use(morgan('combined'))

// Template engine
app.engine('handlebars', engine.engine());
app.set('view engine', 'handlebars');
// app.set('views', './src/resources/views');
app.set('views', path.join(__dirname,'resources/views'));

// Init route
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})