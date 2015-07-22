Template.showAppraisalForm.events({
});

Template.showAppraisalForm.helpers({
  typed: function() {
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)

    return templateName;
  },
  tQuestions: function () {
    return tempQuestions.find({}, {sort: [['position', 'asc']]});
  }
})

Template.showAppraisalForm.created = function() {

  tempQuestions.remove({});

  var questionNo = 1;
  var position = 0;

  var questions = this.data.questions.fetch();

  _.each(questions, function(question) {

    tempQuestions.insert(question);
    if (question.type == 'section') {
      questionNo = 0;
    }

    questionNo = questionNo + 1;
    position = question.position;
  })
  position = position + 1;

  Session.set("questionNo", questionNo);
  Session.set("position", position);

};
