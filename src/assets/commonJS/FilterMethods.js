var FilterMethods =
{
    methods: { 
        // 浮点型数值过滤器
        Float_Filter(Z, figure) {
            if (Z) {
                var Z = parseFloat(Z);

                if (Z !== 0) {
                    return Z.toFixed(figure || 2);
                }
                return '';
            } else {
                return ''
            }
        },
        // 水势过滤器
        WPTN_Filter(WPTN) {
            if (WPTN) {
                var WPTN = parseInt(WPTN);
                var newWPTN;
                switch (WPTN) {
                    case 6:
                        newWPTN = {
                            status: WPTN,
                            symbol: "一"
                        };
                        break;
                    case 5:

                        newWPTN = {
                            status: WPTN,
                            symbol: "↑"
                        };
                        break;
                    case 4:

                        newWPTN = {
                            status: WPTN,
                            symbol: "↓"
                        };
                        break;
                    case 0:

                        newWPTN = {
                            status: 6,
                            symbol: "一"
                        };
                        break;
                    default:

                        newWPTN = {
                            status: 6,
                            symbol: "一"
                        };
                        break

                }

                return newWPTN;
            } else {
                return {
                    status: 6,
                    symbol: "一"
                };
            }

        },
        //日期条件
        elDatePicker_Filter(date, type) {
            if (date.constructor === Array) {
                var start, start_Year, start_Month, start_Day, start_Hours, start_Minutes, start_Seconds;
                start = date[0];
                start_Year = start.getFullYear();
                start_Month = addZero((start.getMonth() + 1));
                start_Day = addZero(start.getDate());
                start_Hours = addZero(start.getHours());
                start_Minutes = addZero(start.getMinutes());
                start_Seconds = addZero(start.getSeconds());

                start = `${start_Year}-${start_Month}-${start_Day} ${start_Hours}:${start_Minutes}`;

                var end, end_Year, end_Month, end_Day, end_Hours, end_Minutes, end_Seconds;
                end = date[1];
                end_Year = end.getFullYear();
                end_Month = addZero(end.getMonth() + 1);
                end_Day = addZero(end.getDate());
                end_Hours = addZero(end.getHours());
                end_Minutes = addZero(end.getMinutes());
                end_Seconds = addZero(end.getSeconds());

                end = `${end_Year}-${end_Month}-${end_Day} ${end_Hours}:${end_Minutes}`;

                if (type) {
                    switch (type) {
                        case "monthTable":
                            return `btt,${start_Year}-${start_Month},${end_Year}-${end_Month}`
                        case "hourTable":
                            return `btt,${start_Year}-${start_Month}-${start_Day} ${start_Hours},${end_Year}-${end_Month}-${end_Day} ${end_Hours}`
                        case "dayTable":
                            return `btt,${start_Year}-${start_Month}-${start_Day},${end_Year}-${end_Month}-${end_Day}`
                    }

                }

                return `btt,${start},${end}`;


            } else if (date.constructor === Date) {
                var Year, Month, Day, Hours, Minutes;
                Year = date.getFullYear();
                Month = addZero((date.getMonth() + 1));
                Day = addZero(date.getDate());
                Hours = addZero(date.getHours());
                Minutes = addZero(date.getMinutes());

                switch (type) {
                    case "onlyYear":
                        return Year;
                        break;
                    case "monthTable":
                        return `${Year}-${Month}`;
                        break;
                    case "dayTable":
                        return `${Year}-${Month}-${Day}`;
                        break;
                    default:
                        return `${Year}-${Month}-${Day} ${Hours}:${Minutes}`;
                        break;
                }

            }

            function addZero(item) {
                item = String(item);
                if (item.length == 1) {
                    return `0${item}`
                }

                return item;
            }

        },
        //动态统计图Y轴最大值
        get_echart_max(data) {
            var data = JSON.parse(JSON.stringify(data));
            data.forEach((val, index, array) => {
                if (val == '') {
                    array.splice(index, 1);
                }
            });
            var max = data[0];
            for (var i = 1; i < data.length; i++) {
                if (parseFloat(data[i]) > parseFloat(max)) {
                    max = data[i];
                }
            }
            return parseFloat(max);
        },
        //动态统计图Y轴最小值
        get_echart_min(data) {
            var data = JSON.parse(JSON.stringify(data));
            data.forEach((val, index, array) => {
                if (val == '') {
                    array.splice(index, 1);
                }
            });
            var min = data[0];
            for (var i = 1; i < data.length; i++) {
                if (parseFloat(data[i]) < parseFloat(min)) {
                    min = data[i];
                }
            }
            return parseFloat(min);
        },
        // 抽离对象数组中每一项对象中某字段组合成新的数组
        newArrayByObjArray(array, attr, callback) {
            var newArray = array.map(val => {
                var newVal = val[attr];
                if (typeof callback == "function") {
                    newVal = callback(newVal);
                }
                return newVal;
            });
            return newArray;
        },
        //返回日期
       getNowDayString(now){
        return now.getFullYear()+"-"+((now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1))+"-"+(now.getDate()<10?"0"+now.getDate():now.getDate());
      },
        // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        transform_QDSQ_data_into_ehart_data(data, tableType) {
            var _data = JSON.parse(JSON.stringify(data)); // 数据深拷贝
            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
            }
            switch (tableType) {
                case "historyTable":
                    echartData.chartName = "水情曲线图";
                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.05).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = 0; // y1最小值
                    // y2轴
                    echartData.y2.name = "水深"; // Y2轴名字
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.05).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = 0; // y2最小值
                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.tm;
                        return time;
                    });
                    break;
                case "hourTable":
                    echartData.chartName = "小时水量图";
                    // y1轴
                    echartData.y1.name = "流量"; // Y1轴名字
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "aq", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.05).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.05).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    // y2轴
                    echartData.y2.name = "水深"; // Y2轴名字
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "az", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.05).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.05).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    // y3轴
                    echartData.y3.name = "水量"; // Y2轴名字
                    //累计水量
                    echartData.y3.total=0;
                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "wq", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        echartData.y3.total+=parseFloat(val);
                        return parseFloat(val).toFixed(3);
                    });
                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.dt;
                        return time;
                    });
                    break;
                case "dayTable":
                    echartData.chartName = "日水量图";
                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "daq", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值

                    echartData.y1.name = "流量"; // Y1轴名字
                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "daz", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    echartData.y2.name = "水深"; // Y2轴名字
                    // y3轴
                    echartData.y3.name = "水量"; // Y2轴名字
                    //累计水量
                    echartData.y3.total=0;
                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "dwq", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        echartData.y3.total+=parseFloat(val);
                        return parseFloat(val).toFixed(3);
                    });
                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.tm;
                        return time;
                    });
                    break;
                case "monthTable":
                    echartData.chartName = "月水量图";
                    // y1轴
                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "maq", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    var y1max = (FilterMethods.methods.get_echart_max(echartData.y1.list) + 0.5).toFixed(3),
                        y1min = (FilterMethods.methods.get_echart_min(echartData.y1.list) - 0.5).toFixed(3);
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min < 0 ? 0 : y1min; // y1最小值
                    echartData.y1.name = "流量"; // Y1轴名字
                    // y2轴
                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "maz", val => {
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    var y2max = (FilterMethods.methods.get_echart_max(echartData.y2.list) + 0.5).toFixed(2),
                        y2min = (FilterMethods.methods.get_echart_min(echartData.y2.list) - 0.5).toFixed(2);
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值
                    echartData.y2.name = "水深"; // Y2轴名字
                    // y3轴
                    echartData.y3.name = "水量"; // Y2轴名字
                    //累计水量
                    echartData.y3.total=0;
                    echartData.y3.list = FilterMethods.methods.newArrayByObjArray(_data, "mwq", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        echartData.y3.total+=parseFloat(val);
                        return parseFloat(val).toFixed(3);
                    });
                    echartData.y3.max=FilterMethods.methods.get_echart_max(echartData.y3.list).toFixed(3);
                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        var time = val.tm;
                        return time;
                    });
                    break;

            }

            return echartData;
        },
    },

}

export default FilterMethods