$(function() {
	$("body").prepend('<a href="http://officeofstrategicinfluence.com/spam/" style="position:absolute;left:-1000px;top:-1000px;">This link kills spam</a>');
	$("#header").html('<div style="display:inline-block;"><table><tr><td><a href="."><img src="/Pictures/logotext.png" alt="BronyTV" id="mane"></a></td><td style="display:inline;"><table><tr><td><span class="streaming"><span style="margin-top:10px;">Now Streaming: </span><span class="streamer" style="padding: 0; margin: 0;" id="nowplaying">Loading</span></span></td></tr><tr><td><div style="display:inline;"><ul class="nav"><li id="stream"><a href="stream.html">Stream</a></li><li id="about"><a href="about.html">About Us</a></li><li id="rules"><a href="rules.html">Rules</a></li><li id="contact"><a href="contact.html">Contact Us</a></li></ul></div></td></tr></table></td></tr></table></div>');
	$("body").append('<div class="container" id="copyright">My Little Pony: Friendship is Magic is &copy; Hasbro. All creations are &copy; to their respective artists. All songs and videos are property of their respective artists.<br />Site content &copy; 2011-2014 BronyTV. All rights reserved.</div>');
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
