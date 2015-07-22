
var collectCommonData = function(position, template) {
  // Common data for questions currently consists of:
  // Question Number
  // Question Text
  var data = {};
  var textSelector = "editor" + position;

  data = {
    position: position,
    questionText: CKEDITOR.instances[textSelector].getData()
  }

  return data;

}


var collectQuestionFns = {
  textArea: function(position, template) {

    return collectCommonData(position, template);

  },
  section: function(position, template) {
    return collectCommonData(position, template);
  },
  words: function(position, template) {
    return collectCommonData(position, template);
  },
  radar: function(position, template) {
    var data = collectCommonData(position, template);

    var options = [];
    var def = {};
    var label;

    console.log("looking for ");
    console.log(position);

    for (i=0; i<6; i++) {

      find = "input[name=Q" + position + "r" + i + "]";
      label = template.find(find).value;

      if (label !== "") {
        options[i] = label;
        def[label] = 0;
      }
    }

    data.options = options;
    data.def = def;

    return data;

  },

  slide: function(position, template) {
    var data = collectCommonData(position, template);

    data.low = template.find("input[name=Q" + position + "-low]").value;
    data.mid =template.find("input[name=Q" + position + "-mid]").value;
    data.high =template.find("input[name=Q" + position + "-high]").value;

    return data;
  },

  radio: function(position, template) {
    var data = collectCommonData(position, template);
    var options = [];

    console.log("looking for ");
    console.log(position);


    for (i=0; i<5; i++) {
      find = "input[name=Q" + position + "r" + i + "]";
      label = template.find(find).value;


      if (label !== "") {
        options[i] = {
          optionName: label,
          text: label
        }
      }
    }

    data.options = options;

    return data;

  }

}

var validateQuestionFns = {
  textArea: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },
  section: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },

  words: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },

  radio: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    return errors;
  },

  slide: function(question) {
    errors = [];

    if (!question.data.questionText) {
      errors.push(question.questionNo + ": Please enter a question.");
    }

    if (!question.data.low) {
      errors.push(question.questionNo + ": Please enter a low value");
    }

    if (!question.data.mid) {
      errors.push(question.questionNo + ": Please enter a mid value");
    }

    if (!question.data.high) {
      errors.push(question.questionNo + ": Please enter a high value");
    }

    return errors;
  },

  radar: function(question) {
    errors = [];

    if (St(question.data.questionText).isEmpty()) {
      errors.push(question.questionNo + ": Please enter a question");
    }

    if (question.data.options.length < 3) {
      errors.push(question.questionNo + ": Please enter at least 3 labels");
    }

    var uniqueOptions = _.uniq(question.data.options);
    if (uniqueOptions.length != question.data.options.length) {
      errors.push(question.questionNo + ": Labels must be unique");
    }

    _.each(question.data.options, function(option) {
      var compactOption = St(option).strip(' ');


      if (!St(compactOption).isAlphaNumeric()) {
        errors.push(question.questionNo + " : label must only be letters or numbers");
      }
    })


    return errors;
  }
}

var createQuestionFns = {
  textArea: function(id, question, position, questionNo) {

    Questions.insert({
      appraisal: id,
      position: question.position,
      questionNo: question.questionNo,
      text: question.data.questionText,
      type: "textArea",
      default: ""
    })

  },

  section: function(id, question, position, questionNo) {

    Questions.insert({
      appraisal: id,
      position: question.position,
      questionNo: question.questionNo,
      text: question.data.questionText,
      type: "section",
      default: ""
    })

  },


  words: function(id, question, position, questionNo) {

    Questions.insert({
      appraisal: id,
      position: question.position,
      questionNo: question.questionNo,
      name: question.data.name,
      text: question.data.questionText,
      type: "words",
      max: 5,
      default: ["", "", "", "", ""]
    })

  },

  radar: function(id, question, position, questionNo) {

    Questions.insert({
      appraisal: id,
      position: question.position,
      questionNo: question.questionNo,
      name: question.data.name,
      text: question.data.questionText,
      type: "radar",
      options: question.data.options,
      default: question.data.def
    })
  },

  radio: function(id, question, position, questionNo) {

    Questions.insert({
      appraisal: id,
      position: question.position,
      questionNo: question.questionNo,
      name: "Q" + question.data.questionNo,
      text: question.data.questionText,
      type: "radio",
      options: question.data.options,
      default: question.data.options[0].optionName
    })
  },
  slide: function(id, question, position, questionNo) {

    Questions.insert({
      appraisal: id,
      position: question.position,
      questionNo: question.questionNo,
      text: question.data.questionText,
      type: "slide",
      low: question.data.low,
      mid: question.data.mid,
      high: question.data.high,
      default: 50
    })
  }



}


Meteor.appraisalHelpers = {
  reorderQuestions: function() {
    questionNo = 1;

    tempQuestions.find({}, {sort: [['position', 'asc']]}).forEach(function(question) {


      if (question.type == 'section') {
        questionNo = 0;
      }

      tempQuestions.update(question._id, {
        $set: {
          "questionNo": questionNo,
        }
      });


      questionNo = questionNo + 1;

    })

    Session.set("questionNo", questionNo);
    console.log("finished re-ordering");
  },

  newQuestion: function(type) {
    questionNo = Session.get('questionNo');
    position = Session.get("position");

    console.log(questionNo);
    console.log(position);


    if (type == "section") {
      questionNo = 1;
    }

    data = {
      type: type,
      questionNo: questionNo,
      position: position
    };

    questionNo = questionNo + 1;
    position = position + 1;

    tempQuestions.insert(data);
    Session.set('questionNo', questionNo);
    Session.set("position", position);

  },

  collectQuestions: function(template) {
    console.log("Collect Questions");
    var questions = [];
    questions = tempQuestions.find({}, {sort: [['position', 'asc']]}).fetch();

    _.each(questions, function(question) {
      console.log(question);

      var wibble1 = collectQuestionFns[question.type](question.position, template);

      console.log(wibble1);
      question.data = wibble1;
    });

    return questions;
  },

  validateQuestions: function(questions) {
    var errors = [];
    var allErrors = [];

    _.each(questions, function(question) {

      errors = validateQuestionFns[question.type](question);
      if (errors.length > 0) {
        allErrors = allErrors.concat(errors);
      }
    });

    return allErrors;

  },

  createQuestions: function(id, questions) {
    // var position = 1;
    // var questionNo = 1;
    _.each(questions, function(question) {

      /* if (question.type == 'section') {
        questionNo = 0;
      } */

      createQuestionFns[question.type](id, question, position, questionNo);

    /*  position = position + 1;
      questionNo = questionNo + 1;

      */
    });

  },

  updateQuestions: function(id, questions) {
    /* delete the questions on the server as some of them may have
       been deleted at the client */

       Meteor.call('deleteQuestions', id);

       var position = 1;
       var questionNo = 1;
       _.each(questions, function(question) {

         if (question.type == 'section') {
           questionNo = 0;
         }

         createQuestionFns[question.type](id, question, position, questionNo);

         position = position + 1;
         questionNo = questionNo + 1;

       });




  }

}
