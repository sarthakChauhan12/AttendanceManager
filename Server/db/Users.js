const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: String,
    name: String,
    email: String,
    password: String,
    classes: Array,
    attendance: Array,
    class: String,
    rollno: Number,
    selectedImage: Buffer,
});

module.exports = mongoose.model('users', userSchema);
