Template.words.helpers({
  attributes: function(index) {

    var answer, words, value, mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };

    var wibble = Session.get('reviewId');
    console.log("review Id");
    console.log(wibble);

    answer = Reviews.findOne({
      _id: Session.get('reviewId')
    });

    console.log("words attributes...answer....");
    console.log(answer);


    words = answer.data[this.questionNo];

    if (words && words[index]) {
      value = words[index];
    }


    var attr =
    {
      type: "text",
      readonly: mode,
      class: "form-control",
      name: "Q" + this.questionNo + "w" + index,
      placeholder: index + 1,
      value: value
    }

    console.log("attr...");
    console.log(attr);
    return attr;


  }

});
