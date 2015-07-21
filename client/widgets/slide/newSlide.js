Template.newSlide.helpers({
  attributes: function(name) {

    return {
      class: "form-control",
      name: "Q" + this.position + "-" + name,
      placeholder: name,
      value: this[name]

    }

  }

});
