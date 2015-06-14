Template.radar.rendered = function() {

  var name = this.data.name;
  var answer = Reviews.findOne({_id: Session.get('reviewId')});

  var data = {

    labels: this.data.options,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(215, 31, 44, 0.9);",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.values(answer.data[this.data.questionNo])
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
