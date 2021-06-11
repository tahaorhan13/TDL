$.fn.extend({
    // o={Id:null, Icon:null, Name:null, Description:null, RoutingUrl:null, State:null}
    moduleCard: function (o) {
        var _self = this;
        var _idCard = app.utility.generateUUID();
        var _idGoToModule = app.utility.generateUUID();
        function _init() {
            var html = '<div id="' + _idCard + '" class="card">'
                //+ '<img class="card-img-top img-fluid" src="' + app.globals.root + '/bundles/imgs/logo/app.ico" alt="Card image cap">'
                + '<span class="card-img-top img-fluid" style="font-size:100px;text-align:center;" ><i class="' + o.Icon + '"></i></span>'
                + '<div class="card-body">' + '<h4 class="card-title">' + o.Name + '</h4>'
                + '<p class="card-text">' + o.Description + '</p>'
                + '<a id="' + _idGoToModule + '" href="' + o.RoutingUrl + '" class="btn btn-primary">' + app.lang.GotoModule + '</a></div></div>';
            $(_self).html(html);
        }
        _init();
        return _self;
    },
    // o={values:null, rowCardCount:4}
    moduleCardBoard: function (o) {
        var _self = this;
        var rowCount = 1;
        function _init() {
            var index = 0;
            rowCount = Math.ceil(o.values.length / o.rowCardCount);
            for (let i = 0; i < rowCount; i++) {
                let rowId = app.utility.generateUUID();
                $(_self).append('<div id="' + rowId + '" class="row"></div>');
                for (let j = 0; j < o.rowCardCount; j++) {
                    //if (o.values[index].ModuleName === app.globals.module) {
                    //    index++;
                    //    continue;
                    //}
                    let colId = app.utility.generateUUID();
                    $('#' + rowId).append('<div id="' + colId + '" class="col-lg-3 col-md-6"></div>');
                    $('#' + colId).moduleCard({
                        Id: o.values[index].Id,
                        Icon: o.values[index].IconPath,
                        Name: app.lang[o.values[index].ModuleName],
                        Description: o.values[index].ModuleLocalDescription,
                        RoutingUrl: o.values[index].RoutingUrl
                    });
                    index++;
                    if (index === o.values.length)
                        break;
                }
            }
        }
        _init();
        return _self;
    },
});
app.comp.vw.breadcrumb.set({ title: app.lang.Modules });
app.comp.blocker.App.block();
var apiRole_Module = new app.api.system.Role_Module();
apiRole_Module.list({ UseUserRole: true }, function (r) {
    if (r.Error) {
        return;
    }
    $('#cardboard').moduleCardBoard({
        values: r.Value,
        rowCardCount: 4
    });
}, function (err) { }, function () {
        app.comp.blocker.App.unblock();
});