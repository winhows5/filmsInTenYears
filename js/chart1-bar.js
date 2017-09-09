$(function() {

    var svg = d3.select(".chart1-bar")
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("id", "svg1")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 800 450"),
        margin = {
            top: 20,
            right: 180,
            bottom: 20,
            left: 80
        },
        width = +800 - margin.left - margin.right,
        height = +450 - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.2)
        .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var yLine = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#6b486b", "#ff8c00", "#98abc5"]);

    var line = d3.line()
        .x(function(d) {
            return x(d.year);
        })
        .y(function(d) {
            return yLine(d.China / (d.China * 1.0 + d.foreign * 1.0 + d.cooperation * 1.0));
        });
    // var zrate = 9999999999
    // var linerate = d3.line()
    //     .x(function(d) {
    //         return x(d.year);
    //     })
    //     .y(function(d) {
    //         console.log([(d.China * 1.0 + d.foreign * 1.0 + d.cooperation * 1.0), zrate])
    //         rate = yLine(((d.China * 1.0 + d.foreign * 1.0 + d.cooperation * 1.0) - zrate) / zrate)
    //         zrate = d.China * 1.0 + d.foreign * 1.0 + d.cooperation * 1.0
    //         return rate;
    //     });

    d3.csv("data/datayears.csv", function(error, data) {
        if (error) throw error;
        var keys = data.columns.slice(2);
        x.domain(data.map(function(d) {
            return d.year;
        }));
        y.domain([-d3.max(data, function(d) {
            return d.foreign * 1.0;
        }), d3.max(data, function(d) {
            return d.foreign * 1.0;
        })]).nice();
        z.domain(keys);
        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function(d) {
                return z(d.key);
            })
            .selectAll("rect")
            .data(function(d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function(d) {
                return x(d.data.year);
            })
            .attr("y", function(d) {
                return y(+d[1]);
            })
            .attr("height", function(d) {
                return (y(+d[0]) - y(+d[1]));
            })
            .attr("width", 20);
        var keys2 = data.columns.slice(1, 2);
        d3.select("#svg1 g").append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys2)(data))
            .enter().append("g")
            .attr("fill", function(d) {
                return z(d.key);
            })
            .selectAll("rect")
            .data(function(d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function(d) {
                return x(d.data.year);
            })
            .attr("y", function(d) {
                return y(0);
            })
            .attr("height", function(d) {
                return (y(-d[1]) - y(d[0]));
            })
            .attr("width", 20);
        yLine.domain([0, 1]);
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#EECFA1")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        // g.append("path")
        //     .datum(data)
        //     .attr("fill", "none")
        //     .attr("stroke", "#EECFA1")
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-linecap", "round")
        //     .attr("stroke-width", 1.5)
        //     .attr("d", linerate);

        g.append("g")
            .attr("class", "axis")
            .attr("stroke", "#cfcfcf")
            .attr("transform", "translate(" + width + "," + 0 + ")")
            .call(d3.axisRight(yLine))
            .append("text")
            .attr("fill", "#cfcfcf")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Percent");


        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .attr("stroke", "#cfcfcf");

        g.append("g")
            .attr("class", "axis")
            .attr("stroke", "#cfcfcf")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#cccccc")
            .attr("text-anchor", "start")
            .text("Box office(¥10,000)");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.concat(keys2).slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) {
                return "translate(" + margin.right * 0.75 + "," + (i * 30) + ")";
            });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("y", 20)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 29)
            .attr("dy", "0.32em")
            .attr("fill", "#bfbfbf")
            .text(function(d) {
                return d;
            });

        var legendLine = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(["domestic ratio"])
            .enter().append("g")
            .attr("transform", function(d, i) {
                return "translate(" + margin.right * 0.75 + "," + (i * 30 + 90) + ")";
            });

        legendLine.append("rect")
            .attr("x", width - 19)
            .attr("y", 28)
            .attr("width", 19)
            .attr("height", 2)
            .attr("fill", function(d) {
                if (d == "domestic ratio") return "#EECFA1";
                else return "#C1FFC1";
            });

        legendLine.append("text")
            .attr("x", width - 24)
            .attr("y", 29)
            .attr("dy", "0.32em")
            .attr("fill", "#bfbfbf")
            .text(function(d) {
                return d;
            });
    });
})