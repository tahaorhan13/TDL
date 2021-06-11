app.singlePage = {};
app.singlePage.load = function (documentReady) {
    var url = decodeURI(window.location.hash);
    if (url !== '') {
        if (url.lastIndexOf('/') <= 1)
            return;
        $('#main-content').fadeOut(50);
        app.render.HTML({
            ctrl: "#main-content",
            url: url.substr(2),
            done: function () {
                $('#main-content').fadeIn(500);
                $('a.sidebar-link').removeClass("active");
                $('a[href="' + url + '"]').addClass("active");
            }
        });
    }
};
$(window).on('hashchange', function () {
    app.singlePage.load();
});
$(document).ready(function () {
    app.singlePage.load(true);
});