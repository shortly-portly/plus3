
Template.viewPerformance.created = function() {
  Session.set("reviewId", this.data.review._id);
  Session.set("mode", "view");
};
