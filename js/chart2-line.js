$(function() {
    var svg = d3.select(".chart2-line")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1000 450"),
        margin = {
            top: 30,
            right: 50,
            bottom: 30,
            left: 80
        },
        width = +1000 - margin.left - margin.right,
        height = +450 - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%m-%d");

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // yli = ['2008', '2009', '2017']
    var line0 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2008']);
        });
    var line1 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2009']);
        });
    var line2 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2010']);
        });
    var line3 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2011']);
        });
    var line4 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2012']);
        });
    var line5 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2013']);
        });
    var line6 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2014']);
        });
    var line7 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2015']);
        });
    var line8 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2016']);
        });
    var line9 = d3.line()
        .curve(d3.curveCardinal)
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d['2017']);
        });


    d3.csv("data/dataAmon.csv", function(d) {
        d.date = parseTime(d.date);
        return d;
    }, function(error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain([0, 350000]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("fill", "#cfcfcf")
            .call(d3.axisBottom(x))
            .attr("stroke", "#cfcfcf")
            .select(".domain")
            .remove();

        g.append("g")
            .call(d3.axisLeft(y))
            .attr("stroke", "#cfcfcf")
            .append("text")
            .attr("transform", "translate(0," + -20 + ")")
            .attr("fill", "#cfcfcf")
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Box office(¥10,000)");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#00eeee")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line0);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#00dddd")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line1);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#00cccc")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line2);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#00bbbb")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line3);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#00aaaa")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line4);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#009999")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line5);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#008888")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line6);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#007777")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line7);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#006666")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line8);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#005555")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line9);
    });

    d3.csv("data/dataFmon.csv", function(d) {
        d.date = parseTime(d.date);
        return d;
    }, function(error, data) {
        if (error) throw error;

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#555522")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line0);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#666633")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line1);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#777744")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line2);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#888855")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line3);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#999966")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line4);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#aaaa77")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line5);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#bbbb88")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line6);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#cccc99")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line7);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#ddddaa")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line8);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("opacity", 0.6)
            .attr("stroke", "#eeeebb")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line9);


        var legendLine = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(["all films", "foreign films"])
            .enter().append("g")
            .attr("transform", function(d, i) {
                return "translate(" + 0 + "," + (i * 30 + 90) + ")";
            });

        legendLine.append("rect")
            .attr("x", width - 19)
            .attr("y", 28)
            .attr("width", 19)
            .attr("height", 2)
            .attr("fill", function(d) {
                if (d == "all films") return "#00eeee";
                else return "#eeeebb";
            });

        legendLine.append("text")
            .attr("x", width - 24)
            .attr("y", 29)
            .attr("dy", "0.32em")
            .attr("fill", "#bfbfbf")
            .text(function(d) {
                return d;
            });
    })
})