Appraisals = new Meteor.Collection('appraisals');

Appraisals.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});
