Template.showAppraisalForm.events({
});

Template.showAppraisalForm.helpers({
  typed: function() {
    console.log("typed of showAppraisalsForm");
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)

    return templateName;
  },
  tQuestions: function () {
    console.log("tQuestions of showAppraisalsForm");

    return tempQuestions.find();
  }
})

Template.showAppraisalForm.created = function() {

  console.log("Review Appraisal Form created called");
  console.log(this);
  tempQuestions.remove({});

  var questionNo = 1;
  var questions = this.data.questions.fetch();
  //var questions = Questions.find({appraisal: this.data.appraisalForm._id}).fetch();

  console.log("questions");
  console.log(questions);

  _.each(questions, function(question) {
    console.log("individual question");
    console.log(question);
    tempQuestions.insert(question);
    questionNo = questionNo + 1;
  })

  Session.set("questionNo", questionNo);

};
