Template.newRadio.helpers({
  attributes: function(index) {

    var mode

    if (Session.get('mode') == 'view') {
      mode = true;
    };

    if (this.options && this.options[index] && this.options[index].text) {
      value = this.options[index].text;
    } else {
      value = "";
    }

    return {
      type: "text",
      readonly: mode,
      class: "form-control",
      name: "Q" + this.position + "r" + index,
      placeholder: index + 1,
      value: value

    }


  }

});
