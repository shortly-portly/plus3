Template.slide.rendered = function() {

  var answer = Reviews.findOne({_id: Session.get('reviewId')});

  var selector = "." + 'Q' + this.data.questionNo;

  $(selector).noUiSlider({
    start: [ answer.data[this.data.questionNo] ],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
    }
  });

  if (Session.get('mode') == "view") {
    $(selector).attr('disabled', 'disabled');
  }

};

Template.slide.helpers({
  name: function() {
    return 'Q' + this.questionNo;
  }
});
