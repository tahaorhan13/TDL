var url = decodeURI(window.location.href);
var index = null;
if (url.indexOf('Index') >= 0)
    index = 'Index'
if (index !== null) {
    window.location.href = app.globals.root;
} else if (window.location.pathname.length > 1 && window.location.hash === '') {
    window.location.href = window.location.origin + '/#' + window.location.pathname;
}