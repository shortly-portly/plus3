Template.listAppraisals.events ({
  'click .showAppraisal': function(event) {
    event.preventDefault();

    if (this.status == "created") {
      Router.go('editAppraisalForm', {_id: this._id})
    } else {
      Router.go('showAppraisalForm', {_id: this._id})
    }
  },
  'click .reviewAppraisal': function(event) {
    event.preventDefault();

    Router.go('showAppraisalForm', {_id: this._id})
  }
})

Template.listAppraisals.helpers({
  created: function() {
    if (this.status == "created") {
      return true
    } else {
      return false
    };

  }
})
