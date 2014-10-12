(function(){
    // Register event Listeners
    $('#submit_captcha').click(function(){
        $('#captcha').toggle();
    });        
      
    $('#new_form').confirmation({
      title: 'Erase data?',
      onConfirm: function() { 
        if (p.editor.ready) { p.load_starting_data(); }
      },
      onCancel: function() { }
    });      

    $('#push_json').click( p.post_recipe );
    $('#save_json').click( p.save_recipe_to_local_storage );
    $('#load_json').click( p.load_recipe_from_local_storage );

        
  // Initializers
  $('#captcha').hide();
  $('#submit_json').prop('disabled', false);
  $('#email_sent_alert').hide();  


}).call(this);

