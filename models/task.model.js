var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    taskId: String,
    refMemberId: String,
    title: String,
    status: String,
    dueDate: String
});

module.exports = mongoose.model('tasks', TaskSchema);