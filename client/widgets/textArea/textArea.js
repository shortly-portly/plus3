Template.textArea.helpers({
    attributes: function() {

      
      var value;

      var answer = Reviews.findOne({
        _id: Session.get('reviewId')
     });

     // if we revewing the appraisal form then there
     // won't be any answers associated with it.

     if (answer) {
       value = answer.data[this.questionNo]
     } else {
       value = null;
     }

      if (Session.get('mode') == 'view') {
        var mode = 'readonly'
      };

      return {
        readonly: mode,
        class: "form-control",
        name: "Q" + this.questionNo,
        rows: "5",
        value: value
      }

    }
});
