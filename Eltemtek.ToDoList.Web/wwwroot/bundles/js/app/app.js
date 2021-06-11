var app = {};
app.globals = {
    dir: '',
    root: '../',
    api: 'http://localhost:39794',
    version: '1.0.0.0',
};
app.icon = {
    data: {},
    getIconSetList: function () {
        var lst = [];
        for (key in app.icon.data) {
            lst.push(key);
        }
        return lst;
    }
};
app.fullscreen = {
    open: function () {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    },
    close: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
};
app.timer = {
    session: null
};
app.validation = {
    // o={key:'', obj:null}
    hasKey: function (o) {
        return o.obj[o.key] === undefined || o.obj[o.key] === null ? false : true;
    },
    isEmpty: function (val) {
        return val === undefined || val === null || val.toString().isEmpty() ? true : false;
    },
    isNumber: function (val) {
        var pattern = /^\d+$/;
        return pattern.test(val);
    },
    validateMinLength: function (val, len) {
        return val.Length >= len ? true : false;
    }
};
app.utility = {
    transferValues: function (sourceObj, destinationObj) {
        for (key in destinationObj) {
            destinationObj[key] = sourceObj[key] !== undefined ? sourceObj[key] : null;
        }
    },
    generateUUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
};
app.render = {};
app.render.HTML = function (o) {
    /* o={ctrl:"",url:"",done:null} */
    $(o.ctrl).load(app.globals.root + o.url + '?_' + new Date().getTime(), function (res, status, req) {
        //if (status == "error") {

        //    return;
        //}
        if (o.done !== undefined && o.done !== null) { o.done(); }
    });
};
/// prototype >>
Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
};
String.prototype.append = function (...values) {
    var newStr = null;
    for (var i = 0; i < values.length; i++) {
        if (this.includes("{" + i + "}")) {
            newStr = this.replace("{" + i + "}", values[i]);
        }
    }
    return newStr;
}
String.prototype.insertAt = function (index, string) {
    return this.substr(0, index) + string + this.substr(index);
}
String.prototype.replaceAll = function (search, replacement) {
    //var target = this;
    return this.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.isEmpty = function () {
    var val = this.replaceAll(" ", "").replaceAll("\r", "").replaceAll("\n", "").replaceAll("\t", "");
    return val === "" ? true : false;
};
String.prototype.isNotEmpty = function () {
    return this.isEmpty() ? false : true;
};
Array.prototype.remove = function (from, to) {
    this.splice(from, (to = [0, from || 1, ++to - from][arguments.length]) < 0 ? this.length + to : to);
    return this.length;
};
Array.prototype.fixEmptyKendoGridDataValue = function (cols) {
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < cols.length; j++) {
            this[i][cols[j]] = this[i][cols[j]] === null ? "" : this[i][cols[j]];
        }
    }
};
Date.prototype.getUTCDateTime = function () {
    return new Date(this.getUTCFullYear(),
        this.getUTCMonth(),
        this.getUTCDate(),
        this.getUTCHours(),
        this.getUTCMinutes(),
        this.getUTCSeconds(),
        this.getUTCMilliseconds());
};
Number.prototype.toRad = function () {
    return this * Math.PI / 180;
};
Number.prototype.toDeg = function () {
    return this * (180 / Math.PI);
};
/// prototype <<
/// extensions >>
$.fn.extend({
    pressEnter: function (f) {
        $(this).on("keypress", function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode === "13") {
                if (f !== undefined && f !== null) { f(); }
            }
        });
    },
    pressEsc: function (f) {
        $(this).on("keypress", function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode === "27") {
                if (f !== undefined && f !== null) { f(); }
            }
        });
    }
});
/// extensions <<