/* eslint-disable */
import * as d3 from "d3";
import {EventEmitter} from "events";

var ns = {};

var ANIMATION_DURATION = 400;
var TOOLTIP_WIDTH = 30;
var TOOLTIP_HEIGHT = 30;


ns.create = function (el, props, state) {
    const dispatcher = new EventEmitter();

    var svg = d3.select(el)
        .append("div")
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 400")
        //class to make it responsive
        .classed("svg-content-responsive d3", true);
    d3.select(".svg-content-responsive")
        .on("click", function () {

            const mouse = d3.mouse(this);
            const x = mouse[0];
            const y = mouse[1];
            // var coords = d3.mouse(this);
            // console.log("click", `${x}, ${y}`);
            const scale = ns._scales(el, state.domain);
            const rescaledX = scale.x.invert(x);
            const rescaledY = scale.y.invert(y);
            // console.log("rescaled", `${rescaledX}, ${rescaledY}`);

            state.data.push({
                x: rescaledX,
                y: rescaledY,
                r: 2, color: "#c50000"
            });

            ns.update(el, state, dispatcher);
        });

// .append('svg')
    // .attr('class', 'd3')
    // .attr('width', props.width)
    // .attr('height', props.height);

    svg.append('g')
        .attr('class', 'd3-points');

    // svg.append('g')
    //     .attr('class', 'd3-tooltips');


    this.update(el, state, dispatcher);

    return dispatcher;
};

ns.update = function (el, state, dispatcher) {
    var scales = this._scales(el, state.domain);
    this._drawPoints(el, scales, state, dispatcher);
    // this._drawTooltips(el, scales, state.tooltips, prevScales);
};

ns._scales = function (elId, domain) {
    if (!domain) {
        return null;
    }

    const el = $(elId);
    var width = el.width();
    var height = el.height();

    var x = d3.scaleLinear()
        .range([0, width])
        .domain(domain.x);

    var y = d3.scaleLinear()
        .range([0, height])
        .domain(domain.y);

    var r = d3.scaleLinear()
        .range([5, 20])
        .domain([1, 10]);

    return {x, y, r};
};


ns._drawPoints = function (el, scales, state, dispatcher) {
    const {data, domain} = state;
    var g = d3.select(el).selectAll('.d3-points');

    function subject(d) {
        return {x: d3.event.x, y: d3.event.y}
    };

    var drag = d3.drag()
        .subject(subject)
        .on("start", function () {
            d3.event.sourceEvent.stopPropagation(); // silence other listeners
        })
        .on("drag", function (d) {
            // console.log(d3.event.x + "," + d3.event.y);

            d.x = d3.event.x;
            d.y = d3.event.y;

            const xEdgeZero = d.x - scales.x(2 * d.r);
            const yEdgeZero = d.y - scales.y(2 * d.r);
            const xEdgeMax = d.x + scales.x(2 * d.r);
            const yEdgeMax = d.y + scales.y(2 * d.r);

            if (xEdgeZero > domain.x[0] && xEdgeMax < domain.x[1] &&
                yEdgeZero > domain.y[0] && yEdgeMax < domain.y[1]) {
                d3.select(this).attr("cx", d.x).attr("cy", d.y);
            }

        })
        .on("end", function (d) {
            console.log("end", d);
        });


    var point = g.selectAll('.d3-point')
        .data(data)
        .enter()
        .append("circle")
        .attr('class', 'd3-point')
        .attr('cx', (d) => scales.x(d.x))
        .attr('cy', (d) => scales.y(d.y))
        .attr('r', (d) => scales.r(d.r))
        .style("fill", function (d) {
            return d.color;
        })
        .on('click', function (d) {
            // console.log("point", d);
        })
        .call(drag);


    // point.enter().append('circle')
    //     .attr('class', 'd3-point')
    //     .attr('cx', function (d) {
    //         if (prevScales) {
    //             return prevScales.x(d.x);
    //         }
    //         return scales.x(d.x);
    //     })
    //     .transition()
    //     .duration(ANIMATION_DURATION)
    //     .attr('cx', function (d) {
    //         return scales.x(d.x);
    //     });
    //
    // point.attr('cy', function (d) {
    //     return scales.y(d.y);
    // })
    //     .attr('r', function (d) {
    //         return scales.z(d.z);
    //     })
    //     .on('mouseover', function (d) {
    //         dispatcher.emit('point:mouseover', d);
    //     })
    //     .on('mouseout', function (d) {
    //         dispatcher.emit('point:mouseout', d);
    //     })
    //     .transition()
    //     .duration(ANIMATION_DURATION)
    //     .attr('cx', function (d) {
    //         return scales.x(d.x);
    //     });
    //
    // if (prevScales) {
    //     point.exit()
    //         .transition()
    //         .duration(ANIMATION_DURATION)
    //         .attr('cx', function (d) {
    //             return scales.x(d.x);
    //         })
    //         .remove();
    // }
    // else {
    //     point.exit()
    //         .remove();
    // }
};

ns.destroy = function (el) {

};


export default ns;