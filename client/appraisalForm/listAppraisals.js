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

    // Only delete an appraisal if no-one has
    // submitted a completed one.

    if(Reviews.find({appraisal: this._id, status: "closed"}).count() == 0) {
      Meteor.call('deleteQuestions', this._id);
      Appraisals.remove({_id: this._id});
    }

  },
  'click .copyAppraisal': function(event) {
    event.preventDefault();

    var id = Appraisals.insert({
      title: this.title + " copy",
      nextQuestionNo: this.nextQuestionNo,
      status: "created"
    });

    var questions = Questions.find({appraisal: this._id}).fetch();
    console.log(questions);

    _.each(questions, function(question) {
      Questions.insert({
        appraisal: id,
        questionNo: question.questionNo,
        text: question.text,
        type: question.type,
        default: question.default
      })
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
})
