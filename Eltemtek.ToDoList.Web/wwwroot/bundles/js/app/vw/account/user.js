// o={Id:null, close:null, save:null}
var User = function (o) {
    var roleBox = null;
    var languageBox = null;
    var accessLevelBox = null;
    var stateBox = null;
    var apiUser = new app.api.account.User();
    // a={load:null}
    function loadRoles(a) {
        //app.comp.blocker.App.unblock();//!! kaldırılacak
        roleBox = $('#txtRole').kendoDropDownList({
            dataTextField: "LocalName",
            dataValueField: "Id",
            dataSource: {
                transport: {
                    read: function (e) {
                        new app.api.system.Role().list({ State: 1 }, function (r) {
                            if (r.Error) {
                                return;
                            }
                            e.success(r.Value);
                            if (a.load !== undefined && a.load)
                                a.load();
                        }, function (err) { }, function () { });
                    }
                }
            },
            change: function () {
                //loadCities({ CountryId: parseInt(countryBox.value()) });
            }
        }).data('kendoDropDownList');
    }
    // a={load:null}
    function loadUser(a) {
        apiUser.get({ Id: o.Id }, function (r) {
            if (r.Error) {
                Swal.fire(app.kendo.grid.api.getResultMessage(r));
                return;
            }
            for (let key in r.Value) {
                $('#txt' + key).val(r.Value[key]);
            }
            roleBox.value(r.Value.RoleId);
            languageBox.value(r.Value.LanguageId);
            accessLevelBox.value(r.Value.AccessLevel);
            stateBox.value(r.Value.State);
        }, function (errr) {
            //
        }, function () {
            app.comp.blocker.App.unblock();
            if (a.load !== undefined && a.load !== null)
                a.load();
        });
    }
    function init() {
        app.comp.blocker.App.block();
        $('#lblCardTitle').html(app.lang.UserInfo);
        $('#lblFullName').html(app.lang.FullName);
        $('#lblEmail').html(app.lang.Email);
        $('#lblPassword').html(app.lang.Password);
        $('#lblConfirmPassword').html(app.lang.ConfirmPassword);
        $('#lblRole').html(app.lang.Role);
        $('#lblLanguage').html(app.lang.Language);
        $('#lblAccessLevel').html(app.lang.AccessLevel);
        $('#lblState').html(app.lang.State);
        $('#btnSave').html(app.lang.Save);
        $('#btnClose').html(app.lang.Close);
        $('input[required="required"]').attr('placeholder', app.lang.ValidationMessage);

        if (o.Id !== undefined && o.Id !== null) {
            $('.password').hide();
            $('#btnSave').addClass('btn-info');
        } else {
            $('input[required="required"]').addClass('is-invalid');
            $('#btnSave').addClass('btn-outline-light');
        }
        languageBox = $('#txtLanguage').kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: app.lang.list,
            change: function () {
                //
            }
        }).data('kendoDropDownList');
        accessLevelBox = $('#txtAccessLevel').kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: app.parameters.AccessLevel,
            change: function () {
                //
            }
        }).data('kendoDropDownList');
        stateBox = $('#txtState').kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: app.parameters.State,
            change: function () {
                //
            }
        }).data('kendoDropDownList');
        $('input[required="required"]').on('keyup', function () {
            $(this).removeClass('is-invalid');
            $('#btnSave').removeClass('btn-outline-light btn-info');
            if ($(this).val() !== '') {
                $(this).addClass('is-valid');
            } else {
                $(this).addClass('is-invalid');
            }
            let id = $(this).attr('id');
            if (id === 'txtConfirmPassword') {
                if ($(this).val() !== $('#txtPassword').val()) {
                    $(this).addClass('is-invalid');
                }
            } else if (id === 'txtPassword') {
                $('#txtConfirmPassword').val('');
            }
            let len = $('.is-invalid').length;
            if (len > 0) {
                $('#btnSave').addClass('btn-outline-light');
            } else {
                $('#btnSave').removeClass('btn-outline-light');
                $('#btnSave').addClass(' btn-info');
            }
        });

        $('#btnSave').html(app.lang.Save);
        $('#btnClose').html(app.lang.Close);
        $('#btnClose').on('click', function () {
            if (o.close !== undefined && o.close !== null)
                o.close();
        });
        $('#btnSave').on('click', function () {
            if ($(this).hasClass("btn-outline-light"))
                return;
            app.comp.blocker.App.block();
            var p = {
                'Id': null,
                'State': null,
                'AccessLevel': null,
                'LanguageId': null,
                'RoleId': null,
                'Email': null,
                'FullName': null,
            };
            for (let key in p) {
                p[key] = $('#txt' + key).val();
            }
            p.Id = o.Id !== undefined && o.Id !== null ? o.Id : null;
            p.LanguageId = parseInt(languageBox.value());
            p.RoleId = parseInt(roleBox.value());
            p.AccessLevel = parseInt(accessLevelBox.value());
            p.State = parseInt(stateBox.value());

            let method = o.Id !== undefined && o.Id !== null ? 'update' : 'add';

            if (method === 'add')
                p.Password = $('#txtPassword').val();

            apiUser[method](p, function (r) {
                if (r.Error) {
                    Swal.fire(app.kendo.grid.api.getResultMessage(r));
                    return;
                }
                if (o.save !== undefined && o.save != null)
                    o.save({ action: method, value: r.Value });
            }, function (err) { }, function () {
                app.comp.blocker.App.unblock();
            });
        });
        loadRoles({
            load: function () {
                if (o.Id == null) {
                    app.comp.blocker.App.unblock();
                } else {
                    loadUser({
                        load: function () {
                            app.comp.blocker.App.unblock();
                        }
                    });
                }
            }
        });
    }
    init();
};