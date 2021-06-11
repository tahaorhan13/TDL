$.fn.extend({
    // o={change:null}
    moduleBox: function (o) {
        var _self = this;
        var _apiModule = new app.api.system.Module();
        var _ddlModule = null;
        this.getValue = function () {
            return parseInt(_ddlModule.value());
        };
        function _triggerChange() {
            if (o.change != undefined && o.change != null) {
                o.change({ Id: parseInt(_ddlModule.value()) });
            }
        }
        function _init() {
            _ddlModule = $(_self).kendoDropDownList({
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    transport: {
                        read: function (e) {
                            var p = {State:1};
                            _apiModule.list(p, function (r) {
                                if (r.Error) {
                                    e.error();
                                    return;
                                }
                                var index = 0;
                                e.success(r.Value);
                                if (r.Value.length > 0) {
                                    _ddlModule.select(index);
                                }
                                _triggerChange();
                            }, function (err) { }, function () { });
                        }
                    }
                },
                change: function () {
                    _triggerChange();
                }
            }).data('kendoDropDownList');
        }
        _init();
        return _self;
    },
});
app.comp = {};
app.comp.blocker = {
    App: {
        block: function () {
            $('body').block({
                message: '<i class="fas fa-spin fa-sync text-black"></i>',
                //timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.5,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        },
        unblock: function () {
            $('body').unblock();
        }
    },
    MainContent: {
        block: function () {
            $('#main-content').block({
                message: '<i class="fas fa-spin fa-sync text-black"></i>',
                //timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.5,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        },
        unblock: function () {
            $('#main-content').unblock();
        }
    },
    SideBarNav: {
        block: function () {
            $('#sidebarnav').parent().parent().block({
                message: '<i class="fas fa-spin fa-sync text-white"></i>',
                //timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.5,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        },
        unblock: function () {
            $('#sidebarnav').parent().parent().unblock();
        }
    },
    Div: {
        block: function (id) {
            $('#' + id).block({
                message: '<i class="fas fa-spin fa-sync text-black"></i>',
                //timeout: 2000, //unblock after 2 seconds
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.5,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        },
        unblock: function (id) {
            $('#' + id).unblock();
        }
    }
};
app.comp.vw = {
    breadcrumb: {
        // o ={title:null, subtitle:null}
        set: function (o) {
            $('#linkApp').html(app.lang[app.globals.module]);
            $('#uiTitle').html(o.title);
            $('#uiSubTitle').html(o.subtitle);
        },
        SubTitle: {
            show: function () {
                $('#uiTitle').removeClass('active');
                $('#uiSubTitle').addClass('active');
                $('#uiSubTitle').show();
            },
            hide: function () {
                $('#uiSubTitle').removeClass('active');
                $('#uiTitle').addClass('active');
                $('#uiSubTitle').hide();
            }
        },
    },
};