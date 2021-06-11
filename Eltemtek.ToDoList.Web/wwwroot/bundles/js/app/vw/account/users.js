$.fn.extend({
    usersToolBar: function (o) {
        var _self = this;
        var _idAdd = app.utility.generateUUID();
        function _init() {
            $(_self).html('');
            $(_self).kendoToolBar({
                items: [
                    {
                        template: '<button id="' + _idAdd + '" type="button" class="k-button k-button-icontext k-grid-add"><i class="k-icon k-i-plus"></i>&nbsp;' + app.lang.AddNewRecord + '</button>',
                        overflow: "never",
                    }
                ]
            });
            $('#' + _idAdd).on('click', function () {
                if (o.addClick !== undefined && o.addClick !== null)
                    o.addClick();
            });
        }
        _init();
        return _self;
    },
});
app.comp.blocker.App.block();
app.comp.vw.breadcrumb.set({ title: app.lang.Users, subtitle: app.lang.User });

var viewMode = 0;
var roles = [];
var gridUser = null;
var apiRole = new app.api.system.Role();
var apiUser = new app.api.account.User();

var usersToolBar = $('#usersToolBar').usersToolBar({
    addClick: function () {
        showUser({ item: null });
    }
});

apiRole.list({ State: 1 }, function (r) {
    if (r.Error)
        return;
    for (let i = 0; i < r.Value.length; i++) {
        roles.push({ value: r.Value[i].Id, text: r.Value[i].LocalName });
    }
    loadUserGrid();
}, function (err) { app.comp.blocker.App.unblock(); });

function loadUserGrid() {
    gridUser = $("#gridUser").dataKendoGrid({
        permissions: {
            read: true,
            create: false,
            update: false,
            destroy: false,
        },
        dataSource: {
            api: apiUser,
            schema: {
                model: {
                    validationMessage: app.lang.ValidationMessage,
                    fields: {
                        Id: { type: "number", editable: false, nullable: false, defaultValue: null },
                        FullName: {
                            type: "string",
                            validation: { required: true },
                            column: { title: app.lang.FullName }
                        },
                        Email: {
                            type: "string",
                            validation: { required: true },
                            template: '<a href="mailto:#=Email#" target="_blank">#=Email#</a>',
                            column: { title: app.lang.Email }
                        },
                        RoleId: {
                            type: "number",
                            validation: { required: true },
                            column: { title: app.lang.Role, values: roles }
                        },
                        LanguageId: {
                            type: "number",
                            validation: { required: true },
                            //column: { title: app.lang.Language, values: app.lang.list }
                        },
                        AccessLevel: {
                            type: "number",
                            defaultValue: 1,
                            validation: { required: true },
                            //column: { title: app.lang.AccessLevel, values: app.parameters.AccessLevel }
                        },
                        State: {
                            type: "number",
                            defaultValue: 1,
                            validation: { required: true },
                            column: { title: app.lang.State, values: app.parameters.State }
                        }
                    }
                }
            }
        },
        commandColumnsWidth: '160px',
        commandColumns: [
            { template: '<a role="button" class="k-button k-button-icon k-grid-reset-password" href="javascript:void(0)" title="' + app.lang.ResetPassword + '"><span class="k-icon k-i-password"></span></a>' },
            { template: '<a role="button" class="k-button k-button-icon k-grid-edt" href="javascript:void(0)" title="' + app.lang.Edit + '"><span class="k-icon k-i-edit"></span></a>' },
            { template: '<a role="button" class="k-button k-button-icon k-grid-del" href="javascript:void(0)" title="' + app.lang.Delete + '"><span class="k-icon k-i-close"></span></a>' }
        ],
        filterable: { mode: "row" },
        serverPaging: true,
        always: function () {
            app.comp.blocker.App.unblock();
        }
    }).data('kendoGrid');
    gridUser.element.on('click', '.k-grid-reset-password', 'click', function (e) {
        e.preventDefault(); //prevent page scroll reset
        var tr = $(e.target).closest("tr"); //get the row for deletion
        var item = gridUser.dataItem(tr);
        showResetPassword({ item: item });
    });
    gridUser.element.on('click', '.k-grid-edt', 'click', function (e) {
        e.preventDefault(); //prevent page scroll reset
        var tr = $(e.target).closest("tr"); //get the row for deletion
        var item = gridUser.dataItem(tr);
        showUser({ item: item });
    });
    gridUser.element.on('click', '.k-grid-del', 'click', function (e) {
        e.preventDefault(); //prevent page scroll reset
        var tr = $(e.target).closest("tr"); //get the row for deletion
        var data = gridUser.dataItem(tr);
        Swal.fire({
            title: app.lang.DeleteDialogText !== undefined ? app.lang.DeleteDialogText : app.kendo.lang.DeleteDialogText,
            //text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: app.lang.Yes !== undefined ? app.lang.Yes : app.kendo.lang.Yes,
            cancelButtonText: app.lang.No !== undefined ? app.lang.No : app.kendo.lang.No
        }).then((result) => {
            if (result.value) {
                let p = { Id: data.Id };
                /* o={api:null,apiMethod:"",apiValueTransferMethod:"",e:e,p:null,done:null,fail:null,always:null} */
                app.kendo.grid.api.destroy({
                    api: apiUser,
                    apiMethod: app.kendo.grid.api.def.method.destroy,
                    apiValueTransferMethod: app.kendo.grid.api.def.method.valueTransfer,
                    e: null, p: p,
                    done: function (evt) {
                        //
                    },
                    fail: function (evt) {
                        //
                    },
                    always: function () {
                        //
                    },
                    grid: gridUser,
                    data: data
                });
            }
        });
    });
}
function showUsers(o) {
    app.comp.vw.breadcrumb.SubTitle.hide();
    if (viewMode === 1) {
        $('#dvUser').fadeOut(50, function () {
            $('#dvUsers').fadeIn(500);
            $('#dvUser').html('');
        });
    } else if (viewMode === 2) {
        $('#dvResetPassword').fadeOut(50, function () {
            $('#dvUsers').fadeIn(500);
            $('#dvResetPassword').html('');
        });
    }
    viewMode = 0;
}
// o={item:null}
function showUser(o) {
    viewMode = 1;
    app.comp.vw.breadcrumb.set({ title: app.lang.Users, subtitle: app.lang.User });
    app.comp.vw.breadcrumb.SubTitle.show();
    $('#dvUsers').fadeOut(50);
    app.render.HTML({
        ctrl: "#dvUser",
        url: app.globals.dir + '/User',
        done: function () {
            $('#dvUser').fadeIn(500);
            var usr = new User({
                Id: o.item !== null ? o.item.Id : null,
                save: function (evt) {
                    if (evt.action === "add") {
                        gridUser.dataSource.add(evt.value);
                    }
                    else if (evt.action === "update") {
                        for (let key in evt.value) {
                            if (o.item[key] !== undefined && o.item[key] !== null)
                                o.item.set(key, evt.value[key]);
                        }
                    }
                    showUsers({});
                },
                close: function () {
                    showUsers({});
                }
            });
        }
    });
}
function showResetPassword(o) {
    viewMode = 2;
    app.comp.vw.breadcrumb.set({ title: app.lang.Users, subtitle: app.lang.ResetPassword });
    app.comp.vw.breadcrumb.SubTitle.show();
    $('#dvUsers').fadeOut(50);
    app.render.HTML({
        ctrl: "#dvResetPassword",
        url: app.globals.module + '/ResetPassword',
        done: function () {
            $('#dvResetPassword').fadeIn(500);
            var rp = new ResetPassword({
                Id: o.item !== null ? o.item.Id : null,
                save: function (evt) {
                    showUsers({});
                },
                close: function () {
                    showUsers({});
                }
            });
        }
    });
}