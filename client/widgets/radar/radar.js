Template.radar.rendered = function() {

  var name = this.data.name;
  var data;
  var answer = Reviews.findOne({_id: Session.get('reviewId')});
  if (answer) {
    data = _.values(answer.data[this.data.position])

  } else {

    data = _.range(0, this.data.options.length, 0);
  }

  var data = {

    labels: this.data.options,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(255,0, 0,0.2)",
            strokeColor: "rgba(255, 0, 0, 0.9);",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data
        }
    ]
  };

  var options = {scaleShowLabels : true,
  pointLabelFontSize: 12};

  Chart.defaults.global.scaleOverride = true;
  Chart.defaults.global.scaleSteps = 10;
  Chart.defaults.global.scaleStepWidth = 1;

  ctx = document.getElementById("Q" + this.data.questionNo).getContext("2d");
  myRadarChart = new Chart(ctx).Radar(data, options);

  Radar[this.data.name] = myRadarChart;
  this.data.radar = myRadarChart;


};


Template.radar.events({
  'click': function(evt,template) {


  if (Session.get('mode') == 'edit') {
      var activePoints = template.data.radar.getValue(evt);
      var w = template.data.radar.getData();
    }

  }
});
