/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-278", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-389", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-277", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-388", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0], [200.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "store-121", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "store-122", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-279", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-274", "isController": false}, {"data": [[0.0, 6.0], [300.0, 2.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "store-120", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "mac-276", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-275", "isController": false}, {"data": [[300.0, 4.0], [4700.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [400.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "home-46", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1200.0, 2.0], [2400.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "home-47", "isController": false}, {"data": [[1100.0, 3.0], [2300.0, 1.0], [1200.0, 2.0], [4800.0, 1.0], [1700.0, 1.0], [3500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "home-48", "isController": false}, {"data": [[300.0, 2.0], [1300.0, 1.0], [1400.0, 3.0], [100.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "store-135-2", "isController": false}, {"data": [[4100.0, 1.0], [600.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [2700.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [3700.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "home-49", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [400.0, 1.0], [200.0, 3.0], [100.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "store-135-1", "isController": false}, {"data": [[4400.0, 1.0], [300.0, 4.0], [1200.0, 2.0], [1300.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "store-135-0", "isController": false}, {"data": [[0.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "mac-270", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-272", "isController": false}, {"data": [[0.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "mac-271", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-387", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-386", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "store-134", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [1300.0, 2.0], [5800.0, 1.0], [1500.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "store-135", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-288", "isController": false}, {"data": [[0.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "store-132", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "store-133", "isController": false}, {"data": [[700.0, 1.0], [200.0, 2.0], [100.0, 7.0]], "isOverall": false, "label": "mac-246", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "store-130", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "store-131", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-284", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-287", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [700.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "home-30", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "store-138", "isController": false}, {"data": [[0.0, 6.0], [700.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "store-137", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "home-35", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "mac-281", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-280", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "mac-283", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "ipad-372", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-282", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 1.0], [1400.0, 1.0], [900.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "ipad", "isController": true}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-400", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "ipad-402", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "ipad-401", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "mac-296", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-404", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-295", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-403", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "home-60", "isController": false}, {"data": [[0.0, 7.0], [700.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "home-61", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "home-62", "isController": false}, {"data": [[0.0, 7.0], [400.0, 1.0], [100.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "home-63", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "home-64", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "home-65", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "home-66", "isController": false}, {"data": [[2600.0, 2.0], [2800.0, 1.0], [3000.0, 3.0], [3400.0, 2.0], [3900.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "mac", "isController": true}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "home-67", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "home-68", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "mac-292", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-294", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "mac-293", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [800.0, 3.0], [400.0, 1.0], [200.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "store-94", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 1.0], [700.0, 3.0], [1400.0, 1.0], [400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "mac-267", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-399", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [400.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "store-110", "isController": false}, {"data": [[600.0, 2.0], [1200.0, 1.0], [700.0, 3.0], [2700.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "store-111", "isController": false}, {"data": [[0.0, 4.0], [100.0, 6.0]], "isOverall": false, "label": "mac-265", "isController": false}, {"data": [[300.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "mac-264", "isController": false}, {"data": [[4300.0, 1.0], [2200.0, 1.0], [1200.0, 2.0], [2400.0, 1.0], [1300.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "home-50", "isController": false}, {"data": [[0.0, 3.0], [300.0, 2.0], [600.0, 1.0], [100.0, 2.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "home-51", "isController": false}, {"data": [[0.0, 5.0], [1100.0, 1.0], [100.0, 1.0], [400.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "store-119", "isController": false}, {"data": [[9000.0, 1.0], [4800.0, 1.0], [4900.0, 1.0], [5200.0, 2.0], [5500.0, 2.0], [5400.0, 1.0], [6300.0, 2.0]], "isOverall": false, "label": "store", "isController": true}, {"data": [[1100.0, 1.0], [4600.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [3000.0, 1.0], [3200.0, 2.0], [3400.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "home-52", "isController": false}, {"data": [[0.0, 7.0], [300.0, 1.0], [1200.0, 1.0], [600.0, 1.0]], "isOverall": false, "label": "home-53", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [200.0, 3.0], [100.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "home-54", "isController": false}, {"data": [[2100.0, 1.0], [4100.0, 1.0], [2500.0, 1.0], [800.0, 2.0], [900.0, 1.0], [7800.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "home-55", "isController": false}, {"data": [[0.0, 5.0], [600.0, 2.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "home-56", "isController": false}, {"data": [[16400.0, 1.0], [18000.0, 1.0], [18100.0, 1.0], [9900.0, 1.0], [20000.0, 1.0], [26700.0, 1.0], [15100.0, 1.0], [15400.0, 2.0], [16300.0, 1.0]], "isOverall": false, "label": "home", "isController": true}, {"data": [[0.0, 8.0], [400.0, 1.0], [14400.0, 1.0]], "isOverall": false, "label": "home-57", "isController": false}, {"data": [[0.0, 9.0], [600.0, 1.0]], "isOverall": false, "label": "home-58", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "home-59", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-390", "isController": false}, {"data": [[0.0, 9.0], [300.0, 1.0]], "isOverall": false, "label": "ipad-394", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "ipad-395", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 26700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 41.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 684.0, "series": [{"data": [[0.0, 684.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 95.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 41.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 8.505813953488378, "minX": 1.67299074E12, "maxY": 8.505813953488378, "series": [{"data": [[1.67299074E12, 8.505813953488378]], "isOverall": false, "label": "Apple", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67299074E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 65.0, "minX": 1.0, "maxY": 26743.0, "series": [{"data": [[1.0, 73.0], [9.0, 77.0], [10.0, 75.66666666666666], [6.0, 69.0], [3.0, 76.0]], "isOverall": false, "label": "mac-278", "isController": false}, {"data": [[7.8999999999999995, 74.89999999999999]], "isOverall": false, "label": "mac-278-Aggregated", "isController": false}, {"data": [[8.0, 70.0], [4.0, 74.0], [2.0, 69.0], [1.0, 75.0], [9.0, 75.0], [10.0, 90.0], [3.0, 70.0]], "isOverall": false, "label": "ipad-389", "isController": false}, {"data": [[6.4, 74.8]], "isOverall": false, "label": "ipad-389-Aggregated", "isController": false}, {"data": [[1.0, 69.0], [9.0, 73.0], [10.0, 70.83333333333333], [6.0, 74.0], [3.0, 69.0]], "isOverall": false, "label": "mac-277", "isController": false}, {"data": [[7.8999999999999995, 71.0]], "isOverall": false, "label": "mac-277-Aggregated", "isController": false}, {"data": [[4.0, 71.0], [2.0, 73.0], [1.0, 74.0], [9.0, 71.5], [10.0, 93.5]], "isOverall": false, "label": "ipad-388", "isController": false}, {"data": [[6.699999999999999, 76.2]], "isOverall": false, "label": "ipad-388-Aggregated", "isController": false}, {"data": [[10.0, 228.50000000000003]], "isOverall": false, "label": "store-121", "isController": false}, {"data": [[10.0, 228.50000000000003]], "isOverall": false, "label": "store-121-Aggregated", "isController": false}, {"data": [[10.0, 146.1]], "isOverall": false, "label": "store-122", "isController": false}, {"data": [[10.0, 146.1]], "isOverall": false, "label": "store-122-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 75.0], [10.0, 69.83333333333333], [5.0, 69.0], [3.0, 71.0]], "isOverall": false, "label": "mac-279", "isController": false}, {"data": [[7.8, 70.5]], "isOverall": false, "label": "mac-279-Aggregated", "isController": false}, {"data": [[8.0, 68.0], [4.0, 68.0], [1.0, 69.0], [9.0, 73.0], [10.0, 71.66666666666667]], "isOverall": false, "label": "mac-274", "isController": false}, {"data": [[8.2, 70.8]], "isOverall": false, "label": "mac-274-Aggregated", "isController": false}, {"data": [[10.0, 181.6]], "isOverall": false, "label": "store-120", "isController": false}, {"data": [[10.0, 181.6]], "isOverall": false, "label": "store-120-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 73.0], [10.0, 122.50000000000001], [3.0, 70.0], [7.0, 79.0]], "isOverall": false, "label": "mac-276", "isController": false}, {"data": [[8.0, 102.80000000000001]], "isOverall": false, "label": "mac-276-Aggregated", "isController": false}, {"data": [[8.0, 76.0], [4.0, 80.0], [1.0, 70.0], [9.0, 74.0], [10.0, 72.33333333333333]], "isOverall": false, "label": "mac-275", "isController": false}, {"data": [[8.2, 73.39999999999999]], "isOverall": false, "label": "mac-275-Aggregated", "isController": false}, {"data": [[10.0, 1309.8]], "isOverall": false, "label": "home-46", "isController": false}, {"data": [[10.0, 1309.8]], "isOverall": false, "label": "home-46-Aggregated", "isController": false}, {"data": [[10.0, 1146.9]], "isOverall": false, "label": "home-47", "isController": false}, {"data": [[10.0, 1146.9]], "isOverall": false, "label": "home-47-Aggregated", "isController": false}, {"data": [[10.0, 1949.1000000000001]], "isOverall": false, "label": "home-48", "isController": false}, {"data": [[10.0, 1949.1000000000001]], "isOverall": false, "label": "home-48-Aggregated", "isController": false}, {"data": [[10.0, 745.0]], "isOverall": false, "label": "store-135-2", "isController": false}, {"data": [[10.0, 745.0]], "isOverall": false, "label": "store-135-2-Aggregated", "isController": false}, {"data": [[10.0, 2097.2]], "isOverall": false, "label": "home-49", "isController": false}, {"data": [[10.0, 2097.2]], "isOverall": false, "label": "home-49-Aggregated", "isController": false}, {"data": [[10.0, 297.70000000000005]], "isOverall": false, "label": "store-135-1", "isController": false}, {"data": [[10.0, 297.70000000000005]], "isOverall": false, "label": "store-135-1-Aggregated", "isController": false}, {"data": [[10.0, 1160.1999999999998]], "isOverall": false, "label": "store-135-0", "isController": false}, {"data": [[10.0, 1160.1999999999998]], "isOverall": false, "label": "store-135-0-Aggregated", "isController": false}, {"data": [[8.0, 75.0], [1.0, 71.0], [10.0, 134.625]], "isOverall": false, "label": "mac-270", "isController": false}, {"data": [[8.9, 122.3]], "isOverall": false, "label": "mac-270-Aggregated", "isController": false}, {"data": [[1.0, 73.0], [10.0, 69.99999999999999], [6.0, 68.0]], "isOverall": false, "label": "mac-272", "isController": false}, {"data": [[8.7, 70.1]], "isOverall": false, "label": "mac-272-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [10.0, 170.25], [7.0, 69.0]], "isOverall": false, "label": "mac-271", "isController": false}, {"data": [[8.799999999999999, 150.1]], "isOverall": false, "label": "mac-271-Aggregated", "isController": false}, {"data": [[4.0, 72.5], [2.0, 92.0], [1.0, 77.0], [9.0, 75.5], [10.0, 71.5]], "isOverall": false, "label": "ipad-387", "isController": false}, {"data": [[6.699999999999999, 75.89999999999999]], "isOverall": false, "label": "ipad-387-Aggregated", "isController": false}, {"data": [[4.0, 70.5], [2.0, 81.0], [1.0, 86.0], [9.0, 68.5], [10.0, 91.0]], "isOverall": false, "label": "ipad-386", "isController": false}, {"data": [[6.699999999999999, 76.39999999999999]], "isOverall": false, "label": "ipad-386-Aggregated", "isController": false}, {"data": [[10.0, 70.1]], "isOverall": false, "label": "store-134", "isController": false}, {"data": [[10.0, 70.1]], "isOverall": false, "label": "store-134-Aggregated", "isController": false}, {"data": [[10.0, 2204.8]], "isOverall": false, "label": "store-135", "isController": false}, {"data": [[10.0, 2204.8]], "isOverall": false, "label": "store-135-Aggregated", "isController": false}, {"data": [[4.0, 77.0], [1.0, 73.0], [10.0, 74.33333333333334], [6.0, 76.0], [3.0, 71.0]], "isOverall": false, "label": "mac-288", "isController": false}, {"data": [[7.3999999999999995, 74.30000000000001]], "isOverall": false, "label": "mac-288-Aggregated", "isController": false}, {"data": [[10.0, 111.69999999999999]], "isOverall": false, "label": "store-132", "isController": false}, {"data": [[10.0, 111.69999999999999]], "isOverall": false, "label": "store-132-Aggregated", "isController": false}, {"data": [[10.0, 68.6]], "isOverall": false, "label": "store-133", "isController": false}, {"data": [[10.0, 68.6]], "isOverall": false, "label": "store-133-Aggregated", "isController": false}, {"data": [[1.0, 155.0], [9.0, 220.0], [10.0, 230.0]], "isOverall": false, "label": "mac-246", "isController": false}, {"data": [[9.0, 221.5]], "isOverall": false, "label": "mac-246-Aggregated", "isController": false}, {"data": [[10.0, 78.1]], "isOverall": false, "label": "store-130", "isController": false}, {"data": [[10.0, 78.1]], "isOverall": false, "label": "store-130-Aggregated", "isController": false}, {"data": [[10.0, 73.40000000000002]], "isOverall": false, "label": "store-131", "isController": false}, {"data": [[10.0, 73.40000000000002]], "isOverall": false, "label": "store-131-Aggregated", "isController": false}, {"data": [[8.0, 74.0], [4.0, 69.0], [1.0, 73.0], [10.0, 72.5], [3.0, 69.0]], "isOverall": false, "label": "mac-284", "isController": false}, {"data": [[7.6000000000000005, 72.0]], "isOverall": false, "label": "mac-284-Aggregated", "isController": false}, {"data": [[8.0, 74.0], [4.0, 68.0], [1.0, 69.0], [10.0, 70.0], [3.0, 69.0]], "isOverall": false, "label": "mac-287", "isController": false}, {"data": [[7.6000000000000005, 70.0]], "isOverall": false, "label": "mac-287-Aggregated", "isController": false}, {"data": [[10.0, 187.1]], "isOverall": false, "label": "home-30", "isController": false}, {"data": [[10.0, 187.1]], "isOverall": false, "label": "home-30-Aggregated", "isController": false}, {"data": [[10.0, 75.9]], "isOverall": false, "label": "store-138", "isController": false}, {"data": [[10.0, 75.9]], "isOverall": false, "label": "store-138-Aggregated", "isController": false}, {"data": [[10.0, 161.4]], "isOverall": false, "label": "store-137", "isController": false}, {"data": [[10.0, 161.4]], "isOverall": false, "label": "store-137-Aggregated", "isController": false}, {"data": [[10.0, 172.6]], "isOverall": false, "label": "home-35", "isController": false}, {"data": [[10.0, 172.6]], "isOverall": false, "label": "home-35-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [9.0, 101.0], [10.0, 71.0], [5.0, 71.0], [3.0, 69.0]], "isOverall": false, "label": "mac-281", "isController": false}, {"data": [[7.8, 73.7]], "isOverall": false, "label": "mac-281-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 73.0], [10.0, 70.5], [5.0, 69.0], [3.0, 68.0]], "isOverall": false, "label": "mac-280", "isController": false}, {"data": [[7.8, 70.39999999999999]], "isOverall": false, "label": "mac-280-Aggregated", "isController": false}, {"data": [[8.0, 82.0], [4.0, 69.0], [1.0, 69.0], [10.0, 120.16666666666666], [3.0, 76.0]], "isOverall": false, "label": "mac-283", "isController": false}, {"data": [[7.6000000000000005, 101.69999999999999]], "isOverall": false, "label": "mac-283-Aggregated", "isController": false}, {"data": [[4.0, 138.0], [2.0, 171.0], [1.0, 114.0], [9.0, 120.66666666666667], [10.0, 127.66666666666667]], "isOverall": false, "label": "ipad-372", "isController": false}, {"data": [[6.8, 130.6]], "isOverall": false, "label": "ipad-372-Aggregated", "isController": false}, {"data": [[4.0, 68.0], [1.0, 72.0], [9.0, 73.0], [10.0, 72.33333333333333], [3.0, 70.0]], "isOverall": false, "label": "mac-282", "isController": false}, {"data": [[7.7, 71.7]], "isOverall": false, "label": "mac-282-Aggregated", "isController": false}, {"data": [[8.0, 1134.0], [4.0, 1081.0], [2.0, 1140.0], [1.0, 1063.0], [9.0, 1241.0], [10.0, 1407.0], [5.0, 994.0], [6.0, 988.0], [3.0, 1130.0], [7.0, 1081.0]], "isOverall": false, "label": "ipad", "isController": true}, {"data": [[5.5, 1125.9000000000003]], "isOverall": false, "label": "ipad-Aggregated", "isController": true}, {"data": [[8.0, 65.0], [4.0, 73.0], [2.0, 76.0], [1.0, 71.0], [9.0, 72.66666666666667], [10.0, 68.0], [6.0, 65.0], [3.0, 69.0]], "isOverall": false, "label": "ipad-400", "isController": false}, {"data": [[6.1000000000000005, 70.5]], "isOverall": false, "label": "ipad-400-Aggregated", "isController": false}, {"data": [[8.0, 71.0], [4.0, 73.0], [2.0, 69.0], [1.0, 70.0], [9.0, 75.0], [10.0, 96.0], [5.0, 66.0], [3.0, 112.0], [7.0, 69.0]], "isOverall": false, "label": "ipad-402", "isController": false}, {"data": [[5.700000000000001, 77.2]], "isOverall": false, "label": "ipad-402-Aggregated", "isController": false}, {"data": [[8.0, 82.66666666666667], [4.0, 75.0], [2.0, 81.0], [1.0, 72.0], [9.0, 161.0], [10.0, 67.0], [5.0, 65.0], [3.0, 70.0]], "isOverall": false, "label": "ipad-401", "isController": false}, {"data": [[5.8, 83.9]], "isOverall": false, "label": "ipad-401-Aggregated", "isController": false}, {"data": [[4.0, 78.0], [2.0, 70.0], [1.0, 70.0], [9.0, 65.5], [10.0, 79.75]], "isOverall": false, "label": "mac-296", "isController": false}, {"data": [[6.8999999999999995, 74.60000000000001]], "isOverall": false, "label": "mac-296-Aggregated", "isController": false}, {"data": [[8.0, 75.0], [4.0, 89.0], [2.0, 71.0], [1.0, 71.0], [9.0, 73.0], [10.0, 81.0], [5.0, 67.0], [6.0, 79.0], [3.0, 75.0], [7.0, 68.0]], "isOverall": false, "label": "ipad-404", "isController": false}, {"data": [[5.5, 74.9]], "isOverall": false, "label": "ipad-404-Aggregated", "isController": false}, {"data": [[4.0, 77.0], [2.0, 70.0], [1.0, 71.0], [9.0, 71.0], [10.0, 72.6], [5.0, 73.0]], "isOverall": false, "label": "mac-295", "isController": false}, {"data": [[7.100000000000001, 72.5]], "isOverall": false, "label": "mac-295-Aggregated", "isController": false}, {"data": [[8.0, 70.5], [4.0, 73.0], [2.0, 69.0], [1.0, 70.0], [9.0, 73.0], [10.0, 68.0], [5.0, 65.0], [6.0, 65.0], [3.0, 68.0]], "isOverall": false, "label": "ipad-403", "isController": false}, {"data": [[5.6, 69.2]], "isOverall": false, "label": "ipad-403-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [10.0, 75.66666666666667]], "isOverall": false, "label": "home-60", "isController": false}, {"data": [[9.1, 75.2]], "isOverall": false, "label": "home-60-Aggregated", "isController": false}, {"data": [[1.0, 69.0], [10.0, 168.44444444444446]], "isOverall": false, "label": "home-61", "isController": false}, {"data": [[9.1, 158.5]], "isOverall": false, "label": "home-61-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 71.0], [10.0, 88.375]], "isOverall": false, "label": "home-62", "isController": false}, {"data": [[9.0, 84.9]], "isOverall": false, "label": "home-62-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 69.0], [10.0, 139.625]], "isOverall": false, "label": "home-63", "isController": false}, {"data": [[9.0, 125.69999999999999]], "isOverall": false, "label": "home-63-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 69.0], [10.0, 103.0]], "isOverall": false, "label": "home-64", "isController": false}, {"data": [[9.0, 96.4]], "isOverall": false, "label": "home-64-Aggregated", "isController": false}, {"data": [[1.0, 71.0], [9.0, 73.0], [10.0, 69.75]], "isOverall": false, "label": "home-65", "isController": false}, {"data": [[9.0, 70.2]], "isOverall": false, "label": "home-65-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [9.0, 69.0], [10.0, 106.49999999999999]], "isOverall": false, "label": "home-66", "isController": false}, {"data": [[9.0, 99.09999999999998]], "isOverall": false, "label": "home-66-Aggregated", "isController": false}, {"data": [[4.0, 2830.5], [2.0, 3087.0], [1.0, 2653.0], [9.0, 3487.5], [10.0, 3444.0]], "isOverall": false, "label": "mac", "isController": true}, {"data": [[6.8999999999999995, 3215.2]], "isOverall": false, "label": "mac-Aggregated", "isController": true}, {"data": [[1.0, 71.0], [9.0, 69.0], [10.0, 97.49999999999999]], "isOverall": false, "label": "home-67", "isController": false}, {"data": [[9.0, 91.99999999999999]], "isOverall": false, "label": "home-67-Aggregated", "isController": false}, {"data": [[1.0, 70.0], [9.0, 71.0], [10.0, 72.75]], "isOverall": false, "label": "home-68", "isController": false}, {"data": [[9.0, 72.3]], "isOverall": false, "label": "home-68-Aggregated", "isController": false}, {"data": [[4.0, 102.0], [2.0, 68.0], [1.0, 71.0], [9.0, 66.0], [10.0, 70.0], [6.0, 73.0]], "isOverall": false, "label": "mac-292", "isController": false}, {"data": [[7.2, 73.0]], "isOverall": false, "label": "mac-292-Aggregated", "isController": false}, {"data": [[4.0, 68.0], [2.0, 69.0], [1.0, 70.0], [9.0, 66.0], [10.0, 72.5], [5.0, 75.0]], "isOverall": false, "label": "mac-294", "isController": false}, {"data": [[7.000000000000001, 70.4]], "isOverall": false, "label": "mac-294-Aggregated", "isController": false}, {"data": [[4.0, 69.0], [2.0, 79.0], [1.0, 71.0], [9.0, 66.0], [10.0, 71.4], [5.0, 74.0]], "isOverall": false, "label": "mac-293", "isController": false}, {"data": [[7.100000000000001, 71.60000000000001]], "isOverall": false, "label": "mac-293-Aggregated", "isController": false}, {"data": [[10.0, 1206.0], [6.0, 616.4]], "isOverall": false, "label": "store-94", "isController": false}, {"data": [[8.0, 911.1999999999999]], "isOverall": false, "label": "store-94-Aggregated", "isController": false}, {"data": [[8.0, 799.0], [4.0, 903.0], [1.0, 585.0], [10.0, 843.0]], "isOverall": false, "label": "mac-267", "isController": false}, {"data": [[8.299999999999999, 818.8000000000001]], "isOverall": false, "label": "mac-267-Aggregated", "isController": false}, {"data": [[8.0, 66.0], [4.0, 76.0], [2.0, 78.0], [1.0, 71.0], [9.0, 72.33333333333333], [10.0, 68.0], [6.0, 66.0], [3.0, 80.0]], "isOverall": false, "label": "ipad-399", "isController": false}, {"data": [[6.1000000000000005, 72.19999999999999]], "isOverall": false, "label": "ipad-399-Aggregated", "isController": false}, {"data": [[9.0, 433.0], [10.0, 174.6], [6.0, 82.0], [7.0, 92.0]], "isOverall": false, "label": "store-110", "isController": false}, {"data": [[8.399999999999999, 164.4]], "isOverall": false, "label": "store-110-Aggregated", "isController": false}, {"data": [[10.0, 1084.6999999999998]], "isOverall": false, "label": "store-111", "isController": false}, {"data": [[10.0, 1084.6999999999998]], "isOverall": false, "label": "store-111-Aggregated", "isController": false}, {"data": [[8.0, 140.0], [1.0, 105.0], [10.0, 104.125]], "isOverall": false, "label": "mac-265", "isController": false}, {"data": [[8.9, 107.8]], "isOverall": false, "label": "mac-265-Aggregated", "isController": false}, {"data": [[4.0, 330.0], [1.0, 321.0], [10.0, 375.25]], "isOverall": false, "label": "mac-264", "isController": false}, {"data": [[8.5, 365.3]], "isOverall": false, "label": "mac-264-Aggregated", "isController": false}, {"data": [[10.0, 1822.6999999999998]], "isOverall": false, "label": "home-50", "isController": false}, {"data": [[10.0, 1822.6999999999998]], "isOverall": false, "label": "home-50-Aggregated", "isController": false}, {"data": [[10.0, 347.7]], "isOverall": false, "label": "home-51", "isController": false}, {"data": [[10.0, 347.7]], "isOverall": false, "label": "home-51-Aggregated", "isController": false}, {"data": [[10.0, 293.1]], "isOverall": false, "label": "store-119", "isController": false}, {"data": [[10.0, 293.1]], "isOverall": false, "label": "store-119-Aggregated", "isController": false}, {"data": [[10.0, 5853.6]], "isOverall": false, "label": "store", "isController": true}, {"data": [[10.0, 5853.6]], "isOverall": false, "label": "store-Aggregated", "isController": true}, {"data": [[10.0, 2440.3]], "isOverall": false, "label": "home-52", "isController": false}, {"data": [[10.0, 2440.3]], "isOverall": false, "label": "home-52-Aggregated", "isController": false}, {"data": [[10.0, 282.9]], "isOverall": false, "label": "home-53", "isController": false}, {"data": [[10.0, 282.9]], "isOverall": false, "label": "home-53-Aggregated", "isController": false}, {"data": [[10.0, 381.2]], "isOverall": false, "label": "home-54", "isController": false}, {"data": [[10.0, 381.2]], "isOverall": false, "label": "home-54-Aggregated", "isController": false}, {"data": [[1.0, 1055.0], [10.0, 2290.111111111111]], "isOverall": false, "label": "home-55", "isController": false}, {"data": [[9.1, 2166.6]], "isOverall": false, "label": "home-55-Aggregated", "isController": false}, {"data": [[1.0, 74.0], [10.0, 251.11111111111111]], "isOverall": false, "label": "home-56", "isController": false}, {"data": [[9.1, 233.4]], "isOverall": false, "label": "home-56-Aggregated", "isController": false}, {"data": [[1.0, 26743.0], [9.0, 20096.0], [10.0, 15618.75]], "isOverall": false, "label": "home", "isController": true}, {"data": [[9.0, 17178.9]], "isOverall": false, "label": "home-Aggregated", "isController": true}, {"data": [[1.0, 14487.0], [10.0, 118.77777777777777]], "isOverall": false, "label": "home-57", "isController": false}, {"data": [[9.1, 1555.6000000000001]], "isOverall": false, "label": "home-57-Aggregated", "isController": false}, {"data": [[10.0, 133.2]], "isOverall": false, "label": "home-58", "isController": false}, {"data": [[10.0, 133.2]], "isOverall": false, "label": "home-58-Aggregated", "isController": false}, {"data": [[10.0, 78.3]], "isOverall": false, "label": "home-59", "isController": false}, {"data": [[10.0, 78.3]], "isOverall": false, "label": "home-59-Aggregated", "isController": false}, {"data": [[8.0, 72.0], [4.0, 73.0], [2.0, 70.0], [1.0, 71.0], [9.0, 71.0], [10.0, 75.0], [3.0, 69.0]], "isOverall": false, "label": "ipad-390", "isController": false}, {"data": [[6.5, 71.8]], "isOverall": false, "label": "ipad-390-Aggregated", "isController": false}, {"data": [[4.0, 76.0], [2.0, 68.0], [1.0, 70.0], [9.0, 72.0], [10.0, 366.0], [3.0, 69.0], [7.0, 69.0]], "isOverall": false, "label": "ipad-394", "isController": false}, {"data": [[6.300000000000001, 100.60000000000001]], "isOverall": false, "label": "ipad-394-Aggregated", "isController": false}, {"data": [[8.0, 71.0], [4.0, 74.0], [2.0, 72.0], [1.0, 71.0], [9.0, 72.75], [10.0, 69.0], [3.0, 69.0]], "isOverall": false, "label": "ipad-395", "isController": false}, {"data": [[6.4, 71.69999999999999]], "isOverall": false, "label": "ipad-395-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 9935.666666666666, "minX": 1.67299074E12, "maxY": 362226.9166666667, "series": [{"data": [[1.67299074E12, 362226.9166666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.67299074E12, 9935.666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67299074E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 68.6, "minX": 1.67299074E12, "maxY": 17178.9, "series": [{"data": [[1.67299074E12, 74.89999999999999]], "isOverall": false, "label": "mac-278", "isController": false}, {"data": [[1.67299074E12, 74.8]], "isOverall": false, "label": "ipad-389", "isController": false}, {"data": [[1.67299074E12, 71.0]], "isOverall": false, "label": "mac-277", "isController": false}, {"data": [[1.67299074E12, 76.2]], "isOverall": false, "label": "ipad-388", "isController": false}, {"data": [[1.67299074E12, 228.50000000000003]], "isOverall": false, "label": "store-121", "isController": false}, {"data": [[1.67299074E12, 146.1]], "isOverall": false, "label": "store-122", "isController": false}, {"data": [[1.67299074E12, 70.5]], "isOverall": false, "label": "mac-279", "isController": false}, {"data": [[1.67299074E12, 70.8]], "isOverall": false, "label": "mac-274", "isController": false}, {"data": [[1.67299074E12, 181.6]], "isOverall": false, "label": "store-120", "isController": false}, {"data": [[1.67299074E12, 102.80000000000001]], "isOverall": false, "label": "mac-276", "isController": false}, {"data": [[1.67299074E12, 73.39999999999999]], "isOverall": false, "label": "mac-275", "isController": false}, {"data": [[1.67299074E12, 1309.8]], "isOverall": false, "label": "home-46", "isController": false}, {"data": [[1.67299074E12, 1146.9]], "isOverall": false, "label": "home-47", "isController": false}, {"data": [[1.67299074E12, 1949.1000000000001]], "isOverall": false, "label": "home-48", "isController": false}, {"data": [[1.67299074E12, 745.0]], "isOverall": false, "label": "store-135-2", "isController": false}, {"data": [[1.67299074E12, 2097.2]], "isOverall": false, "label": "home-49", "isController": false}, {"data": [[1.67299074E12, 297.70000000000005]], "isOverall": false, "label": "store-135-1", "isController": false}, {"data": [[1.67299074E12, 1160.1999999999998]], "isOverall": false, "label": "store-135-0", "isController": false}, {"data": [[1.67299074E12, 122.3]], "isOverall": false, "label": "mac-270", "isController": false}, {"data": [[1.67299074E12, 70.1]], "isOverall": false, "label": "mac-272", "isController": false}, {"data": [[1.67299074E12, 150.1]], "isOverall": false, "label": "mac-271", "isController": false}, {"data": [[1.67299074E12, 75.89999999999999]], "isOverall": false, "label": "ipad-387", "isController": false}, {"data": [[1.67299074E12, 76.39999999999999]], "isOverall": false, "label": "ipad-386", "isController": false}, {"data": [[1.67299074E12, 70.1]], "isOverall": false, "label": "store-134", "isController": false}, {"data": [[1.67299074E12, 2204.8]], "isOverall": false, "label": "store-135", "isController": false}, {"data": [[1.67299074E12, 74.30000000000001]], "isOverall": false, "label": "mac-288", "isController": false}, {"data": [[1.67299074E12, 111.69999999999999]], "isOverall": false, "label": "store-132", "isController": false}, {"data": [[1.67299074E12, 68.6]], "isOverall": false, "label": "store-133", "isController": false}, {"data": [[1.67299074E12, 221.5]], "isOverall": false, "label": "mac-246", "isController": false}, {"data": [[1.67299074E12, 78.1]], "isOverall": false, "label": "store-130", "isController": false}, {"data": [[1.67299074E12, 73.40000000000002]], "isOverall": false, "label": "store-131", "isController": false}, {"data": [[1.67299074E12, 72.0]], "isOverall": false, "label": "mac-284", "isController": false}, {"data": [[1.67299074E12, 70.0]], "isOverall": false, "label": "mac-287", "isController": false}, {"data": [[1.67299074E12, 187.1]], "isOverall": false, "label": "home-30", "isController": false}, {"data": [[1.67299074E12, 75.9]], "isOverall": false, "label": "store-138", "isController": false}, {"data": [[1.67299074E12, 161.4]], "isOverall": false, "label": "store-137", "isController": false}, {"data": [[1.67299074E12, 172.6]], "isOverall": false, "label": "home-35", "isController": false}, {"data": [[1.67299074E12, 73.7]], "isOverall": false, "label": "mac-281", "isController": false}, {"data": [[1.67299074E12, 70.39999999999999]], "isOverall": false, "label": "mac-280", "isController": false}, {"data": [[1.67299074E12, 101.69999999999999]], "isOverall": false, "label": "mac-283", "isController": false}, {"data": [[1.67299074E12, 130.6]], "isOverall": false, "label": "ipad-372", "isController": false}, {"data": [[1.67299074E12, 71.7]], "isOverall": false, "label": "mac-282", "isController": false}, {"data": [[1.67299074E12, 1125.9000000000003]], "isOverall": false, "label": "ipad", "isController": true}, {"data": [[1.67299074E12, 70.5]], "isOverall": false, "label": "ipad-400", "isController": false}, {"data": [[1.67299074E12, 77.2]], "isOverall": false, "label": "ipad-402", "isController": false}, {"data": [[1.67299074E12, 83.9]], "isOverall": false, "label": "ipad-401", "isController": false}, {"data": [[1.67299074E12, 74.60000000000001]], "isOverall": false, "label": "mac-296", "isController": false}, {"data": [[1.67299074E12, 74.9]], "isOverall": false, "label": "ipad-404", "isController": false}, {"data": [[1.67299074E12, 72.5]], "isOverall": false, "label": "mac-295", "isController": false}, {"data": [[1.67299074E12, 69.2]], "isOverall": false, "label": "ipad-403", "isController": false}, {"data": [[1.67299074E12, 75.2]], "isOverall": false, "label": "home-60", "isController": false}, {"data": [[1.67299074E12, 158.5]], "isOverall": false, "label": "home-61", "isController": false}, {"data": [[1.67299074E12, 84.9]], "isOverall": false, "label": "home-62", "isController": false}, {"data": [[1.67299074E12, 125.69999999999999]], "isOverall": false, "label": "home-63", "isController": false}, {"data": [[1.67299074E12, 96.4]], "isOverall": false, "label": "home-64", "isController": false}, {"data": [[1.67299074E12, 70.2]], "isOverall": false, "label": "home-65", "isController": false}, {"data": [[1.67299074E12, 99.09999999999998]], "isOverall": false, "label": "home-66", "isController": false}, {"data": [[1.67299074E12, 3215.2]], "isOverall": false, "label": "mac", "isController": true}, {"data": [[1.67299074E12, 91.99999999999999]], "isOverall": false, "label": "home-67", "isController": false}, {"data": [[1.67299074E12, 72.3]], "isOverall": false, "label": "home-68", "isController": false}, {"data": [[1.67299074E12, 73.0]], "isOverall": false, "label": "mac-292", "isController": false}, {"data": [[1.67299074E12, 70.4]], "isOverall": false, "label": "mac-294", "isController": false}, {"data": [[1.67299074E12, 71.60000000000001]], "isOverall": false, "label": "mac-293", "isController": false}, {"data": [[1.67299074E12, 911.1999999999999]], "isOverall": false, "label": "store-94", "isController": false}, {"data": [[1.67299074E12, 818.8000000000001]], "isOverall": false, "label": "mac-267", "isController": false}, {"data": [[1.67299074E12, 72.19999999999999]], "isOverall": false, "label": "ipad-399", "isController": false}, {"data": [[1.67299074E12, 164.4]], "isOverall": false, "label": "store-110", "isController": false}, {"data": [[1.67299074E12, 1084.6999999999998]], "isOverall": false, "label": "store-111", "isController": false}, {"data": [[1.67299074E12, 107.8]], "isOverall": false, "label": "mac-265", "isController": false}, {"data": [[1.67299074E12, 365.3]], "isOverall": false, "label": "mac-264", "isController": false}, {"data": [[1.67299074E12, 1822.6999999999998]], "isOverall": false, "label": "home-50", "isController": false}, {"data": [[1.67299074E12, 347.7]], "isOverall": false, "label": "home-51", "isController": false}, {"data": [[1.67299074E12, 293.1]], "isOverall": false, "label": "store-119", "isController": false}, {"data": [[1.67299074E12, 5853.6]], "isOverall": false, "label": "store", "isController": true}, {"data": [[1.67299074E12, 2440.3]], "isOverall": false, "label": "home-52", "isController": false}, {"data": [[1.67299074E12, 282.9]], "isOverall": false, "label": "home-53", "isController": false}, {"data": [[1.67299074E12, 381.2]], "isOverall": false, "label": "home-54", "isController": false}, {"data": [[1.67299074E12, 2166.6]], "isOverall": false, "label": "home-55", "isController": false}, {"data": [[1.67299074E12, 233.4]], "isOverall": false, "label": "home-56", "isController": false}, {"data": [[1.67299074E12, 17178.9]], "isOverall": false, "label": "home", "isController": true}, {"data": [[1.67299074E12, 1555.6000000000001]], "isOverall": false, "label": "home-57", "isController": false}, {"data": [[1.67299074E12, 133.2]], "isOverall": false, "label": "home-58", "isController": false}, {"data": [[1.67299074E12, 78.3]], "isOverall": false, "label": "home-59", "isController": false}, {"data": [[1.67299074E12, 71.8]], "isOverall": false, "label": "ipad-390", "isController": false}, {"data": [[1.67299074E12, 100.60000000000001]], "isOverall": false, "label": "ipad-394", "isController": false}, {"data": [[1.67299074E12, 71.69999999999999]], "isOverall": false, "label": "ipad-395", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67299074E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 68.6, "minX": 1.67299074E12, "maxY": 7468.4, "series": [{"data": [[1.67299074E12, 74.7]], "isOverall": false, "label": "mac-278", "isController": false}, {"data": [[1.67299074E12, 74.6]], "isOverall": false, "label": "ipad-389", "isController": false}, {"data": [[1.67299074E12, 71.0]], "isOverall": false, "label": "mac-277", "isController": false}, {"data": [[1.67299074E12, 76.2]], "isOverall": false, "label": "ipad-388", "isController": false}, {"data": [[1.67299074E12, 228.29999999999998]], "isOverall": false, "label": "store-121", "isController": false}, {"data": [[1.67299074E12, 146.0]], "isOverall": false, "label": "store-122", "isController": false}, {"data": [[1.67299074E12, 70.3]], "isOverall": false, "label": "mac-279", "isController": false}, {"data": [[1.67299074E12, 70.6]], "isOverall": false, "label": "mac-274", "isController": false}, {"data": [[1.67299074E12, 181.6]], "isOverall": false, "label": "store-120", "isController": false}, {"data": [[1.67299074E12, 102.80000000000001]], "isOverall": false, "label": "mac-276", "isController": false}, {"data": [[1.67299074E12, 73.39999999999999]], "isOverall": false, "label": "mac-275", "isController": false}, {"data": [[1.67299074E12, 1309.8]], "isOverall": false, "label": "home-46", "isController": false}, {"data": [[1.67299074E12, 243.6]], "isOverall": false, "label": "home-47", "isController": false}, {"data": [[1.67299074E12, 318.40000000000003]], "isOverall": false, "label": "home-48", "isController": false}, {"data": [[1.67299074E12, 625.2]], "isOverall": false, "label": "store-135-2", "isController": false}, {"data": [[1.67299074E12, 307.6]], "isOverall": false, "label": "home-49", "isController": false}, {"data": [[1.67299074E12, 297.70000000000005]], "isOverall": false, "label": "store-135-1", "isController": false}, {"data": [[1.67299074E12, 1160.1999999999998]], "isOverall": false, "label": "store-135-0", "isController": false}, {"data": [[1.67299074E12, 122.3]], "isOverall": false, "label": "mac-270", "isController": false}, {"data": [[1.67299074E12, 70.1]], "isOverall": false, "label": "mac-272", "isController": false}, {"data": [[1.67299074E12, 150.0]], "isOverall": false, "label": "mac-271", "isController": false}, {"data": [[1.67299074E12, 75.89999999999999]], "isOverall": false, "label": "ipad-387", "isController": false}, {"data": [[1.67299074E12, 76.30000000000001]], "isOverall": false, "label": "ipad-386", "isController": false}, {"data": [[1.67299074E12, 70.0]], "isOverall": false, "label": "store-134", "isController": false}, {"data": [[1.67299074E12, 1160.1999999999998]], "isOverall": false, "label": "store-135", "isController": false}, {"data": [[1.67299074E12, 74.2]], "isOverall": false, "label": "mac-288", "isController": false}, {"data": [[1.67299074E12, 111.59999999999998]], "isOverall": false, "label": "store-132", "isController": false}, {"data": [[1.67299074E12, 68.6]], "isOverall": false, "label": "store-133", "isController": false}, {"data": [[1.67299074E12, 192.3]], "isOverall": false, "label": "mac-246", "isController": false}, {"data": [[1.67299074E12, 77.90000000000002]], "isOverall": false, "label": "store-130", "isController": false}, {"data": [[1.67299074E12, 73.19999999999999]], "isOverall": false, "label": "store-131", "isController": false}, {"data": [[1.67299074E12, 71.89999999999999]], "isOverall": false, "label": "mac-284", "isController": false}, {"data": [[1.67299074E12, 69.9]], "isOverall": false, "label": "mac-287", "isController": false}, {"data": [[1.67299074E12, 149.5]], "isOverall": false, "label": "home-30", "isController": false}, {"data": [[1.67299074E12, 75.9]], "isOverall": false, "label": "store-138", "isController": false}, {"data": [[1.67299074E12, 108.7]], "isOverall": false, "label": "store-137", "isController": false}, {"data": [[1.67299074E12, 172.6]], "isOverall": false, "label": "home-35", "isController": false}, {"data": [[1.67299074E12, 73.6]], "isOverall": false, "label": "mac-281", "isController": false}, {"data": [[1.67299074E12, 70.3]], "isOverall": false, "label": "mac-280", "isController": false}, {"data": [[1.67299074E12, 101.60000000000001]], "isOverall": false, "label": "mac-283", "isController": false}, {"data": [[1.67299074E12, 124.49999999999999]], "isOverall": false, "label": "ipad-372", "isController": false}, {"data": [[1.67299074E12, 71.7]], "isOverall": false, "label": "mac-282", "isController": false}, {"data": [[1.67299074E12, 1118.5]], "isOverall": false, "label": "ipad", "isController": true}, {"data": [[1.67299074E12, 70.2]], "isOverall": false, "label": "ipad-400", "isController": false}, {"data": [[1.67299074E12, 77.2]], "isOverall": false, "label": "ipad-402", "isController": false}, {"data": [[1.67299074E12, 83.8]], "isOverall": false, "label": "ipad-401", "isController": false}, {"data": [[1.67299074E12, 74.60000000000001]], "isOverall": false, "label": "mac-296", "isController": false}, {"data": [[1.67299074E12, 74.80000000000001]], "isOverall": false, "label": "ipad-404", "isController": false}, {"data": [[1.67299074E12, 72.4]], "isOverall": false, "label": "mac-295", "isController": false}, {"data": [[1.67299074E12, 69.2]], "isOverall": false, "label": "ipad-403", "isController": false}, {"data": [[1.67299074E12, 75.1]], "isOverall": false, "label": "home-60", "isController": false}, {"data": [[1.67299074E12, 158.5]], "isOverall": false, "label": "home-61", "isController": false}, {"data": [[1.67299074E12, 84.9]], "isOverall": false, "label": "home-62", "isController": false}, {"data": [[1.67299074E12, 125.6]], "isOverall": false, "label": "home-63", "isController": false}, {"data": [[1.67299074E12, 96.3]], "isOverall": false, "label": "home-64", "isController": false}, {"data": [[1.67299074E12, 70.2]], "isOverall": false, "label": "home-65", "isController": false}, {"data": [[1.67299074E12, 98.9]], "isOverall": false, "label": "home-66", "isController": false}, {"data": [[1.67299074E12, 2546.1]], "isOverall": false, "label": "mac", "isController": true}, {"data": [[1.67299074E12, 91.9]], "isOverall": false, "label": "home-67", "isController": false}, {"data": [[1.67299074E12, 72.2]], "isOverall": false, "label": "home-68", "isController": false}, {"data": [[1.67299074E12, 72.8]], "isOverall": false, "label": "mac-292", "isController": false}, {"data": [[1.67299074E12, 70.3]], "isOverall": false, "label": "mac-294", "isController": false}, {"data": [[1.67299074E12, 71.4]], "isOverall": false, "label": "mac-293", "isController": false}, {"data": [[1.67299074E12, 778.4]], "isOverall": false, "label": "store-94", "isController": false}, {"data": [[1.67299074E12, 180.79999999999998]], "isOverall": false, "label": "mac-267", "isController": false}, {"data": [[1.67299074E12, 72.10000000000001]], "isOverall": false, "label": "ipad-399", "isController": false}, {"data": [[1.67299074E12, 164.3]], "isOverall": false, "label": "store-110", "isController": false}, {"data": [[1.67299074E12, 201.10000000000002]], "isOverall": false, "label": "store-111", "isController": false}, {"data": [[1.67299074E12, 107.8]], "isOverall": false, "label": "mac-265", "isController": false}, {"data": [[1.67299074E12, 365.3]], "isOverall": false, "label": "mac-264", "isController": false}, {"data": [[1.67299074E12, 288.9]], "isOverall": false, "label": "home-50", "isController": false}, {"data": [[1.67299074E12, 347.7]], "isOverall": false, "label": "home-51", "isController": false}, {"data": [[1.67299074E12, 292.79999999999995]], "isOverall": false, "label": "store-119", "isController": false}, {"data": [[1.67299074E12, 3738.6]], "isOverall": false, "label": "store", "isController": true}, {"data": [[1.67299074E12, 378.7]], "isOverall": false, "label": "home-52", "isController": false}, {"data": [[1.67299074E12, 282.9]], "isOverall": false, "label": "home-53", "isController": false}, {"data": [[1.67299074E12, 381.2]], "isOverall": false, "label": "home-54", "isController": false}, {"data": [[1.67299074E12, 413.7]], "isOverall": false, "label": "home-55", "isController": false}, {"data": [[1.67299074E12, 233.3]], "isOverall": false, "label": "home-56", "isController": false}, {"data": [[1.67299074E12, 7468.4]], "isOverall": false, "label": "home", "isController": true}, {"data": [[1.67299074E12, 1555.5]], "isOverall": false, "label": "home-57", "isController": false}, {"data": [[1.67299074E12, 133.10000000000002]], "isOverall": false, "label": "home-58", "isController": false}, {"data": [[1.67299074E12, 78.3]], "isOverall": false, "label": "home-59", "isController": false}, {"data": [[1.67299074E12, 71.7]], "isOverall": false, "label": "ipad-390", "isController": false}, {"data": [[1.67299074E12, 100.60000000000001]], "isOverall": false, "label": "ipad-394", "isController": false}, {"data": [[1.67299074E12, 71.39999999999999]], "isOverall": false, "label": "ipad-395", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67299074E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67299074E12, "maxY": 563.7, "series": [{"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-278", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-389", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-277", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-388", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-121", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-122", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-279", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-274", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-120", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-276", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-275", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-46", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-47", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-48", "isController": false}, {"data": [[1.67299074E12, 111.5]], "isOverall": false, "label": "store-135-2", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-49", "isController": false}, {"data": [[1.67299074E12, 127.2]], "isOverall": false, "label": "store-135-1", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-135-0", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-270", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-272", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-271", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-387", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-386", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-134", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-135", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-288", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-132", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-133", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-246", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-130", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-131", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-284", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-287", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-30", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-138", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-137", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-35", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-281", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-280", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-283", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-372", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-282", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad", "isController": true}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-400", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-402", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-401", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-296", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-404", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-295", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-403", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-60", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-61", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-62", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-63", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-64", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-65", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-66", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac", "isController": true}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-67", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-68", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-292", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-294", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-293", "isController": false}, {"data": [[1.67299074E12, 563.7]], "isOverall": false, "label": "store-94", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-267", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-399", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-110", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-111", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-265", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "mac-264", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-50", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-51", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "store-119", "isController": false}, {"data": [[1.67299074E12, 563.7]], "isOverall": false, "label": "store", "isController": true}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-52", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-53", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-54", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-55", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-56", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home", "isController": true}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-57", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-58", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "home-59", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-390", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-394", "isController": false}, {"data": [[1.67299074E12, 0.0]], "isOverall": false, "label": "ipad-395", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67299074E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 57.0, "minX": 1.67299074E12, "maxY": 14487.0, "series": [{"data": [[1.67299074E12, 14487.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.67299074E12, 1018.4999999999999]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.67299074E12, 4263.879999999994]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.67299074E12, 1508.8499999999972]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.67299074E12, 57.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.67299074E12, 75.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67299074E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 70.5, "minX": 1.0, "maxY": 3590.0, "series": [{"data": [[33.0, 73.0], [34.0, 73.0], [3.0, 1222.0], [48.0, 84.0], [59.0, 101.0], [68.0, 74.0], [75.0, 74.0], [5.0, 3590.0], [87.0, 73.0], [90.0, 73.0], [6.0, 89.0], [7.0, 909.0], [8.0, 663.0], [9.0, 73.5], [10.0, 75.5], [11.0, 1137.0], [12.0, 516.0], [13.0, 83.5], [14.0, 70.5], [1.0, 1194.0], [23.0, 113.0], [25.0, 74.0], [26.0, 309.5], [28.0, 74.5], [30.0, 70.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 90.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 70.5, "minX": 1.0, "maxY": 411.0, "series": [{"data": [[33.0, 73.0], [34.0, 73.0], [3.0, 305.0], [48.0, 84.0], [59.0, 94.0], [68.0, 74.0], [75.0, 74.0], [5.0, 375.0], [87.0, 73.0], [90.0, 73.0], [6.0, 89.0], [7.0, 277.0], [8.0, 323.5], [9.0, 73.5], [10.0, 75.5], [11.0, 371.0], [12.0, 411.0], [13.0, 83.5], [14.0, 70.5], [1.0, 88.0], [23.0, 102.0], [25.0, 74.0], [26.0, 202.0], [28.0, 74.5], [30.0, 70.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 90.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 13.666666666666666, "minX": 1.67299074E12, "maxY": 13.666666666666666, "series": [{"data": [[1.67299074E12, 13.666666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67299074E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.16666666666666666, "minX": 1.67299074E12, "maxY": 13.333333333333334, "series": [{"data": [[1.67299074E12, 13.333333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "301", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "303", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67299074E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.16666666666666666, "minX": 1.67299074E12, "maxY": 0.16666666666666666, "series": [{"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-137-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-277-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-372-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-53-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-122-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-success", "isController": true}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-404-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-68-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-387-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-275-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-135-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-292-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-389-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-402-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-120-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-55-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-59-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-294-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-success", "isController": true}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-57-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-133-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-279-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-281-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-264-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-131-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-296-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-284-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-395-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-135-0-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-62-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-111-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-267-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-135-2-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-64-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-47-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-270-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-272-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-390-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-35-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-288-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-399-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-274-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-49-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-400-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-52-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-66-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-403-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-121-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-388-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-138-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-278-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-54-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-246-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-293-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-401-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-50-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-56-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-134-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-276-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-58-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-265-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-132-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-295-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-280-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-130-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-282-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-61-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-394-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-30-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-46-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-60-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-48-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-283-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-135-1-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-63-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-success", "isController": true}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-271-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-119-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-success", "isController": true}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-94-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "store-110-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-65-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-51-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "home-67-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "ipad-386-success", "isController": false}, {"data": [[1.67299074E12, 0.16666666666666666]], "isOverall": false, "label": "mac-287-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67299074E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 14.333333333333334, "minX": 1.67299074E12, "maxY": 14.333333333333334, "series": [{"data": [[1.67299074E12, 14.333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67299074E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
