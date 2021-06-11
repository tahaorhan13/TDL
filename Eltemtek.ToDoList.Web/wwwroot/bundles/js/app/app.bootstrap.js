/// <reference path="app.js" />
/// <reference path="app.lang.js" />

app.bootstrap = {
    def: {
        size: {
            xl: "xl",
            lg: "lg",
            md: "md",
            sm: "sm"
        },
        dialog: {
            icon: {
                default: null,
                info: 'fa fa-info-circle app-bootstrap-dialog-icon-blue',
                warning: 'fa fa-exclamation-triangle app-bootstrap-dialog-icon-yellow',
                error: 'fa fa-exclamation-circle app-bootstrap-dialog-icon-red',
                question: 'fa fa-question-circle app-bootstrap-dialog-icon-blue'
            }
        },
        color: {
            default: "default",
            primary: "primary",
            secondary: "secondary",
            success: "success",
            danger: "danger",
            error: "danger",
            warning: "warning",
            info: "info",
            light: "light",
            dark: "dark",
            white: "white",
            transparent: "transparent"
        }
    }
};
app.bootstrap.Modal = function (id) {
    var _id = id !== undefined && id !== null ? id : app.utility.generateUUID();
    this.show = function (o) {
        /* o={title:"", content:"", footer:"", hearderColor: "default", buttonColor: "default", size:"md", shown:null, hidden:null, backdrop:'static', timeout: 500,
         * buttons:[{title:"", color:"primary", click:null},{title:"", color: "danger", dataDismiss: "modal", click:null}]} */
        if (o.hearderColor === undefined)
            o.hearderColor = app.bootstrap.def.color.default;
        if (o.buttonColor === undefined)
            o.buttonColor = app.bootstrap.def.color.default;
        if (o.size === undefined)
            o.size = app.bootstrap.def.size.md;
        if (o.backdrop === undefined)
            o.backdrop = 'static';
        if (o.buttons !== undefined) {
            o.footer = '';
            for (var i = 0; i < o.buttons.length; i++) {
                o.buttons[i].id = 'btn-' + app.utility.generateUUID();
                var btn = '<button id="' + o.buttons[i].id + '" class="btn btn-' + o.buttons[i].color + ' width-100"';
                if (o.buttons[i].dataDismiss !== undefined)
                    btn = btn + ' data-dismiss="' + o.buttons[i].dataDismiss + '"';
                btn = btn + '>' + o.buttons[i].title + '</button>';
                o.footer = o.footer + btn;
            }
            var _shown = o.shown;
            o.shown = function () {
                for (var i = 0; i < o.buttons.length; i++) {
                    if (o.buttons[i].click !== undefined && o.buttons[i].click !== null)
                        $('#' + o.buttons[i].id).on('click', o.buttons[i].click);
                }
                if (_shown !== undefined && _shown !== null)
                    _shown();
            };
        }
        if (o.footer === undefined)
            o.footer = '<button type="button" class="btn btn-' + o.buttonColor + ' width-100" data-dismiss="modal">' + app.lang.Close + '</button>';
        var html = '<div id="' + _id + '" class="modal fade" style="z-index:99999;"><div class="modal-dialog modal-' + o.size + '"><div class="modal-content">';
        if (o.title !== undefined && o.title !== null)
            html = html + '<div class="modal-header bg-' + o.hearderColor + '"><h4 class="modal-title">' + o.title + '</h4></div>';
        html = html + '<div class="modal-body">' + o.content + '</div>';
        if (o.footer !== undefined && o.footer !== null)
            html = html + '<div class="modal-footer">' + o.footer + '</div></div></div></div>';
        $("body").append(html);
        $("#" + _id).on("shown.bs.modal", function (e) {
            $('body').css('overflow-y', 'hidden');
            if (o.shown !== undefined && o.shown !== null)
                o.shown();
            if (o.timeout !== undefined) {
                setTimeout(function () {
                    $("#" + _id).modal("hide");
                }, o.timeout);
            }
        });
        $("#" + _id).on("hidden.bs.modal", function (e) {
            $("#" + _id).remove();
            $('body').css('overflow-y', 'auto');
            $('body').css('padding-right', '0px');
            if (o.hidden !== o.undefined && o.hidden !== null)
                o.hidden();
        });
        $("#" + _id).modal({ backdrop: o.backdrop });
        $("#" + _id).modal("show");
    };
    this.showSaveCancel = function (o) {
        /* o={title:"", content:"", footer:"", hearderColor: "default", buttonColor: "default", size:"md", saveClick: null, cancelClick: null, shown:null, hidden:null} */
        o.buttons = [{
            title: app.lang.Save,
            color: "primary",
            click: o.saveClick
        },
        {
            title: app.lang.Cancel,
            color: "danger",
            dataDismiss: "modal",
            click: o.cancelClick
        }];
        var modal = new app.bootstrap.Modal();
        modal.show(o);
    };
    this.close = function () {
        $("#" + _id).modal("hide");
    };
    this.fixVScroll = function () {
        $('body').css('overflow-y', 'hidden');
        $("#" + _id).css('overflow-y', 'auto');
    };
};
app.bootstrap.Dialog = function () {
    var modal = new app.bootstrap.Modal();
    var self = this;
    this.show = function (o) {
        /* o={code: "", title:"", description:"", systemCode: "", footer:"", icon: null, hearderColor: "default", buttonColor: "default", size:"md", shown:null, hidden:null} */
        if (o.dialog !== undefined && o.dialog !== null) {
            if (o.title === undefined || o.title === null)
                o.title = '';//app.lang.title[o.dialog];
            if (o.code !== undefined && o.code !== null)
                o.title = o.title + " - " + o.code;
            o.icon = app.bootstrap.def.dialog.icon[o.dialog];
            o.hearderColor = app.bootstrap.def.color[o.dialog];
            o.buttonColor = app.bootstrap.def.color[o.dialog];
        }
        if (o.systemCode !== undefined && o.systemCode !== null)
            o.description = app.lang[o.systemCode];
        if (o.size === undefined || o.size === null)
            o.size = app.bootstrap.def.size.md;
        var c = '<table class="width-stretch"><tr>';
        if (o.icon !== undefined && o.icon !== null)
            c = c + '<td class="app-bootstrap-dialog-icon" ><i class="' + o.icon + '"></i></td>';
        c = c + '<td class="app-bootstrap-dialog-msg">' + o.description + '</td></tr></table>';
        o.content = c;
        if (o.backdrop === undefined)
            o.backdrop = true;
        modal.show(o);
    };
    this.default = function (o) {
        /* o={code: "", title:"", description:"", systemCode: "", footer:"", icon: null, size:"md", shown:null, hidden:null} */
        o.dialog = "default";
        var dialog = new app.bootstrap.Dialog();
        dialog.show(o);
    };
    this.info = function (o) {
        /* o={code: "", title:"", description:"", systemCode: "", footer:"", size:"md", shown:null, hidden:null} */
        o.dialog = "info";
        self.show(o);
    };
    this.warning = function (o) {
        /* o={code: "", title:"", description:"", systemCode: "", footer:"", size:"md", shown:null, hidden:null} */
        o.dialog = "warning";
        self.show(o);
    };
    this.error = function (o) {
        /* o={code: "", title:"", description:"", systemCode: "", footer:"", size:"md", shown:null, hidden:null} */
        o.dialog = "error";
        self.show(o);
    };
    this.question = function (o) {
        /* o={title:"", description:"", size:"md", buttons:[{title:"", color:"primary", dataDismiss: "modal", click:null},{title:"", color: "danger", dataDismiss: "modal", click:null}]} */
        o.icon = app.bootstrap.def.dialog.icon.question;
        o.backdrop = 'static';
        self.show(o);
    };
    this.questionYesNo = function (o) {
        /* o={title:"", description:"", size:"md", yesClick: null, noClick: null} */
        o.buttons = [{
            title: app.lang.Yes,
            color: "primary",
            dataDismiss: "modal",
            click: o.yesClick
        },
        {
            title: app.lang.No,
            color: "danger",
            dataDismiss: "modal",
            click: o.noClick
        }];
        self.question(o);
    };
    this.process = function (o) {
        /* o={description:"",size:"sm"} */
        o.footer = null;
        o.icon = 'fas fa-circle-notch fa-spin';
        o.backdrop = 'static';
        //var dialog = new app.bootstrap.Dialog();
        self.show(o);
    };
    this.fixVScroll = function () {
        modal.fixVScroll();
    };
    this.close = function () {
        modal.close();
    };
};
app.bootstrap.Alert = function (id) {
    var _id = "alt-" + app.utility.generateUUID();
    /* o={title:"", decription:"", annotation:"", icon:null, color: "warning", closeButton: true, timeout: 500, closed: null} */
    this.show = function (o) {
        if (o.color === undefined)
            o.color = 'danger';
        var c = '<div id="' + _id + '" class="alert alert-' + o.color + '" role="alert">';
        if (o.title !== undefined)
            c = c + '<h4 class="alert-heading">' + o.title + '</h4>';
        c = c + '<table class="width-stretch"><tr>';
        if (o.icon !== undefined)
            c = c + '<td class="app-bootstrap-dialog-icon"><i class="' + o.icon + '"></i></td>';
        c = c + '<td>' + o.description + '</td>';
        if (o.closeButton !== undefined && o.closeButton)
            c = c + '<td><button type="button" class="close" data-dismiss="alert" aria-label="' + app.lang.Close + '"><span aria-hidden="true">&times;</span></button></td>';
        c = c + '</tr></table>';
        if (o.annotation !== undefined)
            c = c + '<hr/><p class="mb-0">' + o.annotation + '</p>';
        c = c + '</div>';
        $('#' + id).html(c);
        $('#' + _id).alert();
        $('#' + _id).on('closed.bs.alert', function () {
            if (o.closed !== undefined && o.closed !== null)
                o.closed();
        });
        if (o.timeout !== undefined) {
            setTimeout(function () {
                $('#' + id).html('');
                if (o.closed !== undefined && o.closed !== null)
                    o.closed();
            }, o.timeout);
        }
    };
    this.close = function () {
        $('#' + _id).alert('dispose');
    };
};
/* o={id:'', min:0, max: 100, value: 0, step: 1, height: '10px', play: 'decrease', done: null} */
app.bootstrap.ProgressBar = function (o) {
    var _id = "pb-" + app.utility.generateUUID();
    init();
    function getPercent() {
        return parseInt((o.value * 100) / o.max);
    }
    function setCompValues(perVal) {
        $('#' + _id).attr('aria-valuenow', o.value);
        $('#' + _id).css('width', perVal + '%');
    }
    function init() {
        var perVal = getPercent();
        var c = '<div class="progress" style="height:' + o.height + '">'
            + '<div id="' + _id + '" class="progress-bar ' + o.color
            + '" role="progressbar" style="width: ' + perVal + '%" aria-valuenow="' + o.value
            + '" aria-valuemin="' + o.min + '" aria-valuemax="' + o.max + '"></div></div>';
        $('#' + o.id).html(c);
    }
    this.increase = function () {
        o.value = o.value + o.step;
        //if (o.value > o.max)
        //    o.value = o.max;
        var perVal = getPercent();
        setCompValues(perVal);
        if (o.value >= o.max && o.done !== undefined && o.done !== null)
            o.done();
    };
    this.decrease = function () {
        o.value = o.value - o.step;
        //if (o.value < o.min)
        //    o.value = o.min;
        var perVal = getPercent();
        setCompValues(perVal);
        console.log("perVal:" + perVal);
        //if (o.value <= o.min && o.done !== undefined && o.done !== null)
        //    o.done();
        if (perVal <= 0 && o.done !== undefined && o.done !== null)
            o.done();
    };
    this.play = function () {
        var f = this[o.play];
        var interval = setInterval(function () {
            f();
            console.log(o.value);
            if ((o.play === "decrease" && o.value <= o.min) || (o.play === "increase" && o.value >= o.max))
                clearInterval(interval);
            if (o.value <= o.min && o.done !== undefined && o.done !== null)
                o.done();
        }, 0);
    };
};
$.fn.extend({
    //
});