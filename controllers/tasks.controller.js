var tasks = require('../models/task.model.js');

exports.fnGetTasks = function(req, res){
    console.log('Fetching Tasks');

    tasks.find({refMemberId:req.params.id},function(err, taskdata){
        if (err){
            res.send(err);
            return;
        }
        res.json(taskdata); 
    });    
}

exports.fnAddTask = function(req, res){
    console.log('Add Task');
    tasks.create({
        taskId: req.body.taskId,
        refMemberId : req.body.refMemberId, 
        title : req.body.title,
        status : req.body.status,
        dueDate : req.body.dueDate
    }, function(err, tasks) {
        if (err){
            res.send(err);
            return;
        }    
       
        res.json(tasks);
        
    });
}

exports.fnRemoveTask = function(req, res){
    console.log('Remove Task');
    tasks.findByIdAndRemove(req.params.id, function(err, task) {
        if (err){
            res.send(err);
            return;
        }
        var response = {
            message: "Task successfully deleted",
            name: task.title
        };
        res.send(response);
    });
}


exports.fnUpdateTask = function(req, res){
    console.log('Update task');
    tasks.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, taskData){
        if (err){
            res.send(err);
            return;
        }
        console.log('update task: ',taskData.status);
        res.send(taskData);
    })
}