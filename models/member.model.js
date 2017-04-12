var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email: String
});

module.exports = mongoose.model('members', MemberSchema);