
Template.viewPerformance.created = function() {
  Session.set("reviewId", this.data.review._id);
  Session.set("mode", "view");
};

Template.viewPerformance.helpers({
  comment: function() {
    return this.review.comment;
  },
  commentable: function() {
    if (this.type == "section") {
      return false;
    } else {
      return true;
    }
  },
  adminUser: function() {
    console.log(Meteor.user());
    console.log(this);

    if (Meteor.user() && Meteor.user().profile.role == 'admin') {

      if (Meteor.user()._id == this.review.user) {
        return false;
      }

      return true;
    }
  }

})

Template.viewPerformance.events ({
  'click .saveComment': function(evt, template) {
    evt.preventDefault();

    var comment;
    //* comment = template.find("textarea[name=comment]").value;
    comment =  CKEDITOR.instances["comment"].getData()

    Reviews.update(this.review._id, {$set: {"comment": comment}});

    FlashMessages.sendInfo("Comment Saved");

  }


});
