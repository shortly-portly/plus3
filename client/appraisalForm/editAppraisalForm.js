var updateAppraisalForm = function(evt, template, id, status) {

  var errors = [];
  event.preventDefault();

  questions = Meteor.appraisalHelpers.collectQuestions(template);
  errors = Meteor.appraisalHelpers.validateQuestions(questions);


  title = template.find("input[name=title]").value;

  if (!title) {
    errors.push("Please Enter a Title");

  }

  if (errors.length > 0) {
    FlashMessages.sendError(errors);
    return
  };

   console.log("updateAppraisal Form");
   console.log(id);

  Meteor.appraisalHelpers.updateQuestions(id,questions);


  /* For now assume that we created the Appraisal form ok */
  /* TODO: need to check form was created succesfully */

  Appraisals.update(id, {$set: {"title": title, "status": status}});

  Router.go('listAppraisals');

}




Template.editAppraisalForm.events({
  'click .newTextArea': function(evt, template) {

    Meteor.appraisalHelpers.newQuestion('textArea');

  },

  'click .newWords': function(evt, template) {
    Meteor.appraisalHelpers.newQuestion('words');
  },

  'click .delete': function() {
    tempQuestions.remove({
      _id: this._id
    });
    Meteor.appraisalHelpers.reorderQuestions();
  },


  'click .updateAppraisalForm': function(evt, template) {
   /* update questions */
   event.preventDefault();

   console.log("update questions");
   console.log(this.appraisalForm._id);
    var id = this.appraisalForm._id;
    updateAppraisalForm(evt, template, id, "created");


  },
  'click .publishAppraisalForm': function(evt, template) {
    event.preventDefault();

    var id = this.appraisalForm._id;
    updateAppraisalForm(evt, template, id, 'published');

    var data = [];

    Questions.find({
      appraisal: id
    }).forEach(function(question) {
      data[question.questionNo] = question.default;
    });

    Meteor.users.find().forEach(function(user) {

      Reviews.insert({
        user: user._id,
        appraisal: id,
        data: data,
        status: "open"
      });

    })

    Router.go('listAppraisals');
  }

});

Template.editAppraisalForm.helpers({
  typed: function() {
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)

    return templateName;
  },
  tQuestions: function () {
    return tempQuestions.find();
  }
})

Template.editAppraisalForm.created = function() {

  tempQuestions.remove({});

  var questionNo = 1;
  var questions = this.data.questions.fetch();

  _.each(questions, function(question) {
    tempQuestions.insert(question);
    questionNo = questionNo + 1;
  })

  Session.set("questionNo", questionNo);

};
