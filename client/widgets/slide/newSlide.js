Template.newSlide.helpers({
  attributes: function(name) {

    console.log(this[name]);

    return {
      class: "form-control",
      name: "Q" + this.questionNo + "-" + name,
      placeholder: name,
      value: this[name]

    }

  }

});
