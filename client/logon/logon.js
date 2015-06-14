Template.logon.events({
  'click .logon': function(evt, template) {
      evt.preventDefault();

      var email = template.find("input[name=email]");
      var password = template.find("input[name=password]");


      Meteor.loginWithPassword(email.value, password.value, function(error) {
        if (error) {
          FlashMessages.sendError("Faled to Logon");
        } else {
          Router.go('home');
        }
      });
  }

});
