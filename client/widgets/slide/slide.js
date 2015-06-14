Template.slide.rendered = function() {

  var answer = Reviews.findOne({_id: Session.get('reviewId')});
  var start;
  var selector = "." + 'Q' + this.data.questionNo;

  if (answer) {
    start = [ answer.data[this.data.questionNo] ]
  } else {
    start = 50;
  }

  $(selector).noUiSlider({
    start: start,
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
