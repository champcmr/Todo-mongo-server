var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect('mongodb://localhost/local');

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

var member = mongoose.model('todos',{
    firstName : String,
    lastName : String,
    email: String,
    gender : String    
});

var task = mongoose.model('tasks',{
    taskId : String,
    refMemberId : String,
    title : String,
    status : Boolean,
    dueDate : String
})


app.get('/api/members',function(req,res){
    console.log('Fetching Members');

    member.find(function(err, members){
        if (err)
            res.send(err);
        res.json(members); 
    });
});

app.post('/api/add-member',function(req, res) {
    member.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        gender : req.body.gender
    }, function(err, members) {
        if (err)
            res.send(err);

        // get and return all the members after you create another
        member.find(function(err, members) {
            if (err)
                res.send(err)
            res.json(members);
        });
    });
});


// delete a member
app.delete('/api/delete-member/:id', function(req, res) {
    member.remove({
        _id : req.params.id
    }, function(err, member) {

    });
});

/*============================Task serivces============= */

app.get('/api/tasks/:memberId',function(req,res){
    console.log('Fetching Tasks');
    task.find({refMemberId:req.params.memberId},function(err, data) {
        if (err) {
            return handleError(res, err);
        }
        res.json(data);
    });
});


app.post('/api/add-task',function(req, res){
     task.create({
        taskId: req.body.taskId,
        refMemberId : req.body.refMemberId, 
        title : req.body.title,
        status : req.body.status,
        dueDate : req.body.dueDate
    }, function(err, tasks) {
        if (err)
            res.send(err);

        // get and return all the members after you create another
        task.find(function(err, tasks) {
            if (err)
                res.send(err)
            res.json(tasks);
        });
    });
});

// delete a task
app.delete('/api/delete-task/:id', function(req, res) {
    task.remove({
        _id : req.params.id
    }, function(err, member) {

    });
});


app.listen(8080);
console.log('App listening on port 8080');