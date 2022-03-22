const { check } = require('express-validator')

module.exports = [

    check('name').matches(/[A-Z][a-z]*/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    check('PasswordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false
        }
        return true;
    })
]