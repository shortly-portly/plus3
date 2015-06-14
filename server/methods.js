Meteor.methods({
  createServerUser: function(user) {
    var result = Accounts.createUser(user);

    return result;
  },
  updateServerUser: function(user) {
    var result = Meteor.users.update({_id: user.id},
                  {$set: {"profile": user.profile,
                          "emails": [{address: user.email}]
                        }
                  });
  return result;
},
 deleteQuestions: function(id) {
   Questions.remove({appraisal: id})
 }
});
