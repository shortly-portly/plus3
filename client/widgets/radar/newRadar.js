Template.newRadar.helpers({
  attributes: function(index) {

    var answer, words, value, mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };


    console.log("newRadar");
    console.log(this);
    if (this.options) {
      value = this.options[index]
    } else {
      value = null;
    };

    return {
      type: "text",
      readonly: mode,
      class: "form-control",
      name: "Q" + this.questionNo + "r" + index,
      placeholder: index + 1,
      value: value
    }


  }

});
