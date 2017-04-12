var members = require('../models/member.model.js');

exports.fnGetMembers = function(req, res){
    console.log('Fetching Members');

    members.find(function(err, members){
        if (err){
            res.send(err);
            return;
        }
        res.json(members); 
    });    
}

exports.fnAddMember = function(req, res){
    console.log('Add Member');
    members.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        gender : req.body.gender
    }, function(err, memberData) {
        if (err){
            res.send(err);
            return;
        }    
        res.json(memberData);
    });
}

exports.fnRemoveMember = function(req, res){
    console.log('Remove Member');
    members.findByIdAndRemove(req.params.id, function(err, member) {
        if (err){
            res.send(err);
            return;
        }
        var response = {
            message: "Member successfully deleted",
            name: member.firstName + " " + member.lastName
        };
        res.send(response);
    });
}