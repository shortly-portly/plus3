var validateUser = function(data) {
  var errors = [];
  if (!data.email) {
    errors.push("please enter an email address");
  }

  if (!data.profile.firstName) {
    errors.push("please enter a first name");
  }

  if (!data.profile.surname) {
    errors.push("please enter a surname");
  }

  return errors;
};


Template.editUser.helpers({
  userEmail: function() {
    return this.emails[0].address;
  },
  userAdmin: function() {
    if (this.profile.role === "admin") {
      return true;
    } else {
      return false;
    }
  }

});

Template.editUser.events({
  'click .updateUser': function(evt, template) {
    event.preventDefault();
    var errors = [];

    data = {
      id: this._id,
      email: template.find("input[name=email]").value,
      profile: {
        firstName: template.find("input[name=firstName]").value,
        surname: template.find("input[name=surname]").value,
        role: template.find("input[name=role]").checked
      }
    };

    errors = validateUser(data);


    if (data.role) {
      data.role = "admin";
    } else {
      data.role = "";
    }

    if (errors.length > 0) {
      FlashMessages.sendError(errors);
      return;
    } else {
      Meteor.call('updateServerUser', data, function(error, result) {
        if (error) {
          FlashMessages.sendError("Error in creating user");
        }
      });
    }

    FlashMessages.sendInfo("User Updated");

  }
});
