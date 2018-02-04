import * as d3 from "d3";
import {EventEmitter} from "events";
import {MOVE_SEAT} from '../seat/seatConstants';

let ns = {};

// const ANIMATION_DURATION = 400;
// const TOOLTIP_WIDTH = 30;
// const TOOLTIP_HEIGHT = 30;

ns.onClick = (onClick) => {
    ns.onClick = onClick;
};

ns.onPointClick = (onPointClick) => {
    ns.onPointClick = onPointClick;
};

ns.onDrag = (onDrag) => {
    ns.onDrag = onDrag;
};

// ns.updateData = (state) => {
//     const newState = {
//         ...state,
//         data: state.seats.map((seat) => {
//             return {
//                 ...seat
//             };
//         })
//     };
//     ns.update(ns.el, newState);
// };

ns.create = function (el, props, state) {
    ns.el = el;

    d3.select(el)
        .append("div")
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${props.width} ${props.height}`)
        //class to make it responsive
        .classed("svg-content-responsive d3", true);
    d3.select(".svg-content-responsive")
        .on("click", function () {

            const mouse = d3.mouse(this);
            const x = mouse[0];
            const y = mouse[1];

            const scale = ns._scales(el, state.domain);
            const rescaledX = scale.x.invert(x);
            const rescaledY = scale.y.invert(y);

            const point = {
                x: rescaledX,
                y: rescaledY
            };

            if (ns.onClick) {
                ns.onClick(point);
            }

            ns.update(el, state);
        });

// .append('svg')
    // .attr('class', 'd3')
    // .attr('width', props.width)
    // .attr('height', props.height);

    // svg.append('g')
    //     .attr('class', 'd3-points');

    this.update(el, state);
};

ns.update = function (el, state) {

    let scales = this._scales(el, state.domain);
    this._drawPoints(el, scales, state);
    // this._drawTooltips(el, scales, state.tooltips, prevScales);
};

ns._scales = function (elId, domain) {
    if (!domain) {
        return null;
    }

    // const el = $(".d3");
    // let width = el.width();
    // let height = el.height();

    // console.log(`${width}, ${height}`);

    // let x = d3.scaleLinear()
    //     .range([0, width])
    //     .domain(domain.x);
    //
    // let y = d3.scaleLinear()
    //     .range([0, height])
    //     .domain(domain.y);
    //
    const r = d3.scaleLinear()
        .range([10, 50])
        .domain([1, 10]);

    const x = (x) => x;
    x.invert = x;
    return {x, y: x, r};
};


ns._drawPoints = function (el, scales, state) {
    const {data, domain} = state;
    
    const subject = function () {
        return {x: d3.event.x, y: d3.event.y};
    };

    let drag = d3.drag()
        .subject(subject)
        .on("start", function () {
            d3.event.sourceEvent.stopPropagation(); // silence other listeners
        })
        .on("drag", function (d) {
            // console.log(d3.event.x + "," + d3.event.y);

            const x = d3.event.x;
            const y = d3.event.y;

            const xEdgeZero = x - scales.x(2 * d.r);
            const yEdgeZero = y - scales.y(2 * d.r);
            const xEdgeMax = x + scales.x(2 * d.r);
            const yEdgeMax = y + scales.y(2 * d.r);

            if (xEdgeZero > domain.x[0] && xEdgeMax < domain.x[1] &&
                yEdgeZero > domain.y[0] && yEdgeMax < domain.y[1]) {
                
                 ns.onDrag({
                    index: d.index,
                    x,
                    y
                });
                // if (currentAction === MOVE_SEAT) {
                    // d3.select(this).attr("transform", "translate(" + x + "," + y + ")");    
                // }                
            }
           
        })
        .on("end", function () {
            
        });
    
    const svg = d3.select("svg");
    let g = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "seat-wrapper")
        .call(drag);

    g.append("circle")
        .attr('class', (d) => {
            return d.active ? 'd3-point active' : 'd3-point';
        });
    g.append("text")
        .attr('class', (d) => {
            return d.active ? 'd3-text active' : 'd3-text';
        });
        // .attr("dy", d => scales.r(d.r) / 3)
        // .attr("text-anchor", "middle")
        // .attr("fill", "white")
        // .attr("font-size", d => scales.r(d.r))
        // .text(function (d) {
        //     return d.name || "";
        // });
    
    
    // let pointEnters = g.selectAll('.d3-point')
    //     .data(data)
    //     .enter()
    //     .append("g")
    //     .attr("class");
        
    g = d3.selectAll("g");

    g.attr("transform", d => "translate(" + d.x + "," + d.y + ")");

    const transformTrasition = d3.transition()
        .duration(200)
        .ease(d3.easeLinear);

    svg.selectAll(".d3-point")
        .data(data)
        .transition(transformTrasition)
        .attr('r', (d) => scales.r(d.r))
        .style("fill", function (d) {
            if (d.booked) {
                return "#bbb";
            }
            return d.color;
        });

    svg.selectAll(".d3-text")
        .data(data)    
        .attr("dy", d => scales.r(d.r) / 3)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", d => scales.r(d.r))
        .text(function (d) {
            return d.name || "";
        });

        
        
    // .attr('cx', (d) => scales.x(d.x))
    // .attr('cy', (d) => scales.y(d.y));


    // pointEnters.append("circle")
    //     .attr('class', (d) => {
    //         return d.active ? 'd3-point active' : 'd3-point';
    //     })
    //     .attr('r', (d) => scales.r(d.r))
    //     .style("fill", function (d) {
    //         if (d.booked) {
    //             return "#bbb";
    //         }
    //         return d.color;
    //     });
        

    // pointEnters.append("text")
    //     .attr("dy", d => scales.r(d.r) / 3)
    //     .attr("text-anchor", "middle")
    //     .attr("fill", "white")
    //     .attr("font-size", d => scales.r(d.r))
    //     .text(function (d) {
    //         return d.name || "";
    //     });

    // // update current seats
    // d3.selectAll("g.d3-point")
    //     .data(data)
    //     .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
    //     .on('click', function (d) {
    //         d3.event.stopPropagation();
    //         ns.onPointClick(d.index);
    //     }).call(drag);

    // const currentCircles = d3.selectAll('.d3-point');
    // currentCircles    
    //     .data(data)           
    //     .attr("class", d => d.active ? 'd3-point active' : 'd3-point');
    
    // const text = d3.selectAll("text");

    // text.data(data)
    //     .attr("font-size", d => scales.r(d.r))
    //     .text(function (d) {
    //         return d.name || "";
    //     });
    
    // const circles = d3.selectAll("circle");
    // circles
    //     .data(data)
    //     .attr('r', (d) => {
    //         return scales.r(d.r);
    //     })
    //     .style("fill", function (d) {
    //         if (d.booked) {
    //             return "#bbb";
    //         }
    //         return d.color;
    //     });


};

ns.destroy = function () {

};


export default ns;