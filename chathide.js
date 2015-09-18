$(document).ready(function(){
	var div=$("div.chatbox");
	var div1=$("div.video");
	var note=$("#chatnote");
	

	$("#button1").click(function(){
		div.hide("slow");
		note.hide("slow");
		div1.animate({marginLeft: div1.parent().width() / 2 - div1.width() / 2}, "slow");
		$("#button1").css({"display":"none"});
		$("#button2").css({"display":"inline"});
	});

	$("#button2").click(function(){
		div.show("slow");
		div.css({"display":"inline"});
		note.show("slow");
		div1.animate({marginLeft:'0px'}, "slow");
		$("#button1").css({"display":"inline"});
		$("#button2").css({"display":"none"});
	});
	/*
	$("#chatChange").click(function(){
		document.getElementById("chat").src = "https://discordapp.com/widget?id=81387914189078528&theme=dark";
		$("#chatChange").css({"display":"none"});
		$("#chatBack").css({"display":"inline"});
	})
	
	$("#chatBack").click(function(){
		document.getElementById("chat").src = "http://widget.mibbit.com/?settings=d2d6e7c12d525cd95acc5ca9a9e50df6&server=irc.canternet.org&channel=%23bronytv&amp;nick=NewFoal%3F%3F%3F";
		$("#chatChange").css({"display":"inline"});
		$("#chatBack").css({"display":"none"});
	})
	*/
});
