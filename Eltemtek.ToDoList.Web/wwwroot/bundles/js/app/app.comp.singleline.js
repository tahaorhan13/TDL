if (app.comp === undefined)
    app.comp = {};
app.comp.singleline = {};
app.comp.singleline.Component = class {
    /* o={ diagram:'', name:'', componentType:'', x:0, y:0, width:36, height:36, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{},
     * action:{mouseEnter:{stroke: '#40E0D0', fill: '#40E0D0', background: '#1d2228'}} } */
    constructor(o) {
        this.diagram = o.diagram;
        this.id = app.utility.generateUUID();
        this.name = o.name;
        this.componentType = o.componentType;
        this.data = o.data;
        this.x = o.x !== undefined && o.x !== null ? o.x : 0;
        this.y = o.y !== undefined && o.y !== null ? o.y : 0;
        this.width = o.width !== undefined && o.width !== null ? o.width : 36;
        this.height = o.height !== undefined && o.height !== null ? o.height : 36;
        this.stroke = o.stroke;
        this.strokeWidth = o.strokeWidth === undefined || o.strokeWidth === null ? 0 : o.strokeWidth;
        this.fill = o.fill;
        this.cursor = o.cursor !== undefined && o.cursor !== null ? o.cursor : 'hand';
        this.background = o.background;

        this._createG({
            id: this.id, stroke: this.stroke, fill: this.fill, title: this.name, cursor: this.cursor
        });
        if (o.componentType !== 'Node' && o.componentType !== 'Connection') {
            this._createRect({
                x: this.x, y: this.y, width: this.width, height: this.height, fill: this.background, stroke: 'none', strokeWidth: 0, name: 'rect0'
            });
        }
        if (o.action !== undefined && o.action !== null) {
            if (o.action.mouseEnter !== undefined) {
                var self = this;
                $('#' + this.id).on('mouseenter', function () {
                    self.setStyle({ stroke: o.action.mouseEnter.stroke, fill: o.action.mouseEnter.fill, background: o.action.mouseEnter.background });
                });
                $('#' + this.id).on('mouseleave', function () {
                    self.setStyle({ stroke: o.stroke, fill: o.fill, background: o.background });
                });
            }
        }
    }
    // o={type:'g', attr:{}}
    _createElementNS(o) {
        var el = $(document.createElementNS("http://www.w3.org/2000/svg", o.type)).attr(o.attr);
        if (o.attr.style !== undefined) {
            el.css(o.attr.style);
        }
        return el;
    }
    // o={id: null, fill:'#f6f6f6', stroke:'#f6f6f6', cursor: 'hand', title: ''}
    _createG(o) {
        var attr = {
            'id': o.id,
            'fill': o.stroke,
            'stroke': o.stroke,
            'data-toggle': 'tooltip',
            'data-placement': 'right',
            'data-html': true,
            'title': o.title,
            'style': 'cursor:' + o.cursor
        };
        if (this.data !== undefined && this.data !== null) {
            for (var key in this.data) {
                attr['data-c-' + key] = this.data[key];
            }
        }
        var el = this._createElementNS({ type: 'g', attr: attr });
        $(this.diagram).append(el);
    }
    // o={name:'', x:0,y:0,width:36,height:36, fill:'none', stroke:'#f6f6f6', strokeWidth:1', style:{}}
    _createRect(o) {
        var attr = {
            'name': o.name,
            'x': o.x,
            'y': o.y,
            'width': o.width,
            'height': o.height,
            'fill': o.fill,
            'stroke-width': o.strokeWidth,
            'stroke': o.stroke,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'rect', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', cx:4, cy:4, r:3, fill:'#f6f6f6', stroke:'#f6f6f6', strokeWidth:1, style:{} }
    _createCircle(o) {
        var attr = {
            'name': o.name,
            'cx': o.cx,
            'cy': o.cy,
            'r': o.r,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'circle', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', cx:4, cy:4, rx:100, ry:50, fill:'#f6f6f6', stroke:'#f6f6f6', strokeWidth:1, style:{} }
    _createEllipse(o) {
        var attr = {
            'name': o.name,
            'cx': o.cx,
            'cy': o.cy,
            'rx': o.rx,
            'ry': o.ry,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'ellipse', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', x1:0, y1:0, x2:10, y2:10, fill:'none', stroke:'#f6f6f6', strokeWidth:1, style:{} }
    _createLine(o) {
        var attr = {
            'name': o.name,
            'x1': o.x1,
            'y1': o.y1,
            'x2': o.x2,
            'y2': o.y2,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'line', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', d:'M0 34 L14 68 L28 34 Z', fill:'none', stroke:'#f6f6f6', strokeWidth:1, style:{} }
    _createPath(o) {
        var attr = {
            'name': o.name,
            'd': o.d,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'path', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', points:'200,10 250,190 160,210', fill:'#f6f6f6', stroke:'#f6f6f6', strokeWidth:1, style:{} }
    _createPolygon(o) {
        var attr = {
            'name': o.name,
            'points': o.points,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'polygon', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', points:'20,20 40,25 60,40 80,120 120,140 200,180', fill:'none', stroke:'#f6f6f6', strokeWidth:1, style:{} }
    _createPolyline(o) {
        var attr = {
            'name': o.name,
            'points': o.points,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'polyline', attr: attr });
        $('#' + this.id).append(el);
    }
    // o={name:'', x: 0, y: 0, content: '', fontSize:14, fontName:'Verdana', fill:'#f6f6f6', stroke:'none', strokeWidth:0, style:{} }
    _createText(o) {
        var attr = {
            'name': o.name,
            'x': o.x,
            'y': o.y,
            'font-size': o.fontSize,
            'font-family': o.fontName,
            'fill': o.fill,
            'stroke': o.stroke,
            'stroke-width': o.strokeWidth,
            //'stroke-dasharray': '5,5',
            'style': o.style
        };
        var el = this._createElementNS({ type: 'text', attr: attr });
        $('#' + this.id).append(el);
        var txt = this._getSubElement({ type: 'text', name: o.name });
        $(txt).html(o.content);
    }
    // o={type:'', name:''}
    _getSubElement(o) {
        return $('#' + this.id + ' > ' + o.type + '[name="' + o.name + '"]')[0];
    }
    // o={type:'', name:'', attr:{}}
    _setSubElementAttr(o) {
        var el = this._getSubElement({ type: o.type, name: o.name });
        $(el).attr(o.attr);
    }
    // o={type:'', name:'', style:{display:'none'}}
    _setSubElementCss(o) {
        var el = this._getSubElement({ type: o.type, name: o.name });
        $(el).css(o.style);
    }
    // o={'cursor':'move'}
    _setCss(o) {
        $('#' + this.id).css(o);
    }
    // o={}
    _setLocation(o) {
        var rect0 = this._getSubElement({ type: 'rect', name: 'rect0' });
        $(rect0).attr({ x: this.x, y: this.y });
    }
    // o={}
    _calc(o) {
        var v = ['x', 'y'];
        for (var key in o) {
            if (key === 'name' || key === 'type' || key === 'style')
                continue;
            for (var i = 0; i < v.length; i++) {
                if (key.indexOf('o_') === -1 && key.indexOf(v[i]) > -1) {
                    o[key] = this[v[i]] + o['o_' + key];
                }
            }
        }
        return o;
    }
    // o={}
    _setAttr(o) {
        var v = ['x', 'y'];
        var attr = {};
        for (var key in o) {
            if (key === 'name' || key === 'type' || key === 'format')
                continue;
            for (var i = 0; i < v.length; i++) {
                if (key.indexOf('o_') === -1 && key.indexOf(v[i]) > -1) {
                    attr[key] = o[key];
                }
            }
        }
        this._setSubElementAttr({ type: o.type, name: o.name, attr: attr });
    }
    _set_attr_from_format(o) {
        var v = ['x', 'y'];
        var attr = {};
        var k = '';
        for (var key in o.format) {
            k = key; break;
        }
        attr[k] = o.format[k];
        for (var key in o) {
            if (key === 'name' || key === 'type' || key === 'format')
                continue;
            for (var i = 0; i < v.length; i++) {
                if (key.indexOf('o_') === -1 && key.indexOf(v[i]) > -1) {
                    var fk = '[' + key + ']';
                    attr[k] = attr[k].replace(fk, o[key]);
                }
            }
        }
        this._setSubElementAttr({ type: o.type, name: o.name, attr: attr });
    }
    _create_from_e() {
        var v = ['x', 'y'];
        this._e_calc();
        for (var ok in this.e) {
            var args = {};
            if (this.e[ok].format !== undefined) {
                var fk = '';
                for (var sk in this.e[ok].format) {
                    fk = sk; break;
                }
                args[fk] = this.e[ok].format[fk];
                for (var k in this.e[ok]) {
                    var found = false;
                    if (k !== 'type' && k !== 'style') {
                        for (var i = 0; i < v.length; i++) {
                            if (k.indexOf('o_') === -1 && k.indexOf(v[i]) > -1) {
                                var fkv = '[' + k + ']';
                                args[fk] = args[fk].replace(fkv, this.e[ok][k]);
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        if (k.indexOf('o_') === -1) {
                            args[k] = this.e[ok][k];
                        }
                    }
                }
            } else {
                for (var key in this.e[ok]) {
                    args[key] = this.e[ok][key];
                }
            }
            if (args.type === 'rect')
                this._createRect(args);
            else if (args.type === 'circle')
                this._createCircle(args);
            else if (args.type === 'ellipse')
                this._createEllipse(args);
            else if (args.type === 'line')
                this._createLine(args);
            else if (args.type === 'path')
                this._createPath(args);
            else if (args.type === 'polygon')
                this._createPolygon(args);
            else if (args.type === 'polyline')
                this._createPolyline(args);
            else if (args.type === 'text')
                this._createText(args);
        }
    }
    _e_calc() {
        for (var key in this.e) {
            this._calc(this.e[key]);
        }
    }
    _e_set_attr() {
        for (var key in this.e) {
            if (this.e[key].format !== undefined)
                this._set_attr_from_format(this.e[key]);
            else
                this._setAttr(this.e[key]);
        }
    }
    // o={x:0, y:0}
    setLocation(o) {
        this.x = o.x;
        this.y = o.y;
        this._e_calc();
        this._setLocation(o);
        this._e_set_attr();

        if (this.data === undefined || this.data === null)
            this.data = {};
        this.data.x = this.x;
        this.data.y = this.y;
    }
    // o={stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', strokeWidth:0}
    setStyle(o) {
        this._setSubElementAttr({ type: 'rect', name: 'rect0', attr: { fill: o.background } });
        for (var key in this.e) {
            var attr = {};
            if (o.fill !== undefined && this.e[key].fill !== 'none') {
                attr['fill'] = o.fill;
            }
            if (o.stroke !== undefined && this.e[key].stroke !== 'none') {
                attr['stroke'] = o.stroke;
            }
            if (o.strokeWidth !== undefined) {
                attr['stroke-width'] = o.strokeWidth;
            }
            this._setSubElementAttr({ type: this.e[key].type, name: this.e[key].name, attr: attr });
        }
    }
    // o={name:'', content:''}
    setText(o) {
        $('#' + this.id + ' > text[name="' + o.name + '"]').text(o.content);
    }

    // o={type: 'click', func:null}
    addEvent(o) {
        var self = this;
        $('#' + this.id).on(o.type, function (args) {
            o.func({ type: o.type, event: args, component: self });
        });
    }
    // o={position:'top/bottom/left/right'}
    getConnectionLocation(o) {
        var loc = { x: 0, y: 0 };
        if (o.position === 'top') {
            loc.x = this.x + parseInt(this.width / 2);
            loc.y = this.y;
            if (this.componentType === 'Node' || this.componentType === 'AcVoltage')
                loc.y = loc.y + 2;
        } else if (o.position === 'bottom') {
            loc.x = this.x + parseInt(this.width / 2);
            loc.y = this.y + this.height;
            if (this.componentType === 'Node')
                loc.y = loc.y - 2;
        } else if (o.position === 'left') {
            loc.x = this.x;
            loc.y = this.y + parseInt(this.height / 2);
        } else if (o.position === 'right') {
            loc.x = this.x + this.width;
            loc.y = this.y + parseInt(this.height / 2);
        }
        return loc;
    }
};
app.comp.singleline.Busbar = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, width:500, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        //o.width = 36;
        o.height = 3;
        o.componentType = 'Busbar';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
            <rect x="0" y="0" width="500" height="3" fill="#ff0000" stroke="none" stroke-width="0"></rect>
            <rect x="0" y="0" width="500" height="3" fill="#f6f6f6" stroke="none" stroke-width="0"></rect>
         </g>
        */
        this.e = {
            rect1: { name: 'rect1', type: 'rect', o_x: 0, o_y: 0, x: 0, y: 0, width: o.width, height: o.height, fill: o.fill, stroke: 'none', strokeWidth: 0 },
        };
        super._create_from_e();
    }
    // o={w:0,h:0}
    setSize(o) {
        // o={type:'', name:'', attr:{}}
        this.width = o.w;
        this._setSubElementAttr({ type: 'rect', name: 'rect0', attr: { width: o.w } });
        this._setSubElementAttr({ type: 'rect', name: 'rect1', attr: { width: o.w } });
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'rect', name: 'rect1', attr: { fill: o.color } });
    }
};
app.comp.singleline.Node = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 8;
        o.height = 8;
        o.componentType = 'Node';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
            <rect x="0" y="0" width="8" height="8" fill="#ff0000" stroke="none" stroke-width="0"></rect>
            <circle cx="4" cy="4" r="3" fill="#f6f6f6" stroke="none" stroke-width="0" />
         </g>
        */
        this.e = {
            circle1: { name: 'circle1', type: 'circle', o_cx: 4, o_cy: 4, cx: 4, cy: 4, r: 3, fill: o.fill, stroke: 'none', strokeWidth: 0 },
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'circle', name: 'circle1', attr: { fill: o.color } });
    }
};
app.comp.singleline.SynchronousGenerator = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 36;
        o.componentType = 'SynchronousGenerator';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="36" fill="#ff0000" stroke="none" stroke-width="0"></rect>
             <circle cx="18" cy="18" r="16" fill="none" stroke="#f6f6f6" stroke-width="1" />
             <text x="8" y="22" font-size="14" font-family="Verdana" fill="#f6f6f6" stroke="none" stroke-width="0">SG</text>
             <text x="14" y="30" font-size="12" font-family="Verdana" fill="#f6f6f6" stroke="none" stroke-width="0">~</text>
         </g>
        */
        this.e = {
            circle1: { name: 'circle1', type: 'circle', o_cx: 18, o_cy: 18, cx: 18, cy: 18, r: 16, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            text1: { name: 'text1', type: 'text', o_x: 8, o_y: 22, x: 8, y: 22, content: 'SG', fontSize: 14, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 },
            text2: { name: 'text2', type: 'text', o_x: 14, o_y: 30, x: 14, y: 30, content: '~', fontSize: 12, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 }
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'circle', name: 'circle1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'text', name: 'text1', attr: { fill: o.color } });
        this._setSubElementAttr({ type: 'text', name: 'text2', attr: { fill: o.color } });
    }
};
app.comp.singleline.AcVoltage = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 36;
        o.componentType = 'AcVoltage';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="36" fill="#ff0000" stroke="none" stroke-width="0"></rect>
             <circle cx="18" cy="18" r="16" fill="none" stroke="#f6f6f6" stroke-width="1" />
             <text x="13" y="14" font-size="14" font-family="Verdana" fill="#f6f6f6" stroke="none" stroke-width="0">~</text>
             <text x="12" y="28" font-size="18" font-family="Verdana" fill="#f6f6f6" stroke="none" stroke-width="0">V</text>
         </g>
        */
        this.e = {
            circle1: { name: 'circle1', type: 'circle', o_cx: 18, o_cy: 18, cx: 18, cy: 18, r: 16, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            text1: { name: 'text1', type: 'text', o_x: 13, o_y: 14, x: 13, y: 14, content: '~', fontSize: 14, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 },
            text2: { name: 'text2', type: 'text', o_x: 12, o_y: 28, x: 12, y: 28, content: 'V', fontSize: 18, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 }
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'circle', name: 'circle1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'text', name: 'text1', attr: { fill: o.color } });
        this._setSubElementAttr({ type: 'text', name: 'text2', attr: { fill: o.color } });
    }
};
app.comp.singleline.StaticGenerator = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 36;
        o.componentType = 'StaticGenerator';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
            <rect x="0" y="0" width="36" height="36" fill="#ff0000" stroke="none" stroke-width="0"></rect>
            <circle cx="18" cy="18" r="16" fill="none" stroke="#f6f6f6" stroke-width="1" />
            <line x1="8" y1="10" x2="29" y2="10" fill="none" stroke="#f6f6f6" stroke-width="1" />
            <!-- M[x1] [y1] L[x2] [y2] L[x3] [y3] Z -->
            <path d="M8 26 L18 26 L13 10 Z" fill="none" stroke="#f6f6f6" stroke-width="1" />
            <!-- M[x1] [y1] L[x2] [y2] L[x3] [y3] Z -->
            <path d="M18 10 L23 26 L28 10 Z" fill="none" stroke="#f6f6f6" stroke-width="1" />
            <line x1="8" y1="26" x2="29" y2="26" fill="none" stroke="#f6f6f6" stroke-width="1" />
         </g>
        */
        this.e = {
            circle1: { name: 'circle1', type: 'circle', o_cx: 18, o_cy: 18, cx: 18, cy: 18, r: 16, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line1: { name: 'line1', type: 'line', o_x1: 8, o_y1: 10, o_x2: 29, o_y2: 10, x1: 8, y1: 10, x2: 29, y2: 10, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            path1: {
                name: 'path1', type: 'path', o_x1: 8, o_y1: 26, o_x2: 18, o_y2: 26, o_x3: 13, o_y3: 10, x1: 8, y1: 26, x2: 18, y2: 26, x3: 13, y3: 10,
                format: { d: 'M[x1] [y1] L[x2] [y2] L[x3] [y3] Z' },
                fill: 'none', stroke: o.stroke, strokeWidth: 1
            },
            path2: {
                name: 'path2', type: 'path', o_x1: 18, o_y1: 10, o_x2: 23, o_y2: 26, o_x3: 28, o_y3: 10, x1: 18, y1: 10, x2: 23, y2: 26, x3: 28, y3: 10,
                format: { d: 'M[x1] [y1] L[x2] [y2] L[x3] [y3] Z' },
                fill: 'none', stroke: o.stroke, strokeWidth: 1
            },
            line2: { name: 'line2', type: 'line', o_x1: 8, o_y1: 26, o_x2: 29, o_y2: 26, x1: 8, y1: 26, x2: 29, y2: 26, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'circle', name: 'circle1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'path', name: 'path1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'path', name: 'path2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
    }
};
app.comp.singleline.SeriesCapacitor = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'SeriesCapacitor';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="35" style="stroke-width:1" />
                <line x1="4" y1="36" x2="32" y2="36" style="stroke-width:1" />
                <line x1="4" y1="44" x2="32" y2="44" style="stroke-width:1" />
                <line x1="18" y1="45" x2="18" y2="80" style="stroke-width:1" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 35, x1: 18, y1: 0, x2: 18, y2: 35, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line2: { name: 'line2', type: 'line', o_x1: 4, o_y1: 36, o_x2: 32, o_y2: 36, x1: 4, y1: 36, x2: 32, y2: 36, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line3: { name: 'line3', type: 'line', o_x1: 4, o_y1: 44, o_x2: 32, o_y2: 44, x1: 4, y1: 44, x2: 32, y2: 44, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line4: { name: 'line4', type: 'line', o_x1: 18, o_y1: 45, o_x2: 18, o_y2: 80, x1: 18, y1: 45, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 }
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line3', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line4', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Transformer = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'Transformer';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="15" style="stroke-width:1" />
                <circle cx="18" cy="30" r="16" stroke-width="1" fill="none" />
                <circle cx="18" cy="50" r="16" stroke-width="1" fill="none" />
                <line x1="18" y1="65" x2="18" y2="80" style="stroke-width:1" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 15, x1: 18, y1: 0, x2: 18, y2: 15, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            circle1: { name: 'circle1', type: 'circle', o_cx: 18, o_cy: 30, cx: 18, cy: 30, r: 16, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            circle2: { name: 'circle2', type: 'circle', o_cx: 18, o_cy: 50, cx: 18, cy: 50, r: 16, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line2: { name: 'line2', type: 'line', o_x1: 18, o_y1: 65, o_x2: 18, o_y2: 80, x1: 18, y1: 65, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 }
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'circle', name: 'circle1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'circle', name: 'circle2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Load = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'Load';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                 <line x1="18" y1="0" x2="18" y2="43" style="stroke-width:1" />
                 <path d="M4 44 L18 80 L32 44 Z" fill="none" stroke-width="1" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 43, x1: 18, y1: 0, x2: 18, y2: 43, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            path1: {
                name: 'path1', type: 'path', o_x1: 4, o_y1: 44, o_x2: 18, o_y2: 80, o_x3: 32, o_y3: 44, x1: 4, y1: 44, x2: 18, y2: 80, x3: 32, y3: 44,
                format: { d: 'M[x1] [y1] L[x2] [y2] L[x3] [y3] Z' },
                fill: 'none', stroke: o.stroke, strokeWidth: 1
            },
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'path', name: 'path1', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Line = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'Line';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="44" style="stroke-width:1" />
                <line x1="8" y1="44" x2="18" y2="64" style="stroke-width:1" />
                <line x1="18" y1="64" x2="28" y2="44" style="stroke-width:1" />
                <line x1="8" y1="60" x2="18" y2="80" style="stroke-width:1" />
                <line x1="18" y1="80" x2="28" y2="60" style="stroke-width:1" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 44, x1: 18, y1: 0, x2: 18, y2: 44, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line2: { name: 'line2', type: 'line', o_x1: 8, o_y1: 44, o_x2: 18, o_y2: 64, x1: 8, y1: 44, x2: 18, y2: 64, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line3: { name: 'line3', type: 'line', o_x1: 18, o_y1: 64, o_x2: 28, o_y2: 44, x1: 18, y1: 64, x2: 28, y2: 44, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line4: { name: 'line4', type: 'line', o_x1: 8, o_y1: 60, o_x2: 18, o_y2: 80, x1: 8, y1: 60, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line5: { name: 'line5', type: 'line', o_x1: 18, o_y1: 80, o_x2: 28, o_y2: 60, x1: 18, y1: 80, x2: 28, y2: 60, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line3', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line4', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line5', attr: { stroke: o.color } });
    }
};
app.comp.singleline.AutoTransformer = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'AutoTransformer';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="24" style="stroke-width:1" />
                <path d="M18,24 a1,1 0 0,10 32,0" fill="none" stroke-width="1" />
                <circle cx="18" cy="46" r="10" stroke-width="1" fill="none" />
                <line x1="18" y1="56" x2="18" y2="80" style="stroke-width:1" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 25, x1: 18, y1: 0, x2: 18, y2: 25, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            path1: {
                name: 'path1', type: 'path', o_x1: 18, o_y1: 24, x1: 18, y1: 24,
                format: { d: 'M[x1],[y1] a1,1 0 0,10 32,0' },
                fill: 'none', stroke: o.stroke, strokeWidth: 1
            },
            circle1: { name: 'circle1', type: 'circle', o_cx: 18, o_cy: 46, cx: 18, cy: 46, r: 10, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line2: { name: 'line2', type: 'line', o_x1: 18, o_y1: 56, o_x2: 18, o_y2: 80, x1: 18, y1: 56, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'path', name: 'path1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'circle', name: 'circle1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
    }
};
app.comp.singleline.ShuntReactor = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'ShuntReactor';
        super(o);
        /*
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="49" style="stroke-width:1;" />
                <line x1="2" y1="50" x2="19" y2="50" style="stroke-width:1" />
                <path d="M18,66 a16,16 0 1,0 -16,-16" fill="none" stroke-width="1" />
                <line x1="18" y1="66" x2="18" y2="80" style="stroke-width:1;" />
                <line x1="8" y1="80" x2="28" y2="80" style="stroke-width:1" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 49, x1: 18, y1: 0, x2: 18, y2: 49, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line2: { name: 'line2', type: 'line', o_x1: 2, o_y1: 50, o_x2: 19, o_y2: 50, x1: 2, y1: 50, x2: 19, y2: 50, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            path1: {
                name: 'path1', type: 'path', o_x1: 18, o_y1: 66, x1: 18, y1: 66,
                format: { d: 'M[x1],[y1] a16,16 0 1,0 -16,-16' },
                fill: 'none', stroke: o.stroke, strokeWidth: 1
            },
            line3: { name: 'line3', type: 'line', o_x1: 18, o_y1: 66, o_x2: 18, o_y2: 79, x1: 18, y1: 66, x2: 18, y2: 79, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            line4: { name: 'line4', type: 'line', o_x1: 8, o_y1: 80, o_x2: 28, o_y2: 80, x1: 8, y1: 70, x2: 28, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
        };
        super._create_from_e();
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'path', name: 'path1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line3', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line4', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Disconnector = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, type:'close/open', rotate:false, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'Disconnector';
        super(o);
        this.type = o.type;
        /* <!-- rotate:false -->
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="20" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="20" x2="18" y2="39" stroke="#f6f6f6" stroke-width="1" style="display:none" />
                <line x1="18" y1="20" x2="26" y2="39" stroke="#f6f6f6" stroke-width="1" style="display:block" />
                <line x1="14" y1="40" x2="22" y2="40" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="41" x2="18" y2="80" stroke="#f6f6f6" stroke-width="1" />
            </g>
        */
        /* <!-- rotate:true -->
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="60" x2="18" y2="80" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="41" x2="18" y2="60" stroke="#f6f6f6" stroke-width="1" style="display:none" />
                <line x1="10" y1="41" x2="18" y2="60" stroke="#f6f6f6" stroke-width="1" style="display:block" />
                <line x1="14" y1="40" x2="22" y2="40" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="0" x2="18" y2="39" stroke="#f6f6f6" stroke-width="1" />
            </g>
        */
        this.e = {};
        if (o.rotate) {
            this.e.line1 = { name: 'line1', type: 'line', o_x1: 18, o_y1: 60, o_x2: 18, o_y2: 80, x1: 18, y1: 0, x2: 18, y2: 20, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line2 = {
                name: 'line2', type: 'line', o_x1: 18, o_y1: 41, o_x2: 18, o_y2: 60, x1: 18, y1: 20, x2: 18, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'none' }
            };
            this.e.line3 = {
                name: 'line3', type: 'line', o_x1: 10, o_y1: 41, o_x2: 18, o_y2: 60, x1: 18, y1: 20, x2: 26, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'block' }
            };
            this.e.line4 = { name: 'line4', type: 'line', o_x1: 14, o_y1: 40, o_x2: 22, o_y2: 40, x1: 14, y1: 40, x2: 22, y2: 40, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line5 = { name: 'line5', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 39, x1: 18, y1: 41, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
        } else {
            this.e.line1 = { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 20, x1: 18, y1: 0, x2: 18, y2: 20, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line2 = {
                name: 'line2', type: 'line', o_x1: 18, o_y1: 20, o_x2: 18, o_y2: 39, x1: 18, y1: 20, x2: 18, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'none' }
            };
            this.e.line3 = {
                name: 'line3', type: 'line', o_x1: 18, o_y1: 20, o_x2: 26, o_y2: 39, x1: 18, y1: 20, x2: 26, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'block' }
            };
            this.e.line4 = { name: 'line4', type: 'line', o_x1: 14, o_y1: 40, o_x2: 22, o_y2: 40, x1: 14, y1: 40, x2: 22, y2: 40, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line5 = { name: 'line5', type: 'line', o_x1: 18, o_y1: 41, o_x2: 18, o_y2: 80, x1: 18, y1: 41, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
        }
        super._create_from_e();
        this.setType({ type: o.type });
    }
    //o={type:'close/open'}
    setType(o) {
        this.type = o.type;
        if (o.type === 'close') {
            super._setSubElementCss({ type: this.e.line2.type, name: this.e.line2.name, style: { display: 'block' } });
            super._setSubElementCss({ type: this.e.line3.type, name: this.e.line3.name, style: { display: 'none' } });
        } else {
            super._setSubElementCss({ type: this.e.line2.type, name: this.e.line2.name, style: { display: 'none' } });
            super._setSubElementCss({ type: this.e.line3.type, name: this.e.line3.name, style: { display: 'block' } });
        }
    }
    setLocation(o) {
        super.setLocation(o);
        this.setType({ type: this.type });
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line3', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line4', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line5', attr: { stroke: o.color } });
    }
};
app.comp.singleline.CircuitBreaker = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, type:'close/open', rotate:false, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 36;
        o.height = 80;
        o.componentType = 'CircuitBreaker';
        super(o);
        this.type = o.type;
        /* <!-- rotate:false -->
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="0" x2="18" y2="20" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="20" x2="18" y2="39" stroke="#f6f6f6" stroke-width="1" style="display:none" />
                <line x1="18" y1="20" x2="26" y2="39" stroke="#f6f6f6" stroke-width="1" style="display:block" />
                <line x1="14" y1="37" x2="22" y2="41" stroke="#f6f6f6" stroke-width="1" />
                <line x1="14" y1="41" x2="22" y2="37" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="41" x2="18" y2="80" stroke="#f6f6f6" stroke-width="1" />
            </g>
        */
        /* <!-- rotate:true -->
         <g fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="36" height="80" fill="#ff0000" stroke="none" stroke-width="0"></rect>
                <line x1="18" y1="60" x2="18" y2="80" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="41" x2="18" y2="60" stroke="#f6f6f6" stroke-width="1" style="display:none" />
                <line x1="10" y1="41" x2="18" y2="60" stroke="#f6f6f6" stroke-width="1" style="display:block" />
                <line x1="14" y1="37" x2="22" y2="41" stroke="#f6f6f6" stroke-width="1" />
                <line x1="14" y1="41" x2="22" y2="37" stroke="#f6f6f6" stroke-width="1" />
                <line x1="18" y1="0" x2="18" y2="39" stroke="#f6f6f6" stroke-width="1" />
            </g>
        */
        this.e = {};
        if (o.rotate) {
            this.e.line1 = { name: 'line1', type: 'line', o_x1: 18, o_y1: 60, o_x2: 18, o_y2: 80, x1: 18, y1: 0, x2: 18, y2: 20, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line2 = {
                name: 'line2', type: 'line', o_x1: 18, o_y1: 41, o_x2: 18, o_y2: 60, x1: 18, y1: 20, x2: 18, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'none' }
            };
            this.e.line3 = {
                name: 'line3', type: 'line', o_x1: 10, o_y1: 41, o_x2: 18, o_y2: 60, x1: 18, y1: 20, x2: 26, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'block' }
            };
            this.e.line4 = { name: 'line4', type: 'line', o_x1: 14, o_y1: 37, o_x2: 22, o_y2: 41, x1: 14, y1: 37, x2: 22, y2: 41, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line5 = { name: 'line5', type: 'line', o_x1: 14, o_y1: 41, o_x2: 22, o_y2: 37, x1: 14, y1: 41, x2: 22, y2: 37, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line6 = { name: 'line6', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 39, x1: 18, y1: 41, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
        } else {
            this.e.line1 = { name: 'line1', type: 'line', o_x1: 18, o_y1: 0, o_x2: 18, o_y2: 20, x1: 18, y1: 0, x2: 18, y2: 20, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line2 = {
                name: 'line2', type: 'line', o_x1: 18, o_y1: 20, o_x2: 18, o_y2: 39, x1: 18, y1: 20, x2: 18, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'none' }
            };
            this.e.line3 = {
                name: 'line3', type: 'line', o_x1: 18, o_y1: 20, o_x2: 26, o_y2: 39, x1: 18, y1: 20, x2: 26, y2: 39, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'block' }
            };
            this.e.line4 = { name: 'line4', type: 'line', o_x1: 14, o_y1: 37, o_x2: 22, o_y2: 41, x1: 14, y1: 37, x2: 22, y2: 41, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line5 = { name: 'line5', type: 'line', o_x1: 14, o_y1: 41, o_x2: 22, o_y2: 37, x1: 14, y1: 41, x2: 22, y2: 37, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
            this.e.line6 = { name: 'line6', type: 'line', o_x1: 18, o_y1: 41, o_x2: 18, o_y2: 80, x1: 18, y1: 41, x2: 18, y2: 80, fill: 'none', stroke: o.stroke, strokeWidth: 1 };
        }
        super._create_from_e();
        this.setType({ type: o.type });
    }
    //o={type:'close/open'}
    setType(o) {
        this.type = o.type;
        if (o.type === 'close') {
            super._setSubElementCss({ type: this.e.line2.type, name: this.e.line2.name, style: { display: 'block' } });
            super._setSubElementCss({ type: this.e.line3.type, name: this.e.line3.name, style: { display: 'none' } });
        } else {
            super._setSubElementCss({ type: this.e.line2.type, name: this.e.line2.name, style: { display: 'none' } });
            super._setSubElementCss({ type: this.e.line3.type, name: this.e.line3.name, style: { display: 'block' } });
        }
    }
    setLocation(o) {
        super.setLocation(o);
        this.setType({ type: this.type });
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line2', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line3', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line4', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line5', attr: { stroke: o.color } });
        this._setSubElementAttr({ type: 'line', name: 'line6', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Connection = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', i: {component: null, position:'top/bottom/left/right'}, j: {component: null, position:'top/bottom/left/right'}, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        //o.width = 36;
        //o.height = 80;
        o.x = undefined;
        o.y = undefined;
        o.componentType = 'Connection';
        super(o);
        this.i = o.i;
        this.j = o.j;
        /* 
         <g fill="#f6f6f6" stroke="#f6f6f6">
                <line x1="0" y1="0" x2="0" y2="20" stroke="#f6f6f6" stroke-width="1" />
                <line x1="0" y1="20" x2="20" y2="20" stroke="#f6f6f6" stroke-width="1" style="display:none" />
            </g>
        */
        this.e = {
            line1: { name: 'line1', type: 'line', o_x1: 0, o_y1: 0, o_x2: 0, o_y2: 20, x1: 0, y1: 0, x2: 0, y2: 0, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
            //line2: {
            //    name: 'line2', type: 'line', o_x1: 0, o_y1: 20, o_x2: 20, o_y2: 20, x1: 0, y1: 0, x2: 0, y2: 0, fill: 'none', stroke: o.stroke, strokeWidth: 1, style: { display: 'none' }
            //}
        };

        super._create_from_e();
        this.setLocation();
    }
    setLocation() {
        // o={position:'top/bottom/left/right'}
        var ip = this.i.component.getConnectionLocation({ position: this.i.position });
        var jp = this.j.component.getConnectionLocation({ position: this.j.position });

        if (this.i.component.componentType == 'Busbar') {
            ip.x = jp.x;
            if (this.j.component.x < this.i.component.x) {
                ip.x = this.i.component.x;
            } else if (this.j.component.x > this.i.component.x + this.i.component.width) {
                ip.x = this.i.component.x + this.i.component.width;
            }
        }
        if (this.j.component.componentType == 'Busbar') {
            jp.x = ip.x;
            if (this.i.component.x < this.j.component.x) {
                jp.x = this.j.component.x;
            } else if (this.i.component.x > this.j.component.x + this.j.component.width) {
                jp.x = this.j.component.x + this.j.component.width;
            }
        }

        //
        // o={type:'', name:'', attr:{}}
        super._setSubElementAttr({ type: this.e.line1.type, name: this.e.line1.name, attr: { x1: ip.x, y1: ip.y, x2: jp.x, y2: jp.y } });
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'line', name: 'line1', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Indicator = class extends app.comp.singleline.Component {
    // o={diagram:'', name:'', x:0, y:0, related:{componentType:'', objectId:null}, values:{'field':'--.--'}, rotate:false, strokeWidth:1, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data:{}, click:null }
    constructor(o) {
        o.width = 110; //90
        //o.height = 84;
        o.componentType = 'Indicator';

        if (o.values === undefined || o.values === null) {
            o.values = {};
            var v = '--.--';
            if (o.component.componentType === 'Busbar') {
                o.values.V = v;
                o.values.VoltageAngle = v;
                //o.values.VoltageDrop = v;
                //o.values.Frequency = v;
            } else if (o.component.componentType === 'Line') {
                //o.values.Loading = v;
                //o.values.Loss = v;
                //o.values.ActiveCurrentPrimary = v;
                //o.values.ActiveCurrentSecondary = v;
                o.values.PPTransferred = v;
                //o.values.SPTransferred = v;
                o.values.PReactiveTransferred = v;
                //o.values.SReactiveTransferred = v;
            } else if (o.component.componentType === 'Load') {
                o.values.P = v;
                o.values.Q = v;
                o.values.I = v;
            } else if (o.component.componentType === 'StaticGenerator' || o.component.componentType === 'SynchronousGenerator') {
                o.values.P = v;
                o.values.Q = v;
                o.values.I = v;
                o.values.Loading = v;
            } else if (o.component.componentType === 'Disconnector' || o.component.componentType === 'CircuitBreaker') {
                o.values.OutofService = v;
                o.values.Control = v;
            } else if (o.component.componentType === 'Transformer' || o.component.componentType === 'AutoTransformer') {
                o.values.Loading = v;
                o.values.PrimaryP = v;
                o.values.SecondaryP = v;
                o.values.PrimaryQ = v;
                o.values.SecondaryQ = v;
                o.values.TapPositionControl = v;
                o.values.TapPosition = v;
            }
        }

        //o.height = o.values.length * 10;

        var h = 4;
        for (var key in o.values) {
            h = h + 12;
        }
        o.height = h;

        super(o);
        this.values = o.values;
        this.component = o.component;

        //this.componentId = o.componentId;
        /* 
         <g id="g" fill="#f6f6f6" stroke="#f6f6f6">
             <rect x="0" y="0" width="80" height="84" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="0"></rect>
             <text x="4" y="10" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field1: 0000.00</text>
             <text x="4" y="20" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field2: 0000.00</text>
             <text x="4" y="30" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field3: 0000.00</text>
             <text x="4" y="40" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field4: 0000.00</text>
             <text x="4" y="50" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field5: 0000.00</text>
             <text x="4" y="60" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field6: 0000.00</text>
             <text x="4" y="70" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field7: 0000.00</text>
             <text x="4" y="80" font-size="8" font-family="Verdana" fill="#000" stroke="none" stroke-width="0">Field8: 0000.00</text>
         </g>
        */
        this.e = {
            //rect1: { name: 'rect1', type: 'rect', o_x: o.x, o_y: o.y, x: o.x, y: o.y, width: o.width, height: o.height, fill: o.fill, stroke: o.stroke, strokeWidth: o.strokeWidth },
            rect1: { name: 'rect1', type: 'rect', o_x: 0, o_y: 0, x: 0, y: 0, width: o.width, height: o.height, fill: 'none', stroke: o.stroke, strokeWidth: o.strokeWidth },
        };
        //rect1: { name: 'rect1', type: 'rect', o_x: 0, o_y: 0, x: 0, y: 0, width: o.width, height: o.height, fill: o.fill, stroke: 'none', strokeWidth: 0 },
        //text1: { name: 'text1', type: 'text', o_x: 13, o_y: 14, x: 13, y: 14, content: '~', fontSize: 14, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 },

        //for (var i = 0; i < o.values.length; i++) {
        //    this.e[o.values[i].field] = o.values[i].value;
        //}
        // values={'field':'--.--'}

        //this.e = {
        //    circle1: { name: 'circle1', type: 'circle', o_cx: 18, o_cy: 18, cx: 18, cy: 18, r: 16, fill: 'none', stroke: o.stroke, strokeWidth: 1 },
        //    text1: { name: 'text1', type: 'text', o_x: 13, o_y: 14, x: 13, y: 14, content: '~', fontSize: 14, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 },
        //    text2: { name: 'text2', type: 'text', o_x: 12, o_y: 28, x: 12, y: 28, content: 'V', fontSize: 18, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 }
        //};

        if (o.values === undefined || o.values === null) {
            o.values = {};
            var v = '--.--';
            if (o.component.componentType === 'Busbar') {
                o.values.V = v;
                o.values.VoltageAngle = v;
                o.values.VoltageDrop = v;
                o.values.Frequency = v;
            }
        }

        var oy = 10;
        for (var key in o.values) {
            var ut = app.parameter.unitType[key];
            var content = ut.title + ': ' + o.values[key] + ' ' + ut.unit;
            this.e[key] = { name: key, type: 'text', o_x: 4, o_y: oy, x: 4, y: oy, content: content, fontSize: 10, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 };
            oy = oy + 12;
        }

        super._create_from_e();

        this.setLocation({ x: o.x, y: o.y });
    }
    // o={values:{'field':null}}
    setValues(o) {
        //console.log(o);
        var self = this;
        self.values = o.values;
        for (var key in self.values) {
            //console.log(key);
            var ut = app.parameter.unitType[key];
            if (ut === undefined)
                continue;
            var content = ut.title + ': ' + self.values[key] + ' ' + ut.unit;
            //console.log(content);
            this.setText({ name: key, content: content });
            //this.e[key] = { name: key, type: 'text', o_x: 4, o_y: oy, x: 4, y: oy, content: content, fontSize: 10, fontName: 'Verdana', fill: o.fill, stroke: 'none', strokeWidth: 0 };
            //oy = oy + 12;
        }
    }
    resize() {
        //
    }
    // o={x:0, y:0}
    setLocation(o) {
        super.setLocation(o);
    }
    // o={color:'#f6f6f6'}
    setColor(o) {
        this._setSubElementAttr({ type: 'rect', name: 'rect1', attr: { stroke: o.color } });
    }
};
app.comp.singleline.Diagram = class {
    /* o={ diagram:'', name:'', interval:3000,  editable:false, stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', scale:1, scaleChanged: null,
       componentMoved: null} */
    constructor(o) {
        this.diagram = o.diagram;
        this.canvas = app.utility.generateUUID();
        this.editable = o.editable;
        this.stroke = o.stroke;
        this.fill = o.fill;
        this.background = o.background;
        this.scale = o.scale;
        this.scaleChanged = o.scaleChanged;
        this.componentMoved = o.componentMoved;
        this.components = [];
        this.connections = [];
        this.indicators = [];
        this.selectedComponentD = null;
        this.selectedComponentDConnections = [];
        this.selectedComponent = null;
        this.def_canvas_w = $('#' + o.diagram).width()
        this.def_canvas_h = $('#' + o.diagram).height()
        this.status = [];
        this.interval = o.interval != undefined && o.interval != null ? o.interval : 3000;
        this.timer = null;

        $('#' + o.diagram).html('<svg id="' + this.canvas + '" style="background-color:' + o.background + ';" transform="scale(' + o.scale + ')">');

        if (this.editable) {
            $('#' + this.canvas).addClass('singleline-diagram-canvas-editor');
            this.initEditable();
        } else {
            $('#' + this.canvas).addClass('singleline-diagram-canvas-view');
            $('#' + this.canvas).parent().css({ cursor: 'not-allowed' });
            $('#' + this.canvas).css({ cursor: 'grab' });
            $('#' + this.canvas).on('mousedown', function () {
                $(this).css({ cursor: 'grabbing' });

            });
            $('#' + this.canvas).on('mouseup', function () {
                $(this).css({ cursor: 'grab' });

            });
            //.css({ cursor: 'grabbing' });
            this.initView();
        }
    }
    initEditable() {
        var self = this;
        $('#' + this.canvas).on('mousedown', function (evt) {
            //self.selectedComponentD = null;
            //selectedComponentConnections = [];
            var id = $(evt.target).parent().attr('id');
            if (id !== undefined && id !== null) {
                for (var i = 0; i < self.components.length; i++) {
                    if (self.components[i].id === id) {
                        self.selectedComponentD = self.components[i]; break;
                    }
                }
                if (self.selectedComponentD === null) {
                    for (var i = 0; i < self.indicators.length; i++) {
                        if (self.indicators[i].id === id) {
                            self.selectedComponentD = self.indicators[i]; break;
                        }
                    }
                }

                if (self.selectedComponentD === null)
                    return;

                self.selectedComponentD._setCss({ 'cursor': 'move' });
                self.dragStart = {
                    x: evt.offsetX - self.selectedComponentD.x,
                    y: evt.offsetY - self.selectedComponentD.y
                };

                if (self.dragStart.x < 0)
                    self.dragStart.x = self.dragStart.x * -1;
                if (self.dragStart.y < 0)
                    self.dragStart.y = self.dragStart.y * -1;

                for (var i = 0; i < self.connections.length; i++) {
                    if (self.connections[i].i.component.id == self.selectedComponentD.id || self.connections[i].j.component.id == self.selectedComponentD.id) {
                        self.selectedComponentDConnections.push(self.connections[i]);
                    }
                }
            }
        });
        $('#' + this.canvas).on('mousemove', function (evt) {
            if (self.selectedComponentD === null)
                return;
            var loc = { x: 0, y: 0 };
            loc.x = evt.offsetX - self.dragStart.x;
            loc.y = evt.offsetY - self.dragStart.y;
            self.selectedComponentD.setLocation(loc);
            if (self.selectedComponentD.componentType !== 'Indicator') {
                for (var i = 0; i < self.selectedComponentDConnections.length; i++) {
                    self.selectedComponentDConnections[i].setLocation();
                }
                //for (var i = 0; i < self.components.length; i++) {
                //    if (!app.validation.hasKey({ key: 'data', obj: self.components[i] }))
                //        continue;
                //    if (self.components[i].componentType !== 'Busbar' && self.components[i].data.ObjectId === self.selectedComponentD.data.jBusbarId) {
                //        var l = { x: loc.x + (self.selectedComponentD.width / 2), y: loc.y + self.selectedComponentD.height };
                //        self.components[i].setLocation(l);
                //    }
                //}

                for (var i = 0; i < self.indicators.length; i++) {
                    if (self.indicators[i].component.id === self.selectedComponentD.id) {
                        var x = self.selectedComponentD.x + self.selectedComponentD.width + 2;
                        var y = self.selectedComponentD.y;
                        if (self.selectedComponentD.componentType === 'Busbar') {
                            x = self.selectedComponentD.x;
                            y = self.selectedComponentD.y + 2;
                        }
                        self.selectedComponentD.data.IndicatorX = x;
                        self.selectedComponentD.data.IndicatorY = y;
                        self.indicators[i].setLocation({ x: x, y: y });
                        break;
                    }
                }
            } else {
                for (var i = 0; i < self.components.length; i++) {
                    if (self.components[i].id === self.selectedComponentD.component.id) {
                        //console.log(self.components[i].data);
                        self.components[i].data.IndicatorX = loc.x;
                        self.components[i].data.IndicatorY = loc.y;
                        //console.log(self.components[i].data);
                        break;
                    }
                }
                //var c = self.findComponentById(self.selectedComponentD.component.id);
                //if (c === null)
                //    return;

                //c.data.IndicatorX = loc.x;
                //c.data.IndicatorY = loc.y;
                //console.log(c);
            }

        });
        $('#' + this.canvas).on('mouseup', function (evt) {
            if (self.selectedComponentD === undefined || self.selectedComponentD === null)
                return;
            self.selectedComponentD._setCss({ 'cursor': 'hand' });
            if (self.componentMoved !== undefined && self.componentMoved !== null)
                self.componentMoved(self.selectedComponentD);
            self.selectedComponentD = null;
            self.selectedComponentDConnections = [];
            self.resizeCanvas();
        });
        $('#' + this.canvas).on('click', function (evt) {
            var id = $(evt.target).parent().attr('id');
            if (id === undefined || id === null)
                return;
            var c = self.findComponentById(id);
            if (c === undefined || c === null || c.componentType === undefined || c.componentType === null)
                return;
            if (evt.altKey) {
                if (c.componentType === 'Busbar') {
                    c.setSize({ w: c.width + 10 });
                    self.relocateConnections({ component: c });
                }
            } else if (evt.ctrlKey) {
                if (c.componentType === 'Busbar') {
                    if (c.width > 30) {
                        c.setSize({ w: c.width - 10 });
                        self.relocateConnections({ component: c });
                    }
                }
            }

        });
        $('#' + this.canvas).on('dblclick', function (evt) {
            var id = $(evt.target).parent().attr('id');

            if (id === undefined || id === null)
                return;

            var c = self.findComponentById(id);

            if (c === undefined || c == null)
                return;

            if (c.componentType === 'Busbar')
                return;

            if (evt.ctrlKey) {
                self.selectedComponent = c;
                self.reverseConnectionForSelectedComponent();
            } else {
                for (var i = 0; i < self.connections.length; i++) {
                    if (self.connections[i].j.component.id == c.id) {
                        var ip = self.connections[i].i.component.getConnectionLocation({ position: self.connections[i].i.position });
                        var pos = ip;

                        if (c.componentType === 'Node') {
                            if (self.connections[i].i.component.componentType === 'Busbar') {
                                pos.x = c.x;
                                pos.y = pos.y - 5;
                            } else {
                                pos.x = pos.x - 4;
                            }
                        } else {
                            pos.x = pos.x - parseInt(c.width / 2);
                            pos.y = c.y;
                        }
                        self.moveComponent({ component: c, position: pos });
                        break;
                    }
                }
            }
        });
    }
    initView() {
        var self = this;
        var apiCom = new app.api.communication.Engine();
        $('#' + self.canvas).draggable();
        $('#' + self.canvas).on('dblclick', function (evt) {

            // switch
            var id = $(evt.target).parent().attr('id');
            var comp = self.components.find(x => x.id === id);

            if (comp === undefined || comp === null) {
                comp = self.indicators.find(x => x.id === id)
            }

            if (comp === undefined || comp === null)
                return;

            if (comp.componentType === "Disconnector" || comp.componentType === "CircuitBreaker") {
                var dialog = new app.bootstrap.Dialog();
                dialog.question({
                    title: "SingleLine",
                    description: app.lang.confirmProceedText,
                    size: "md",
                    buttons: [
                        {
                            title: app.lang.Yes, color: "primary", dataDismiss: "modal", click: function () {
                                let type = '';
                                let outofService = 0;
                                if (comp.type === 'open') {
                                    type = 'close';
                                    outofService = 1;
                                } else {
                                    outofService = 0;
                                    type = 'open';
                                }

                                //console.log(comp);

                                apiCom.write({
                                    'ForeignKey': comp.data.ForeignKey,
                                    'ObjectType': comp.data.ObjectType,
                                    'SymbolType': comp.data.SymbolType,
                                    'ValueName': 'Control',
                                    'Value': outofService
                                }, function (r) {
                                    if (r.Error) {
                                        console.log(r.Message);
                                        return;
                                    }
                                    comp.setType({ type: type });

                                }, function (err) { });
                            }
                        },
                        { title: app.lang.No, color: "danger", dataDismiss: "modal", click: null }]
                });
            }
            else if (comp.componentType === "Indicator") {

                var valueList = [];
                var i = 0;
                for (var item in comp.values) {
                    var obj = { value: i, text: item };
                    valueList.push(obj);
                    i++;
                }

                comp.chartId = "chrt-" + comp.id;
                var _ddlFieldId = "ddlField-" + comp.id;
                //Modal
                var modal = new app.bootstrap.Modal();
                var _modal = modal.show({
                    title: app.lang.TimeGraphTitleText.append(comp.name), footer: "", hearderColor: "default", buttonColor: "default", size: "lg", shown: null, hidden: null, backdrop: 'static', timeout: undefined,
                    content: "<input id='" + _ddlFieldId + "'/> <div style='width: 770px; height: 460px'> <canvas class='chart-wrapper' id =" + comp.chartId + " ></canvas></div>",
                    buttons: [{
                        title: "Close", color: "danger", dataDismiss: "modal", click: function () {
                            //When close click of modal must be deleted the following variables 
                            comp.chart.destroy();
                            comp.chart = undefined;
                            comp.isModalOpened = false;
                        }
                    }]
                });

                comp.ddlField = $('#' + _ddlFieldId).kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: valueList,
                    enable: false,
                    change: function () {
                        comp.chart.destroy();
                        comp.chart = undefined;
                    }
                }).data("kendoDropDownList");
                comp.isModalOpened = true;
            }
        });

        $('#' + self.canvas).parent().on('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta >= 0) {
                // up
                if (self.scale == 0.1)
                    self.setScale({ scale: 0.2 });
                else if (self.scale == 0.2)
                    self.setScale({ scale: 0.3 });
                else if (self.scale == 0.3)
                    self.setScale({ scale: 0.4 });
                else if (self.scale == 0.4)
                    self.setScale({ scale: 0.5 });
                else if (self.scale == 0.5)
                    self.setScale({ scale: 0.6 });
                else if (self.scale == 0.6)
                    self.setScale({ scale: 0.7 });
                else if (self.scale == 0.7)
                    self.setScale({ scale: 0.8 });
                else if (self.scale == 0.8)
                    self.setScale({ scale: 0.9 });
                else if (self.scale == 0.9)
                    self.setScale({ scale: 1 });
            } else {
                // down
                if (self.scale == 1)
                    self.setScale({ scale: 0.9 });
                else if (self.scale == 0.9)
                    self.setScale({ scale: 0.8 });
                else if (self.scale == 0.8)
                    self.setScale({ scale: 0.7 });
                else if (self.scale == 0.7)
                    self.setScale({ scale: 0.6 });
                else if (self.scale == 0.6)
                    self.setScale({ scale: 0.5 });
                else if (self.scale == 0.5)
                    self.setScale({ scale: 0.4 });
                else if (self.scale == 0.4)
                    self.setScale({ scale: 0.3 });
                else if (self.scale == 0.3)
                    self.setScale({ scale: 0.2 });
                else if (self.scale == 0.2)
                    self.setScale({ scale: 0.1 });
            }
        });
    }
    // o={scale:1}
    setScale(o) {
        this.scale = o.scale;
        let top = 0;
        let left = 0;

        $('#' + this.canvas).attr('transform', 'scale(' + this.scale + ')');

        var rect = $('#' + this.canvas).get(0).getBoundingClientRect();
        left = ($('#' + this.canvas).width() * (100 - this.scale * 100) / 100) / 2;
        top = ($('#' + this.canvas).height() * (100 - this.scale * 100) / 100) / 2;


        $('#' + this.canvas).css({ top: top * -1, left: left * -1 });
        //if (this.scale != 1) {

        //}
        if (this.scaleChanged !== undefined && this.scaleChanged !== null) {
            this.scaleChanged({ scale: this.scale });
        }
    }
    refreshScale() {
        this.setScale({ scale: 1 });
        $('#' + this.canvas).css({ top: 0, left: 0 });
    }
    resizeCanvas() {
        var self = this;
        var w = self.def_canvas_w;
        var h = self.def_canvas_h;
        for (var i = 0; i < self.components.length; i++) {
            var c = self.components[i];
            var tmpW = c.x + c.width + 100;
            var tmpH = c.y + c.height + 100;
            if (w < tmpW)
                w = tmpW;
            if (h < tmpH)
                h = tmpH;
        }
        for (var i = 0; i < self.indicators.length; i++) {
            var c = self.indicators[i];
            var tmpW = c.x + c.width + 100;
            var tmpH = c.y + c.height + 100;
            if (w < tmpW)
                w = tmpW;
            if (h < tmpH)
                h = tmpH;
        }
        $('#' + self.canvas).width(w);
        $('#' + self.canvas).height(h);
    }
    // o={component:null, position:{x:0,y:0}}
    moveComponent(o) {
        var self = this;
        o.component.setLocation(o.position);
        for (var i = 0; i < this.connections.length; i++) {
            if (this.connections[i].i.component.id == o.component.id || this.connections[i].j.component.id == o.component.id) {
                this.connections[i].setLocation();
            }
        }
        if (o.component.componentType !== 'Indicator') {
            for (var i = 0; i < self.indicators.length; i++) {
                if (self.indicators[i].component.id === o.component.id) {
                    var x = o.component.x + o.component.width + 2;
                    var y = o.component.y;
                    if (o.component.componentType === 'Busbar') {
                        x = o.component.x;
                        y = o.component.y + 2;
                    }
                    o.component.data.IndicatorX = x;
                    o.component.data.IndicatorY = y;
                    self.indicators[i].setLocation({ x: x, y: y });
                }
            }
        }
        self.resizeCanvas();
    }
    // o={name:'', componentType: '', data:{ObjectId: null}}
    findComponent(o) {
        var self = this;
        for (var i = 0; i < self.components.length; i++) {
            if (o.name !== undefined) {
                if (self.components[i].name === o.name)
                    return self.components[i];
            } else if (o.data !== undefined) {
                if (o.data.ObjectId !== undefined) {
                    if (self.components[i].data.ObjectId === o.data.ObjectId && self.components[i].componentType === o.componentType)
                        return self.components[i];
                }
            }
        }
        return null;
    }
    findComponentById(id) {
        var self = this;
        for (var i = 0; i < self.components.length; i++) {
            if (self.components[i].id === id)
                return self.components[i];
        }
        return null;
    }
    findIndicatorByComponentId(componentId) {
        self = this;
        for (var i = 0; i < self.indicators.length; i++) {
            if (self.indicators[i].component.id === componentId) {
                return self.indicators[i];
            }
        }
        return null;
    }

    clear() {
        this.components = [];
        this.connections = [];
        this.indicators = [];
        $('#' + this.canvas).empty();
    }
    setComponent(c) {
        self = this;
        for (var i = 0; i < self.components.length; i++) {
            if (self.components[i].id == c.id) {
                self.components[i] = c;
                break;
            }
        }
    }
    setConnection(c) {
        self = this;
        //for (var i = 0; i < self.connections.length; i++) {
        //    if (self.components[i].id == c.id) {
        //        self.components[i] = c; break;
        //    }
        //}
    }
    // o={component:null}
    relocateConnections(o) {
        for (var i = 0; i < this.connections.length; i++) {
            if (this.connections[i].i.component.id == o.component.id || this.connections[i].j.component.id == o.component.id) {
                this.connections[i].setLocation();
            }
        }
    }
    // o={componentType:'Busbar', x:0, y:0, width:300, type:'open/close', stroke:'#f6f6f6', fill:'#f6f6f6', background:'#1d2228', data: {}}
    add(o) {
        var self = this;
        var c = null;
        var attr = {
            x: o.data.x,
            y: o.data.y,
            width: o.width,
            type: o.type,
            name: o.name,
            diagram: '#' + self.canvas,
            data: o.data,
            stroke: o.stroke !== undefined ? o.stroke : self.stroke,
            fill: o.fill !== undefined ? o.fill : self.fill,
            background: o.background !== undefined ? o.background : self.background,
            action: {
                mouseEnter: { stroke: '#40E0D0', fill: '#40E0D0', background: '#1d2228' }
            }
        };
        if (o.componentType === 'Busbar') {
            c = new app.comp.singleline.Busbar(attr);
        } else if (o.componentType === 'Node') {
            c = new app.comp.singleline.Node(attr);
        } else if (o.componentType === 'SynchronousGenerator') {
            c = new app.comp.singleline.SynchronousGenerator(attr);
        } else if (o.componentType === 'AcVoltage') {
            c = new app.comp.singleline.AcVoltage(attr);
        } else if (o.componentType === 'StaticGenerator') {
            c = new app.comp.singleline.StaticGenerator(attr);
        } else if (o.componentType === 'SeriesCapacitor') {
            c = new app.comp.singleline.SeriesCapacitor(attr);
        } else if (o.componentType === 'Transformer') {
            c = new app.comp.singleline.Transformer(attr);
        } else if (o.componentType === 'Load') {
            c = new app.comp.singleline.Load(attr);
        } else if (o.componentType === 'Line') {
            c = new app.comp.singleline.Line(attr);
        } else if (o.componentType === 'AutoTransformer') {
            c = new app.comp.singleline.AutoTransformer(attr);
        } else if (o.componentType === 'ShuntReactor') {
            c = new app.comp.singleline.ShuntReactor(attr);
        } else if (o.componentType === 'Disconnector') {
            c = new app.comp.singleline.Disconnector(attr);
        } else if (o.componentType === 'CircuitBreaker') {
            c = new app.comp.singleline.CircuitBreaker(attr);
        }

        self.components.push(c);

        if (o.componentType === 'Busbar') {
            if (o.data.IndicatorVisible === 1)
                self.addIndicator({
                    x: o.data.IndicatorX,
                    y: o.data.IndicatorY,
                    component: c,
                    stroke: o.stroke !== undefined ? o.stroke : self.stroke,
                    fill: o.fill !== undefined ? o.fill : self.fill,
                    background: o.background !== undefined ? o.background : self.background,
                });
        } else if (o.componentType === 'Line') {
            if (o.data.IndicatorVisible === 1)
                self.addIndicator({
                    x: o.data.IndicatorX,
                    y: o.data.IndicatorY,
                    component: c,
                    stroke: o.stroke !== undefined ? o.stroke : self.stroke,
                    fill: o.fill !== undefined ? o.fill : self.fill,
                    background: o.background !== undefined ? o.background : self.background,
                });
        } else if (o.componentType === 'Load') {
            if (o.data.IndicatorVisible === 1)
                self.addIndicator({
                    x: o.data.IndicatorX,
                    y: o.data.IndicatorY,
                    component: c,
                    stroke: o.stroke !== undefined ? o.stroke : self.stroke,
                    fill: o.fill !== undefined ? o.fill : self.fill,
                    background: o.background !== undefined ? o.background : self.background,
                });
        } else if (o.componentType === 'StaticGenerator' || o.componentType === 'SynchronousGenerator') {
            if (o.data.IndicatorVisible === 1)
                self.addIndicator({
                    x: o.data.IndicatorX,
                    y: o.data.IndicatorY,
                    component: c,
                    stroke: o.stroke !== undefined ? o.stroke : self.stroke,
                    fill: o.fill !== undefined ? o.fill : self.fill,
                    background: o.background !== undefined ? o.background : self.background,
                });
        } else if (o.componentType === 'Transformer' || o.componentType === 'AutoTransformer') {
            if (o.data.IndicatorVisible === 1)
                self.addIndicator({
                    x: o.data.IndicatorX,
                    y: o.data.IndicatorY,
                    component: c,
                    stroke: o.stroke !== undefined ? o.stroke : self.stroke,
                    fill: o.fill !== undefined ? o.fill : self.fill,
                    background: o.background !== undefined ? o.background : self.background,
                });
        }
        else if (o.componentType === 'Disconnector' || o.componentType === 'CircuitBreaker') {
            if (o.data.IndicatorVisible === 1)
                self.addIndicator({
                    x: o.data.IndicatorX,
                    y: o.data.IndicatorY,
                    component: c,
                    stroke: o.stroke !== undefined ? o.stroke : self.stroke,
                    fill: o.fill !== undefined ? o.fill : self.fill,
                    background: o.background !== undefined ? o.background : self.background,
                });
        }

        return c;
    }
    // o={i:{name:'', position: 'top/bottom/left/right'}, j:{name:'', position:'top/bottom/left/right'}}
    addConnection(o) {
        self = this;
        var c = new app.comp.singleline.Connection({
            name: o.i.name + ' - ' + o.j.name,
            diagram: '#' + self.canvas,
            stroke: o.stroke !== undefined ? o.stroke : self.stroke,
            fill: o.fill !== undefined ? o.fill : self.fill,
            action: {
                mouseEnter: { stroke: '#40E0D0', fill: '#40E0D0', background: '#1d2228' }
            },
            i: { component: self.findComponent({ name: o.i.name }), position: o.i.position },
            j: { component: self.findComponent({ name: o.j.name }), position: o.j.position }
        });
        self.connections.push(c);
    }
    // o={x:0,y:0,component:null, background:'#fff', stroke:'#000', strokeWidth:1}}
    addIndicator(o) {
        self = this;
        var c = new app.comp.singleline.Indicator({
            x: o.x,
            y: o.y,
            name: o.component.name,
            component: o.component,
            diagram: '#' + self.canvas,
            stroke: o.fill,
            fill: o.fill,
            background: o.background !== undefined ? o.background : self.background,
            strokeWidth: 1,
            action: {
                mouseEnter: { stroke: '#40E0D0', fill: '#40E0D0', background: '#1d2228' }
            }
        });
        self.indicators.push(c);
    }
    reverseConnectionForSelectedComponent() {
        self = this;
        var iBusbarId = null;//self.selectedComponent.data.iBusbarId;
        var iPosition = null;//self.selectedComponent.data.iPosition;
        var jBusbarId = null;//self.selectedComponent.data.jBusbarId;
        var jPosition = null;//self.selectedComponent.data.jPosition;
        for (var i = 0; i < self.connections.length; i++) {
            if (self.connections[i].i.component.data.Id === self.selectedComponent.data.Id) {
                if (self.connections[i].i.component.componentType === 'Node' || self.connections[i].i.component.componentType === 'Busbar') {
                    jBusbarId = self.connections[i].i.component.data.ObjectId;

                } else if (self.connections[i].j.component.componentType === 'Node' || self.connections[i].j.component.componentType === 'Busbar') {
                    iBusbarId = self.connections[i].j.component.data.ObjectId;
                }
                var ic = self.connections[i].j;
                var jc = self.connections[i].i;
                ic.position = 'top';
                jc.position = 'bottom';
                iPosition = 0;
                jPosition = 1;
                self.connections[i].i = ic;
                self.connections[i].j = jc;
                self.connections[i].setLocation();
            } else if (self.connections[i].j.component.data.Id === self.selectedComponent.data.Id) {
                if (self.connections[i].i.component.componentType === 'Node' || self.connections[i].i.component.componentType === 'Busbar') {
                    jBusbarId = self.connections[i].i.component.data.ObjectId;
                } else if (self.connections[i].j.component.componentType === 'Node' || self.connections[i].j.component.componentType === 'Busbar') {
                    iBusbarId = self.connections[i].j.component.data.ObjectId;
                }
                var ic = self.connections[i].j;
                var jc = self.connections[i].i;
                ic.position = 'top';
                jc.position = 'bottom';
                iPosition = 0;
                jPosition = 1;
                self.connections[i].i = ic;
                self.connections[i].j = jc;
                self.connections[i].setLocation();
            }
            if (iBusbarId !== null && jBusbarId !== null) {
                break;
            }
        }
        if (iBusbarId !== null && jBusbarId !== null) {
            self.selectedComponent.data.iBusbarId = jBusbarId;
            self.selectedComponent.data.iPosition = iPosition;
            self.selectedComponent.data.jBusbarId = iBusbarId;
            self.selectedComponent.data.jPosition = jPosition;
        }
    }
    drawObjects(vals) {
        var self = this;
        this.clear();
        for (var i = 0; i < vals.length; i++) {
            var v = vals[i];
            if (v.Details !== null) {
                v.Details = eval("(" + v.Details + ")");
            }
            if (v.ObjectType === 0 && v.SymbolType === 7) {
                var stroke = v.OutofService === 0 ? '#f6f6f6' : 'gray';
                self.add({ componentType: 'Busbar', x: v.x, y: v.y, width: v.w, name: v.ObjectName, stroke: stroke, data: v });
            } else if (v.ObjectType === 0 && v.SymbolType === 6) {
                self.add({ componentType: 'Node', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 1) {
                self.add({ componentType: 'Line', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 2) {
                self.add({ componentType: 'Load', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 3) {
                self.add({ componentType: 'StaticGenerator', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 4 && v.SymbolType === 0) {
                var type = v.Details.State === 0 ? 'open' : 'close';
                if (v.Details.Type === 0) {
                    self.add({ componentType: 'Disconnector', x: v.x, y: v.y, name: v.ObjectName, type: type, data: v });
                }
                else if (v.Details.Type === 1) {
                    self.add({ componentType: 'CircuitBreaker', x: v.x, y: v.y, name: v.ObjectName, type: type, data: v });
                }
            } else if (v.ObjectType === 5) {
                self.add({ componentType: 'SynchronousGenerator', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 6) {
                if (v.Details.Type === 0)
                    self.add({ componentType: 'Transformer', x: v.x, y: v.y, name: v.ObjectName, data: v });
                else if (v.Details.Type === 1)
                    self.add({ componentType: 'AutoTransformer', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 7) {
                self.add({ componentType: 'ShuntReactor', x: v.x, y: v.y, name: v.ObjectName, data: v });
            } else if (v.ObjectType === 8) {
                self.add({ componentType: 'SeriesCapacitor', x: v.x, y: v.y, name: v.ObjectName, data: v });
            }
        }
        // add connections
        for (var i = 0; i < self.components.length; i++) {
            var c = self.components[i];

            //if (c.data.Details === undefined || c.data.Details === null)
            //    continue;
            if (c.data.iBusbarId !== undefined && c.data.jBusbarId !== undefined) {
                var ic = self.findComponent({ componentType: 'Node', data: { ObjectId: c.data.iBusbarId } });
                var jc = self.findComponent({ componentType: 'Node', data: { ObjectId: c.data.jBusbarId } });

                if (ic === null) {
                    ic = self.findComponent({ componentType: 'Busbar', data: { ObjectId: c.data.iBusbarId } });
                    //if (ic !== null) {
                    //    var n = diagram.add({ componentType: 'Node', x: ic.x, y: ic.y, name: 'Node_' + ic.name, data: {} });
                    //    diagram.addConnection({ i: { name: ic.name, position: 'bottom' }, j: { name: n.name, position: 'top' } });
                    //    ic = n;
                    //}
                }
                if (jc === null) {
                    jc = self.findComponent({ componentType: 'Busbar', data: { ObjectId: c.data.jBusbarId } });
                    //if (jc !== null) {
                    //    var n = diagram.add({ componentType: 'Node', x: jc.x, y: jc.y, name: 'Node_' + jc.name, data: {} });
                    //    diagram.addConnection({ i: { name: n.name, position: 'bottom' }, j: { name: jc.name, position: 'top' } });
                    //    jc = n;
                    //}
                }

                if (ic !== null) {
                    self.addConnection({ i: { name: ic.name, position: 'bottom' }, j: { name: c.name, position: 'top' } });
                }
                if (jc !== null) {
                    var pos = 'top';
                    if (c.componentType === 'Node' || c.componentType === 'Disconnector' || c.componentType === 'CircuitBreaker' || c.componentType === 'Transformer' || c.componentType === 'AutoTransformer' || c.componentType === 'SeriesCapacitor')
                        pos = 'bottom';

                    self.addConnection({ i: { name: c.name, position: pos }, j: { name: jc.name, position: 'top' } });
                }
            } else if (c.data.iBusbarId !== undefined) {
                var ic = self.findComponent({ componentType: 'Node', data: { ObjectId: c.data.BusbarId } });
                if (ic === null) {
                    ic = self.findComponent({ componentType: 'Busbar', data: { ObjectId: c.data.BusbarId } });
                }
                if (ic !== null) {
                    self.addConnection({ i: { name: ic.name, position: 'bottom' }, j: { name: c.name, position: 'top' } });
                }
            }
        }
        self.resizeCanvas();
        $('g').tooltip({ boundary: 'window' });

        if (!self.editable) {
            //if (self.timer != null)
            //    clearInterval(self.timer);
            //self.timer = setInterval(start, self.interval);
            self.startMonitoring();
        }

        //function start() {
        //    self.startMonitoring(self)
        //}
    }
    beginMonitoring(self) {
        if (self == undefined || self == null)
            self = this;
        if (self.wait === undefined)
            self.wait = true;
        else if (self.wait)
            return;
        var apiSingleLine = new app.api.monitoring.SingleLineObject();
        apiSingleLine.list({
            SiteId: parseInt(self.siteId), Filter: [{ Field: 'SymbolType', Operator: 'neq', Value: 6 }]
        }, function (r) {
            if (r.Error) {
                self.wait = false;
                return;
            }

            for (var i = 0; i < r.Value.length; i++) {
                var obj = r.Value[i];
                var vals = {};
                var hasVal = false;
                for (var key in obj.Values) {
                    hasVal = true;
                    vals[key] = obj.Values[key];
                }
                if (!hasVal)
                    continue;

                // set indicator values
                for (var j = 0; j < self.indicators.length; j++) {
                    var ind = self.indicators[j];
                    if (ind.component.data.ObjectId !== obj.ObjectId || ind.component.data.ObjectType !== obj.ObjectType || ind.component.data.SymbolType !== obj.SymbolType)
                        continue;
                    ind.setValues({ values: vals });

                    //Check the modal of the comp's indicator is opened
                    if (ind.isModalOpened !== undefined && ind.isModalOpened !== null && ind.isModalOpened) {
                        //get the selected field and field's value
                        var selectedField = ind.ddlField.text();
                        var value = vals[selectedField];
                        //check if chart was created
                        if (ind.chart === undefined || ind.chart === null) {
                            var ut = app.parameter.unitType[selectedField]
                            var options = {
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                callback: function (value, index, values) {
                                                    return value + " " + ut.unit;
                                                }
                                            }
                                        }
                                    ]
                                },
                                maintainAspectRatio: false,
                                responsive: true
                            }
                            var labels = [];
                            var values = [];
                            var sn = self.interval / 1000;
                            for (let i = 0; i < 101; i++) {
                                labels.push(i * sn + app.lang.Seconds);
                                values.push(value);
                            }
                            var data = {
                                labels: labels,
                                datasets: [
                                    {
                                        label: selectedField,
                                        fill: false,
                                        lineTension: 0,
                                        backgroundColor: "rgba(57, 139, 247,0.4)",
                                        borderColor: "rgba(57, 139, 247,0.7)",
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: "rgba(57, 139, 247,0.7)",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 1,
                                        pointHoverBackgroundColor: "rgba(57, 139, 247,0.7)",
                                        pointHoverBorderColor: "rgba(220,220,220,0.7)",
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        data: values,
                                        spanGaps: false
                                    }]
                            };
                            ind.chart = new Chart($('#' + ind.chartId), { type: 'line', data: data, options: options });
                            ind.ddlField.enable(true);
                        }
                        else {
                            ind.chart.config.data.datasets[0].data.shift();
                            ind.chart.config.data.datasets[0].data.push(value);
                            ind.chart.update();
                        }

                    }
                }

                //var state = self.findStatus({ self: self, ObjectType: obj.ObjectType, Code: obj.Status[0] });
                //console.log(obj);
                //console.log(state);

                // set component state
                for (var j = 0; j < self.components.length; j++) {
                    //console.log(obj.Values.OutofService);
                    //if (self.components[j].data.ObjectType !== 4)
                    //    continue;

                    if (self.components[j].data.ObjectType === obj.ObjectType && self.components[j].data.ObjectId === obj.ObjectId) {
                        if (obj.Status !== undefined && obj.Status !== null && obj.Status.length > 0) {
                            var state = obj.Status[0];
                            self.components[j].setColor({ color: state.Color });
                            //console.log(state);
                            let dt = new Date(obj.UpdateDate).getUTCDateTime(); // düzelt!!!
                            if (state.Alarm !== null && state.Alarm !== '') {
                                $('#' + self.components[j].id).attr({ 'data-original-title': '<span>' + self.components[j].name + '</span><br/><span><i class="mdi mdi-alert-circle"></i>&nbsp;' + state.Alarm + ' (' + dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString() + ') </span>' });
                            }

                            if (self.components[j].componentType !== "Busbar") {
                                for (var k = 0; k < self.connections.length; k++) {
                                    if (self.connections[k].i.component.data.Id === self.components[j].data.Id || self.connections[k].j.component.data.Id === self.components[j].data.Id) {
                                        self.connections[k].setColor({ color: state.Color });
                                    }
                                }
                            }

                            for (var k = 0; k < self.indicators.length; k++) {
                                var ind = self.indicators[k];
                                if (ind.component.data.ObjectId !== obj.ObjectId || ind.component.data.ObjectType !== obj.ObjectType || ind.component.data.SymbolType !== obj.SymbolType)
                                    continue;
                                ind.setColor({ color: state.Color });
                            }
                        }
                        //self.components[j].setColor({ color: '#ff00ff' });
                    }

                    if (obj.ObjectType === 4) {
                        if (self.components[j].data.ObjectType === 4 && self.components[j].data.ObjectId === obj.ObjectId) {
                            var type = obj.Values.OutofService === 0 ? 'open' : 'close';
                            self.components[j].setType({ type: type });
                        }
                    }
                }
            }
            self.wait = false;
        }, function (err) { self.wait = false; });
    }
    startMonitoring() {
        var self = this;
        if (self.timer != null)
            clearInterval(self.timer);
        self.timer = setInterval(function () {
            self.beginMonitoring(self);
        }, self.interval);
    }
    stopMonitoring() {
        if (self.timer != null)
            clearInterval(self.timer);
    }
    load(o) {
        this.siteId = o.SiteId;
        var self = this;
        if (!self.editable) {
            self.stopMonitoring();
        }
        var apiSingleLineObject = new app.api.definition.SingleLineObject();
        apiSingleLineObject.list({ SiteId: parseInt(o.SiteId) }, function (r) {
            self.drawObjects(r.Value);
        });
    }
    save() {
        self = this;
        var w = new app.bootstrap.Dialog();
        w.process({ description: app.lang.WaitProcess, size: "sm" });
        var apiSingleLineObject = new app.api.definition.SingleLineObject();
        for (var i = 0; i < self.components.length; i++) {
            var c = self.components[i];
            var p = {
                'Id': c.data.Id,
                'x': c.data.x,
                'y': c.data.y,
                'h': c.height,
                'w': c.width,
                'Rotate': c.data.Rotate,
                'iBusbarId': c.data.iBusbarId,
                'iPosition': c.data.iPosition,
                'jBusbarId': c.data.jBusbarId,
                'jPosition': c.data.jPosition,
                'TextVisible': c.data.TextVisible,
                'TextX': c.data.TextX,
                'TextY': c.data.TextY,
                'TextRotate': c.data.TextRotate,
                'IndicatorVisible': c.data.IndicatorVisible,
                'IndicatorX': c.data.IndicatorX,
                'IndicatorY': c.data.IndicatorY,
                'IndicatorRotate': c.data.IndicatorRotate
            };
            apiSingleLineObject.update(p, function (r) {
                w.close();
            }, function (err) {
                w.close();
            }, function () { w.close(); });
        }
    }
    dispose() {
        this.stopMonitoring();
        this.clear();
    }
};
