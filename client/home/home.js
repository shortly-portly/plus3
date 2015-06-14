Template.home.helpers({
  open: function() {
    if (this.status === "open") {
      return true;
    } else {
      return false;
    }
  },
  appraisalTitle: function() {
    console.log("Appraisal Title");
    console.log(this);
    appraisal = Appraisals.findOne({_id: this.appraisal});
    console.log(appraisal);
    return appraisal.title;
  }
});
