app.trend = {
    resolution: {
        scratch: {
            value: 0,
            text: 'scratch'
        },
        minutes: {
            value: 1,
            text: 'minutes'
        },
        hours: {
            value: 2,
            text: 'hours'
        },
        days: {
            value: 3,
            text: 'days'
        },
        months: {
            value: 4,
            text: 'months'
        },
        years: {
            value: 5,
            text: 'years'
        }
    }
};

app.trend.Chart = class {

    constructor(o) {      
        this.series = o.series;
        this.fields = o.fields;
        this.chartId = o.chartId;
        this.height = o.height;
        this.from = new Date(moment().add(-1, 'days').format('YYYY/MM/DD HH:mm'));
        this.to = new Date(moment().format('YYYY/MM/DD HH:mm')); 
    }

    _calculateResolution(from, to) {
        const _from = new Date(from);
        const _to = new Date(to);

        let _optionsResolution = app.trend.resolution.minutes
        let _navigatorResolution = app.trend.resolution.minutes;

        // calculate years
        let _years = _to.getFullYear() - _from.getFullYear();
        // calculate months
        let _months = (_years * 12) + (_to.getMonth() - _from.getMonth());

        let diffInMilliSeconds = Math.abs(_to.getTime() - _from.getTime()) / 1000;
        // calculate days 
        let _days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= _days * 86400;
        // calculate hours 
        let _hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= _hours * 3600;
        //calculate minutes
        let _minutes = Math.floor(diffInMilliSeconds / 60) % 60;

        let _unit = 0;


        if (_years === 1 && _months === 1) {
            _unit = _days;
            _optionsResolution = app.trend.resolution.days;
            _navigatorResolution = app.trend.resolution.hours;
        }
        else if (_years > 0 && _months <= 12) {
            _unit = _months;
            _optionsResolution = app.trend.resolution.months;
            _navigatorResolution = app.trend.resolution.days;
        }
        //years
        else if (_years > 0) {
            _unit = _years;
            _optionsResolution = app.trend.resolution.years;
            _navigatorResolution = app.trend.resolution.months;
        }
        //months
        else if (_months === 1) {
            _unit = 30 + _days;
            _optionsResolution = app.trend.resolution.days;
            _navigatorResolution = app.trend.resolution.hours;
        }
        else if (_months > 0) {
            _unit = _months;
            _optionsResolution = app.trend.resolution.months;
            _navigatorResolution = app.trend.resolution.days;
        }

        //days
        else if (_days === 1 && _hours <= 24) {
            _unit = _hours + 24;
            _optionsResolution = app.trend.resolution.hours;
            _navigatorResolution = app.trend.resolution.minutes;
        }

        else if (_days > 0) {
            _unit = _days;
            _optionsResolution = app.trend.resolution.days;
            _navigatorResolution = app.trend.resolution.hours;
        }
        //hours
        else if (_hours === 1 && _minutes === 0) {
            _unit = minutes + 60;
            _optionsResolution = app.trend.resolution.minutes;
            _navigatorResolution = app.trend.resolution.minutes;
        }
        else if (_hours > 0) {
            _unit = _hours;
            _optionsResolution = app.trend.resolution.hours;
            _navigatorResolution = app.trend.resolution.minutes;
        }

        this.resolution = { optionsResolution: _optionsResolution, navigatorResolution: _navigatorResolution };
        this._calculateSteps(_unit);
    }

    _calculateSteps(unit) {
        let _optionsStep = 1;
        if (unit > 100)
            _optionsStep = 6;
        else if (unit > 80)
            _optionsStep = 5;
        else if (unit > 60)
            _optionsStep = 4;
        else if (unit > 35)
            _optionsStep = 3;
        else if (unit > 15)
            _optionsStep = 2;

        if (this.chartId === "babaeski-chart")
            _optionsStep++;

        this.optionsStep = _optionsStep;
    }

    dateChange(_from, _to,) {      
        if (_from === this.from && _to === this.to)
            return;
        let _self = this;
        setTimeout(function () {
            _self.from = _from
            _self.to = _to
            _self.previousDates = [];
            _self.chart.dataSource.read();
        }, 0);
    }

    _disposeChart() {
        if (this.chart !== null) {
            this.chart.destroy();
            this.chart = null;
            delete this.chart;
        }

        this.series = null;
        this.fields = null;
        this.chartId = null;
        this.height = null;
        this.from = null;
        this.to = null;
        this.resolution = null;
     
        delete this.series;
        delete this.fields;
        delete this.chartId;
        delete this.height;
        delete this.from;
        delete this.to;
        delete this.resolution;
    }
}

app.trend.StockChart = class extends app.trend.Chart {
    //o={series:[{type: "line",field: "TotalConsumption",opacity: 0.5}],navigatorSeries:[{type: "line",field: "TotalConsumption"}], fields: {RecordDate: { type: "date" },TotalConsumption: { type: "double" }},format:"{0}%",chartId:"chart",height:"330px",selectedArea:"",generationType:"3",title:""}
    constructor(o) {
        super(o);
        this.api = o.api;
        this.selectedArea = o.selectedArea;
        this.navigatorSeries = o.navigatorSeries;
        this.title = o.title;
        this.generationType = o.generationType;
        this.legendClick = o.legendClick;
        this.isZoomIn = true;
        this.hasOneValue = false;
        this.previousDates = [];
        this.resolution = { optionsResolution: app.trend.resolution.hours, navigatorResolution: app.trend.resolution.minutes };
    }

    Create() {       
        let _self = this;
        setTimeout(function () {
            _self.chart = $('#' + _self.chartId).kendoStockChart({
                dataSource: {
                    transport: {
                        read: function (e) {
                            if (_self.isZoomIn) {
                                _self.previousFrom = _self.from;
                                _self.previousTo = _self.to;
                            }
                            else {
                                _self.isZoomIn = true;
                                if (_self.previousDates.length > 0) {
                                    let _pre = _self.previousDates.pop();
                                    _self.from = _pre.from;
                                    _self.to = _pre.to;
                                }
                            }

                            if (_self.hasOneValue) {
                                _self._recalculateOptionsResolution();
                                _self.hasOneValue = false;
                            }
                            else
                                _self._calculateResolution(_self.from, _self.to);

                            _self.api.list({ Start: _self.from, End: _self.to, ResolutionType: _self.resolution.navigatorResolution.value }, function (r) {
                                if (r.Error) {
                                    e.error();
                                    return;
                                }
                                let _result = [];
                                if (r.Value.length === 1 && _self.resolution.navigatorResolution !== app.trend.resolution.minutes) {
                                    //if Value array returned from api has only one value to could see the details, recalculate the resolution and read again from api till it has multi values                              
                                    _self.hasOneValue = true;
                                    _self.chart.dataSource.read();
                                }
                                else {
                                    if (!(_self.chart === undefined || _self.chart === null)) {
                                        _self.chart.options.navigator.baseUnit = _self.resolution.navigatorResolution.text;
                                        _self.chart.options.categoryAxis[0].baseUnit = _self.resolution.optionsResolution.text;
                                        _self.chart.navigator.options.select.from = _self.from;
                                        _self.chart.navigator.options.select.to = _self.to;
                                        _self.chart.options.categoryAxis[0].labels.step = _self.optionsStep;
                                        _self.chart.options.navigator.step = _self.optionsStep + 1;
                                    }

                                    //send the filtered values to monitoring

                                    //filter as selected area
                                    if (_self.selectedArea !== undefined && _self.selectedArea !== null) {
                                        let generationData = [];
                                        for (let i = 0; i < r.Value.length; i++) {
                                            if (r.Value[i].AreaBasedGeneration !== null && r.Value[i].AreaBasedConsumption !== null) {
                                                let data = { RecordDate: r.Value[i].RecordDate, AreaBasedGeneration: r.Value[i].AreaBasedGeneration[_self.selectedArea], AreaBasedConsumption: r.Value[i].AreaBasedConsumption[_self.selectedArea] }
                                                generationData.push(data);
                                            }
                                        }
                                        _result = generationData;
                                    }
                                    //filter as received generationtype
                                    else if (_self.generationType !== undefined && _self.generationType !== null) {
                                        let generationData = [];
                                        for (let i = 0; i < r.Value.length; i++) {
                                            let data = { RecordDate: r.Value[i].RecordDate, TypeBasedGeneration: r.Value[i].TypeBasedGeneration[_self.generationType] }
                                            generationData.push(data);
                                        }
                                        _result = generationData;
                                    }
                                    else
                                        _result = r.Value;

                                }
                                e.success(_result);

                            });
                        }
                    },
                    schema: {
                        model: {
                            fields: _self.fields
                        }
                    },
                },
                chartArea: { background: "transparent", height: _self.height },
                legend: { position: "bottom", visible: true },
                dateField: "RecordDate",
                series: _self.series,
                categoryAxis: { labels: { step: _self.optionsStep }, baseUnit: _self.resolution.optionsResolution.text },
                tooltip: {
                    visible: true,
                    shared: true,
                    sharedTemplate:
                        "#= new moment(category).format('DD/MM/YYYY HH:mm') # </br>" +
                        "# for (var i = 0; i < points.length; i++) { #" +
                        "#= points[i].series.name #: #= points[i].value # </br>" +
                        "# } #"
                },
                valueAxis: { labels: { template: "#=  kendo.toString(value, '0,.0;(0,.0)') #" } },
                navigator: {
                    series: _self.navigatorSeries,
                    select: { from: _self.from, to: _self.to },
                    baseUnit: _self.resolution.navigatorResolution.text,
                    step: _self.optionsStep + 1
                },
                selectStart: function (e) {
                    let pre = { "from": _self.previousFrom, "to": _self.previousTo };
                    _self.previousDates.push(pre);
                },
                selectEnd: function (e) {
                    _self.from = new Date(e.sender._navigator.options.select.from);
                    _self.to = new Date(e.sender._navigator.options.select.to);
                    _self.chart.dataSource.read();

                },
                zoomStart: function (e) {
                    if (!(e.originalEvent.deltaY > 0)) {
                        let pre = { "from": _self.previousFrom, "to": _self.previousTo };
                        _self.previousDates.push(pre);
                    }
                },
                zoomEnd: function (e) {
                    _self.isZoomIn = e.originalEvent.deltaY > 0 ? false : true;
                    _self.from = new Date(e.sender._navigator.options.select.from);
                    _self.to = new Date(e.sender._navigator.options.select.to);
                    _self.chart.dataSource.read();
                },
                seriesClick: function (e) {
                    let pre = { "from": _self.previousFrom, "to": _self.previousTo };
                    _self.previousDates.push(pre);
                    _self._readPoint(e.category);
                }
            }).data('kendoStockChart');
            if (_self.legendClick !== undefined && !_self.legendClick) {
                _self.chart.bind("legendItemClick", function (e) { e.preventDefault(); });
            }
        }, 0);       
    }

    areaChange(_selectedArea) {
        if (_selectedArea === this.selectedArea)
            return;
        this.selectedArea = _selectedArea;
        this.previousDates = [];
        this.chart.dataSource.read();
    }

    _readPoint(point) {
        let _optionsResolution = this.resolution.optionsResolution;

        if (_optionsResolution === app.trend.resolution.minutes)
            return null;

        let _to = null;
        let _from = new Date(point);

        if (_optionsResolution === app.trend.resolution.years)
            _to = new Date(_from.getFullYear(), 12, 0, 23, 59, 59, 0);

        else if (_optionsResolution === app.trend.resolution.months)
            _to = new Date(_from.getFullYear(), _from.getMonth() + 1, 0, 23, 59, 59, 0);

        else if (_optionsResolution === app.trend.resolution.days)
            _to = new Date(_from.getFullYear(), _from.getMonth(), _from.getDate(), 23, 59, 59, 0);

        else if (_optionsResolution === app.trend.resolution.hours)
            _to = new Date(_from.getFullYear(), _from.getMonth(), _from.getDate(), _from.getHours(), 59, 59, 0);

        this.from = _from;
        this.to = _to;
        this.chart.dataSource.read();
    }

    _recalculateOptionsResolution() {
        let _navigatorResolution = this.resolution.navigatorResolution;
        let _result = app.trend.resolution.minutes;

        if (_navigatorResolution === app.trend.resolution.years)
            _result = app.trend.resolution.months;
        else if (_navigatorResolution === app.trend.resolution.months)
            _result = app.trend.resolution.days;
        else if (_navigatorResolution === app.trend.resolution.days)
            _result = app.trend.resolution.hours;

        this.resolution.navigatorResolution = _result;
    }

    dispose() {
        this.api = null;
        this.selectedArea = null;
        this.navigatorSeries = null;
        this.title = null;
        this.generationType = null;
        this.isZoomIn = null;
        this.hasOneValue = null;
        this.previousDates = null;

        delete this.api;
        delete this.selectedArea;
        delete this.navigatorSeries;
        delete this.title;
        delete this.generationType;
        delete this.isZoomIn;
        delete this.hasOneValue;
        delete this.previousDates;

        this._disposeChart();
    }
}

app.trend.RadarChart = class extends app.trend.Chart {
    //o={series:[{name: "Andrew Dodsworth",data: [10, 3, 3, 10, 2, 10]}], categories: ["Experience", "Communication", "Friendliness"],format:"{0}%",title:"sample chart",chartId:"chart",height:"330px",title:"",type:"radarArea"}
    constructor(o) {
        super(o);
        this.api = o.api;
        this.based = o.based;
        this.format = o.format;
        this.legendClick = o.legendClick;
    }

    Create() {        
        let _self = this;
        setTimeout(function () {
            _self.chart = $('#' + _self.chartId).kendoChart({
                dataSource: {
                    transport: {
                        read: function (e) {
                            _self._calculateResolution(_self.from, _self.to);
                            _self.api.list({ Start: _self.from, End: _self.to, ResolutionType: _self.resolution.navigatorResolution.value }, function (r) {
                                if (r.Error) {
                                    e.error();
                                    return;
                                }

                                let resultData = [];
                                if (_self.based !== undefined && _self.based === "type-generation") {
                                    for (let i = 0; i < r.Value.length; i++) {
                                        let temp = r.Value[i].TypeBasedGeneration;
                                        for (let x in temp) {
                                            if (!(x === "Enterkonnekte" || x === "Slack")) {
                                                let data = { Type: x, Value: ((temp[x] * 100) / r.Value[i].TotalGeneration).toFixed(2), RecordDate: r.Value[i].RecordDate };
                                                resultData.push(data);
                                            }
                                        }
                                    }
                                }
                                else if (_self.based !== undefined && _self.based === "area-generation") {
                                    for (let i = 0; i < r.Value.length; i++) {
                                        let temp = r.Value[i].AreaBasedGeneration;
                                        for (let x in temp) {
                                            if (!(x === "Enterkonnekte" || x === "Slack")) {
                                                let name = x.replace('YTM', '');
                                                let data = { Type: name, Value: ((temp[x] * 100) / r.Value[i].TotalGeneration).toFixed(2), RecordDate: r.Value[i].RecordDate };
                                                resultData.push(data);
                                            }
                                        }
                                    }
                                }
                                else if (_self.based !== undefined && _self.based === "area-consumption") {

                                    for (let i = 0; i < r.Value.length; i++) {
                                        let temp = r.Value[i].AreaBasedConsumption;
                                        for (let x in temp) {
                                            let name = x.replace('YTM', '');
                                            let data = { Type: name, Value: ((temp[x] * 100) / r.Value[i].TotalConsumption).toFixed(2) };
                                            resultData.push(data);

                                        }
                                    }
                                }
                                e.success(resultData);
                            });
                        }
                    },
                    schema: {
                        model: {
                            fields: _self.fields
                        }
                    }
                },
                chartArea: { background: "transparent", height: _self.height },
                title: _self.title,
                tooltip: {
                    visible: true,
                    template: "#= value#%"
                },
                legend: {
                    position: "bottom"
                },
                seriesDefaults: {
                    type: "radarLine"
                },
                series: _self.series,
                valueAxis: {
                    labels: {
                        template: "#= value#" + _self.format
                    }
                },
                categoryAxis: {
                    labels: {
                        font: "9px Arial, Helvetica, sans-serif"
                        //color: "#fcba03"
                    }
                }
            }).data('kendoChart');
            if (_self.legendClick !== undefined && !_self.legendClick) {
                _self.chart.bind("legendItemClick", function (e) { e.preventDefault(); });
            }
        }, 0);       
    }

    dispose() {
        this.api = null;
        this.based = null;
        this.format = null;

        delete this.api;
        delete this.based;
        delete this.format;

        this._disposeChart();
    }
}
