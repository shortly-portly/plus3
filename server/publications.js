Meteor.publish("reviews", function () {
  return Reviews.find();
});

Meteor.publish('questions', function() {

  return Questions.find();
});

Meteor.publish('allUsers', function() {

    if (this.userId) {
      user = Meteor.users.findOne(this.userId);

      if (user.profile.role === "admin") {
        return Meteor.users.find();
      }
    }
});

Meteor.publish('myReview', function() {
  return Reviews.find({"user": this.userId});
});

Meteor.publish('allAppraisalForms', function() {
  return Appraisals.find();
});
