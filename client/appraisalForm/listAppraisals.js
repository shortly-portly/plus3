Template.listAppraisals.events ({
  'click .showAppraisal': function(event) {
    event.preventDefault();

    if (this.status == "created") {
      Router.go('editAppraisalForm', {_id: this._id})
    } else {
      Router.go('showAppraisalForm', {_id: this._id})
    }
  },
  'click .reviewAppraisal': function(event) {
    event.preventDefault();

    Router.go('showAppraisalForm', {_id: this._id})
  },
  'click .deleteAppraisal': function(event) {
    event.preventDefault();

    // Delete any reviews associated with this Appraisal

    Meteor.call('deleteReviews', this._id, function(error, result) {
      if (error) {
        FlashMessages.sendError("Problem deleting Reviews for this Appraisal");
        return;
      }
    });

    Meteor.call('deleteQuestions', this._id, function(error, result) {
      if (error) {
        FlashMessages.sendError("Problem deleting Questions for this Appraisal");
      }
    });

    Appraisals.remove({_id: this._id});

  },
  'click .copyAppraisal': function(event) {
    event.preventDefault();

    var id = Appraisals.insert({
      title: this.title + " copy",
      nextQuestionNo: this.nextQuestionNo,
      position: 1,
      status: "created"
    });

    console.log("copy Appraisal");
    console.log(this._id);

    var questions = Questions.find({appraisal: this._id}).fetch();
    console.log(questions);

    _.each(questions, function(question) {
      console.log("insewrting questions");
      delete question._id;
      question.appraisal = id;
      Questions.insert(question);
    });
  }
})

Template.listAppraisals.helpers({
  created: function() {
    if (this.status == "created") {
      return true
    } else {
      return false
    };

  }
});
