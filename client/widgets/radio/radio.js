Template.radio.helpers({
  isActive: function(value) {

    var answer = Reviews.findOne({_id: Session.get('reviewId')});
    var name = Template.parentData(1).name;

    if (!answer) {
      return false
    };

    if (value == answer.data[Template.parentData(1).position]) {
      return true;
    } else {
      return false;
    }
  },

  disabled: function() {

    if (Session.get('mode') === "view") {
      return "disabled";
    } else {
      return;
    }
  },
  radioName: function() {
    return Template.parentData(1).name;
  }
});
