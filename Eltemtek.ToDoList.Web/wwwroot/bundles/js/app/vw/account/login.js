var apiAuth = new app.api.account.Auth();
$(document)
    .on("click", '[data-button-login]', function (e) {
        var data = {
            Email: $("#txtEmail").val(),
            Password: $("#txtPassword").val()
        };
        apiAuth.login({ Email: data.Email, Password: data.Password }, function (r) {
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
$('#to-recover').on("click", function () {
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
});
