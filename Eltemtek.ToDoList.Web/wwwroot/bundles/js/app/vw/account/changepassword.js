var apiUser = new app.api.account.User();

$(document)
    .on("click", '[data-button-update]', function (t) {
        var data = {
            Password: $("#txtPassword").val()
        };
        apiUser.update({
            Password: data.Password
        }, function (r) {
            console.log(r);
            if (r.Error)
                return;
                localStorage.setItem("Access-Token", r.Value.AccessToken);
                localStorage.setItem("Refresh-Token", r.Value.RefreshToken);
                localStorage.setItem("Email", data.Email);
                localStorage.setItem("UserName", r.Value.UserName);
                window.location.href = app.globals.root + "Home/NoteList";
        });

    });

$('[data-toggle="tooltip"]').tooltip();
$(".preloader").fadeOut();