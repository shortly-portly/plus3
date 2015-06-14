var updateQuestion = function(question, newType,evt) {
  evt.preventDefault();
  evt.stopPropagation();

  var textSelector = "editor" + question.questionNo;
  var questionText = CKEDITOR.instances[textSelector].getData()

  tempQuestions.update(question._id, {$set: {type:newType, text: questionText}});
}

Template.questionMenu.events({
  'click .standard': function (evt) {
    updateQuestion(this, "textArea", evt);
  },
  'click .words': function (evt) {
    updateQuestion(this, "words", evt);
  },
  'click .radar': function(evt) {
    updateQuestion(this, 'radar', evt);
  },
  'click .radio': function(evt) {
    updateQuestion(this, 'radio', evt);
  },
  'click .slide': function(evt) {
    updateQuestion(this, 'slide', evt)
  }
})
