var task = require('../controllers/tasks.controller.js');

module.exports = function(app){
    app.route('/api/tasks/:id').get(task.fnGetTasks);
    app.route('/api/add-task').post(task.fnAddTask);
    app.route('/api/delete-task/:id').delete(task.fnRemoveTask);
    app.route('/api/update-task/:id').put(task.fnUpdateTask);
}