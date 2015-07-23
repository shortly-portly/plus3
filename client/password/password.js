Template.password.events({

  'click .changePassword': function(evt, template) {
    evt.preventDefault();
    console.log("changepassword called");
    var errors = [];

    var oldPassword = template.find("input[name=old-password]").value;
    var newPassword1 = template.find("input[name=new-password]").value;
    var newPassword2 = template.find("input[name=new-password2]").value;

    if (newPassword1 != newPassword2) {
      FlashMessages.sendError("Passwords don't match");
      return
    }

    Accounts.changePassword(oldPassword, newPassword1, function(error, result) {
      if (error) {
        FlashMessages.sendError("Problem changing password.");
      } else {
        FlashMessages.sendError("Password changed");
        Router.go('home');    
      }
    });



  }

})
