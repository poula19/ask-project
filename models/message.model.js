const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    message: String,
    userID: { type: mongoose.Schema.Types.ObjectId }

})


module.exports = mongoose.model('message', userSchema)