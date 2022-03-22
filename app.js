const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
var flash = require('connect-flash');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/sendingEmails',
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(flash());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes/index.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/user.routes'))
app.use(require('./routes/messages.routes'))
app.get('/', (req, res) => {
    res.render('register.ejs')
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
});
mongoose.connect('mongodb://localhost:27017/sendingEmails', { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!');
});