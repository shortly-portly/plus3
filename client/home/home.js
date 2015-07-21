Template.home.helpers({
  open: function() {
    if (this.status === "open") {
      return true;
    } else {
      return false;
    }
  },
  appraisalTitle: function() {
    appraisal = Appraisals.findOne({_id: this.appraisal});
    return appraisal.title;
  }
});
