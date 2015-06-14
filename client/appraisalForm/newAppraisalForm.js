var createAppraisalForm = function(evt, template, status) {
  var id;
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

  id = Appraisals.insert({
    title: title,
    nextQuestionNo: 1,
    status: status
  });

  /* For now assume that we created the Appraisal form ok */
  /* TODO: need to check form was created succesfully */

  Meteor.appraisalHelpers.createQuestions(id, questions);

  Session.set('questions', []);

  return id;

}


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

  Meteor.appraisalHelpers.updateQuestions(id, questions);


  /* For now assume that we created the Appraisal form ok */
  /* TODO: need to check form was created succesfully */

  Appraisals.update(id, {
    $set: {
      "title": title,
      "status": status
    }
  });

  Router.go('listAppraisals');

}


Template.newAppraisalForm.events({
  'click .saveAppraisalForm': function(evt, template) {

    if (this.mode == "new") {
      createAppraisalForm(evt, template, "created");
    } else {
      updateAppraisalForm(evt, template, this.appraisalForm._id, "created");
    }



  },
  'click .publishAppraisalForm': function(evt, template) {

    var id;

    if (this.mode == "new") {
      id = createAppraisalForm(evt, template, "published");
    } else {

      id = this.appraisalForm._id;


      updateAppraisalForm(evt, template, id, "published");
    }



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
  },

  'click .standard': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('textArea');
  },

  'click .words': function(evt, template) {
    evt.preventDefault();
    evt.stopPropagation();
    Meteor.appraisalHelpers.newQuestion('words');
  },
  'click .radar': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('radar');
  },
  'click .radio': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('radio');
  },
  'click .slide': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('slide');
  },

  'click .delete': function() {
    tempQuestions.remove({
      _id: this._id
    });
    Meteor.appraisalHelpers.reorderQuestions();
  }


});

Template.newAppraisalForm.helpers({
  tQuestions: function() {
    return tempQuestions.find();
  },
  typed: function() {
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)
    console.log(templateName);

    return templateName;
  }

});


Template.newAppraisalForm.created = function() {

  tempQuestions.remove({});

  var questionNo = 1;

  if (this.data.mode == "new") {
    console.log("processing a new form");
    Session.set("questionNo", 1);

    Meteor.appraisalHelpers.newQuestion('textArea');

  } else {
    var questions = this.data.questions.fetch();

    _.each(questions, function(question) {
      tempQuestions.insert(question);
      questionNo = questionNo + 1;
    });

    Session.set("questionNo", questionNo);

  }




};
