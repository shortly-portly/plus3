var validateUser = {
  message: "This value is not value",
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    email: {
      validators: {
        notEmpty: {}
      }
    },
    password: {
      validators: {
        notEmpty: {}
      }
    },
    firstName: {
      validators: {
        notEmpty: {
          message: "What! you don't have a first name"
        }
      }
    },
    surname: {
      validators: {
        notEmpty: {}
      }
    }
  }
}


var createReview = function(user) {

  console.log("Creating Review for ...");
  console.log(user);

  var data = [];
  Appraisals.find({
    status: 'published'
  }).forEach(function(appraisal) {
    console.log("found an appraisal...");
    data = [];

    Questions.find({
      appraisal: appraisal._id
    }).forEach(function(question) {
      data[question.questionNo] = question.default;
    });

    Reviews.insert({
      user: user,
      appraisal: appraisal._id,
      data: data,
      status: "open"
    });
  })
};








Template.newUser.events({
  'click .createUser': function(evt, template) {
    evt.preventDefault();
    var errors = [];

    data = {
      email: template.find("input[name=email]").value,
      password: template.find("input[name=password]").value,
      profile: {
        firstName: template.find("input[name=firstName]").value,
        surname: template.find("input[name=surname]").value,
        role: template.find("input[name=role]").checked
      }
    };

    var wibble = $('.newUser').data('bootstrapValidator');

    if (!wibble.isValid()) {
      return
    };



    if (data.role) {
      data.role = "admin";
    } else {
      data.role = "";
    }

    if (errors.length > 0) {
      FlashMessages.sendError(errors);
      return;
    } else {
      Meteor.call('createServerUser', data, function(error, result) {
        if (error) {
          FlashMessages.sendError("Error in creating user");
        } else {

          createReview(result);
          FlashMessages.sendInfo("User Created");
          Router.go('users');
        }
      });
    }




  }
});


Template.newUser.rendered = function() {
  $('.newUser').bootstrapValidator(validateUser)
}
