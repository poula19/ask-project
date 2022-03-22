const app = require('express').Router()
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
 service:"gmail",
    auth: {
      user: "routes.project18@gmail.com",
      pass: "Poula258*"
    },
  });
app.get('/', (req, res) => {
    res.render('index.ejs', { isLoggedIn: req.session.isLoggedIn })
});
app.post('/send', async(req, res) => {
   
    console.log(req.body.email)
    res.redirect('/')
});

module.exports = app