var app = angular.module('bar', []);
 
app.controller('appCtrl', function($scope, $timeout) {
 
    dadoes = [{
            "mes": "JAN",
            "dado": 40,
        },
        {
            "mes": "FEV",
            "dado": 80,
        },
        {
            "mes": "MAR",
            "dado": 30,
        },
        {
            "mes": "ABR",
            "dado": 60,
        }
    ]
 
    var margin = { top: 0, right: 30, bottom: 20, left: 40 },
        width = 170 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;
 
    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(dadoes.map((d) => d.mes))
        .padding(0.1)
 
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, height]);
 
    var svg = d3.selectAll('.div-graph').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    svg.append('g')
        .selectAll('text')
        .data(dadoes)
        .enter()
        .append('text')
        .attr('x', (d) => xScale(d.mes) + xScale.bandwidth() / 2)
        .attr('y', height)
        .attr('text-anchor', 'middle')
        .attr('fill', '#FFFFFF')
        .attr('color', '#CECECF')
        .text((d) => { return d.mes })
 
    const barrasGraf = svg.append("g")
    const barras = barrasGraf.selectAll()
        .data(dadoes)
        .enter()
        .append('g')
 
    barras
        .append("rect")
        .attr("width", xScale.bandwidth())
        .attr('x', (d) => xScale(d.mes))
        .attr('y', (d) => y(d.dado))
        .style("fill", "#009085")
        .transition()
        .delay(500)
        .attr("height", function(d) { return height - 25 - y(d.dado) });
 
    barras
        .selectAll("text")
        .data(dadoes)
        .enter()
        .append("text")
        .attr('x', (d) => {
            return xScale(d.mes) + xScale.bandwidth() / 2
        })
        .attr('y', function(d) { return y(d.dado); })
        .attr('text-anchor', 'middle')
        .attr('fill', '#FFFFFF')
        .text((d) => (d.dado));
 
    svg
        .append("g")
        .selectAll("dot")
        .data(dadoes)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", function(d) { return xScale(d.mes) + xScale.bandwidth() / 2; })
        .attr("cy", function(d) { return y(d.dado); })
        .style("stroke", "white")
        .style("fill", "black")
 
});