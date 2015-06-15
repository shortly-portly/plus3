Template.performanceDetail.helpers ({
  userDetails: function() {
    var x = Meteor.users.findOne({_id: this.user});
    return x;
  },
  title: function() {
    var x = Appraisals.findOne({_id: this.appraisal});
    console.log("title");
    return x.title;
  }
});

Template.performanceDetail.events({
  'click .reopenReview': function() {

    Reviews.update({_id: this._id}, {$set: {"status": "open"}});
  }
});
