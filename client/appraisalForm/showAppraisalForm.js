Template.reviewAppraisalForm.events({
});

Template.reviewAppraisalForm.helpers({
  typed: function() {
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)

    return templateName;
  },
  tQuestions: function () {
    return tempQuestions.find();
  }
})

Template.reviewAppraisalForm.created = function() {

  tempQuestions.remove({});

  var questionNo = 1;
  var questions = this.data.questions.fetch();

  _.each(questions, function(question) {
    tempQuestions.insert(question);
    questionNo = questionNo + 1;
  })

  Session.set("questionNo", questionNo);

};
