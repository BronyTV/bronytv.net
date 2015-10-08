$(function() {
//	console.log(window.location.pathname)
	if ( window.location.pathname == "/about.html" ) {
		$("#about").addClass("current_page_item");
	} else if ( window.location.pathname == "/stream.html" ) {
		$("#stream").addClass("current_page_item");
	} else if ( window.location.pathname == "/rules.html" ) {
		$("#rules").addClass("current_page_item");
	} else if ( window.location.pathname == "/schedule.html" ) {
		$("#schedule").addClass("current_page_item");
	} else if ( window.location.pathname == "/contact.html" ) {
		$("#contact").addClass("current_page_item");
	}
});
