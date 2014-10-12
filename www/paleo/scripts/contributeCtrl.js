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

  	$('#submit_json').click( p.send_email );
    $('#save_json').click( p.save_recipe_to_local_storage );
    $('#load_json').click( p.load_recipe_from_local_storage );

        
  // Initializers
  $('#captcha').hide();
  $('#submit_json').prop('disabled', false);
  $('#email_sent_alert').hide();  
  // toastr preferences
  // for options, see http://codeseven.github.io/toastr/demo.html
  toastr.options.timeOut = 3000; // How long the toast will display without user interaction
  // test if toastr options are working
  // toastr.options.onHidden = function() { console.log('toastr: goodbye'); } // yes
  
}).call(this);