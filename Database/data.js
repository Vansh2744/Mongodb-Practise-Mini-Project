const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/StudentsData");

const userSchema = new mongoose.Schema({
    username:String,
    age:String,
    email:String,
    imageUrl:String
});

module.exports = new mongoose.model('students',userSchema);