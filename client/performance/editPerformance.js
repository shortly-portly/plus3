var collectDataFns = {
  textArea: function(template, data) {
    var selector = "textarea[name=Q" + data.questionNo + "]";
    return template.find(selector).value;
  },
  words: function(template, data) {
    var description = [];
    for (i=0; i<5; i++) {
      find = "input[name=Q" + data.questionNo + "w" + i + "]";
      description[i] = template.find(find).value;
    }

    return description;
  },
  slide: function(template, data) {
    return $('.Q' + data.questionNo).val();
  },
  radio: function(template, data) {
    var selector = "input[name=" + data.name + "]:checked";
    return template.find(selector).value;
  },
  radar: function(template, data) {

    wibble = Radar[data.name].getData();

    var satisfaction = [];
    var satisfactionData = {};

    _.each(wibble.datasets[0].points, function(point) {
      satisfaction.push(point.value);
    });

    return satisfaction;
  }
};

var collectData = function(template) {

    var data = {};
    template.data.questions.forEach(function(question) {
      data[question.questionNo] = collectDataFns[question.type](template, question);
    });

    return data;
};

Template.editPerformance.helpers({
  title: function() {
    console.log(this);
    return Appraisals.findOne(review.appraisal).title;
  }
})
Template.editPerformance.events ({
  'click .saveReview': function(evt, template) {
    evt.preventDefault();


    var data = collectData(template);


    Reviews.update(this.review._id, {$set: {"data": data, "status": "open"}});

    FlashMessages.sendInfo("Review Saved");

  },

  'click .submitReview': function(evt, template) {
    evt.preventDefault();

    var data = collectData(template);
    Reviews.update(this.review._id, {$set: {"data": data, "status": "closed"}});
    console.log("review Id is....");
    console.log(Session.get('reviewId'));
    Router.go('viewPerformance', {_id: Session.get('reviewId')});
  }
});

Template.editPerformance.created = function() {

  Session.set("reviewId", this.data.review._id);
  Session.set("mode", "edit");

};
