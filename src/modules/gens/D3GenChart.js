import * as d3 from "d3";
import randomColor from "randomcolor";

let ns = {};


ns.create = (props) => {

    let dataset = {
        "children": [
            ...props.data
        ]
    };
    let colors = randomColor({hue: 'red',format: 'hex', count: props.data.length, luminosity: "bright"});

    let width = props.width;
    let height = props.height;
    let bubble = d3.pack(dataset)
        .size([width, height])
        .padding(1.5);

    let svg = d3.select("#" + props.id)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

    let nodes = d3.hierarchy(dataset)
        .sum(function (d) {
            return d.Count;
        });

    let node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children;
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    node.append("title")
        .text(function (d) {
            let {data} = d;
            return data.Name + ": " + data.Count;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {

            return colors[i];
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Count;
        })
        .attr("font-family", "Gill Sans", "Gill Sans MT")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", height + "px");
};
export default ns;


