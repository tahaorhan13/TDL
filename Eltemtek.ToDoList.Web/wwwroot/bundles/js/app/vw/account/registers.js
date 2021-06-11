var apiUser = new app.api.account.User();

$(document)
    .on("click", '[data-button-register]', function (e) {
        window.location.href = app.globals.root + "Home/Register";
    });