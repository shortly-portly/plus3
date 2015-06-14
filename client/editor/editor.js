

Template.editor.rendered = function() {

  var selector = "editor" + this.data.questionNo;
  /* $('#' + selector).ckeditor(); */

  CKEDITOR.replace( selector, {
    // Define the toolbar groups as it is a more accessible solution.
    toolbar:  [
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] },

      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent' ] },
      { name: 'insert', items: [  'Table', 'HorizontalRule', ] },
      '/',
      { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      { name: 'others', items: [ '-' ] }
    ],

    // Toolbar groups configuration.
  /*  toolbarGroups:  [
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
    ] */
  }
  );
  CKEDITOR.config.skin = "office2013";
  CKEDITOR.config.removePlugins = 'elementspath';
  CKEDITOR.config.resize_enabled = false;
  CKEDITOR.config.height = 100;

  console.log(this);

}
