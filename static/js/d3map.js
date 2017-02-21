// from http://jonathanwarrick.com/2014/09/11/d3-and-the-usa-getting-started-with-topojsongeojson/

d3.json("/static/json/convertedstates.json", function(error, states) {
  if (error) {
    return console.error(error);
  } else {

    var width = 960;
    var height = 1160;

    // specify the "canvas"
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);


    // specify the projection
    var projection = d3.geo.albersUsa();


    // make path generator
    var path = d3.geo.path()
                 .projection(projection);


    // convert states from topojson to geojson
    var states = topojson.feature(states, states.objects.states);
    console.log(states);

    // draw the sillhouette
    svg.append("path")
       .datum(states)
       .attr("d", path);

    // make map gray with white borders
    svg.selectAll('.states')
       .data(states.features)
       .enter()
       .append('path')
       .attr('d', path)
       .style("fill", "#aaaaaa")
       .style("stroke", "white")
       .style("stroke-weight", 1)


    // add a couple lat/lngs
    var locations = [[40.7127, -74.0059], [37.7833, -122.4167]];

    svg.selectAll('circle')
       .data(locations)
       .enter()
       .append('circle')
       .attr('r', 10)
       .attr('fill', 'black')
       .attr('transform', function(locations) {       
         return 'translate(' + projection([locations[1], locations[0]]) + ')';
       });

      }

});