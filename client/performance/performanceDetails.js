Template.performanceDetail.helpers ({
  userDetails: function() {
    var x = Meteor.users.findOne({_id: this.user});
    return x;
  }
});

Template.performanceDetail.events({
  'click .reopenReview': function() {
    
    Reviews.update({_id: this._id}, {$set: {"status": "open"}});
  }
});
