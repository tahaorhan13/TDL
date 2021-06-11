/////// <reference path="../adminpro/dist/js/sidebarmenu.js" />
var Menu = function () {

    var apiRole_Module = new app.api.system.Role_Module();
    var apiMenu_Role = new app.api.system.Menu_Role();

    function loadModule(module) {
        return '<li class="sidebar-item">' +
            '<a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">' +
            '<i class="' + module.IconPath + '"></i>' +
            '<span class="hide-menu"> ' + app.lang[module.ModuleName] + ' </span>' +
            '</a> ' +
            '<ul aria-expanded="false" class="collapse first-level" id="module-' + module.SortIndex + '"></ul>' +
            '</li>';
    }

    function loadMenus(menus) {
        let htmlMenus = '';
        for (let i = 0; i < menus.length; i++) {
            htmlMenus += loadMenu(menus[i]);
        }
        return htmlMenus
    }

    function loadMenu(menu) {
        return ' <li class="sidebar-item">'
            + ' <a href="#/' + menu.RoutingUrl + '" class="sidebar-link">'
            + ' <i class="' + menu.Icon + '"></i>'
            + ' <span class="hide-menu"> ' + app.lang[menu.MenuName] + ' </span>'
            + ' </a> </li>';
    }

    function loadScripts() {
        $.getScript(app.globals.root + 'bundles/js/adminpro/dist/js/sidebarmenu.js');
        app.comp.blocker.SideBarNav.unblock();
    }

    function init() {
        apiRole_Module.list({
            UseUserRole: true, Sort: [{ Field: 'SortIndex', Asc: true }]
        }, function (rModule) {
            if (rModule.Error)
                return;
            let _modules = rModule.Value;
            let htmlModules = '';
            for (let i = 0; i < _modules.length; i++) {
                htmlModules += loadModule(_modules[i]);
            }
            $('#sidebarnav').append(htmlModules);

            for (let i = 0; i < _modules.length; i++) {
                apiMenu_Role.list({ ModuleId: _modules[i].ModuleId, UseUserRole: true }, function (rMenu) {
                    if (rMenu.Error)
                        return
                    $('#module-' + _modules[i].SortIndex).append(loadMenus(rMenu.Value));
                });

            }
            loadScripts();
        });

    }

    init();
}

$.getScript(app.globals.root + 'bundles/js/app/app.lang.js', function () {
    app.lang.load(function () {
        $.getScript(app.globals.root + 'bundles/js/app/app.singlepage.js', function () { });
        document.title = 'YTES';
        /* $('span [id="app-logo"]').html('&nbsp;' + app.lang[app.globals.module]);*/
        $('#linkRedirectModule').attr({ title: app.lang.Applications });
        $('#linkOnlineUser').attr({ title: app.lang.OnlineUser });
        $('#linkHelp').attr({ title: app.lang.Help });
        $('#linkLogout').attr({ title: app.lang.Logout });
        $('#copyrightText').html('&nbsp;' + app.lang.CopyrightText);
        $('#versionText').html(app.lang.Version);
        $('#userinfo').append(' <h4 class="mb-0">' + localStorage.getItem("UserName") + '</h4><p class= "text-muted mb-1 font-14" id = "userMail" > ' + localStorage.getItem("Email") + '</p >');
        new Menu();

    });
});
$('head').append('<link rel="shortcut icon" type="image/x-icon" href="' + app.globals.root + 'bundles/imgs/logo/app.ico"/>');
$('#btnFullScreen').on('click', function () {
    let val = parseInt($(this).attr('data-value'));
    if (val === 0) {
        app.fullscreen.open();
        $(this).attr('data-value', 1);
        $(this).html('<i class="mdi mdi-fullscreen-exit"></i>');
    } else {
        app.fullscreen.close();
        $(this).attr('data-value', 0);
        $(this).html('<i class="mdi mdi-fullscreen"></i>');
    }
});
$('#btnLogout').on('click', function () {
    var apiAuth = new app.api.account.Auth();
    //If access token is still avaible, revoke it with the revokerefreshtoken method
    refreshDate = new Date(localStorage.getItem("Refresh-Token-Expiration"));

    if (refreshDate > Date.now()) {
        apiAuth.revokerefreshtoken({ RefreshToken: localStorage.getItem("Refresh-Token") }, function (r) {
            //
        });
    }
    //after revoke the access token, remove from local storage too then redirect to login page
    localStorage.removeItem("Access-Token");
    localStorage.removeItem("Refresh-Token");
    localStorage.removeItem("Refresh-Token-Expiration");
    localStorage.removeItem("Access-Token-Expiration");

    window.location.href = app.globals.root + "Account/Login";
});