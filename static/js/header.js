$(document).ready(function() {
    var id;
	switch (window.location.pathname) {
        case '/':
            id = 'home';
            break;
        default:
            id = window.location.pathname.substring(1);
            break;
    }

    $("#nav-" + id).addClass("active");
});
