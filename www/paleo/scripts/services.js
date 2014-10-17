// p (for paleo) is an object that has private variables (like myArr) and methods
// alternative is to define a class Paleo then have an instance of it like var p = new Paleo();
var p = p || {};
'use strict'

  

  // ----------------------- 
  // Constants
  // -----------------------

  p.FIREBASE_BASE_URL = 'https://scorching-fire-6816.firebaseio.com/';

  // -----------------------
  // Variables
  //-----------------------

  p.recipes = [];
  // p.starting_data = null; // start with null
  ($.get('json/empty_recipe.json',function(data) {
    p.start_editor(data);
    p.starting_data = data;
  }));

  p.firebaseMain = new Firebase(p.FIREBASE_BASE_URL); 
  p.firebase = p.firebaseMain.child('paleoApp/userRecipes');

  // -----------------------
  // Services
  // -----------------------

  // Services can querry the DOM (since it contains data). Services shouldn't manipulate the DOM; 
  //  that's the job of a controller.
  // Better would be to get al the data off the DOM and into an object lile $scope.

  // Serve up the editor
  p.start_editor = function(data) {
    p.editor = new JSONEditor(document.getElementById('editor_holder'),{
      // Enable fetching schemas via ajax
      ajax: true,  
      // The schema for the editor
      schema: {
        $ref: 'json/recipe.json-schema'
      },        
      // Seed the form with a starting value
      startval: data
    });

    // Hook up the validation indicator to update its status whenever the editor changes
    p.editor.on('change',function() {
      // Get an array of errors from the validator
      var errors = p.editor.validate();
      
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
  }

  p.save_recipe_to_local_storage = function () { 
    window.localStorage['local.recipe'] = JSON.stringify( p.editor.getValue() );
    toastr.success('Recipe saved');
  }

  p.load_recipe_from_local_storage = function () { 
    var recipe = window.localStorage['local.recipe'];
    if(recipe) {
      p.editor.setValue( JSON.parse(recipe) );
      toastr.success('Recipe loaded');  
    } else {
      toastr.error('No recipe has been saved');
    }    
  }

  p.load_starting_data = function () { 
    p.editor.setValue(p.starting_data);
    toastr.success('New form started');
  }

  p.send_email = function() {      
    if (p.validate_form()) {
      // if successful
      var emailObj = {};
      emailObj.name = $('#inputName').val();
      emailObj.email = $('#inputEmail').val();
      emailObj.jstr = JSON.stringify(p.editor.getValue());
      console.log(emailObj);
      $.post('send_email.php', emailObj, function(res){ 
        var _alert = $('#email_sent_alert');
        _alert.slideDown();
        $('.alert').text(res);
        // toastr.success(res, 'Email:')
      });
    }
  }

  p.validate_form = function() {
      var isValid = $('#inputEmail').val().length !== 0 ? true : false;
      if (!isValid){ // FORM VALIDATION FAILED
        toastr.error('Email is required');
        return false;
      } else { //FORM VALIDATION SUCCEEDED, validate the reCAPTCHA
          // captcha.show();
          return true;
      }        
  }

  // Services for firebase

  p.post_recipe = function() { 
    var myRecipe = p.editor.getValue();
    var recipeKey = myRecipe['Recipe general information']['Recipe id'].toString();
    var myObj = {};
    myObj[recipeKey] = myRecipe;
    // p.firebase.set( myObj, function(){
    var newRecipeRef = p.firebase.push( myRecipe, function(error){ 
      var str;
      if (error) {
        _str = 'Recipe could not be saved. Error: ' + error;
        toastr.error( str, 'Database Save:') ;
      } else {
        str = 'Recipe saved as record: ' + newRecipeRef.name();
        toastr.success( str, 'Database Save:' );
      } 
    });
    // var recipeID = newRecipeRef.name();
  }

  p.get_recipes = function() {    
      p.firebase.on('child_added', p.on_recipe_received);
  }

  p.on_recipe_received = function(snapshot) {
      var newRecipe = snapshot.val();
      var myRecipe = JSON.parse(newRecipe);
      p.recipes.push( myRecipe ); 
      console.log('recipe received from firebase');
  }




