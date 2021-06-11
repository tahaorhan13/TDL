app.parameters = {
    load: function () {
        var api = new app.api.system.ParameterItem();
        api.list({ UseUserLanguage: true }, function (r) {
            if (r.Error)
                return;
            for (let i = 0; i < r.Value.length; i++) {                
                let v = r.Value[i];
                if (app.parameters[v.ParameterName] === undefined)
                    app.parameters[v.ParameterName] = [];
                app.parameters[v.ParameterName].push({ value: v.Value, text: v.LocalName });
            }

        }, function (err) { });
    },
};
app.parameters.load();