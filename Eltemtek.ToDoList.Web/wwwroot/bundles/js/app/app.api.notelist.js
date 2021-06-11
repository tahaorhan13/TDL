app.api.notelist = {};
app.api.notelist.Note = function () {
    this.__proto__ = new app.api.Core("note", "Note");
    this.get = function (p, d, f, a) {
        this.send('List', p, d, f, a);
    };
    this.add = function (p, d, f, a) {
        this.send('Insert', p, d, f, a);
    };
    this.update = function (p, d, f, a) {
        this.send('Update', p, d, f, a);
    };
    this.update = function (p, d, f, a) {
        this.send('Delete', p, d, f, a);
    };
};