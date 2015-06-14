Template.newWords.helpers({
  attributes: function(index) {

    var answer, words, value, mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };


    return {
      type: "text",
      readonly: mode,
      class: "form-control",
      name: "Q" + this.questionNo + "r" + index,
      placeholder: index + 1,

    }


  }

});
