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

  deleteUser: function(id) {
    return Meteor.users.remove({_id: id})
  },

  deleteUserReviews: function(id) {
    return Reviews.remove({user: id})
  },
  deleteReviews: function(id) {
    return Reviews.remove({appraisal: id})
  },
  
  deleteQuestions: function(id) {
   Questions.remove({appraisal: id})
 },

 updatePassword: function(id) {
   Accounts.setPassword(id, "wibble");
 }

});
