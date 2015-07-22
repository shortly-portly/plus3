Template.editComment.helpers({
    attributes: function(user) {
      console.log(this);
      var user = Template.parentData(1).review.user;
      console.log(user);
      var mode = "readonly";
        if (Meteor.user() && Meteor.user().profile.role == 'admin') {
          if (Meteor.user()._id != user) {
            mode = null;
          }
        }

        console.log("readonly is...");
        console.log(mode);

      var comment;

      var review = Reviews.findOne({
        _id: Session.get('reviewId')
     });

     if (review && review.comment)  {
       value = review.comment
     } else {
       value = null;
     }



      return {
        class: "form-control",
        rows: "30",
        name: "comment",
        value: value,
        readonly: mode
      }

    }
});


Template.editComment.rendered = function() {

  var user = Template.parentData(1).review.user;


  if (Meteor.user() && Meteor.user()._id == user) {

      return;

  }

  var selector = "comment";
  /* $('#' + selector).ckeditor(); */

  CKEDITOR.replace( selector, {
    // Define the toolbar groups as it is a more accessible solution.
  /*  toolbar:  [
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] },

      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent' ] },
      { name: 'insert', items: [  'Table', 'HorizontalRule', ] },
      { name: 'styles'},
      '/',
      { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      { name: 'others', items: [ '-' ] },

    ], */

    // Toolbar groups configuration.
    toolbarGroups:  [
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
      { name: 'forms' },
      '/',
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
      { name: 'links' },
      { name: 'insert' },
      '/',
      { name: 'styles' },
      { name: 'colors' },
      { name: 'tools' },
      { name: 'others' },
      { name: 'about' }
    ]
  }
  );
  CKEDITOR.config.skin = "office2013";
  CKEDITOR.config.removePlugins = 'elementspath';
  CKEDITOR.config.resize_enabled = false;
  CKEDITOR.config.height = 100;

}
