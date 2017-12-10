
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
    d3.json("graph.json", function(error, graph) {
      if (error) throw error;
      var link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
          .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
      var node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
          .attr("r", 5)
          .attr("fill", function(d) { return color(d.group); })
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));
      node.append("title")
          .text(function(d) { return d.id; });
      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);
      simulation.force("link")
          .links(graph.links);
      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
    });
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

//################Packages#######################

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height"),
g = svg.append("g").attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")");

var stratify = d3.stratify()
.parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

var tree = d3.tree()
.size([2 * Math.PI, 500])
.separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

d3.json("dataTest/radialJson.json", function(error, data) {
if (error) throw error;

var root = tree(stratify(data));

var link = g.selectAll(".link")
.data(root.links())
.enter().append("path")
  .attr("class", "link")
  .attr("d", d3.linkRadial()
      .angle(function(d) { return d.x; })
      .radius(function(d) { return d.y; }));

var node = g.selectAll(".node")
.data(root.descendants())
.enter().append("g")
  .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
  .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });

node.append("circle")
  .attr("r", 2.5);

node.append("text")
  .attr("dy", "0.31em")
  .attr("x", function(d) { return d.x < Math.PI === !d.children ? 6 : -6; })
  .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
  .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
  .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
});

function radialPoint(x, y) {
return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
