var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')
var database = require('./database')
var routes = require('./routes')
var gravatar = require('gravatar')

var app = express()

app.get('env') === process.env.NODE_ENV || 'development'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('trust proxy', 1)

app.set('port', (process.env.PORT || 3000))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)


app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!');
})

module.exports = app
