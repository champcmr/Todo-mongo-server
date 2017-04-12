var member = require('../controllers/members.controller.js');

module.exports = function(app){
    app.route('/api/members').get(member.fnGetMembers);
    app.route('/api/add-member').post(member.fnAddMember);
    app.route('/api/delete-member/:id').delete(member.fnRemoveMember);
}