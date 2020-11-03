/**
 * @type Jannchie
 * @email jannchie@gmail.com
 * @create date 2018-05-02 13:17:10
 * @modify date 2019-03-20 15:17:24
 * @desc Visual core code
 */

// import * as d3 from 'd3';
// require("./stylesheet.css");

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//웬만하면 만지지 말아주세요!!!
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

$("#inputfile").change(function() {
  $("#inputfile").attr("hidden", true);
  var r = new FileReader();
  r.readAsText(this.files[0], config.encoding);
  r.onload = function() {
    //读取完成后，数据保存在对象的result属性中
    var data = d3.csvParse(this.result);
    try {
      draw(data);
    } catch (error) {
      alert(error);
    }
  };
}); //데이터를 읽어들이고 그래프를 생성

function draw(data) {
    var date = [];
    data.forEach(element => {
        if (date.indexOf(element["date"]) == -1) {
            date.push(element["date"]);
        }
    });
    let rate = [];
    var auto_sort = config.auto_sort;
    if (auto_sort) {
        var time = date.sort((x, y) => new Date(x) - new Date(y));
    } else {
        var time = date;
    }
    var use_semilogarithmic_coordinate = config.use_semilogarithmic_coordinate;
    var big_value = config.big_value;
    var divide_by = config.divide_by;
    var divide_color_by = config.divide_color_by;
    var name_list = [];
    var changeable_color = config.changeable_color;
    var divide_changeable_color_by_type = config.divide_changeable_color_by_type;
    data
        .sort((a, b) => Number(b.value) - Number(a.value))
        .forEach(e => {
            if (name_list.indexOf(e.name) == -1) {
                name_list.push(e.name);
            }
        });
    var baseTime = 3000;

    // 그래프 바, 글씨의 색깔 선택
    function getColor(d) {
        var r = 0.0;
        if (changeable_color) {
            var colorRange = d3.interpolateCubehelix(
                config.color_range[0],
                config.color_range[1]
            );
            if (divide_changeable_color_by_type && d["type"] in config.color_ranges) {
                var colorRange = d3.interpolateCubehelix(
                    config.color_ranges[d["type"]][0],
                    config.color_ranges[d["type"]][1]
                );
            }
            var v =
                Math.abs(rate[d.name] - rate["MIN_RATE"]) /
                (rate["MAX_RATE"] - rate["MIN_RATE"]);
            if (isNaN(v) || v == -1) {
                return colorRange(0.6);
            }
            return colorRange(v);
        } //그라디언트

        if (d.name in config.color)
            return config.color[d.name];
        else {
            return d3.schemeCategory10[
                Math.floor(d[divide_color_by].charCodeAt() % 10)
            ];
        }
    }

    var allow_up = config.allow_up;
    var always_up = config.always_up;
    var interval_time = config.interval_time;
    var text_y = config.text_y;
    var graphTitle = config.graphTitle;
    var display_barInfo = config.display_barInfo;


    // 카운터 사용
    var use_counter = config.use_counter;
    // 각 데이터의 간격 날짜
    var step = config.step;
    var long = config.long;
    var format = config.format;
    var left_margin = config.left_margin;
    var right_margin = config.right_margin;
    var top_margin = config.top_margin;
    var bottom_margin = config.bottom_margin;
    var timeFormat = config.timeFormat;
    var item_x = config.item_x;
    var item_y = config.item_y;
    var max_number = config.max_number;
    var reverse = config.reverse;
    var animation = config.animation;
    var deformat = config.deformat;
    config.imgs = Object.assign(config.imgs, external_imgs);

    var bar_height = config.bar_height

    const margin = {
        left: left_margin,
        right: right_margin,
        top: top_margin,
        bottom: bottom_margin
    };
    var background_color = config.background_color;

    d3.select("body").attr("style", "background:" + background_color);

    var enter_from_0 = config.enter_from_0;
    interval_time /= 3;
    var lastData = [];
    var currentdate = time[0].toString();
    var currentData = [];
    var lastname;
    const svg = d3.select("svg");

    const width = svg.attr("width");
    const height = svg.attr("height");
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom - 32;
    const xValue = d => Number(d.value);
    const yValue = d => d.name;

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //뒷배경과 축 생성
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    /*
    const Backgroundimg = g
        .insert("image")
        .attr("fill-opacity", 1)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", svg.attr("width"))
        .attr("height", svg.attr("height"))
        .attr("href", config.background_img);
        */
    const xAxisG = g
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`);
    const yAxisG = g.append("g");

    xAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", 100);

    var xScale = d3.scaleLinear();
    if (use_semilogarithmic_coordinate) {
        xScale = d3.scalePow().exponent(0.5);
    } else {
        xScale = d3.scaleLinear();
    }
    const yScale = d3
        .scaleBand()
        .paddingInner(0.3) //1
        .paddingOuter(0);

    const xTicks = 10;
    const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(xTicks)
        .tickPadding(20)
        .tickFormat(d => {
            if (d <= 0) {
                return "";
            }
            return d3.format(",.0f")(d);
        })
        .tickSize(-innerHeight);

    const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickPadding(5)
        .tickSize(-innerWidth);

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
    //화면에 보여지는 것들
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    var dateLabel_switch = config.dateLabel_switch;
    var dateLabel_fontsize = config.dateLabel_fontsize;
    var dateLabel_x = config.dateLabel_x;
    var dateLabel_y = config.dateLabel_y;
    var dateLabel_color = config.dateLabel_color;

    //dateLabel位置
    if (dateLabel_x == null || dateLabel_y == null) {
        dateLabel_x = innerWidth;
        dateLabel_y = innerHeight;
    }
    if (dateLabel_switch == false) {
        dateLabel_switch = "hidden";
    } else {
        dateLabel_switch = "visible";
    }

    var dateLabel = g //오른쪽 아래 큰 날짜
        .insert("text")
        .data(currentdate)
        .attr("class", "dateLabel")
        .attr("font-size", dateLabel_fontsize)
        .attr("fill", dateLabel_color)
        .attr("style:visibility", dateLabel_switch)
        .attr("x", dateLabel_x)
        .attr("y", dateLabel_y)
        .attr("text-anchor", function () {
            return "end";
        })
        .text(currentdate);

    var topLabel = g
        .insert("text")
        .attr("class", "topLabel")
        .attr("x", item_x)
        .attr("y", item_y)
        .attr("text-anchor", function () {
            return "end";
        });

    totalLabel_text = config.totalLabel_text;
    totalLabel_switch = config.totalLabel_switch;
    totalLabel_x = config.totalLabel_x;
    totalLabel_y = config.totalLabel_y;
    totalLabel_fontsize = config.totalLabel_fontsize;
    totalLabel_color = config.totalLabel_color;

    //토탈 텍스트
    var totalLabel = g
        .insert("text")
        .attr("class", "totalLabel")
        .attr("font-size", totalLabel_fontsize)
        .attr("fill", totalLabel_color)
        .attr("x", totalLabel_x)
        .attr("y", totalLabel_y);

    rateLabel_switch = config.rateLabel_switch;
    rateLabel_fontsize = config.rateLabel_fontsize;
    rateLabel_color = config.rateLabel_color;
    rateLabel_x = config.rateLabel_x;
    rateLabel_y = config.rateLabel_y;
    rateLabel2_x = config.rateLabel2_x;
    rateLabel2_y = config.rateLabel2_y;
    rateLabel3_x = config.rateLabel3_x;
    rateLabel3_y = config.rateLabel3_y;
    rateLabel_fix = config.rateLabel_fix;

    if (rateLabel_switch) {
        var rateLabel_rank = [];
        if (rateLabel_fix) { //걍 랭킹
            if (config.use_img_as_rate) {
                for (let i = 0; i < config.max_ranking_num; i++) {
                    g
                        .insert("text")
                        .attr("x", rateLabel_x - config.img_margin_with_text)
                        .attr("y", rateLabel_y + config.rate_img_text_fontsize + 5 + i * config.img_margin)
                        .attr("fill", rateLabel_color)
                        .text(i + 1 + ".")
                        .attr("font-weight", "bold")
                        .attr("font-family", "Fira Code", "Source Han Sans CN")
                        .attr("font-size", config.rate_img_text_fontsize);

                    rateLabel_rank[i] = g
                        .insert("image")
                        .attr("fill-opacity", 1)
                        .attr("x", rateLabel_x)
                        .attr("y", rateLabel_y + i * config.img_margin)
                        .attr("width", config.rate_img_width)
                        .attr("height", config.rate_img_height)
                        .attr("href", config.imgs["a"]);
                }
            }
            else {
                for (let i = 0; i < config.max_ranking_num; i++) {
                    rateLabel_rank[i] = g
                        .insert("text")
                        .attr("class", "dateLabel")
                        .attr("font-size", rateLabel_fontsize)
                        .attr("fill", rateLabel_color)
                        .attr("style:visibility", rateLabel_switch)
                        .attr("x", rateLabel_x)
                        .attr("y", rateLabel_y + i * (rateLabel_fontsize + 7));
                }
            }

        }
        else { //원하는 대로 배치할 때 (세개만)
            if (config.use_img_as_rate) {

                g
                    .insert("text")
                    .attr("x", rateLabel_x - config.img_margin_with_text)
                    .attr("y", rateLabel_y)
                    .attr("fill", rateLabel_color)
                    .text(1 + ".")
                    .attr("font-size", config.rate_img_text_fontsize)
                    .attr("font-weight", "bold")
                    .attr("font-family", "Fira Code", "Source Han Sans CN");

                g
                    .insert("text")
                    .attr("x", rateLabel2_x - config.img_margin_with_text)
                    .attr("y", rateLabel2_y)
                    .attr("fill", rateLabel_color)
                    .text(2 + ".")
                    .attr("font-size", config.rate_img_text_fontsize)
                    .attr("font-weight", "bold")
                    .attr("font-family", "Fira Code", "Source Han Sans CN");

                g
                    .insert("text")
                    .attr("x", rateLabel3_x - config.img_margin_with_text)
                    .attr("y", rateLabel3_y)
                    .attr("fill", rateLabel_color)
                    .text(3 + ".")
                    .attr("font-size", config.rate_img_text_fontsize)
                    .attr("font-weight", "bold")
                    .attr("font-family", "Fira Code", "Source Han Sans CN");

                rateLabel_rank[0] = g
                    .insert("image")
                    .attr("fill", dateLabel_color)
                    .attr("fill-opacity", 1)
                    .attr("x", rateLabel_x)
                    .attr("y", rateLabel_y)
                    .attr("width", config.rate_img_width)
                    .attr("height", config.rate_img_height)
                    .attr("href", config.imgs["a"]);

                rateLabel_rank[1] = g
                    .insert("image")
                    .attr("fill", dateLabel_color)
                    .attr("fill-opacity", 1)
                    .attr("x", rateLabel2_x)
                    .attr("y", rateLabel2_y)
                    .attr("width", config.rate_img_width)
                    .attr("height", config.rate_img_height)
                    .attr("href", config.imgs["a"]);

                rateLabel_rank[2] = g
                    .insert("image")
                    .attr("fill", dateLabel_color)
                    .attr("fill-opacity", 1)
                    .attr("x", rateLabel3_x)
                    .attr("y", rateLabel3_y)
                    .attr("width", config.rate_img_width)
                    .attr("height", config.rate_img_height)
                    .attr("href", config.imgs["a"]);
            }
            else {

                rateLabel_rank[0] = g
                    .insert("text")
                    .attr("class", "dateLabel")
                    .attr("font-size", rateLabel_fontsize)
                    .attr("fill", rateLabel_color)
                    .attr("style:visibility", rateLabel_switch)
                    .attr("x", rateLabel_x)
                    .attr("y", rateLabel_y);

                rateLabel_rank[1] = g
                    .insert("text")
                    .attr("class", "dateLabel")
                    .attr("font-size", rateLabel_fontsize)
                    .attr("fill", rateLabel_color)
                    .attr("style:visibility", rateLabel_switch)
                    .attr("x", rateLabel2_x)
                    .attr("y", rateLabel2_y);

                rateLabel_rank[2] = g
                    .insert("text")
                    .attr("class", "dateLabel")
                    .attr("font-size", rateLabel_fontsize)
                    .attr("fill", rateLabel_color)
                    .attr("style:visibility", rateLabel_switch)
                    .attr("x", rateLabel3_x)
                    .attr("y", rateLabel3_y);
            }
        }
    } //랭킹 시스템
    

    if (config.use_img_ano) {
        var img_ano = g
            .insert("image")
            .attr("x", config.img_ano_x)
            .attr("y", config.img_ano_y)
            .attr("fill-opacity", 1)
            .attr("href", config.img_ano)
            .attr("height", config.img_ano_height)
            .attr("width", config.img_ano_width);
    } //부가 이미지
    if (config.use_text_ano) {
        var text_ano = g
            .insert("text")
            .attr("class", "text_ano")
            .attr("x", config.text_ano_x)
            .attr("y", config.text_ano_y)
            .text(config.text_ano)
            .attr("font-size", config.text_ano_fontsize);
    } //부가 텍스트
    
    function dataSort() {
        if (reverse) {
            currentData.sort(function(a, b) {
                if (Number(a.value) == Number(b.value)) {
                    var r1 = 0;
                    var r2 = 0;
                    for (let index = 0; index < a.name.length; index++) {
                        r1 = r1 + a.name.charCodeAt(index);
                    }
                    for (let index = 0; index < b.name.length; index++) {
                        r2 = r2 + b.name.charCodeAt(index);
                    }
                    return r2 - r1;
                } else {
                    return Number(a.value) - Number(b.value);
                }
            });
        } else {
            currentData.sort(function(a, b) {
                if (Number(a.value) == Number(b.value)) {
                    var r1 = 0;
                    var r2 = 0;
                    for (let index = 0; index < a.name.length; index++) {
                        r1 = r1 + a.name.charCodeAt(index);
                    }
                    for (let index = 0; index < b.name.length; index++) {
                        r2 = r2 + b.name.charCodeAt(index);
                    }
                    return r2 - r1;
                } else {
                    return Number(b.value) - Number(a.value);
                }
            });
        }
    } //시간이 지나면서 순위를 조정

    function getCurrentData(date) {
    rate = [];
    currentData = [];
    indexList = [];

    data.forEach(element => {
      if (element["date"] == date && parseFloat(element["value"]) != 0) {
        if (element.name.length > config.bar_name_max) {
          tail = "...";
        } else {
          tail = "";
        }
        element.name = element.name.slice(0, config.bar_name_max - 1) + tail;
        currentData.push(element);
      }
    });

    rate["MAX_RATE"] = 0;
    rate["MIN_RATE"] = 1;
    currentData.forEach(e => {
      _cName = e.name;
      lastData.forEach(el => {
        if (el.name == e.name) {
          rate[e.name] = Number(Number(e.value) - Number(el.value));
        }
      });
      if (rate[e.name] == undefined) {
        rate[e.name] = rate["MIN_RATE"];
      }
      if (rate[e.name] > rate["MAX_RATE"]) {
        rate["MAX_RATE"] = rate[e.name];
      } else if (rate[e.name] < rate["MIN_RATE"]) {
        rate["MIN_RATE"] = rate[e.name];
      }
    });
    currentData = currentData.slice(0, max_number);
        dataSort();

        //alert(currentData[1]["type"]);

    d3.transition("2")
      .each(redraw)
      .each(change);
    lastData = currentData;
  } //다음 시간대의 데이터 저장

    if (config.showTitle) {
        // 왼쪽 위 왼쪽 글
        var topInfo = g
            .insert("text")
            .attr("class", "growth")
            .attr("font-size", config.graphTitle_fontsize)
            .attr("fill", config.graphTitle_color)
            .attr("x", 0)
            .attr("y", text_y)
            .text(graphTitle);
    }

    var lastname;
    var counter = {
        value: 1
    };

    var avg = 0;

    function redraw() {
        if (currentData.length == 0) return;

        if (big_value) { //좌표 원점 옮기기
            xScale
                .domain([2 * d3.min(currentData, xValue) - d3.max(currentData, xValue), d3.max(currentData, xValue) + 10])
                .range([0, innerWidth]);
        } else {
            xScale
                .domain([0, d3.max(currentData, xValue) + 1])
                .range([0, innerWidth]);
        }

        if (auto_sort) {
            dateLabel
                .data(currentData)
                .transition()
                .duration(baseTime * interval_time)
                .ease(d3.easeLinear)
                .tween("text", function(d) {
                    var self = this;
                    var i = d3.interpolateDate(
                        new Date(self.textContent),
                        new Date(d.date)
                    );
                    return function(t) {
                        var dateformat = d3.timeFormat(timeFormat);
                        self.textContent = dateformat(i(t));
                    };
                });
        } else {
            dateLabel.text(currentdate);
        }

        xAxisG
            .transition()
            .duration(baseTime * interval_time)
            .ease(d3.easeLinear)
            .call(xAxis);
        yAxisG
            .transition()
            .duration(baseTime * interval_time)
            .ease(d3.easeLinear)
            .call(yAxis);

        yAxisG.selectAll(".tick").remove();
        if (!config.show_x_tick) {
            xAxisG.selectAll(".tick").remove();
        }

        yScale
            .domain(currentData.map(d => d.name).reverse())
            .range([innerHeight, 0]);

        var bar = g.selectAll(".bar").data(currentData, function(d) {
            return d.name;
        });

            if (config.showTop) { 
            // 톱 텍스트
            topLabel.data(currentData).text(function (d) {
                    if (lastname == d.name) {
                        counter.value = counter.value + step;
                    } else {
                        counter.value = 1;
                    }
                    lastname = d[divide_by];
                    if (d[divide_by].length > 24) return d[divide_by].slice(0, 23) + "...";
                    return d[divide_by];
                });

            }

            if (config.rateLabel_switch) {
                //랭킹 시스템 업데이트
                if (config.use_img_as_rate) {
                    for (let i = 0; i < rateLabel_rank.length; i++) {
                        rateLabel_rank[i].attr("href", config.imgs[currentData[i]["name"]])
                    };
                }
                else {
                    if (config.rateLabel_use_custom) {
                        for (let i = 0; i < rateLabel_rank.length; i++) {
                            rateLabel_rank[i].text(function () {
                                return i + 1 + ". " + config.rateLabel_custom_text[currentData[i]["name"]] + " - " + d3.format(format)(currentData[i]["value"]);
                            })
                        };
                    }
                    else {
                        for (let i = 0; i < rateLabel_rank.length; i++) {
                            rateLabel_rank[i].text(function () {
                                return i + 1 + ". " + currentData[i]["type"] + " - " + d3.format(format)(currentData[i]["value"]);
                            })
                        };
                    }
                    
                }
            }

            //Total 시스템 업데이트
            if (totalLabel_switch) {
                var total_num = 0;
                for (let i = 0; i < currentData.length; i++) {
                    total_num += Number(currentData[i]["value"]);
                }
                //totalLabel.text(d3.format(format)(total_num));
                totalLabel.text(totalLabel_text + d3.format(format)((String(total_num))));
            }
            else {
                totalLabel.text("");
            }
            

            if (use_counter == true) {
                // 리더 보드 기간 업데이트
                days
                    .data(currentData)
                    .transition()
                    .duration(baseTime * interval_time)
                    .ease(d3.easeLinear)
                    .tween("text", function(d) {
                        var self = this;
                        var i = d3.interpolate(self.textContent, counter.value),
                            prec = (counter.value + "").split("."),
                            round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

                        return function(t) {
                            self.textContent = d3.format(format)(
                                Math.round(i(t) * round) / round
                            );
                        };
                    });
            }
        

        var barEnter = bar
                        .enter()
                        .insert("g", ".axis")
                        .attr("class", "bar")
                        .attr("transform", function(d) {
                            return "translate(0," + yScale(yValue(d)) + ")";
                        });

        var Bar = barEnter
            .append("rect")
            .attr("width", function(d) {
                if (enter_from_0) {
                    return 0;
                } else {
                    return xScale(currentData[currentData.length - 1].value);
                }
            })
            .attr("fill-opacity", 0)
            .attr("height", bar_height)
            .attr("y", 50)
            .style("fill", d => getColor(d))
            .transition("a")
            .delay(500 * interval_time)
            .duration(2490 * interval_time)
            .attr("y", 0)
            .attr("width", d => xScale(xValue(d)))
            .attr("fill-opacity", 1);

        if (config.rounded_rectangle) {
            Bar.attr("rx", 13);
        }

        if (config.showLabel == true) { //바 왼쪽의 글
            barEnter
                .append("text")
                .attr("y", 50)
                .attr("fill-opacity", 0)
                .style("fill", d => getColor(d))
                .transition("2")
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .attr("fill-opacity", 1)
                .attr("y", 0)
                .attr("class", function(d) {
                    return "label ";
                })
                .attr("x", config.labelx)
                .attr("y", 20)
                .attr("text-anchor", "end")
                .text(function(d) {
                    if (long) {
                        return "";
                    }
                    return d[divide_by];
                });
        } //바 왼쪽의 글

        if (config.use_img) {
            barEnter
                .append("defs")
                .append("pattern")
                .attr("id", d => d.name)
                .attr("width", "100%")
                .attr("height", "100%")
                .append("image")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", config.img_width)
                .attr("height", config.img_height)
                .attr("href", d => config.imgs[d.name]);

            barEnter
                .append("rect")
                .attr("fill-opacity", 0)
                .attr("cy", 63)
                .attr(
                    "fill",
                    d => "url(#" + encodeURIComponent(d.name)
                                                        .replace("'", "%27")
                                                        .replace("(", "%28")
                                                        .replace(")", "%29") +
                    ")"
                )
                .attr("stroke-width", "0px")
                .transition("a")
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .attr("stroke", d => getColor(d))
                // .attr("paint-order", "stroke")
                .attr("x", config.img_x)
                .attr("y", config.img_y)
                .attr("cx", -50)
                .attr("cy", bar_height / 2)
                .attr("height", config.img_height)
                .attr("width", config.img_width)
                .attr("fill-opacity", 1);
        } //바의 그림

        if (config.use_img_as_barinfo) {
            barEnter
                .append("defs")
                .append("pattern")
                .attr("id", function (d) {
                    return d.name + "_info";
                })
                .attr("width", "100%")
                .attr("height", "100%")
                .append("image")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", config.img_barinfo_height)
                .attr("height", config.img_barinfo_height)
                .attr("href", d => config.imgs_barinfo[d.name]);

            barEnter
                .append("rect")
                .attr("class", function () {
                    return "barInfo";
                })
                .attr("fill-opacity", 0)
                .attr("cy", 63)
                .attr(
                    "fill",
                    d => "url(#" + encodeURIComponent(d.name)
                        .replace("'", "%27")
                        .replace("(", "%28")
                        .replace(")", "%29") +
                        "_info)"
                )
                .attr("stroke-width", "0px")
                .transition("a")
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .attr("stroke", d => getColor(d))
                // .attr("paint-order", "stroke")
                .attr("x", function (d) {
                    if (long) return 10;
                    if (enter_from_0) {
                        return 0;
                    } else {
                        return xScale(currentData[currentData.length - 1].value);
                    }
                })
                .attr("y", config.img_barinfo_adjust_y)
                .attr("cx", -50)
                .attr("cy", bar_height / 2)
                .attr("height", config.img_barinfo_height)
                .attr("width", config.img_barinfo_width)
                .attr("x", function (d) {
                    if (long) return 10;
                    return xScale(xValue(d)) + config.img_barinfo_adjust_x - config.img_barinfo_width;
                })
                .attr("fill-opacity", 1)
                .attr("rx", 0);
        }
        else {
            // bar위 문자
            var barInfo = barEnter
                .append("text")
                .attr("x", function (d) {
                    if (long) return 10;
                    if (enter_from_0) {
                        return 0;
                    } else {
                        return xScale(currentData[currentData.length - 1].value);
                    }
                })
                .attr("stroke", d => getColor(d))
                .attr("class", function () {
                    return "barInfo";
                })
                .attr("fill", config.bar_info_text_color)
                .attr("y", 45)
                .attr("stroke-width", "0px")
                .attr("fill-opacity", 0)
                .transition()
                .delay(500 * interval_time)
                .duration(2490 * interval_time)
                .text(function (d) {
                    if (long) {
                        return "";
                    }
                    if (config.original_barinfo_text) {
                        return d[divide_by];
                    }
                    else {
                        return config.text_barinfo[d.name];
                    }
                })
                .attr("x", d => {
                    if (long) return 10;
                    return xScale(xValue(d)) - 40;
                })
                .attr("fill-opacity", function (d) {
                    if (xScale(xValue(d)) - 40 < display_barInfo) {
                        return 0;
                    }
                    return 1;
                })
                .attr("y", config.bar_info_text_y)
                .attr("dy", ".5em")
                .attr("text-anchor", function () {
                    if (long) return "start";
                    return "end";
                })
                .attr("stroke-width", function (d) {
                    if (xScale(xValue(d)) - 40 < display_barInfo) {
                        return "0px";
                    }
                    return "4px";
                })
                .attr("paint-order", "stroke")
                .attr("font-size", config.bar_info_font_size);
        }

        if (long) {
            barInfo.tween("text", function(d) {
                var self = this;
                self.textContent = d.value;
                var i = d3.interpolate(self.textContent, Number(d.value)),
                    prec = (Number(d.value) + "").split("."),
                    round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                return function(t) {
                    self.textContent = d[divide_by] + "  value:" + d3.format(format)(Math.round(i(t) * round) / round);
                };
            });
        }
        if (!long) {
            barEnter
                .append("text")
                .attr("x", function() {
                    if (long) {
                        return 10;
                    }
                    if (enter_from_0) {
                        return 0;
                    } else {
                        return xScale(currentData[currentData.length - 1].value);
                    }
                })
                .attr("y", 50)
                .attr("fill-opacity", 0)
                .style("fill", d => getColor(d))
                .transition()
                .duration(2990 * interval_time)
                .tween("text", function(d) {
                    var self = this;
                    // 初始值为d.value的0.9倍
                    self.textContent = d.value * 0.9;
                    var i = d3.interpolate(self.textContent, Number(d.value)),
                        prec = (Number(d.value) + "").split("."),
                        round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                    // d.value = self.textContent
                    return function(t) {
                        self.textContent = d3.format(format)(Math.round(i(t) * round) / round) + config.postfix;
                        // d.value = self.textContent
                    };
                })
                .attr("fill-opacity", 1)
                .attr("y", 0)
                .attr("class", function(d) {
                    return "value";
                })
                .attr("x", d => {
                    return xScale(xValue(d)) + 10;
                })
                .attr("y", 22);
        }
        var barUpdate = bar
            .transition("2")
            .duration(2990 * interval_time)
            .ease(d3.easeLinear);

        barUpdate
            .select("rect")
            .style("fill", d => getColor(d))
            .attr("width", d => xScale(xValue(d)));
        if (config.showLabel == true) {
            barUpdate
                .select(".label")
                .attr("class", function(d) {
                    return "label ";
                })
                .style("fill", d => getColor(d))
                .attr("width", d => xScale(xValue(d)));
        }

        if (!long) {
            barUpdate
                .select(".value")
                .attr("class", function(d) {
                    return "value";
                })
                .style("fill", d => getColor(d))
                .attr("width", d => xScale(xValue(d)));
        }

        if (!config.use_img_as_barinfo) {
            barUpdate.select(".barInfo").attr("stroke", function (d) {
                return getColor(d);
            });
        }

        if (config.use_img) {
            barUpdate
                .select("circle")
                .attr("stroke", function(d) {
                    return getColor(d);
                })
                .attr("cx", -50);
        }

        if (!config.use_img_as_barinfo) {
            var barInfo = barUpdate
                .select(".barInfo")
                .text(function (d) {
                    if (long) {
                        return "";
                    }
                    if (config.original_barinfo_text) {
                        return d[divide_by];
                    }
                    else {
                        return config.text_barinfo[d.name];
                    }
                })
                .attr("x", d => {
                    if (long) return 10;
                    return xScale(xValue(d)) - 40;
                })
                .attr("fill-opacity", function (d) {
                    if (xScale(xValue(d)) - 40 < display_barInfo) {
                        return 0;
                    }
                    return 1;
                })
                .attr("stroke-width", function (d) {
                    if (xScale(xValue(d)) - 40 < display_barInfo) {
                        return "0px";
                    }
                    return "4px";
                })
                .attr("paint-order", "stroke");
        }
        else {
            var barInfo = barUpdate
                .select(".barInfo")
                .attr("x", d => {
                    if (long) return 10;
                    return xScale(xValue(d)) + config.img_barinfo_adjust_x - config.img_barinfo_width;
                })
                .attr("fill-opacity", function (d) {
                    if (xScale(xValue(d)) - 40 < display_barInfo) {
                        return 0;
                    }
                    return 1;
                });
        }
        

        if (long) {
            barInfo.tween("text", function(d) {
                var self = this;
                var str = d[divide_by] + "  value:";

                var i = d3.interpolate(self.textContent.slice(str.length, 99), Number(d.value)),
                prec = (Number(d.value) + "").split("."),
                round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                return function(t) {
                    self.textContent = d[divide_by] + "  value:" + d3.format(format)(Math.round(i(t) * round) / round);
                };
            });
        }
        if (!long) {
            barUpdate
                .select(".value")
                .tween("text", function(d) {
                    var self = this;

                    // if postfix is blank, do not slice.
                    if (config.postfix == "") {
                        var i = d3.interpolate(self.textContent, Number(d.value));
                    } else {
                        var i = d3.interpolate(self.textContent.slice(0, -config.postfix.length), Number(d.value));
                    }

                    var i = d3.interpolate(deformat(self.textContent, config.postfix), Number(d.value));

                    var prec = (Number(d.value) + "").split("."),
                    round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
                    // d.value = self.textContent
                    return function(t) {
                        self.textContent = d3.format(format)(Math.round(i(t) * round) / round) + config.postfix;
                        // d.value = self.textContent
                    };
                })
                .duration(2990 * interval_time)
                .attr("x", d => xScale(xValue(d)) + 10);
        }

        avg = (Number(currentData[0]["value"]) + Number(currentData[currentData.length - 1]["value"])) / 2;

        var barExit = bar
            .exit()
            .attr("fill-opacity", 1)
            .transition()
            .duration(2500 * interval_time);
        barExit
            .attr("transform", function(d) {
                if (always_up) {
                    return "translate(0," + "-100" + ")";
                }
                if (Number(d.value) > avg && allow_up) {
                    return "translate(0," + "-100" + ")";
                }
                return "translate(0," + "1000" + ")";
            })
            .remove()
            .attr("fill-opacity", 0);

        barExit
            .select("rect")
            .attr("fill-opacity", 0)
            .attr("width", () => {
                if (always_up) return xScale(0);
                return xScale(currentData[currentData.length - 1]["value"]);
            });

        if (!long) {
            barExit
                .select(".value")
                .attr("fill-opacity", 0)
                .attr("x", () => {
                    if (always_up) return xScale(0);
                    return xScale(currentData[currentData.length - 1]["value"]);
                });
        }

        barExit
            .select(".barInfo")
            .attr("fill-opacity", 0)
            .attr("stroke-width", function(d) {
                return "0px";
            })
            .attr("x", () => {
                if (long) return 10;
                if (always_up) return xScale(0);
                return xScale(currentData[currentData.length - 1]["value"]);
            });

        barExit.select(".label").attr("fill-opacity", 0);
        if (config.use_img) {
            barExit.select("circle").attr("fill-opacity", 0);
        }
    }

    function change() {
        yScale
            .domain(currentData.map(d => d.name).reverse())
            .range([innerHeight, 0]);
        if (animation == "linear") {
            g.selectAll(".bar")
                .data(currentData, function(d) {
                    return d.name;
                })
                .transition("1")
                .ease(d3.easeLinear)
                .duration(baseTime * update_rate * interval_time)
                .attr("transform", function(d) {
                    return "translate(0," + yScale(yValue(d)) + ")";
                });
        } else {
        g.selectAll(".bar")
            .data(currentData, function(d) {
                return d.name;
            })
            .transition("1")
            .duration(baseTime * update_rate * interval_time)
            .attr("transform", function(d) {
                return "translate(0," + yScale(yValue(d)) + ")";
            });
        }
    }

    var i = 0;
    var p = config.wait;
    var update_rate = config.update_rate;
    var inter = setInterval(function next() {
        // 빈 p 라운드
        while (p) {
            p -= 1;
            return;
        }
        currentdate = time[i];
        getCurrentData(time[i]);
        i++;

        if (i >= time.length) {
            window.clearInterval(inter);
        }
    }, baseTime * interval_time);
    // setInterval(() => {
    //     d3.transition()
    //         .each(change)
    // }, baseTime * update_rate * interval_time)
} //그래프 생성 및 제어
