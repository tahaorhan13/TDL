app.api = {
    Core: function (module, url) {
        this._url = app.globals.api + "/" + module + "/" + url;
        this.send = function (method, parameters, done, fail, always) {
            $.ajax({
                type: "POST",
                url: this._url + "/" + method,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Access-Token") },
                data: parameters !== undefined && parameters !== null ? JSON.stringify(parameters) : null,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function (result) { if (done !== undefined && done !== null) { done(result); } })
                .fail(function (error) {
                    //unauthorized error code
                    if (error.status === 401) {
                        //get new AccessToken by using RefreshToken                     
                        var accessDate = new Date(localStorage.getItem("AccessToken-Expiration"));
                        var refreshDate = new Date(localStorage.getItem("RefreshToken-Expiration"));

                        if (accessDate < Date.now() && Date.now() <= refreshDate) {
                            var apiAuth = new app.api.account.Auth();
                            apiAuth.createtokenbyrefreshtoken({ RefreshToken: localStorage.getItem("Refresh-Token") }, function (r) {
                                if (r.Error) {
                                    console.log("attı");
                                    localStorage.removeItem("Access-Token");
                                    localStorage.removeItem("Refresh-Token");
                                    localStorage.removeItem("Email");
                                    localStorage.removeItem("UserName");
                                    window.location.href = app.globals.root + "Account/Login";
                                    return;
                                }

                                //add the new tokens to localstorage
                                localStorage.setItem("Access-Token", r.Value.AccessToken);
                                localStorage.setItem("Refresh-Token", r.Value.RefreshToken);
                                localStorage.setItem("AccessToken-Expiration", r.Value.AccessTokenExpiration);
                                localStorage.setItem("RefreshToken-Expiration", r.Value.RefreshTokenExpiration);

                                //send the same request with new access token
                                $.ajax({
                                    type: "POST",
                                    url: app.globals.api + "/" + module + "/" + url + "/" + method,
                                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Access-Token") },
                                    data: parameters !== undefined && parameters !== null ? JSON.stringify(parameters) : null,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json"
                                }).done(function (result) { if (done !== undefined && done !== null) { done(result); } })
                                    .fail(function (error) { if (fail !== undefined && fail !== null) { fail(error); } })
                                    .always(function () { if (always !== undefined && always !== null) { always(); } });
                            });
                        }
                        else {

                            //send the same request with new access token
                            $.ajax({
                                type: "POST",
                                url: app.globals.api + "/" + module + "/" + url + "/" + method,
                                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Access-Token") },
                                data: parameters !== undefined && parameters !== null ? JSON.stringify(parameters) : null,
                                contentType: "application/json; charset=utf-8",
                                dataType: "json"
                            }).done(function (result) { if (done !== undefined && done !== null) { done(result); } })
                                .fail(function (error) { if (fail !== undefined && fail !== null) { fail(error); } })
                                .always(function () { if (always !== undefined && always !== null) { always(); } });
                        }


                    }
                })
                .always(function () { if (always !== undefined && always !== null) { always(); } });
        };
    }
};

async function CreatetokenbyRefreshtoken() {
    console.log('create by refershtoken içerisinde');

}