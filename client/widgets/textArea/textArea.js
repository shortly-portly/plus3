Template.textArea.helpers({
    attributes: function() {

      var answer = Reviews.findOne({
        _id: Session.get('reviewId')
     });

      if (Session.get('mode') == 'view') {
        var mode = 'readonly'
      };

      return {
        readonly: mode,
        class: "form-control",
        name: "Q" + this.questionNo,
        rows: "5",
        value: answer.data[this.questionNo]
      }

    }
});
