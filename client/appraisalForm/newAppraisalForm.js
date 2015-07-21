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
    return null;
  };

  id = Appraisals.insert({
    title: title,
    position: 1,
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
    return null;

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


  return id;


}


Template.newAppraisalForm.events({
  'click .saveAppraisalForm': function(evt, template) {

    if (this.mode == "new") {
      id = createAppraisalForm(evt, template, "created");
    } else {
      id = updateAppraisalForm(evt, template, this.appraisalForm._id, "created");
    }

    if (!id) {
      return;
    }

    Router.go('listAppraisals');

  },
  'click .publishAppraisalForm': function(evt, template) {

    var id;

    if (this.mode == "new") {
      id = createAppraisalForm(evt, template, "published");
    } else {

      id = this.appraisalForm._id;


      id = updateAppraisalForm(evt, template, id, "published");
    }

    if (!id) {
      return;
    }

    var data = [];

    Questions.find({
      appraisal: id
    }).forEach(function(question) {
      data[question.questionNo] = question.default;
    });

    Meteor.users.find({"profile.status": "active"}).forEach(function(user) {

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
    Meteor.appraisalHelpers.newQuestion('words');
  },
  'click .radar': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('radar');
  },
  'click .radioo': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('radio');
  },
  'click .slide': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('slide');
  },
  'click .section': function(evt, template) {
    evt.preventDefault();
    Meteor.appraisalHelpers.newQuestion('section');
  },

  'click .delete': function() {
    tempQuestions.remove({
      _id: this._id
    });

    Meteor.appraisalHelpers.reorderQuestions();
  },

  'click .up': function(evt, template) {
    console.log("up");
    console.log(this.position);
    console.log(this);
    if (this.position == 1) {
      return;
    };
    // need to swap the editor text around.
    currentPos = this.position;
    textSelector = 'editor' + currentPos;
    questionText =  CKEDITOR.instances[textSelector].getData();

    newPos = this.position - 1;
    newTextSelector = 'editor' + newPos;
    newQuestionText = CKEDITOR.instances[newTextSelector].getData();

    // need to swap the positions around

    currentQ = tempQuestions.findOne({position: currentPos});
    newQ = tempQuestions.findOne({position: newPos});

    tempQuestions.update(currentQ._id, {
      $set: {
        "position": newPos,
        // "questionNo": currentQ.questionNo
      }
    });

    tempQuestions.update(newQ._id, {
      $set: {
        "position": currentPos,
        // "questionNo": newQ.questionNo
      }
    });

    CKEDITOR.instances[newTextSelector].setData(questionText);
    CKEDITOR.instances[textSelector].setData(newQuestionText);
    Meteor.appraisalHelpers.reorderQuestions();

  },
  'click .down': function() {
    console.log("down");
    console.log(this.position);
    console.log(Session.get("position"));

    if (this.position + 1 == (Session.get("position"))) {
      return
    };

    currentPos = this.position;
    textSelector = 'editor' + currentPos;
    questionText =  CKEDITOR.instances[textSelector].getData();

    newPos = this.position + 1;
    newTextSelector = 'editor' + newPos;
    newQuestionText = CKEDITOR.instances[newTextSelector].getData();

    // need to swap the positions around

    currentQ = tempQuestions.findOne({position: currentPos});
    newQ = tempQuestions.findOne({position: newPos});

    tempQuestions.update(currentQ._id, {
      $set: {
        "position": newPos
      }
    });

    tempQuestions.update(newQ._id, {
      $set: {
        "position": currentPos
      }
    });

    CKEDITOR.instances[newTextSelector].setData(questionText);
    CKEDITOR.instances[textSelector].setData(newQuestionText);
    Meteor.appraisalHelpers.reorderQuestions();


  }


});

Template.newAppraisalForm.helpers({
  tQuestions: function() {
    console.log("tquestions called");
    return tempQuestions.find();
  },
  typed: function() {
    var templateName = "new" + this.type[0].toUpperCase() + this.type.slice(1)
    return templateName;
  }

});

Template.newAppraisalForm.rendered = function () {
  console.log("rendered called");
}

Template.newAppraisalForm.created = function() {

  tempQuestions.remove({});

  var questionNo = 1;
  var position = 1;

  if (this.data.mode == "new") {
    Session.set("questionNo", 1);
    Session.set("position", 1);

    Meteor.appraisalHelpers.newQuestion('textArea');

  } else {
    var questions = this.data.questions.fetch();

    _.each(questions, function(question) {
      tempQuestions.insert(question);

      if (question.type == 'section') {
        questionNo = 0;
      }

      questionNo = questionNo + 1;
      position = position + 1;
    });

    Session.set("questionNo", questionNo);
    Session.set("position", position)

  }

};
