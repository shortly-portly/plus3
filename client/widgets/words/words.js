Template.words.helpers({
  attributes: function(index) {

    var answer, words, value, mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };


    answer = Reviews.findOne({
      _id: Session.get('reviewId')
    });

    if (answer) {
      words = answer.data[this.position];

      if (words && words[index]) {
        value = words[index];
      }
    } else {
      value = null;
    }

    var attr =
    {
      type: "text",
      readonly: mode,
      class: "form-control",
      name: "Q" + this.position + "w" + index,
      placeholder: index + 1,
      value: value
    }

    console.log("attr...");
    console.log(attr);
    return attr;


  }

});
