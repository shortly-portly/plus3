Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {
  name: 'home',
  waitOn: function() {
    return Meteor.subscribe('myReview');
  },
  fastRender: true,
  data: function() {
    var wibble = Reviews.find({
      user: Meteor.userId()
    });
    return {
      myData: Reviews.find({
        user: Meteor.userId()
      })
    };
  },
  action: function() {
    if (this.ready()) {
      this.render("home");
    }
  }
});

Router.route('/listPerformance', {
  name: 'listPerformance',
  waitOn: function() {
    return Meteor.subscribe('reviews');
  },
  data: function() {
    return {
      myData: Reviews.find({
        status: "closed"
      })
    };
  },
  action: function() {
    if (this.ready()) {
      this.render('listPerformance');
    }
  }
});

Router.route('/editPerformance/:_id', {
  name: 'editPerformance',
  waitOn: function() {

    return [Meteor.subscribe('reviews'), Meteor.subscribe("questions")];
  },
  data: function() {
    if (this.ready()) {

      review = Reviews.findOne({
        _id: this.params._id
      });

      return {
        questions: Questions.find({
          appraisal: review.appraisal
        }, {sort: [['position', 'asc']]}),
        review: Reviews.findOne({
          _id: this.params._id
        })
      };
    }
  },
  action: function() {

    if (this.ready()) {
      this.render("editPerformance");
    }
  }
});



Router.route('/viewPerformance/:_id', {
  name: 'viewPerformance',
  waitOn: function() {
    return [Meteor.subscribe('myReview', this.params._id), Meteor.subscribe("questions")];
  },
  data: function() {
    if (this.ready()) {

      review = Reviews.findOne({
        _id: this.params._id
      });

      return {
        questions: Questions.find({
          appraisal: review.appraisal
        }),
        review: Reviews.findOne(this.params._id)
      };
    }
  },
  action: function() {
    if (this.ready()) {
      this.render("viewPerformance");
    }
  }
});


Router.route('/admin', function() {
  this.render('admin');
});

Router.route('/users', function() {
  this.render('users');
});

Router.route('/password', function() {
  this.render('password');
});

Router.route('/newUser', {
  name: 'newUser',
  waitOn: function() {
    return Meteor.subscribe("questions");
  },
  action: function() {
    if (this.ready()) {
      this.render('newUser');
    }
  }
});

Router.route('/user/:_id', {
  name: 'wibble',
  waitOn: function() {
    return Meteor.subscribe('allUsers');
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  },
  action: function() {
    if (this.ready()) {
      this.render('editUser');
    }
  }
});

Router.route('/newAppraisalForm', {
  data: function() {
    return {
      mode: "new"
    }
  },
  action: function() {
    this.render('newAppraisalForm');
  }
});

Router.route('/editAppraisalForm/:_id', {
  name: 'editAppraisalForm',
  waitOn: function() {
    return [Meteor.subscribe('questions'), Meteor.subscribe('allAppraisalForms')];
  },
  data: function() {

    return {
      questions: Questions.find({
        appraisal: this.params._id
      }, {sort: [['position', 'asc']]}),
      appraisalForm: Appraisals.findOne(this.params._id),
      mode: "edit"
    };
  },
  action: function() {
    if (this.ready()) {
      this.render('newAppraisalForm');
    }
  }
});

Router.route('/showAppraisalForm/:_id', {
  name: 'showAppraisalForm',
  waitOn: function() {
    return [Meteor.subscribe('questions'), Meteor.subscribe('allAppraisalForms')];
  },
  data: function() {

    return {
      questions: Questions.find({
        appraisal: this.params._id
      }, {sort: [['position', 'asc']]}),
      appraisalForm: Appraisals.findOne(this.params._id)
    };
  },
  action: function() {
    if (this.ready()) {
      this.render('showAppraisalForm');
    }
  }
});

Router.route('/reviewAppraisalForm/:_id', {
  name: 'reviewAppraisalForm',
  waitOn: function() {
    return [Meteor.subscribe('questions'), Meteor.subscribe('allAppraisalForms')];
  },
  data: function() {

    return {
      questions: Questions.find({
        appraisal: this.params._id
      }),
      appraisalForm: Appraisals.findOne(this.params._id)
    };
  },
  action: function() {
    if (this.ready()) {
      this.render('reviewAppraisalForm');
    }
  }
});


Router.route('/listAppraisals', {
  name: 'listAppraisals',
  waitOn: function() {
    return [Meteor.subscribe('questions'), Meteor.subscribe('allAppraisalForms')];
  },
  data: function() {
    return {
      appraisals: Appraisals.find()
    };
  },
  action: function() {
    if (this.ready()) {
      this.render('listAppraisals');
    }
  }

});




Router.onBeforeAction(function() {
  // all properties available in the route function
  // are also available here such as this.params
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('logon');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    if (this.ready()) {

      this.next();
    }

  }
});
