var apiUser = new app.api.account.User();

$(document)
    .on("click", '[data-button-registers]', function (t) {
        var data = {
            Name: $("#txtName").val(),
            Surname: $("#txtSurname").val(),
            Email: $("#txtEmail").val(),
            Password: $("#txtPassword").val()
        };
        apiUser.add({
            Name: data.Name,
            Surname: data.Surname,
            Email: data.Email,
            Password: data.Password
        }, function (r) {
            console.log(r);
            if (r.Error)
                return;
            window.location.href = app.globals.root + "Home/Login";
        });

    });
//$('[data-toggle="tooltip"]').tooltip();
//$(".preloader").fadeOut();
//$('#to-recover').on("click", function () {
//    $("#loginform").slideUp();
//    $("#recoverform").fadeIn();
//});
