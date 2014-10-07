(function(){
	"use strict";
	$(".navbar-nav a").smoothScroll();
	$("#footerContent").load("../partials/footer.html"); 
	$(".popoverOption").popover({ trigger: "hover focus" });
}).call(this);
