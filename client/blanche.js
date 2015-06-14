if (Meteor.isClient) {
  Radar = {};

  Meteor.subscribe('allUsers');
  Meteor.subscribe('allAppraisalForms');
  Meteor.subscribe('reviews');

}
