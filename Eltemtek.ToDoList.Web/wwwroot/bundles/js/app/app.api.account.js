app.api.account = {};
app.api.account.User = function () {
    this.__proto__ = new app.api.Core("account", "User");
    this.get = function (p, d, f, a) {
        this.send('Get', p, d, f, a);
    };
    this.add = function (p, d, f, a) {
        this.send('Add', p, d, f, a);
    };
    this.update = function (p, d, f, a) {
        this.send('Update', p, d, f, a);
    };
};
app.api.account.Auth = function () {
    this.__proto__ = new app.api.Core("account", "Auth");
    this.login = function (p, d, f, a) {
        this.send('Login', p, d, f, a);
    };
    this.createtokenbyrefreshtoken = function (p, d, f, a) {
        this.send('CreateTokenByRefreshToken', p, d, f, a);
    };
    this.revokerefreshtoken = function (p, d, f, a) {
        this.send('RevokeRefreshToken', p, d, f, a);
    };
};