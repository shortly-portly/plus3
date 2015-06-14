Template.newRadio.helpers({
  attributes: function(index) {

    console.log(this);

    var mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };

    if (this.options && this.options[index] && this.options[index].text) {
      console.log(this.options[index].text);
      value = this.options[index].text;
    } else {
      value = "";
    }

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
