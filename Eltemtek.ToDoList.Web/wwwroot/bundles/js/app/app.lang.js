app.lang = {
    list: [],
    load: function (f) {
        app.lang.list = [];
        var apiLanguage = new app.api.system.Language();
        var apiLocaleStringResource = new app.api.system.LocaleStringResource();
        apiLanguage.list({ State: 1 }, function (rLanguage) {
            if (rLanguage.Error)
                return;
            for (let i = 0; i < rLanguage.Value.length; i++) {
                let v = rLanguage.Value[i];
                app.lang.list.push({ value: v.Id, text: v.Name, culture: v.LanguageCulture, code: v.UniqueSeoCode });
            }
            apiLocaleStringResource.list({ UseUserLanguage: true }, function (rLocaleStringResource) {
                if (rLocaleStringResource.Error)
                    return;
                for (let i = 0; i < rLocaleStringResource.Value.length; i++) {
                    let v = rLocaleStringResource.Value[i];
                    if (i == 0) {
                        let lng = app.lang.list.find(function (itm) {
                            return itm.value === v.LanguageId;
                        });
                        if (lng !== undefined || lng !== null) {
                            $.getScript(app.globals.root + 'bundles/js/kendoUI/js/cultures/kendo.culture.' + lng.code + '.min.js', function () { });
                            $.getScript(app.globals.root + 'bundles/js/kendoUI/js/cultures/kendo.culture.' + lng.culture + '.min.js', function () { });
                            $.getScript(app.globals.root + 'bundles/js/kendoUI/js/messages/kendo.messages.' + lng.culture + '.min.js', function () { });
                        }
                    }
                    app.lang[v.ResourceName] = v.ResourceValue;
                }
                f();
            }, function (err) { });

        }, function (err) { });
    }
};
//app.lang.load(f);