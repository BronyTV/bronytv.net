$(document).ready(function(){
	var div=$("div.chatbox");
	var div1=$("div.video");

  $("#button1").click(function(){
	div.hide("slow");
	div1.animate({marginLeft: div1.parent().width() / 2 - div1.width() / 2}, "slow");
	$("#button1").css({"display":"none"});
	$("#button2").css({"display":"inline"});
  });
  $("#button2").click(function(){
	div.show("slow");
	div.css({"display":"inline"});
	div1.animate({marginLeft:'0px'}, "slow");
	$("#button1").css({"display":"inline"});
	$("#button2").css({"display":"none"});
  });
  $('#rariface').click(function(){
	$('#rariface').fadeOut('slow');
	$('#raribox').fadeOut('slow');
	$('#newstext').fadeOut('slow');
	$('#runCat').fadeOut('slow');
	$('#newsbutton').fadeIn('slow');
	});
  
 $('#newsbutton').click(function(){
	$('#rariface').show('slow');
	$('#raribox').show('slow');
	$('#runCat').show('slow');
	$('#newstext').show('slow');
	$('#newsbutton').fadeOut('slow');
	});

});