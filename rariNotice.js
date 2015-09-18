$(document).ready(function(){


$('#rariface').click(function(){
	$('#rariface').fadeOut('slow');
	$('#raribox').fadeOut('slow');
	$('#newstext').fadeOut('slow');
	$('#newsbutton').show('slow');
	});
  
 $('#newsbutton').click(function(){
	$('#rariface').show('slow');
	$('#raribox').show('slow');
	$('#newstext').show('slow');
	$('#newsbutton').fadeOut('slow');
	});
});