Template.users.helpers({
  wibble: function() {
    return Meteor.users.find();
  }
});

Template.users.events({
  'click .newUser': function(evt) {
    event.preventDefault();
    Router.go('newUser');

  }

});
