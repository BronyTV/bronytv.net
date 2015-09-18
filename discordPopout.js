$(document).ready(function () {
    $('#trigger').click(function () {
        if ($('#popout').hasClass('hidden')) {
            $('#popout').removeClass('hidden');
            showPopout();
        } else {
            $('#popout').addClass('hidden');
            hidePopout();
        }
    });

    function showPopout() {
        document.getElementById("discordPop").src = "https://discordapp.com/widget?id=81387914189078528&theme=dark";
        document.getElementById("discordPop").width = "300px";
        document.getElementById("discordPop").height = "400px";
		document.getElementById("mane").src = "/Pictures/rariLogo.png";
        $('#trigger').animate({
            right: 315
        }, 'slow');
    };

    function hidePopout() {
        document.getElementById("discordPop").src = "";
        document.getElementById("discordPop").width = "0";
        document.getElementById("discordPop").height = "0";
        $('#trigger').animate({
            right: 1
        }, 'slow');
    };
});