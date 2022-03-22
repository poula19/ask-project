const app = require('express').Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator')
var jwt = require('jsonwebtoken');
const validation = require('../validation/validation.register')
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service:"gmail",
       auth: {
         user: "routes.project18@gmail.com",
         pass: "Poula258*"
       },
     });

app.get('/register', (req, res) => {
    let oldInputs = req.flash('oldInputs')[0]
    if (oldInputs == undefined) {
        oldInputs = { name: '', email: '', password: '', PasswordConfirmation: '' }
    }
    res.render('register.ejs', { errors: req.flash('errors'), isLoggedIn: req.session.isLoggedIn, oldInputs })
});

app.post('/Register', validation,
    async(req, res) => {
        const errors = validationResult(req)
        console.log(errors.array());
        console.log(errors.isEmpty());
        console.log(req.body);
        const { name, email, password } = req.body
        if (errors.isEmpty() == true) {
            bcrypt.hash(password, 8, async function(err, hash) {
                
                var token = jwt.sign({ email }, 'hamada');
                let options={
   
                    from: '"node.js team" <routes.project18@gmail.com>', 
                    to: email, 
                    subject: "Hello ✔", 
                    html: `<div style="background-color:#bbf;color:red;padding:140px">
                    <h1><a href="http://localhost:3000/check/${token}">click to confirmation</a></h1>
                    </div>
                    `, 
                }
                 await transporter.sendMail(options ,(err)=>{
                     if (err) {
                         console.log('error');
                     }else{
                         console.log('email has been sent');
                     }
                 }); 
               
               
               
                await userModel.insertMany({ name, email, password: hash })
                res.redirect('/register')
            });
        } else {
            req.flash('errors', errors.array())
            req.flash('oldInputs', req.body)
            res.redirect('/register')
                //connect-flash
                // res.render('register.ejs', { errors, isLoggedIn: req.session.isLoggedIn })
        }
    });

app.get('/check/:token', async(req, res) => {
    let token=req.params.token
    jwt.verify(token, 'hamada',async function(err, decoded) {
        console.log(decoded.email)
        await userModel.findOneAndUpdate({ email:decoded.email },{ confirmed:true })
      });
     res.redirect('/login');
});
module.exports = app