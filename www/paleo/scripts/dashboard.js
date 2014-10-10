"use strict";
// don't pollute the global namespace...
// paleo is a class: it has private variables like myArr and methods
var p = p || {};
// Local Variables
p.myArr = [];
p.firebase = new Firebase('https://scorching-fire-6816.firebaseio.com/');

// Factories = Listners
p.show_fb = function() {    
    p.firebase.on('child_added', p.on_post_added);
};

// Event Handlers
p.on_post_added = function(snapshot) {
    var newPost = snapshot.val();
    p.myArr.push(newPost.user);
};

// }).call(this);