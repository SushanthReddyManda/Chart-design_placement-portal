var userCountryId = "US";
am4core.options.commercialLicense = true;

var ds = new am4core.DataSource();
ds.url = "https://www.amcharts.com/tools/country/?v=xz6Z";
ds.events.on("ended", function(ev) {
  userCountryId = ev.target.data.country_code;
});
ds.load();

// Set themes
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_amchartsdark);

var colorSet = new am4core.ColorSet();

var piechart;
var slice;
var cityCircle;

var lineSeries;

var lineSeries20;
var lineSeries21;

var sfCircle;
var mapChart;
var connectingLine;
var plane;

var city;
var tm = 1;
var planePath = "M71,515.3l-33,72.5c-0.9,2.1,0.6,4.4,2.9,4.4l19.7,0c2.8,0,5.4-1,7.5-2.9l54.1-39.9c2.4-2.2,5.4-3.4,8.6-3.4 l103.9,0c1.8,0,3,1.8,2.3,3.5l-64.5,153.7c-0.7,1.6,0.5,3.3,2.2,3.3l40.5,0c2.9,0,5.7-1.3,7.5-3.6L338.4,554c3.9-5,9.9-8,16.2-8c24.2,0,85.5-0.1,109.1-0.2c21.4-0.1,41-6.3,59-17.8c4.2-2.6,7.9-6.1,11.2-9.8c2.6-2.9,3.8-5.7,3.7-8.5c0.1-2.8-1.1-5.5-3.7-8.5c-3.3-3.7-7-7.2-11.2-9.8c-18-11.5-37.6-17.7-59-17.8c-23.6-0.1-84.9-0.2-109.1-0.2c-6.4,0-12.3-2.9-16.2-8L222.6,316.6c-1.8-2.3-4.5-3.6-7.5-3.6l-40.5,0c-1.7,0-2.9,1.7-2.2,3.3L237,470c0.7,1.7-0.5,3.5-2.3,3.5l-103.9,0c-3.2,0-6.2-1.2-8.6-3.4l-54.1-39.9c-2.1-1.9-4.7-2.9-7.5-2.9l-19.7,0c-2.3,0-3.8,2.4-2.9,4.4l33,72.5C72.6,507.7,72.6,511.8,71,515.3z";
//var hPlanePath = "M176.4,56.7C195,67.2,305.9,130,363.9,162.6c3.5,2,7.4,3,11.5,3.1c29.7,0.3,59.5,0.1,89.2,0.2c21.4,0.1,41,6.3,59,17.8  c4.2,2.6,7.9,6.1,11.2,9.8c4.9,5.6,4.9,10.5,0.2,16.2c-2.9,3.5-6.4,6.8-10.3,9.4c-17.5,11.4-36.7,18.2-57.7,18.3  c-71.5,0.2-143,0.3-214.5-0.1c-27.6-0.1-54.7-5.3-81.5-11.3c-31.2-7-62.1-15.1-93.1-22.6c-3.9-0.9-6.1-2.8-7.6-6.7l-33.5-87.2h24.6  c2.8,0,5.4,1,7.5,2.9l54.1,49.9c2.4,2.2,5.4,3.4,8.6,3.4h97.7c0,0-70.9-70.8-108.3-108.3c-0.8-0.8-0.2-2.2,0.9-2.2h48.7  C172.7,55.2,174.6,55.7,176.4,56.7z"
var lineChart;
var valueAxis;
var pieSeries;
var mainContainer;
var headerLabel;
var footerLabel;
var nextButton;


setTimeout(init, 100);

function init() {

  // Main container of everything
  mainContainer = am4core.create("introchart", am4core.Container);
  mainContainer.width = am4core.percent(100);
  mainContainer.height = am4core.percent(100);
  mainContainer.preloader.disabled = true;

  // header label
  headerLabel = mainContainer.createChild(am4core.TextLink)
  headerLabel.fill = am4core.color("#ffffff");

  // when we hit title, we repeat animation
  headerLabel.events.on("hit", function() {
    repeat();
  })

  headerLabel.fontSize = 20;
  //headerLabel.isMeasured = false;
  headerLabel.horizontalCenter = "middle";
  headerLabel.verticalCenter = "middle";
  headerLabel.x = am4core.percent(300 / 5);
  headerLabel.y = 70;
  headerLabel.showOnInit = true;
  headerLabel.zIndex = 1300;

  headerLabel.hiddenState.properties.dy = - 150;
  headerLabel.hiddenState.transitionDuration = 700;
  headerLabel.defaultState.transitionDuration = 800;


  var triangle2 = new am4core.Triangle();
  triangle2.width = 8;
  triangle2.height = 10;
  triangle2.fill = am4core.color("#ffffff");
  triangle2.direction = "right";
  triangle2.valign = "middle";
  triangle2.align = "center";
  triangle2.dx = 1;

  nextButton = mainContainer.createChild(am4core.Button);
  nextButton.horizontalCenter = "middle";
  nextButton.verticalCenter = "middle";
  nextButton.padding(0, 0, 0, 0);
  nextButton.background.cornerRadius(25, 25, 25, 25);
  //nextButton.x = am4core.percent(300/5);
  nextButton.y = headerLabel.y;
  nextButton.dy = 1;
  nextButton.height = 40;
  nextButton.width = 40;
  nextButton.horizontalCenter = "middle";
  nextButton.verticalCenter = "middle";
  nextButton.zIndex = 5000;
  nextButton.icon = triangle2;
  nextButton.hide(0);
  nextButton.events.on("hit", repeat);


  footerLabel = mainContainer.createChild(am4core.Label);
  footerLabel.x = am4core.percent(300 / 5);
  footerLabel.y = am4core.percent(90);
  footerLabel.fontSize = 16;
  footerLabel.fill = am4core.color("#ffffff");
  footerLabel.verticalCenter = "middle";
  footerLabel.horizontalCenter = "middle";
  footerLabel.fillOpacity = 0.5;
  footerLabel.fontSize = 12;
  footerLabel.hide(0);

  // area chart on initial screen (the one which bends around pie chart)
  lineChart = mainContainer.createChild(am4charts.XYChart);
  lineChart.padding(0, 0, 0, 0)

  var data = [];
  var date = new Date(2000, 0, 1, 0, 0, 0, 0);

  for (var i = 0; i < 6; i++) {
    var newDate = new Date(date.getTime());
    newDate.setDate(i + 1);

    data.push({ date: newDate, value: 32 });
  }

  lineChart.data = data;

  var dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.ticks.template.disabled = true;
  dateAxis.renderer.axisFills.template.disabled = true;

  dateAxis.renderer.labels.template.disabled = true;
  dateAxis.renderer.inside = true;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 0.5;
  dateAxis.renderer.baseGrid.disabled = true;
  dateAxis.tooltip.disabled = true;
  dateAxis.renderer.line.disabled = true;

  valueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.ticks.template.disabled = true;
  valueAxis.renderer.axisFills.template.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;
  valueAxis.renderer.inside = true;
  valueAxis.renderer.grid.template.disabled = true;
  valueAxis.min = 0;
  valueAxis.max = 100;
  valueAxis.strictMinMax = true;
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.line.disabled = true;
  valueAxis.renderer.baseGrid.disabled = true;

  lineSeries = lineChart.series.push(new am4charts.LineSeries());
  lineSeries.dataFields.dateX = "date";
  lineSeries.dataFields.valueY = "value";
  lineSeries.sequencedInterpolation = true;
  lineSeries.fillOpacity = 0.3;
  lineSeries.strokeOpacity = 0;
  lineSeries.tensionX = 0.75;
  lineSeries.fill = am4core.color("#222a3f")
  lineSeries.fillOpacity = 1;
  lineSeries.hidden = true;

  // when line series is inited, start everything
  lineSeries.events.on("inited", startEverything);
}


// START
function startEverything() {
  headerLabel.hide(0);
  headerLabel.text = "[font-size: 12 opacity: 0.5]It's Placements time!!!: [/]IIT G! Lets Travel ";
  headerLabel.interactionsEnabled = false;
  headerLabel.show();

  lineChart.visible = true;
  lineSeries.defaultState.transitionDuration = 1000 * tm;
  lineSeries.hide(0);
  var animation = lineSeries.show();

  animation.events.on("animationended", function() {
    setTimeout(stage0, 500 * tm)
  })
}

// where pie chart is created and animated from bottom to top, also where area's chart values are animated to bend around pie.
function stage0() {

  if (!piechart) {
    piechart = mainContainer.createChild(am4charts.PieChart);
    piechart.zindex = 15;
    piechart.hiddenState.properties.opacity = 0; // this makes initial fade in effect  
    piechart.width = 400;
    piechart.x = am4core.percent(300 / 5);
    piechart.horizontalCenter = "middle";

    piechart.hiddenState.properties.opacity = 0;
    piechart.defaultState.transitionDuration = 3500 * tm;
    piechart.defaultState.transitionEasing = am4core.ease.elasticOut;

    piechart.data = [{
      "answer": "[bold]No[/b]",
      "value": 400,
      "fontColor": am4core.color("#222a3f")
    }, {
      "answer": "It's impossible!",
      "value": 200,
      "radius": 10
    }, {
      "answer": "What does bend mean?",
      "value": 40,
      "disabled": true
    }, {
      "answer": "Yes, I use amCharts 4",
      "value": 30,
      "disabled": true
    }];


    pieSeries = piechart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "answer";
    piechart.innerRadius = 75;
    piechart.radius = 150;

    // this makes initial animation
    pieSeries.hiddenState.properties.opacity = 0;
    pieSeries.slices.template.cornerRadius = 7;
    pieSeries.defaultState.transitionDuration = 2000 * tm;
    pieSeries.hiddenState.transitionEasing = am4core.ease.sinOut;

    pieSeries.labels.template.fillOpacity = 0.8;
    pieSeries.labels.template.text = "{category}";
    pieSeries.alignLabels = false;
    pieSeries.labels.template.radius = -53;
    pieSeries.labels.template.propertyFields.disabled = "disabled";
    pieSeries.labels.template.propertyFields.fill = "fontColor";
    pieSeries.labels.template.propertyFields.radius = "radius";
    pieSeries.ticks.template.disabled = true;

    //this makes initial animation from bottom
    pieSeries.hiddenState.properties.dy = 400;
    pieSeries.defaultState.transitionEasing = am4core.ease.elasticOut;
    pieSeries.defaultState.transitionDuration = 3500 * tm;
  }

  headerLabel.y = 70;
  piechart.hide(0);
  piechart.show();
  pieSeries.hide(0);
  var animation = pieSeries.show();
  animation.events.on("animationended", createMap);

  // change duration and easing
  lineSeries.interpolationDuration = 3000 * tm;
  lineSeries.interpolationEasing = am4core.ease.elasticOut;

  lineSeries.dataItems.getIndex(3).setValue("valueY", 80, 3500 * tm);
}

function stage1() {
  var series = piechart.series.getIndex(0);
  var firstDataItem = series.dataItems.getIndex(0);

  headerLabel.hide();

  setTimeout(function() {
    var animation;
    series.dataItems.each(function(dataItem) {
      if (dataItem.index != 1) {
        animation = dataItem.hide();
      }
      dataItem.label.hide();
    })
    animation.events.on("animationended", function() {
      var animation = series.dataItems.getIndex(1).slice.animate({ property: "innerRadius", to: 0 }, 300 * tm);
      animation.events.on("animationended", function() {
        setTimeout(showMap, 50);
      })
    })
  }, 1000 * tm);
}


var polygonSeries;
var continentSeries;
var initialPolygon;
var cityLabel;
var sfLabel;
var country;

function createMap() {

  var count = countries.length;

  var cindex = Math.floor(Math.random() * count);

  country = getCountryById(userCountryId);

  // pick random if no such country in list
  if (!country) {
    var randomId = randomCountries[Math.floor(Math.random() * randomCountries.length)];
    country = getCountryById(randomId);
  }

  var destinations = [{ id: "US", city: "Silicon Valley, California", latitude: 37.7749, longitude: -122.4194 }];

  // countries very opposite SF will fly to other destinations
  if (country.longitude > 30 && country.longitude < 60) {
    destinations = [
      { id: "AU", city: "Sydney", latitude: -33.8688, longitude: 151.2093 },
      { id: "HK", city: "Hong Kong", latitude: 22.3964, longitude: 114.1095 },
      { id: "KR", city: "Seoul", latitude: 37.55, longitude: 126.983333 }
    ];
  }


  if (country.longitude >= 60 && country.longitude < 90) {
    destinations = [
      { id: "GB", city: "London", latitude: 51.5074, longitude: 0.1278 }
    ];
  }

  // close to SF countries will fly to london
  if (country.longitude < -50 && country.latitude > 0) {
    destinations = [
      { id: "GB", city: "London", latitude: 51.5074, longitude: 0.1278 }
    ];
  }

  var destination = destinations[Math.floor(Math.random() * destinations.length)];

  mapChart = mainContainer.createChild(am4maps.MapChart);
  mapChart.seriesContainer.draggable = false;
  mapChart.seriesContainer.resizable = false;
  mapChart.resizable = false;
  //mapChart.geodata = am4geodata_continentsHigh;
  mapChart.geodataSource.url = "geo.json"
  mapChart.projection = new am4maps.projections.Mercator();
  mapChart.x = am4core.percent(300 / 5);
  mapChart.y = mainContainer.pixelHeight / 2;
  mapChart.horizontalCenter = "middle";
  mapChart.verticalCenter = "middle";
  mapChart.showOnInit = false;
  mapChart.hiddenState.properties.opacity = 1;
  mapChart.deltaLongitude = -11;
  mapChart.zIndex = 10;
  mapChart.mouseWheelBehavior = "none";

  // make it pacific centered
  if (country.longitude > 90) {
    mapChart.deltaLongitude = -160;
  }
  continentSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
  continentSeries.useGeodata = true;
  continentSeries.exclude = ["antarctica"];
  //polygonSeries.include = ["US", "GB", "DE", "MX", "CA", "BE", "NO", "SE", "NL", "DK", "LT", "LV", "EE", "FI", "CH", "ES", "IT", "LU", "FR", "CZ", "SL", "SI", "AT", "PT", "PL", "CR", "SR", "GR", "AL"];
  continentSeries.mapPolygons.template.fill = am4core.color("#222a3f");
  continentSeries.mapPolygons.template.stroke = am4core.color("#313950");
  continentSeries.mapPolygons.template.hiddenState.properties.visible = true;
  continentSeries.mapPolygons.template.hiddenState.properties.opacity = 1;
  continentSeries.hidden = true;

  polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  //polygonSeries.geodata = am4geodata_worldIndiaHigh;
  polygonSeries.geodataSource.url = "https://www.amcharts.com/wp-content/uploads/assets/maps/worldCustomHigh.json"
  polygonSeries.include = ["US", country.id];
  //polygonSeries.include = ["US", "GB", "DE", "MX", "CA", "BE", "NO", "SE", "NL", "DK", "LT", "LV", "EE", "FI", "CH", "ES", "IT", "LU", "FR", "CZ", "SL", "SI", "AT", "PT", "PL", "CR", "SR", "GR", "AL"];
  polygonSeries.mapPolygons.template.fill = am4core.color("#222a3f");
  polygonSeries.mapPolygons.template.stroke = am4core.color("#313950");
  polygonSeries.mapPolygons.template.hiddenState.properties.visible = true;
  polygonSeries.mapPolygons.template.hiddenState.properties.opacity = 1;
  polygonSeries.showOnInit = true;
  polygonSeries.hiddenState.properties.opacity = 1;
  polygonSeries.hidden = true;

  var mapImageSeries = mapChart.series.push(new am4maps.MapImageSeries());

  city = mapImageSeries.mapImages.create();
  city.latitude = country.latitude;
  city.longitude = country.longitude;
  city.nonScaling = true;

  cityLabel = city.createChild(am4core.Label);
  cityLabel.text = country.city;
  cityLabel.verticalCenter = "middle";
  //cityLabel.fillOpacity = 0.5;
  cityLabel.dx = 15;
  cityLabel.dy = -1;
  cityLabel.fontSize = 16;
  cityLabel.hiddenState.properties.dy = 100;
  cityLabel.hide(0);

  cityCircle = city.createChild(am4core.Circle);
  cityCircle.fill = colorSet.getIndex(0);
  cityCircle.stroke = cityCircle.fill;
  cityCircle.radius = 7;

  cityCircle.hiddenState.properties.radius = 0;
  cityCircle.defaultState.transitionEasing = am4core.ease.elasticOut;
  cityCircle.defaultState.transitionDuration = 2000 * tm;
  cityCircle.hide(0);

  var sfCity = mapImageSeries.mapImages.create();
  sfCity.latitude = destination.latitude;
  sfCity.longitude = destination.longitude;
  sfCity.nonScaling = true;

  sfLabel = sfCity.createChild(am4core.Label);
  sfLabel.text = destination.city;

  sfLabel.verticalCenter = "middle";
  // sfLabel.fillOpacity = 0.5;
  sfLabel.dx = 22;
  sfLabel.dy = -1;
  sfLabel.hiddenState.properties.dy = 100;
  sfLabel.hide(0);
  sfLabel.fontSize = 18;

  sfCircle = sfCity.createChild(am4core.Circle);
  sfCircle.fill = colorSet.getIndex(2);
  sfCircle.stroke = sfCircle.fill;
  sfCircle.radius = 12;
  sfCircle.hiddenState.properties.radius = 0;
  sfCircle.defaultState.transitionEasing = am4core.ease.elasticOut;
  sfCircle.defaultState.transitionDuration = 2000 * tm;
  sfCircle.hide(0);

  var mapLineSeries = mapChart.series.push(new am4maps.MapLineSeries());
  connectingLine = mapLineSeries.mapLines.create();
  connectingLine.imagesToConnect = [city, sfCity];
  connectingLine.line.strokeDasharray = "0.5,0.5"
  connectingLine.line.strokeOpacity = 0.4;
  connectingLine.hide(0);

  plane = connectingLine.arrow;
  var planeImage = plane.createChild(am4core.Sprite);
  planeImage.path = planePath;
  planeImage.horizontalCenter = "middle";
  planeImage.verticalCenter = "middle";
  plane.fill = colorSet.getIndex(0);
  plane.position = 0;
  //arrow.nonScaling = true;
  plane.hide(0);

  plane.adapter.add("scale", function(scale, target) {
    return (0.08 - 0.10 * (Math.abs(0.5 - target.position))) / mapChart.zoomLevel;
  })

  mapChart.events.on("inited",
    function() {
      setTimeout(stage1, 100);
    }
  );
}

function showMap() {
  var polygon = polygonSeries.getPolygonById(country.id)
  if (!polygon) {
    polygonSeries.geodataSource.events.on("ended", function() {
      setTimeout(function() {
        preStage2(country);
      }, 100)
    })
  }
  else {
    preStage2(country);
  }
}


function preStage2(country) {
  initialPolygon = polygonSeries.getPolygonById(country.id)

  slice = piechart.series.getIndex(0).dataItems.getIndex(1).slice;

  var w = initialPolygon.polygon.bbox.width * mapChart.scaleRatio;
  var h = initialPolygon.polygon.bbox.height * mapChart.scaleRatio;

  initialPolygon.fill = slice.fill;

  mapChart.zoomToGeoPoint({ latitude: initialPolygon.latitude, longitude: initialPolygon.longitude }, slice.radius * 2 / Math.max(w, h), true, 0);

  continentSeries.visible = false;
  continentSeries.opacity = 0;

  polygonSeries.dataItems.each(function(dataItem) {
    dataItem.mapPolygon.visible = false;
    dataItem.mapPolygon.fillOpacity = 0;
  })

  setTimeout(stage2, 100 * tm);
}

function stage2() {

  polygonSeries.show(0);

  var polygonPoint = { x: initialPolygon.polygon.bbox.x + initialPolygon.polygon.bbox.width / 2, y: initialPolygon.polygon.bbox.y + initialPolygon.polygon.bbox.height / 2 };
  var seriesPoint = am4core.utils.spritePointToSprite(polygonPoint, initialPolygon.polygon, polygonSeries);

  var geoPoint = mapChart.seriesPointToGeo(seriesPoint);
  mapChart.zoomToGeoPoint(geoPoint, mapChart.zoomLevel, true, 0);

  initialPolygon.polygon.morpher.morphToCircle(slice.radius / mapChart.zoomLevel / mapChart.scaleRatio, 0);
  initialPolygon.visible = true;
  initialPolygon.fillOpacity = 1;
  initialPolygon.opacity = 1;
  initialPolygon.strokeOpacity = 0;
  initialPolygon.toFront();
  initialPolygon.tooltipText = "{title}";
  polygonSeries.opacity = 1;

  setTimeout(function() {

    piechart.visible = false;

    var animation = initialPolygon.polygon.morpher.morphBack(1500 * tm);
    animation.events.on("animationended", function() {

      pieSeries.dataItems.each(function(dataItem) {
        dataItem.show(0);
      })

      lineSeries.interpolationEasing = am4core.ease.cubicOut;
      lineSeries.hiddenState.transitionDuration = 700 * tm;

      var hideAnimation = lineSeries.hide();

      hideAnimation.events.on("animationended", function() {
        lineSeries.dataItems.getIndex(3).setValue("valueY", 31, 0);
        lineSeries.dataItems.getIndex(3).setWorkingValue("valueY", 0, 0);
        lineChart.visible = false;

        continentSeries.show();
        var destinationPolygon = polygonSeries.getPolygonById("US");
        destinationPolygon.defaultState.visible = true;
        destinationPolygon.defaultState.properties.opacity = 1;
        destinationPolygon.hide(0);
        destinationPolygon.show();
        setTimeout(stage3, 1000 * tm);
      })
    })
  }, 100)
}

function stage3() {

  cityCircle.hide(0);
  var animation = cityCircle.show(1500 * tm);

  cityLabel.hide(0);
  cityLabel.show(1000);

  animation.events.on("animationended", function() {
    var zoomAnim = mapChart.zoomToMapObject(city, 4, true, 500 * tm);
    zoomAnim.events.on("animationended", function() {
      stage5();
    })
  });
}




function stage5() {

  sfCircle.show();

  connectingLine.show();
  connectingLine.arrow.show();

  footerLabel.text = "[[IIT GUWAHATI]]"; //[Indiana Jones theme music playing]
  footerLabel.zIndex = 100;
  footerLabel.show();

  var showed = false;

  var animation = connectingLine.arrow.animate({ property: "position", from: 0, to: 1 }, 5000 * tm, am4core.ease.polyInOut3);
  animation.events.on("animationprogress", function(event) {
    var point = connectingLine.positionToPoint(event.progress);
    var geoPoint = mapChart.seriesPointToGeo(point);

    mapChart.zoomToGeoPoint(geoPoint, mapChart.zoomLevel, true, 0);
    mapChart.seriesContainer.validatePosition();

    if (event.progress > 0.90 && !showed) {
      cityLabel.hide(0);
      showed = true;
      sfLabel.hide(0);
      sfLabel.show(1000);
    }
  })

  animation.events.on("animationended", function(event) {
    setTimeout(stage6, 500);
  })
}


function stage6() {
  footerLabel.hide();
  connectingLine.hide();
  plane.parent = mapChart.seriesContainer;
  var currentScale = plane.scale;
  plane.adapter.remove("scale");
  plane.mapLine = undefined; // detaches from line to allow animations

  headerLabel.y = 70;

  sfLabel.hide();
  plane.animate([{ property: "rotation", to: 360 }, { property: "scale", from: currentScale, to: 0.22 }], 1000 * tm, am4core.ease.quadOut);
  var animation = sfCircle.animate([{ property: "radius", to: 1000 }, { property: "opacity", to: 0 }], 1000 * tm);
  animation.events.on("animationended", stage7);
}


var pictorialChart;
var pictorialSeries;

function stage7() {
  var point = am4core.utils.spritePointToSvg({ x: plane.pixelX, y: plane.pixelY }, plane.parent);

  if (!pictorialChart) {
    pictorialChart = mainContainer.createChild(am4charts.SlicedChart);
    pictorialChart.zIndex = 30;
    pictorialChart.x = point.x;
    pictorialChart.y = point.y;
    pictorialChart.hidden = true;
    pictorialChart.fontSize = 14;

    pictorialChart.horizontalCenter = "middle";
    pictorialChart.verticalCenter = "middle";

    pictorialChart.data = [{
      "name": "[bold]No[/]",
      "fontColor": am4core.color("#222a3f"),
      "value": 120
    }, {
      "name": "Hm... I don't think so.",
      "value": 300
    }, {
      "name": "Yes, we are using amCharts",
      "value": 100,
      "disabled": true
    }];

    pictorialSeries = pictorialChart.series.push(new am4charts.PictorialStackedSeries());
    pictorialSeries.dataFields.value = "value";
    pictorialSeries.dataFields.category = "name";
    pictorialSeries.alignLabels = false;
    pictorialSeries.orientation = "horizontal";
    pictorialSeries.defaultState.transitionDuration = 1500;
    pictorialSeries.defaultState.transitionEasing = am4core.ease.sinOut;
    pictorialSeries.labels.template.rotation = 0;
    pictorialSeries.labels.template.text = "{category}";
    pictorialSeries.sequencedInterpolation = false;
    pictorialSeries.labels.template.propertyFields.fill = "fontColor";
    pictorialSeries.labels.template.propertyFields.disabled = "disabled";
    pictorialSeries.slices.template.tooltipText = "{category}";
    pictorialSeries.ticks.template.locationX = 0.5;
    pictorialSeries.hidden = true;

    pictorialSeries.ticks.template.locationY = 0.5;
    pictorialSeries.maskSprite.path = planePath;
  }

  headerLabel.text = "Hey, can you bend it?";
  headerLabel.show();

  pictorialChart.seriesContainer.dx = 0;
  pictorialChart.paddingTop = 126;
  pictorialChart.paddingBottom = 126;

  setTimeout(function() {
    pictorialChart.show();
    pictorialSeries.hide(0);
    var animation = pictorialSeries.show();
    animation.events.on("animationended", function() {
      mapChart.hiddenState.properties.opacity = 0;
      plane.hide(0);
      headerLabel.hide();
      setTimeout(stage8, 1000 * tm)
    });
  }, 1600);
}

var citySeries;
var lineChart2;
var lineChart2DateAxis;

function stage8() {
  if (!lineChart2) {
    lineChart2 = mainContainer.createChild(am4charts.XYChart);
    lineChart2.padding(0, 0, 0, 0)
    lineChart2.zIndex = 20;

    var data2 = [];
    var date2 = new Date(2000, 0, 1, 0, 0, 0, 0);
    var count2 = 40;

    for (var i = 0; i < count2; i++) {
      var newDate = new Date(date2.getTime());
      newDate.setDate(i + 1);

      var cityValue = Math.abs(Math.round(((Math.random() * 100 - i + 10) / 10)) * 10);

      var value = 100;
      data2.push({ date: newDate, value0: value, value1: -value, cityValue: cityValue });
    }

    lineChart2.data = data2;
    lineChart2.zoomOutButton.disabled = true;
    lineChart2.hidden = true;
    lineChart2.seriesContainer.zIndex = -1;

    lineChart2DateAxis = lineChart2.xAxes.push(new am4charts.DateAxis());
    lineChart2DateAxis.renderer.grid.template.location = 0;
    lineChart2DateAxis.renderer.ticks.template.disabled = true;
    lineChart2DateAxis.renderer.axisFills.template.disabled = true;

    lineChart2DateAxis.renderer.labels.template.disabled = true;
    lineChart2DateAxis.rangeChangeEasing = am4core.ease.sinIn;
    lineChart2DateAxis.renderer.inside = true;
    lineChart2DateAxis.startLocation = 0.5;
    lineChart2DateAxis.endLocation = 0.5;
    lineChart2DateAxis.renderer.baseGrid.disabled = true;
    lineChart2DateAxis.tooltip.disabled = true;
    lineChart2DateAxis.renderer.line.disabled = true;
    lineChart2DateAxis.renderer.grid.template.strokeOpacity = 0.07;

    valueAxis = lineChart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.inside = true;
    valueAxis.min = -100;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.disabled = true;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    var cityValueAxis = lineChart2.yAxes.push(new am4charts.ValueAxis());
    cityValueAxis.tooltip.disabled = true;
    cityValueAxis.renderer.ticks.template.disabled = true;
    cityValueAxis.renderer.axisFills.template.disabled = true;
    cityValueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.inside = true;
    cityValueAxis.max = 100;
    cityValueAxis.strictMinMax = true;
    cityValueAxis.tooltip.disabled = true;
    cityValueAxis.renderer.line.disabled = true;
    cityValueAxis.renderer.baseGrid.disabled = true;
    cityValueAxis.renderer.grid.template.disabled = true;

    citySeries = lineChart2.series.push(new am4charts.ColumnSeries());
    citySeries.dataFields.dateX = "date";
    citySeries.dataFields.valueY = "cityValue";
    citySeries.columns.template.strokeOpacity = 0;
    citySeries.fill = am4core.color("#222a3f");
    citySeries.hidden = true;
    citySeries.yAxis = cityValueAxis;
    citySeries.columns.template.width = am4core.percent(100);
    citySeries.hidden = true;

    lineSeries20 = lineChart2.series.push(new am4charts.LineSeries());
    lineSeries20.dataFields.dateX = "date";
    lineSeries20.dataFields.valueY = "value0";
    lineSeries20.sequencedInterpolation = true;

    lineSeries20.defaultState.transitionDuration = 1300 * tm;
    lineSeries20.strokeOpacity = 0;
    lineSeries20.stroke = am4core.color("#313950");
    lineSeries20.tensionX = 0.75;
    lineSeries20.hidden = true;
    lineSeries20.hiddenState.properties.opacity = 0;

    lineSeries20.fill = am4core.color("#222a3f")
    lineSeries20.fillOpacity = 1;

    lineSeries21 = lineChart2.series.push(lineSeries20.clone());
    lineSeries21.dataFields.valueY = "value1";

    lineChart2DateAxis.rangeChangeDuration = 0;

    lineChart2.events.on("datavalidated", function() {
      lineChart2DateAxis.zoom({ start: 0, end: 0.5 }, true, true);
    })
  }
  else {
    lineChart2DateAxis.zoom({ start: 0, end: 0.5 }, true, true);
  }

  var anim = mapChart.seriesContainer.animate([{ property: "x", to: mapChart.seriesContainer.pixelX - 500 }, { property: "opacity", to: 0 }], 2500 * tm, am4core.ease.polyIn3);
  anim.events.on("animationended", function() {
    mapChart.dispose();

    var animation = pictorialChart.seriesContainer.animate({ property: "dx", to: 2000, from: 0 }, 1500 * tm, am4core.ease.quadIn);

    lineChart2.show();
    lineSeries20.hide(0);
    lineSeries20.show();

    lineSeries21.hide(0);
    lineSeries21.show();
    animation.events.on("animationended", function() { setTimeout(stage9, 200 * tm) });
  })
}

var radarChart;


function stage9() {
  lineSeries20.animate({ property: "opacity", to: 0 }, 3000 * tm)
  lineSeries21.animate({ property: "opacity", to: 0 }, 3000 * tm)

  headerLabel.hide();

  lineChart2.background.fillOpacity = 0.2;
  var gradient = new am4core.LinearGradient();
  gradient.addColor(am4core.color("#222a3f"));
  gradient.addColor(colorSet.getIndex(1));
  gradient.rotation = -90;
  lineChart2.background.fill = gradient;

  lineChart2DateAxis.rangeChangeDuration = 15000 * tm;
  lineChart2DateAxis.rangeChangeEasing = am4core.ease.sinInOut;

  lineChart2DateAxis.zoom({ start: 0.5, end: 1 });

  stage10();
}

function stage10() {
  //pictorialSeries.maskSprite.path = hPlanePath;
  pictorialChart.paddingTop = 220;
  pictorialChart.paddingBottom = 220;
  //pictorialSeries.maskSprite.validate();
  //pictorialSeries.validateLayout();
  //pictorialSeries.validateDataElements();
  //pictorialSeries.validate();

  citySeries.show(1200 * tm);

  pictorialSeries.dataItems.each(function(dataItem) {
    dataItem.label.hide(0);
  })

  footerLabel.text = "[[amCharts office, Vilnius, Lithuania]]"
  footerLabel.show();

  var animation = pictorialChart.seriesContainer.animate({ property: "dx", from: -2000, to: -100 }, 1000 * tm, am4core.ease.polyOut3);

  animation.events.on("animationended", function() {
    var animation = pictorialChart.seriesContainer.animate({ property: "dx", from: -100, to: 200 }, 10000 * tm, am4core.ease.sinInOut);
    setTimeout(stage11, 4000);
  })
}

function stage11() {
  pictorialChart.seriesContainer.animate({ property: "dx", to: 2000 }, 1000 * tm, am4core.ease.polyIn3);
  citySeries.sequencedInterpolation = true;
  citySeries.hide(1000);
  footerLabel.hide();
  var animation = pictorialChart.hide(2500 * tm);
  animation.events.on("animationended", function() {
    stage13()
  })

  lineChart2.hide(3000);
}


var slider;
var radarSeries;

function stage13() {
  if (!radarChart) {
    radarChart = mainContainer.createChild(am4charts.RadarChart);

    radarChart.data = [{
      "category": "So",
      "value1": 10
    }, {
      "category": "can",
      "value1": 20
    }, {
      "category": "your",
      "value1": 30
    }, {
      "category": "charts",
      "value1": 40
    }, {
      "category": "do",
      "value1": 50
    }, {
      "category": "this?",
      "value1": 60
    }]

    radarChart.padding(10, 10, 10, 10);
    radarChart.zIndex = 40;
    radarChart.x = piechart.x;
    radarChart.width = 400;
    radarChart.horizontalCenter = "middle";
    radarChart.radius = am4core.percent(100);
    radarChart.zoomOutButton.disabled = true;

    radarChart.startAngle = 269.8;
    radarChart.endAngle = 270.2;
    slider = new am4core.Slider();
    slider.parent = radarChart.chartContainer;
    slider.visible = false;
    slider.isMeasured = false;
    slider.background.fillOpacity = 0.15;

    slider.y = 550;
    slider.marginLeft = 150;
    slider.marginRight = 150;
    slider.start = 0;
    slider.events.on("rangechanged", function() {

      var start = slider.start;

      radarChart.startAngle = 270 - start * 179.8 - 0.2;
      radarChart.endAngle = 270 + start * 179.8 + 0.2;

      valueAxis.renderer.axisAngle = radarChart.startAngle;
    })

    radarChart.innerRadius = am4core.percent(40);

    var categoryAxis = radarChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.grid.template.location = 0;


    categoryAxis.renderer.axisFills.template.disabled = true;
    categoryAxis.interactionsEnabled = false;
    categoryAxis.renderer.labels.template.disabled = true;

    var valueAxis = radarChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minGridDistance = 10;
    valueAxis.renderer.grid.template.strokeOpacity = 0.05
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.interactionsEnabled = false;
    valueAxis.renderer.axisAngle = radarChart.startAngle;
    //valueAxis.renderer.gridType = "polygons";
    valueAxis.min = 0;
    valueAxis.max = 70;
    valueAxis.strictMinMax = true;

    radarSeries = radarChart.series.push(new am4charts.RadarColumnSeries());
    radarSeries.columns.template.width = am4core.percent(80);
    radarSeries.name = "Series 1";
    radarSeries.dataFields.categoryX = "category";
    radarSeries.columns.template.tooltipText = "{categoryX}";
    radarSeries.dataFields.valueY = "value1";
    radarSeries.columns.template.radarColumn.cornerRadius = 4;
    radarSeries.columns.template.radarColumn.innerCornerRadius = 0;
    radarSeries.columns.template.strokeOpacity = 0;
    radarSeries.defaultState.transitionDuration = 500;
    radarSeries.sequencedInterpolation = true;
    radarSeries.columns.template.adapter.add("fill", function(fill, target) {
      if (target.dataItem) {
        return colorSet.getIndex(5 - target.dataItem.index);
      }
    })
    radarChart.events.on("ready", function() {
      stage135()
    })
  }
  else {
    slider.start = 1;
    radarChart.startAngle = 269;
    radarChart.endAngle = 271;
    radarChart.show();
    radarSeries.hide(0);
    radarSeries.show();
    radarChart.y = 0;
    stage135()
  }
}

function stage135() {
  headerLabel.y = 55;
  headerLabel.text = "Hey, amCharts, can you bend it?";
  var titleAnimation = headerLabel.show();
  titleAnimation.events.on("animationended", function() {
    setTimeout(function() {
      var animation = headerLabel.hide();
      animation.events.on("animationended", function() { setTimeout(stage14, 100) });
    }, 1500 * tm);
  })
}


function stage14() {
  headerLabel.visible = false;
  headerLabel.text = "[font-size: 12 opacity: 0.5]amCharts:[/] Hold my beer.";
  var animation = headerLabel.show();

  animation.events.on("animationended", function() {
    setTimeout(stage15, 1500 * tm);
  });
}

function stage15() {
  var animation = radarChart.animate([{ property: "startAngle", to: 90 }, { property: "endAngle", to: 450 }], 3500 * tm, am4core.ease.cubicIn);
  animation.events.on("animationprogress", function() {
    valueAxis.renderer.axisAngle = radarChart.startAngle;
  })
  animation.events.on("animationended", function() {
    stage16();
  })
}


function stage16() {
  slider.show();
  slider.start = 1;
  footerLabel.text = "Go ahead - try it yourself:";
  footerLabel.show();

  var animation = headerLabel.hide();

  animation.events.on("animationended", function() {
    headerLabel.text = "Watch it again"
    headerLabel.validate();
    headerLabel.show();

    nextButton.x = headerLabel.pixelX - headerLabel.bbox.width / 2 - 30;
    nextButton.y = headerLabel.pixelY;
    nextButton.show();
    headerLabel.interactionsEnabled = true;
  })
}

function repeat() {
  headerLabel.hide();
  footerLabel.hide();
  nextButton.hide();
  userCountryId = "US";
  if (slider) {
    slider.hide();
  }
  if (radarChart) {
    radarSeries.hide();
    var animation = radarChart.hide();

    animation.events.on("animationended", function() {
      radarChart.visible = true;
      startEverything();
      radarChart.y = 800;
    })
  }
  else {
    startEverything();
  }
}


var countries =
  [
    { id: "SS", city: "Juba", latitude: 4.85, longitude: 31.6167 },
    { id: "NZ", city: "Auckland", latitude: -36.8485, longitude: 174.7633 },
    { id: "LT", city: "Vilnius", latitude: 54.6833, longitude: 25.3167 },
    { id: "LU", city: "Luxembourg", latitude: 49.6, longitude: 6.1167 },
    { id: "MK", city: "Skopje", latitude: 42, longitude: 21.4333 },
    { id: "MG", city: "Antananarivo", latitude: -18.9167, longitude: 47.5167 },
    { id: "MW", city: "Lilongwe", latitude: -13.9667, longitude: 33.7833 },
    { id: "MY", city: "Kuala Lumpur", latitude: 3.1667, longitude: 101.7 },
    { id: "ML", city: "Bamako", latitude: 12.65, longitude: -8 },
    { id: "MR", city: "Nouakchott", latitude: 18.0667, longitude: -15.9667 },
    { id: "MX", city: "Mexico City", latitude: 19.4333, longitude: -99.1333 },
    { id: "MD", city: "Chisinau", latitude: 47, longitude: 28.85 },
    { id: "MN", city: "Ulaanbaatar", latitude: 47.9167, longitude: 106.9167 },
    { id: "ME", city: "Podgorica", latitude: 42.4333, longitude: 19.2667 },
    { id: "MA", city: "Rabat", latitude: 34.0167, longitude: -6.8167 },
    { id: "MZ", city: "Maputo", latitude: -25.95, longitude: 32.5833 },
    { id: "NA", city: "Windhoek", latitude: -22.5667, longitude: 17.0833 },
    { id: "NP", city: "Kathmandu", latitude: 27.7167, longitude: 85.3167 },
    { id: "NL", city: "Amsterdam", latitude: 52.35, longitude: 4.9167 },
    { id: "KW", city: "Kuwait City", latitude: 29.3667, longitude: 47.9667 },
    { id: "KG", city: "Bishkek", latitude: 42.8667, longitude: 74.6 },
    { id: "LA", city: "Vientiane", latitude: 17.9667, longitude: 102.6 },
    { id: "LV", city: "Riga", latitude: 56.95, longitude: 24.1 },
    { id: "LB", city: "Beirut", latitude: 33.8667, longitude: 35.5 },
    { id: "LS", city: "Maseru", latitude: -29.3167, longitude: 27.4833 },
    { id: "LR", city: "Monrovia", latitude: 6.3, longitude: -10.8 },
    { id: "LY", city: "Tripoli", latitude: 32.8833, longitude: 13.1667 },
    { id: "KR", city: "Seoul", latitude: 37.55, longitude: 126.9833 },
    { id: "JO", city: "Amman", latitude: 31.95, longitude: 35.9333 },
    { id: "KZ", city: "Astana", latitude: 51.1667, longitude: 71.4167 },
    { id: "KE", city: "Nairobi", latitude: -1.2833, longitude: 36.8167 },
    { id: "KP", city: "Pyongyang", latitude: 39.0167, longitude: 125.75 },
    { id: "JP", city: "Tokyo", latitude: 35.6833, longitude: 139.75 },
    { id: "IT", city: "Rome", latitude: 41.9, longitude: 12.4833 },
    { id: "JM", city: "Kingston", latitude: 18, longitude: -76.8 },
    { id: "IL", city: "Tel Aviv", latitude: 32.0853, longitude: 34.7818 },
    { id: "IR", city: "Tehran", latitude: 35.7, longitude: 51.4167 },
    { id: "IQ", city: "Baghdad", latitude: 33.3333, longitude: 44.4 },
    { id: "IE", city: "Dublin", latitude: 53.3167, longitude: -6.2333 },
    { id: "ID", city: "Jakarta", latitude: -6.1667, longitude: 106.8167 },
    { id: "IN", city: "IIT Guwahati", latitude: 26.187222, longitude: 91.691667
},   // { id: "IN", city: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
    { id: "HN", city: "Tegucigalpa", latitude: 14.1, longitude: -87.2167 },
    { id: "HU", city: "Budapest", latitude: 47.5, longitude: 19.0833 },
    { id: "IS", city: "Reykjavik", latitude: 64.15, longitude: -21.95 },
    { id: "HT", city: "Port-au-Prince", latitude: 18.5333, longitude: -72.3333 },
    { id: "ER", city: "Asmara", latitude: 15.3333, longitude: 38.9333 },
    { id: "EE", city: "Tallinn", latitude: 59.4333, longitude: 24.7167 },
    { id: "ET", city: "Addis Ababa", latitude: 9.0333, longitude: 38.7 },
    { id: "FI", city: "Helsinki", latitude: 60.1667, longitude: 24.9333 },
    { id: "FR", city: "Paris", latitude: 48.8667, longitude: 2.3333 },
    { id: "GA", city: "Libreville", latitude: 0.3833, longitude: 9.45 },
    { id: "GM", city: "Banjul", latitude: 13.45, longitude: -16.5667 },
    { id: "GE", city: "Tbilisi", latitude: 41.6833, longitude: 44.8333 },
    { id: "DE", city: "Berlin", latitude: 52.5167, longitude: 13.4 },
    { id: "GH", city: "Accra", latitude: 5.55, longitude: -0.2167 },
    { id: "GR", city: "Athens", latitude: 37.9833, longitude: 23.7333 },
    { id: "GL", city: "Nuuk", latitude: 64.1833, longitude: -51.75 },
    { id: "GQ", city: "Malabo", latitude: 3.75, longitude: 8.7833 },
    { id: "EC", city: "Quito", latitude: -0.2167, longitude: -78.5 },
    { id: "EG", city: "Cairo", latitude: 30.05, longitude: 31.25 },
    { id: "SV", city: "San Salvador", latitude: 13.7, longitude: -89.2 },
    { id: "DJ", city: "Djibouti", latitude: 11.5833, longitude: 43.15 },
    { id: "DK", city: "Copenhagen", latitude: 55.6667, longitude: 12.5833 },
    { id: "CZ", city: "Prague", latitude: 50.0833, longitude: 14.4667 },
    { id: "CY", city: "Nicosia", latitude: 35.1667, longitude: 33.3667 },
    { id: "CU", city: "Havana", latitude: 23.1167, longitude: -82.35 },
    { id: "HR", city: "Zagreb", latitude: 45.8, longitude: 16 },
    { id: "CI", city: "Yamoussoukro", latitude: 6.8167, longitude: -5.2667 },
    { id: "CR", city: "San Jose", latitude: 9.9333, longitude: -84.0833 },
    { id: "CG", city: "Brazzaville", latitude: -4.25, longitude: 15.2833 },
    { id: "CD", city: "Kinshasa", latitude: -4.3167, longitude: 15.3 },
    { id: "CO", city: "Bogota", latitude: 4.6, longitude: -74.0833 },
    { id: "CN", city: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
    { id: "CL", city: "Santiago", latitude: -33.45, longitude: -70.6667 },
    { id: "TD", city: "N'Djamena", latitude: 12.1, longitude: 15.0333 },
    { id: "CF", city: "Bangui", latitude: 4.3667, longitude: 18.5833 },
    { id: "CA", city: "Toronto", latitude: 43.6532, longitude: -79.3832 },
    { id: "KH", city: "Phnom Penh", latitude: 11.55, longitude: 104.9167 },
    { id: "CM", city: "Yaounde", latitude: 3.8667, longitude: 11.5167 },
    { id: "BI", city: "Bujumbura", latitude: -3.3667, longitude: 29.35 },
    { id: "MM", city: "Rangoon", latitude: 16.8, longitude: 96.15 },
    { id: "BF", city: "Ouagadougou", latitude: 12.3667, longitude: -1.5167 },
    { id: "BG", city: "Sofia", latitude: 42.6833, longitude: 23.3167 },
    { id: "BR", city: "Sao Paulo", latitude: -23.5505, longitude: -46.6333 },
    { id: "BW", city: "Gaborone", latitude: -24.6333, longitude: 25.9 },
    { id: "BA", city: "Sarajevo", latitude: 43.8667, longitude: 18.4167 },
    { id: "BO", city: "La Paz", latitude: -16.5, longitude: -68.15 },
    { id: "BT", city: "Thimphu", latitude: 27.4667, longitude: 89.6333 },
    { id: "BJ", city: "Porto-Novo", latitude: 6.4833, longitude: 2.6167 },
    { id: "BZ", city: "Belmopan", latitude: 17.25, longitude: -88.7667 },
    { id: "BE", city: "Brussels", latitude: 50.8333, longitude: 4.3333 },
    { id: "BY", city: "Minsk", latitude: 53.9, longitude: 27.5667 },
    { id: "AM", city: "Yerevan", latitude: 40.1667, longitude: 44.5 },
    { id: "AZ", city: "Baku", latitude: 40.3833, longitude: 49.8667 },
    { id: "BD", city: "Dhaka", latitude: 23.7167, longitude: 90.4 },
    { id: "AT", city: "Vienna", latitude: 48.2, longitude: 16.3667 },
    { id: "AU", city: "Sydney", latitude: -33.8688, longitude: 151.2093 },
    { id: "AR", city: "Buenos Aires", latitude: -34.5833, longitude: -58.6667 },
    { id: "AO", city: "Luanda", latitude: -8.8333, longitude: 13.2167 },
    { id: "DZ", city: "Algiers", latitude: 36.75, longitude: 3.05 },
    { id: "AL", city: "Tirana", latitude: 41.3167, longitude: 19.8167 },
    { id: "GT", city: "Guatemala City", latitude: 14.6167, longitude: -90.5167 },
    { id: "GN", city: "Conakry", latitude: 9.5, longitude: -13.7 },
    { id: "GW", city: "Bissau", latitude: 11.85, longitude: -15.5833 },
    { id: "GY", city: "Georgetown", latitude: 6.8, longitude: -58.15 },
    { id: "NI", city: "Managua", latitude: 12.1333, longitude: -86.25 },
    { id: "NE", city: "Niamey", latitude: 13.5167, longitude: 2.1167 },
    { id: "NG", city: "Abuja", latitude: 9.0833, longitude: 7.5333 },
    { id: "NO", city: "Oslo", latitude: 59.9167, longitude: 10.75 },
    { id: "OM", city: "Muscat", latitude: 23.6167, longitude: 58.5833 },
    { id: "PK", city: "Islamabad", latitude: 33.6833, longitude: 73.05 },
    { id: "PA", city: "Panama City", latitude: 8.9667, longitude: -79.5333 },
    { id: "PG", city: "Port Moresby", latitude: -9.45, longitude: 147.1833 },
    { id: "PY", city: "Asuncion", latitude: -25.2667, longitude: -57.6667 },
    { id: "PE", city: "Lima", latitude: -12.05, longitude: -77.05 },
    { id: "PH", city: "Manila", latitude: 14.6, longitude: 120.9667 },
    { id: "PL", city: "Warsaw", latitude: 52.25, longitude: 21 },
    { id: "PT", city: "Lisbon", latitude: 38.7167, longitude: -9.1333 },
    { id: "PR", city: "San Juan", latitude: 18.4667, longitude: -66.1167 },
    { id: "RO", city: "Bucharest", latitude: 44.4333, longitude: 26.1 },
    { id: "RU", city: "Moscow", latitude: 55.75, longitude: 37.6 },
    { id: "RW", city: "Kigali", latitude: -1.95, longitude: 30.05 },
    { id: "SA", city: "Riyadh", latitude: 24.65, longitude: 46.7 },
    { id: "SN", city: "Dakar", latitude: 14.7333, longitude: -17.6333 },
    { id: "RS", city: "Belgrade", latitude: 44.8333, longitude: 20.5 },
    { id: "SL", city: "Freetown", latitude: 8.4833, longitude: -13.2333 },
    { id: "SK", city: "Bratislava", latitude: 48.15, longitude: 17.1167 },
    { id: "SI", city: "Ljubljana", latitude: 46.05, longitude: 14.5167 },
    { id: "SO", city: "Mogadishu", latitude: 2.0667, longitude: 45.3333 },
    { id: "ZA", city: "Pretoria", latitude: -25.7, longitude: 28.2167 },
    { id: "ES", city: "Madrid", latitude: 40.4, longitude: -3.6833 },
    { id: "LK", city: "Colombo", latitude: 6.9167, longitude: 79.8333 },
    { id: "SD", city: "Khartoum", latitude: 15.6, longitude: 32.5333 },
    { id: "SR", city: "Paramaribo", latitude: 5.8333, longitude: -55.1667 },
    { id: "SZ", city: "Mbabane", latitude: -26.3167, longitude: 31.1333 },
    { id: "SE", city: "Stockholm", latitude: 59.3333, longitude: 18.05 },
    { id: "CH", city: "Bern", latitude: 46.9167, longitude: 7.4667 },
    { id: "SY", city: "Damascus", latitude: 33.5, longitude: 36.3 },
    { id: "TW", city: "Taipei", latitude: 25.0333, longitude: 121.5167 },
    { id: "TJ", city: "Dushanbe", latitude: 38.55, longitude: 68.7667 },
    { id: "TZ", city: "Dar es Salaam", latitude: -6.8, longitude: 39.2833 },
    { id: "TH", city: "Bangkok", latitude: 13.75, longitude: 100.5167 },
    { id: "TN", city: "Tunis", latitude: 36.8, longitude: 10.1833 },
    { id: "TR", city: "Ankara", latitude: 39.9333, longitude: 32.8667 },
    { id: "TM", city: "Ashgabat", latitude: 37.95, longitude: 58.3833 },
    { id: "UG", city: "Kampala", latitude: 0.3167, longitude: 32.55 },
    { id: "UA", city: "Kyiv", latitude: 50.4333, longitude: 30.5167 },
    { id: "AE", city: "Abu Dhabi", latitude: 24.4667, longitude: 54.3667 },
    { id: "GB", city: "London", latitude: 51.5, longitude: -0.0833 },
    { id: "UY", city: "Montevideo", latitude: -34.85, longitude: -56.1667 },
    { id: "UZ", city: "Tashkent", latitude: 41.3167, longitude: 69.25 },
    { id: "VE", city: "Caracas", latitude: 10.4833, longitude: -66.8667 },
    { id: "VN", city: "Hanoi", latitude: 21.0333, longitude: 105.85 },
    { id: "YE", city: "Sanaa", latitude: 15.35, longitude: 44.2 },
    { id: "ZM", city: "Lusaka", latitude: -15.4167, longitude: 28.2833 },
    { id: "ZW", city: "Harare", latitude: -17.8167, longitude: 31.0333 }
  ]

var randomCountries = ["FR", "AU", "JP", "GB", "KR", "IT", "DE"];

function getCountryById(id) {
//   for (var i = 0; i < countries.length; i++) {
//     if (countries[i].id == id) {
      return countries[40];
//     }
//   }
}