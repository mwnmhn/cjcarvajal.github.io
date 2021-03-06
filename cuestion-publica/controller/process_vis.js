const retrieveData = async (dataUrl) => {
    let data = [];
    return await (await fetch(dataUrl)).json();
}

var svgAverage = d3.select("#principalAverage"),
    margin = { top: 20, right: 80, bottom: 30, left: 90 },
    chartWidth = svgAverage.attr("width") - margin.left - margin.right,
    chartHeight = svgAverage.attr("height") - margin.top - margin.bottom,
    averageG = svgAverage.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var commonXScale = d3.scaleTime().range([0, chartWidth - 20]),
    averageY = d3.scaleLinear().range([chartHeight, 0]),
    averageZ = d3.scaleOrdinal(d3.schemeCategory10),
    earnsY = d3.scaleLinear().range([chartHeight, 0]),
    earnsZ = d3.scaleOrdinal(d3.schemeCategory10),
    congressY = d3.scaleLinear().range([chartHeight, 0]),
    congressZ = d3.scaleOrdinal(d3.schemeCategory10),
    lineConsecutiveId = 0;

commonXScale.domain([new Date("2014"), new Date("2016-01-02")]);

var svgCongress = d3.select("#principal"),
    congressG = svgCongress.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var svgEarns = d3.select("#principalEarns"),
    earnsG = svgEarns.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svgLegend = d3.select("#legend").style("font", "10px sans-serif");
var svgLegendAverage = d3.select("#legendAverage").style("font", "10px sans-serif");
var svgLegendEarns = d3.select("#legendEarns").style("font", "10px sans-serif");

/*
 * Average mockup
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/financial.json').then(response => {
    drawMultiLineChart(response, averageY, averageG, averageZ, svgLegendAverage);
    animatePath();
});

/*
 *Patrimonio Liquido mockup
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/earns.json').then(response => {
    drawMultiLineChart(response, earnsY, earnsG, earnsZ, svgLegendEarns);
    animatePath();
});

/*
 * Congress mockup Begin
 */
retrieveData('https://cjcarvajal.github.io/cuestion-publica/data/congress.json').then(response => {
    drawMultiLineChart(response, congressY, congressG, congressZ, svgLegend);
    animatePath();
});