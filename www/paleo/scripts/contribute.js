// $(document).ready(function(){
(function(){

// ============= From json-edit =================   
  // This is the starting value for the editor
  // We will use this to seed the initial editor 
  // and to provide a "Restore to Default" button.


  // Initialize the editor
  var editor = new JSONEditor(document.getElementById('editor_holder'),{
    // Enable fetching schemas via ajax
    ajax: true,  
    // The schema for the editor
    schema: {
      $ref: "json/recipe.json-schema"
    },        
    // Seed the form with a starting value
    // startval: starting_value
  });

  // // Hook up the submit button to log to the console
  // document.getElementById('submit').addEventListener('click',function() {
  //   // Get the value from the editor
  //   console.log(editor.getValue());
  // });



  // Hook up the validation indicator to update its 
  // status whenever the editor changes
  editor.on('change',function() {
    // Get an array of errors from the validator
    var errors = editor.validate();
    
    var indicator = document.getElementById('valid_indicator');
    
    // Not valid
    if(errors.length) {
      indicator.className = 'label alert';
      indicator.textContent = 'not valid';
    }
    // Valid
    else {
      indicator.className = 'label success';
      indicator.textContent = 'valid';
    }
  });



// ============= MY CODE =================	

  // var starting_data = $.get("json/empty_recipe.json",function(data) { return data });
  

  // function load_starting_data() {
  //   $.get("json/empty_recipe.json",function(data) {
  //     editor.setValue(data);
  //   })
  // };
  var starting_data;

  function load_starting_data() {
    
    if (!starting_data) {
      $.get("json/empty_recipe.json",function(data) { 
        // alert("not defined");
        starting_data = data;
        editor.setValue(starting_data);
        // console.log(starting_data);
      });
    } else {
      // alert("already defined");
      editor.setValue(starting_data);
    }
  };


// Utility functions	
	function setupUI(){
		$('#submit_json').prop('disabled', false);
    $('#email_sent_alert').hide(); 
    $('#inputName').val("");
    $('#inputEmail').val("");
    };

    function validate_form() {
        var isValid = $("#inputEmail").val().length != 0 ? true : false;
        if (!isValid){ // FORM VALIDATION FAILED
            alert('Email is required');
        return false;
        } else { //FORM VALIDATION SUCCEEDED, validate the reCAPTCHA
            // captcha.show();
            return true;
        }        
    };

    // Listeners
    $('#submit_captcha').click(function(){
      	$('#captcha').toggle();
      	// Get the UI right
      	setupUI();
    });        


      $('#new_form').confirmation({
        title: "Erase data?",
        onConfirm: function() { 
          load_starting_data();
        },
        onCancel: function() { }
      });      


  	$('#submit_json').click(function(){    	
    	if (validate_form()) {
	    	// if successful
	    	var emailObj = {};
	    	emailObj.name = $('#inputName').val();
	    	emailObj.email = $('#inputEmail').val();
	    	emailObj.jstr = JSON.stringify(editor.getValue());
	    	console.log(emailObj);
	    	$.post("send_email.php", emailObj, function(res){ 
	    		var _alert = $('#email_sent_alert');
	    		_alert.slideDown();
	    		$('.alert').text(res);
	    	});
   		};
  	});  
    
    // Initializers
    $('#captcha').hide();
    load_starting_data();



    // load_starting_data();
}).call(this);
  // $('#email_sent_alert').hide();
//});



