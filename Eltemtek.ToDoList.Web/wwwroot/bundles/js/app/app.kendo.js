/// <reference path="app.js" />

app.kendo = {};
app.kendo.lang = {
    DeleteDialogText: 'Are you sure you want to delete it?',
    Yes: 'Yes',
    No: 'No'
};
app.kendo.grid = {
    def: {
        pageSize: 20
    }
};
app.kendo.grid.api = {
    def: {
        primaryField: "Id",
        method: {
            read: "list",
            create: "add",
            update: "update",
            save: "save",
            destroy: "delete",
            valueTransfer: "transferRecordParameterValues"
        },
        parameter: {
            take: "Take",
            skip: "Skip",
            filter: "Filter",
            sort: "Sort",
            field: "Field",
            operator: "Operator",
            value: "Value",
            asc: "Asc"
        },
        result: {
            error: "Error",
            value: "Value",
            total: "Total",
            message: "Message",
            messageCode: "Code",
            messageTitle: "Title",
            messageDescription: "Description",
            messageDetails: "Details",
            messageSystemCode: "SystemCode"
        }
    },
    getResultMessage: function (r) {
        var f = app.kendo.grid.api.def.result.message;
        //return {
        //    code: r[f][app.kendo.grid.api.def.result.messageCode],
        //    title: r[f][app.kendo.grid.api.def.result.messageTitle],
        //    description: r[f][app.kendo.grid.api.def.result.messageDescription],
        //    systemCode: r[f][app.kendo.grid.api.def.result.messageSystemCode]
        //};
        return {
            type: 'error',
            title: app.lang.Error, //r[f][app.kendo.grid.api.def.result.messageTitle],
            //text: r[f][app.kendo.grid.api.def.result.messageDescription],
            text: app.lang[r[f][app.kendo.grid.api.def.result.messageSystemCode]],
            confirmButtonText: app.lang.Close,
            //footer: '<a href>Why do I have this issue?</a>'
        };
    },
    isResultError: function (o) {
        /* o={r:r,e:e} */
        if (o.r[app.kendo.grid.api.def.result.error]) {
            //var d = new app.bootstrap.Dialog();
            //d.error(app.kendo.grid.api.getResultMessage(o.r));
            Swal.fire(app.kendo.grid.api.getResultMessage(o.r));

            if (o.e !== undefined && o.e !== null)
                o.e.error();
            return true;
        }
        return false;
    }
};
/* o={api:null,apiMethod:"",e:e,p:null,done:null,fail:null,always:null} */
app.kendo.grid.api.read = function (o) {
    if (o.apiMethod === undefined || o.apiMethod === null)
        o.apiMethod = app.kendo.grid.api.def.method.read;
    if (o.p === undefined || o.p === null)
        o.p = app.kendo.grid.read.getPagingParameters(o.e);
    o.api[o.apiMethod](o.p, function (r) {
        if (!app.kendo.grid.api.isResultError({ r: r, e: o.e }))
            o.e.success(r);
        if (o.done !== undefined && o.done !== null)
            o.done({ result: r, action: 'read' });
    }, function (r) {
        if (o.fail !== undefined && o.fail !== null)
            o.fail({ result: r, action: 'read' });
    }, function (r) {
        if (o.always !== undefined && o.always !== null)
            o.always({ result: r, action: 'read' });
    });
};
app.kendo.grid.api.create = function (o) {
    /* o={api:null,apiMethod:"",apiValueTransferMethod:"",e:e,p:null,done:null,fail:null,always:null} */
    if (o.apiMethod === undefined || o.apiMethod === null)
        o.apiMethod = app.kendo.grid.api.def.method.create;
    if (o.apiValueTransferMethod === undefined || o.apiValueTransferMethod === null)
        o.apiValueTransferMethod = app.kendo.grid.api.def.method.valueTransfer;
    if (o.p === undefined || o.p === null)
        o.p = o.api[o.apiValueTransferMethod](o.e);
    o.api[o.apiMethod](o.p, function (r) {
        if (!app.kendo.grid.api.isResultError({ r: r, e: o.e })) {
            app.utility.transferValues(r[app.kendo.grid.api.def.result.value], o.e.data);
            o.e.success(o.e.data);
            if (o.done !== undefined && o.done !== null)
                o.done({ result: r, action: 'create' });
        } else if (o.fail !== undefined && o.fail !== null)
            o.fail({ result: r, action: 'create' });
    }, function (r) {
        if (o.fail !== undefined && o.fail !== null)
            o.fail({ result: r, action: 'create' });
    }, function (r) {
        if (o.always !== undefined && o.always !== null)
            o.always({ result: r, action: 'create' });
    });
};
app.kendo.grid.api.update = function (o) {
    /* o={api:null,apiMethod:"",apiValueTransferMethod:"",e:e,p:null,done:null,fail:null,always:null} */
    if (o.apiMethod === undefined || o.apiMethod === null)
        o.apiMethod = app.kendo.grid.api.def.method.update;
    if (o.apiValueTransferMethod === undefined || o.apiValueTransferMethod === null)
        o.apiValueTransferMethod = app.kendo.grid.api.def.method.valueTransfer;
    if (o.p === undefined || o.p === null)
        o.p = o.api[o.apiValueTransferMethod](o.e);
    o.api[o.apiMethod](o.p, function (r) {
        if (!app.kendo.grid.api.isResultError({ r: r, e: o.e })) {
            app.utility.transferValues(r[app.kendo.grid.api.def.result.value], o.e.data);
            o.e.success(o.e.data);
        }
        if (o.done !== undefined && o.done !== null)
            o.done({ result: r, action: 'update' });
    }, function (r) {
        if (o.fail !== undefined && o.fail !== null)
            o.fail({ result: r, action: 'update' });
    }, function (r) {
        if (o.always !== undefined && o.always !== null)
            o.always({ result: r, action: 'update' });
    });
};
//app.kendo.grid.api.save = function (o) {
//    /* o={api:null,apiMethod:"",apiValueTransferMethod:"",e:e,p:null,done:null,fail:null,always:null} */
//    if (o.apiMethod === undefined || o.apiMethod === null)
//        o.apiMethod = app.kendo.grid.api.def.method.save;
//    if (o.apiValueTransferMethod === undefined || o.apiValueTransferMethod === null)
//        o.apiValueTransferMethod = app.kendo.grid.api.def.method.valueTransfer;
//    if (o.p === undefined || o.p === null)
//        o.p = o.api[o.apiValueTransferMethod](o.e);
//    o.api[o.apiMethod](o.p, function (r) {
//        if (!app.kendo.grid.api.isResultError({ r: r, e: o.e })) {
//            app.utility.transferValues(r[app.kendo.grid.api.def.result.value], o.e.data);
//            o.e.success(o.e.data);
//        }
//        if (o.done !== undefined && o.done !== null)
//            o.done({ result: r, action: 'save' });
//    }, function (r) {
//        if (o.fail !== undefined && o.fail !== null)
//            o.fail({ result: r, action: 'save' });
//    }, function (r) {
//        if (o.always !== undefined && o.always !== null)
//            o.always({ result: r, action: 'save' });
//    });
//};
app.kendo.grid.api.destroy = function (o) {
    /* o={api:null,apiMethod:"",apiValueTransferMethod:"",e:e,p:null,done:null,fail:null,always:null, grid:null, data:null} */
    if (o.apiMethod === undefined || o.apiMethod === null)
        o.apiMethod = app.kendo.grid.api.def.method.destroy;
    if (o.p === undefined || o.p === null) {
        o.p = {};
        o.p[app.kendo.grid.api.def.primaryField] = o.e.data[app.kendo.grid.api.def.primaryField];
    }
    o.api[o.apiMethod](o.p, function (r) {
        if (!app.kendo.grid.api.isResultError({ r: r, e: o.e })) {
            if (o.e !== undefined && o.e !== null)
                o.e.success(o.e.data);
            else if (o.grid !== undefined && o.grid !== null && o.data !== undefined && o.data !== null)
                o.grid.dataSource.remove(o.data);
        }
        if (o.done !== undefined && o.done !== null)
            o.done({ result: r, action: 'destroy' });
    }, function (r) {
        if (o.fail !== undefined && o.fail !== null)
            o.fail({ result: r, action: 'destroy' });
    }, function (r) {
        if (o.always !== undefined && o.always !== null)
            o.always({ result: r, action: 'destroy' });
    });
};
app.kendo.grid.read = {
    getPagingParameters: function (e) {
        var p = {};
        p[app.kendo.grid.api.def.parameter.skip] = e.data.skip;
        p[app.kendo.grid.api.def.parameter.take] = e.data.take;
        p[app.kendo.grid.api.def.parameter.filter] = [];
        p[app.kendo.grid.api.def.parameter.sort] = [];
        if (e.data.sort !== undefined && e.data.sort !== null) {
            for (var i = 0; i < e.data.sort.length; i++) {
                var s = {};
                s[app.kendo.grid.api.def.parameter.field] = e.data.sort[i].field;
                s[app.kendo.grid.api.def.parameter.asc] = e.data.sort[i].dir === "asc" ? true : false;
                p[app.kendo.grid.api.def.parameter.sort].push(s);
            }
        }
        if (e.data.filter !== undefined && e.data.filter !== null) {
            for (var i = 0; i < e.data.filter.filters.length; i++) {
                var f = {};
                f[app.kendo.grid.api.def.parameter.field] = e.data.filter.filters[i].field;
                f[app.kendo.grid.api.def.parameter.operator] = e.data.filter.filters[i].operator;
                f[app.kendo.grid.api.def.parameter.value] = e.data.filter.filters[i].value;
                p[app.kendo.grid.api.def.parameter.filter].push(f);
            }
        }
        return p;
    },
    replacePagingParameterFields: function (o) {
        /* o={p:p,fields:fields} */
        if (Array.isArray(o.fields)) {
            for (var i = 0; i < o.fields.length; i++) {
                for (var j = 0; j < o.p[app.kendo.grid.api.def.parameter.filter].length; j++) {
                    if (o.p[app.kendo.grid.api.def.parameter.filter][j][app.kendo.grid.api.def.parameter.field] === o.fields[i].field) {
                        o.p[app.kendo.grid.api.def.parameter.filter][j][app.kendo.grid.api.def.parameter.field] = o.fields[i].newField;
                        break;
                    }
                }
            }
            for (var i = 0; i < o.fields.length; i++) {
                for (var j = 0; j < o.p[app.kendo.grid.api.def.parameter.sort].length; j++) {
                    if (o.p[app.kendo.grid.api.def.parameter.sort][j][app.kendo.grid.api.def.parameter.field] === o.fields[i].field) {
                        o.p[app.kendo.grid.api.def.parameter.sort][j][app.kendo.grid.api.def.parameter.field] = o.fields[i].newField;
                        break;
                    }
                }
            }
        } else {
            for (var i = 0; i < o.p[app.kendo.grid.api.def.parameter.filter].length; i++) {
                if (o.p[app.kendo.grid.api.def.parameter.filter][i][app.kendo.grid.api.def.parameter.field] === o.fields.field) {
                    o.p[app.kendo.grid.api.def.parameter.filter][i][app.kendo.grid.api.def.parameter.field] = o.fields.newField;
                    break;
                }
            }
            for (var i = 0; i < o.p[app.kendo.grid.api.def.parameter.sort].length; i++) {
                if (o.p[app.kendo.grid.api.def.parameter.sort][i][app.kendo.grid.api.def.parameter.field] === o.fields.field) {
                    o.p[app.kendo.grid.api.def.parameter.sort][i][app.kendo.grid.api.def.parameter.field] = o.fields.newField;
                    break;
                }
            }
        }
        return o.p;
    }
};
app.kendo.grid.column = {
    create: function (o) {
        /* o={field:"",title:"",format:"",filterable:"",values:null,editor:"",template:"",width:"",hidden:false} */
        return {
            field: o.field,
            title: o.title,
            format: o.format,
            filterable: o.filterable,
            values: o.values,
            editor: o.editor,
            template: o.template,
            width: o.width,
            hidden: o.hidden
        };
    },
    string: function (o) {
        if (o.filterable === undefined)
            o.filterable = { cell: { operator: "startswith" } };
        return app.kendo.grid.column.create(o);
    },
    number: function (o) {
        if (o.format === undefined)
            o.format = "{0:#####}";
        if (o.filterable === undefined)
            o.filterable = { cell: { operator: "eq" } };
        return app.kendo.grid.column.create(o);
    },
    date: function (o) {
        if (o.format === undefined)
            o.format = "{0:dd.MM.yyyy}";
        if (o.filterable === undefined)
            o.filterable = { cell: { operator: "eq" } };
        return app.kendo.grid.column.create(o);
    },
    staticValues: function (o) {
        o.filterable = { cell: { operator: "eq", showOperators: true } };
        return app.kendo.grid.column.create(o);
    },
    checkbox: function (o) {
        /* o={field:"",enabled:true} */
        var disabled = o.enabled === undefined ? '' : o.enabled ? '' : 'disabled="disabled"';
        return { template: '<input type="checkbox" #= ' + o.field + ' ? \'checked="checked"\' : "" # class="chkbx" ' + disabled + ' />', width: 30 };
    },
    dynamicDropDownList: function (o) {
        /* o={field:"",title:"",template:"",dataValueField:"",dataTextField:"",operator:"startswith",read:null,autoBind:false,required:true,width:"",hidden:false} */
        o.filterable = {
            cell: {
                dataSource: { transport: { read: function (e) { o.read(e); } } },
                dataTextField: o.dataTextField,
                operator: o.operator === undefined ? "startswith" : o.operator
            }
        };
        o.editor = function (container, options) {
            var ctrl = '<select ';
            if (o.required)
                ctrl = ctrl + 'required="required" ';
            ctrl = ctrl + ' name="' + options.field + '"></select>';
            $(ctrl)
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: o.autoBind === undefined ? false : o.autoBind,
                    dataTextField: o.dataTextField,
                    dataValueField: o.dataValueField,
                    dataSource: { transport: { read: function (e) { o.read(e); } } }
                });
        };
        return app.kendo.grid.column.create(o);
    },
    commandColumn: function (o) {
        /* o={name:"", text:"", imageClass:""} */
        return { name: o.name, text: ' ' + o.text, imageClass: o.imageClass };
    },
    setCheckboxDisplay: function (display) {
        $('div[data-role="grid"] input[type="checkbox"]').css('display', display);
    },
    setAutoComplateField: function (o) {
        /* {api:null, apiMethod:"", dataTextField:"", dataValueField:"", modelValueField:"", modelTextField:"", e:e, detailRow:detailRow, */
        /* filter:"startswith",minLength:1,suggest:false,autoBind:false,serverFiltering:true} */
        var opt = {
            filter: o.filter === undefined ? "startswith" : o.filter,
            minLength: o.minLength === undefined ? 1 : o.minLength,
            suggest: o.suggest === undefined ? false : o.suggest,
            autoBind: o.autoBind === undefined ? false : o.autoBind,
            dataTextField: o.dataTextField,
            dataValueField: o.dataValueField,
            dataSource: {
                serverFiltering: o.serverFiltering === undefined ? true : o.serverFiltering,
                transport: {
                    read: function (e) {
                        var p = app.kendo.grid.read.getPagingParameters(e);
                        o.api[o.apiMethod](p, function (r) {
                            if (r.Error) {
                                var d = new app.bootstrap.Dialog();
                                d.error(app.kendo.grid.api.getResultMessage(r));
                                e.error();
                            } else {
                                e.success(r[app.kendo.grid.api.def.result.value]);
                            }
                        }, function (err) { });
                    }
                }
            },
            select: function (evt) {
                o.e.model.set(o.modelValueField, evt.dataItem[o.dataValueField]);
            }
        };
        if (o.detailRow !== undefined && o.detailRow !== null) {
            o.detailRow.find('td[data-container-for="' + o.modelTextField + '"]').html('<input name="' + o.modelTextField + '" />');
            o.detailRow.find('input[name="' + o.modelTextField + '"]').kendoAutoComplete(opt);
        } else {
            $('td[data-container-for="' + o.modelTextField + '"]').html('<input name="' + o.modelTextField + '" />');
            $('input[name="' + o.modelTextField + '"]').kendoAutoComplete(opt);
        }
    }
};
// extensions >>
$.fn.extend({
    dataKendoGrid: function (o) {
        if (o === undefined)
            o = {};
        if (o.dataSource === undefined)
            o.dataSource = {};
        if (o.dataSource.schema === undefined)
            o.dataSource.schema = {};
        if (o.dataSource.schema.model === undefined)
            o.dataSource.schema.model = {};
        if (o.serverPaging) {
            if (o.dataSource.schema.data === undefined || o.dataSource.schema.data === null)
                o.dataSource.schema.data = function (r) {
                    if (r[app.kendo.grid.api.def.result.value]) { return r[app.kendo.grid.api.def.result.value]; } else if (r) { return r; }
                };
            if (o.dataSource.schema.total === undefined || o.dataSource.schema.total === null)
                o.dataSource.schema.total = function (r) { return r[app.kendo.grid.api.def.result.total]; };
            if (o.dataSource.serverPaging === undefined || o.dataSource.serverPaging === null)
                o.dataSource.serverPaging = true;
            if (o.dataSource.serverFiltering === undefined || o.dataSource.serverFiltering === null)
                o.dataSource.serverFiltering = true;
            if (o.dataSource.serverSorting === undefined || o.dataSource.serverSorting === null)
                o.dataSource.serverSorting = true;
        }
        if (o.dataSource.pageSize === undefined || o.dataSource.pageSize === null)
            o.dataSource.pageSize = app.kendo.grid.def.pageSize;
        if (o.dataSource.api !== undefined && o.dataSource.transport === undefined) {
            o.dataSource.transport = {
                read: function (e) {//!!!
                    var p = undefined;
                    if (o.dataSource.schema.model.parentField !== undefined && o.dataSource.schema.model.parentValue !== undefined) {
                        p = app.kendo.grid.read.getPagingParameters(e);
                        p[o.dataSource.schema.model.parentField] = o.dataSource.schema.model.parentValue;
                    }
                    if (o.dataSource.schema.model.conditionFields !== undefined) {
                        if (p === undefined)
                            p = app.kendo.grid.read.getPagingParameters(e);
                        for (var key in o.dataSource.schema.model.conditionFields) {
                            p[key] = o.dataSource.schema.model.conditionFields[key];
                        }
                    }
                    app.kendo.grid.api.read({ api: o.dataSource.api, e: e, p: p, done: o.done, fail: o.fail, always: o.always });
                },
                create: function (e) {
                    var p = undefined;
                    if (o.dataSource.schema.model.parentField !== undefined && o.dataSource.schema.model.parentValue !== undefined) {
                        p = o.dataSource.api.transferRecordParameterValues(e);
                        p[o.dataSource.schema.model.parentField] = o.dataSource.schema.model.parentValue;
                    }
                    if (o.dataSource.schema.model.saveMethod !== undefined && o.dataSource.schema.model.saveMethod)
                        app.kendo.grid.api.save({ api: o.dataSource.api, e: e, p: p, done: o.done, fail: o.fail, always: o.always });
                    else
                        app.kendo.grid.api.create({ api: o.dataSource.api, e: e, p: p, done: o.done, fail: o.fail, always: o.always });
                },
                update: function (e) {
                    var p = undefined;
                    if (o.dataSource.schema.model.parentField !== undefined && o.dataSource.schema.model.parentValue !== undefined) {
                        p = o.dataSource.api.transferRecordParameterValues(e);
                        p[o.dataSource.schema.model.parentField] = o.dataSource.schema.model.parentValue;
                    }
                    if (o.dataSource.schema.model.saveMethod !== undefined && o.dataSource.schema.model.saveMethod)
                        app.kendo.grid.api.save({ api: o.dataSource.api, e: e, p: p, done: o.done, fail: o.fail, always: o.always });
                    else
                        app.kendo.grid.api.update({ api: o.dataSource.api, e: e, done: o.done, fail: o.fail, always: o.always });
                },
                destroy: function (e) {
                    app.kendo.grid.api.destroy({ api: o.dataSource.api, e: e, done: o.done, fail: o.fail, always: o.always });
                }
            };
        }
        if (o.dataSource.transport !== undefined && o.permissions !== undefined) {
            if (!o.permissions.read && o.dataSource.transport.read !== undefined)
                o.dataSource.transport.read = function (e) { };
            if (!o.permissions.create && o.dataSource.transport.create !== undefined)
                o.dataSource.transport.create = function (e) { };
            if (!o.permissions.update && o.dataSource.transport.update !== undefined)
                o.dataSource.transport.update = function (e) { };
            if (!o.permissions.destroy && o.dataSource.transport.destroy !== undefined)
                o.dataSource.transport.destroy = function (e) { };
        }
        if (o.dataSource.schema.model.id === undefined)
            o.dataSource.schema.model.id = app.kendo.grid.api.def.primaryField;
        if (o.columns === undefined && o.dataSource !== undefined && o.dataSource.schema.model.fields !== undefined) {
            o.columns = [];
            for (var key in o.dataSource.schema.model.fields) {
                var f = o.dataSource.schema.model.fields[key];
                if (o.dataSource.schema.model.validationMessage !== undefined)
                    if (f.validation !== undefined && f.validation.required && f.validation.validationMessage === undefined)
                        o.dataSource.schema.model.fields[key].validation.validationMessage = o.dataSource.schema.model.validationMessage;
                if (f.column === undefined)
                    continue;
                if (f.column.detailView) {
                    f.column.hidden = true;
                }
                if (f.column.filterable === undefined) {
                    if (f.type === "string") {
                        f.column.filterable = { cell: { operator: "startswith" } };
                    }
                    else if (f.type === "number") {
                        if (f.column.format === undefined)
                            f.column.format = "{0:#####}";
                        f.column.filterable = { cell: { operator: "eq" } };
                    }
                    else if (f.type === "date") {
                        if (f.format === undefined)
                            f.column.format = "{0:dd.MM.yyyy}";
                        else
                            f.column.format = f.format;
                        f.column.filterable = { cell: { operator: "eq" } };
                    }
                }
                if (f.template !== undefined) {
                    f.column.template = f.template;
                }

                /* { field, title, format, filterable, values, editor, template, width, hidden, selectable } */
                o.columns.push({
                    field: key,
                    title: f.column.title,
                    format: f.column.format,
                    filterable: f.column.filterable,
                    values: f.column.values,
                    editor: f.column.editor,
                    template: f.column.template,
                    width: f.column.width,
                    hidden: f.column.hidden,
                    selectable: f.column.selectable,
                    attributes: f.column.attributes
                });
            }
        }
        if (o.toolbar === undefined) {
            o.toolbar = null;
            if (o.permissions === undefined || (o.permissions !== undefined && o.permissions.create !== undefined && o.permissions.create))
                o.toolbar = ["create"];
        }
        else if (o.toolbar.length === 0)
            o.toolbar = null;
        if (o.excel === undefined || o.excel === null)
            o.excel = { fileName: "List.xlsx", filterable: true };
        if (o.commandColumns === undefined)
            o.commandColumns = true;
        if (o.commandColumns === true) {
            if (o.permissions !== undefined) {
                var col = { command: [], title: " ", width: "220px" };
                if (o.permissions.update)
                    if (o.dataSource.autoSync === undefined || !o.dataSource.autoSync) {
                        col.command.push("edit");
                    }
                if (o.permissions.destroy)
                    //col.command.push("destroy");
                    col.command.push({ template: '<a role="button" class="k-button k-button-icontext k-grid-del" href="javascript:void(0)"><span class="k-icon k-i-close"></span>' + app.lang.Delete + '</a>' });
                if (col.command.length === 1)
                    col.width = "130px";
                if (col.command.length > 0)
                    o.columns.push(col);
            } else {
                o.columns.push({ command: ["edit", "destroy"], title: " ", width: "220px" });
            }
        }
        else if (Array.isArray(o.commandColumns)) {
            let command = [];
            for (let i = 0; i < o.commandColumns.length; i++) {
                command.push(o.commandColumns[i]);
            }
            o.columns.push({ command: command, title: " ", width: o.commandColumnsWidth });
        }
        if (o.filterable === undefined || o.filterable === null)
            //o.filterable = { mode: "row" }; //o.filterable = true;
            o.filterable = {};
        if (o.filterable.operators === undefined || o.filterable.operators === null)
            o.filterable.operators = {
                // kendo.ui.FilterCell.prototype.options.operators
                string: {
                    startswith: kendo.ui.FilterCell.prototype.options.operators.string.startswith,
                    endswith: kendo.ui.FilterCell.prototype.options.operators.string.endswith,
                    contains: kendo.ui.FilterCell.prototype.options.operators.string.contains,
                    doesnotcontain: kendo.ui.FilterCell.prototype.options.operators.string.doesnotcontain,
                    eq: kendo.ui.FilterCell.prototype.options.operators.string.eq,
                    neq: kendo.ui.FilterCell.prototype.options.operators.string.neq
                },
                number: {
                    eq: kendo.ui.FilterCell.prototype.options.operators.number.eq,
                    neq: kendo.ui.FilterCell.prototype.options.operators.number.neq,
                    gt: kendo.ui.FilterCell.prototype.options.operators.number.gt,
                    gte: kendo.ui.FilterCell.prototype.options.operators.number.gte,
                    lt: kendo.ui.FilterCell.prototype.options.operators.number.lt,
                    lte: kendo.ui.FilterCell.prototype.options.operators.number.lte,
                },
                date: {
                    eq: kendo.ui.FilterCell.prototype.options.operators.date.eq,
                    neq: kendo.ui.FilterCell.prototype.options.operators.date.neq,
                    gt: kendo.ui.FilterCell.prototype.options.operators.date.gt,
                    gte: kendo.ui.FilterCell.prototype.options.operators.date.gte,
                    lt: kendo.ui.FilterCell.prototype.options.operators.date.lt,
                    lte: kendo.ui.FilterCell.prototype.options.operators.date.lte,
                },
                enums: {
                    eq: kendo.ui.FilterCell.prototype.options.operators.enums.eq,
                    neq: kendo.ui.FilterCell.prototype.options.operators.enums.neq,
                }
            };
        if (o.editable === undefined || o.editable === null)
            o.editable = "inline";
        if (o.sortable === undefined || o.sortable === null)
            o.sortable = true;
        if (o.resizable === undefined || o.resizable === null)
            o.resizable = true;
        if (o.pageable === undefined || o.pageable === null)
            /*
                pageable: {
                refresh: true,
                pageSizes: [50, 75, 100,"all"],
                info: true,
                numeric: true,
                previousNext: true },
            */
            o.pageable = {
                refresh: true,
                pageSizes: true,
                info: true,
                numeric: true,
                previousNext: true
            };
        if (o.edit === undefined || o.edit === null)
            o.edit = function (e) {
                var color = "#dd4b39";
                $('input[required="required"]').each(function () {
                    $(this).attr('placeholder');
                    if ($(this).attr('data-type') === "number") {
                        $(this).parent().css("border-color", color);
                    } else if ($(this).attr('data-role') === "dropdownlist") {
                        $(this).prev().css("border-color", color);
                    } else {
                        $(this).css("border-color", color);
                    }
                });
                $('select[required="required"]').each(function () {
                    $(this).attr('validationmessage');
                    $(this).prev().css("border-color", color);
                });
                $('select').each(function () {
                    $(this).kendoDropDownList({
                        autoWidth: true
                    }).data("kendoDropDownList");
                });

                if (o.editAppend !== undefined && o.editAppend !== null)
                    o.editAppend(e);
            };
        var grid = $(this).kendoGrid(o);
        if (o.dataSource.api !== undefined && o.dataSource.api != null) {
            grid.data('kendoGrid').element.on('click', '.k-grid-del', 'click', function (e) {
                e.preventDefault(); //prevent page scroll reset
                var tr = $(e.target).closest("tr"); //get the row for deletion
                var data = grid.data('kendoGrid').dataItem(tr);
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
                        let p = {};
                        p[o.dataSource.schema.model.id] = data[o.dataSource.schema.model.id];
                        /* o={api:null,apiMethod:"",apiValueTransferMethod:"",e:e,p:null,done:null,fail:null,always:null} */
                        app.kendo.grid.api.destroy({
                            api: o.dataSource.api,
                            apiMethod: app.kendo.grid.api.def.method.destroy,
                            apiValueTransferMethod: app.kendo.grid.api.def.method.valueTransfer,
                            e: null, p: p, done: o.done, fail: o.fail, always: o.always,
                            grid: grid.data('kendoGrid'),
                            data: data
                        });
                    }
                });
            });

        }
        //$('div[class="k-grid-header"]').each(function () {
        //    if ($(this).css('padding-right') == '17px') {
        //        $(this).hide();
        //    }
        //});

        return grid;
    },
    dataKendoTabStrip: function (o) {
        if (o === undefined || o === null)
            o = { animation: { open: { effects: "fadeIn" } } };

        return $(this).kendoTabStrip(o);
    },
    setTabItem: function (title) {
        $(this).html('<span class="k-loading k-complete"></span><span class="k-link">' + title + '</span>');
    },
    getGridDataItem: function () {
        return $(this).closest('[data-role="grid"]').data("kendoGrid").dataItem($(this).closest("tr"));
    },
    setGridCheckStateChanged: function (field, display) {
        $(this).on("change", "input.chkbx", function (e) {
            var dataItem = $(e.target).getGridDataItem();
            dataItem.set(field, this.checked ? 1 : 0);
            if (display === undefined || display === null || display === false)
                app.kendo.grid.column.setCheckboxDisplay('none');
        });
    }
});
// extensions <<