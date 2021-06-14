var apiAuth = new app.api.notelist.Note();
$(document)
    (function (e) {

        apiAuth.get(function (r) {
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


