Template.header.helpers({
  adminUser: function() {
    if (Meteor.user() && Meteor.user().profile.role == 'admin') {
      return true;
    }
  }
});

Template.header.events({
  'click .logout': function(evt, template) {
      event.preventDefault();

      Meteor.logout();
  },
  'click .newUser': function(evt) {
    event.preventDefault();
    Router.go('newUser');

  }

});

