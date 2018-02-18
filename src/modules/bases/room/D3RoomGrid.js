import * as d3 from "d3";

let ns = {};

ns.setOnClick = onClick => {
    ns.onClick = onClick;
};

ns.setOnPointClick = onPointClick => {
    ns.onPointClick = onPointClick;
};

ns.setOnDrag = onDrag => {
    ns.onDrag = onDrag;
};

ns.create = function(el, props, state) {
    ns.el = el;

    d3
        .select(el)
        .append("div")
        .classed("svg-container", true) //container class to make it responsive
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${props.width} ${props.height}`)
        //class to make it responsive
        .classed("svg-content-responsive d3", true);
    d3.select(".svg-content-responsive").on("click", function() {
        const mouse = d3.mouse(this);
        const x = mouse[0];
        const y = mouse[1];

        const scale = ns._scales(el, state.domain);
        const rescaledX = scale.x.invert(x);
        const rescaledY = scale.y.invert(y);

        const point = {
            x: rescaledX,
            y: rescaledY,
        };

        if (ns.onClick) {
            ns.onClick(point);
        }
    });

    this.update(el, state);
};

ns.update = function(el, state) {
    let scales = this._scales(state);
    this._drawPoints(el, scales, state);
    ns.drawGrid(state);
    // this._drawTooltips(el, scales, state.tooltips, prevScales);
};

ns.drawGrid = ({ width, height, gridSize, gridOn }) => {
    d3
        .select("svg")
        .selectAll("path")
        .remove();

    if (gridOn) {
        const widthArray = generateArray(width, gridSize);
        const heightArray = generateArray(height, gridSize);

        const topPoints = widthArray.map(w => {
            return {
                x: w,
                y: 0,
            };
        });
        const bottomPoints = widthArray.map(w => {
            return {
                x: w,
                y: height,
            };
        });

        const verticalLines = topPoints.map((point, index) => {
            return [point, bottomPoints[index]];
        });

        const leftPoints = heightArray.map(h => {
            return {
                x: 0,
                y: h,
            };
        });
        const rightPoints = heightArray.map(h => {
            return {
                x: width,
                y: h,
            };
        });

        const horizontalLines = leftPoints.map((point, index) => {
            return [point, rightPoints[index]];
        });

        const lineFunction = d3
            .line()
            .x(function(d) {
                return d.x;
            })
            .y(function(d) {
                return d.y;
            });

        d3
            .select("svg")
            .selectAll("path")
            .data([...horizontalLines, ...verticalLines])
            .enter()
            .append("path")
            .attr("d", lineFunction)
            .attr("stroke", "rgba(0, 0, 0, 0.25)")
            .attr("stroke-width", 1)
            .attr("fill", "none");
    }
};

ns._scales = function({ width }) {
    // const el = $(".d3");
    // let width = el.width();
    // let height = el.height();

    // console.log(`${width}, ${height}`);

    // let x = d3.scaleLinear()
    //     .range([0, width])
    //     .domain([0, state.width]);
    //
    // let y = d3.scaleLinear()
    //     .range([0, height])
    //     .domain([0, state.height]);
    //
    const r = d3
        .scaleLinear()
        .range([10, width / 18])
        .domain([1, 10]);

    const x = x => x;
    x.invert = x;
    return { x, y: x, r };
};

const generateArray = (size, gridSize) => {
    let arr = [];
    for (let i = 0; i < size; i += gridSize) {
        arr.push(i);
    }
    return arr;
};

ns._drawPoints = function(el, scales, state) {
    const { seats, width, height, roomLayoutUrl } = state;

    const subject = function() {
        return { x: d3.event.x, y: d3.event.y };
    };

    d3
        .select(".svg-container")
        .style("padding-bottom", height * 100 / width + "%");

    if (ns.roomLayoutUrl !== roomLayoutUrl) {
        ns.roomLayoutUrl = roomLayoutUrl;
        d3
            .select("svg")
            .style("background-image", `url("${roomLayoutUrl}")`)
            .style("background-size", "cover")
            .style("background-position", "center");
    }

    if (ns.width !== width || ns.height !== height) {
        ns.width = width;
        ns.height = height;
        d3.select("svg").attr("viewBox", `0 0 ${width} ${height}`);
    }

    let drag = d3
        .drag()
        .subject(subject)
        .on("start", function() {
            d3.event.sourceEvent.stopPropagation(); // silence other listeners
        })
        .on("drag", function(d) {
            // console.log(d3.event.x + "," + d3.event.y);

            const x = d3.event.x;
            const y = d3.event.y;

            if (Math.sqrt(Math.pow(x - d.x, 2) + Math.pow(y - d.y, 2)) > 1) {
                ns.onDrag({
                    index: d.index,
                    x,
                    y,
                });
            }
        })
        .on("end", function() {});

    const svg = d3.select("svg");
    let g = svg
        .selectAll("g")
        .data(seats)
        .enter()
        .append("g")
        .attr("class", "seat-wrapper")
        .call(drag);

    g.append("circle").attr("class", "d3-point");

    g.append("text").attr("class", "d3-text");

    svg
        .selectAll("g")
        .data(seats)
        .exit()
        .remove();

    g = d3
        .selectAll("g")
        .data(seats)
        .on("click", function(d) {
            // d3.event.stopPropagation();
            // console.log(d);
            ns.onPointClick(d.index);
        });

    g.attr("transform", d => "translate(" + d.x + "," + d.y + ")");

    const transformTrasition = d3
        .transition()
        .duration(200)
        .ease(d3.easeLinear);

    svg
        .selectAll(".d3-point")
        .data(seats)
        .transition(transformTrasition)
        .attr("r", d => scales.r(d.r))
        .attr("class", d => {
            if (d.archived) {
                return "d3-point archived";
            }
            if (d.active) {
                return "d3-point active";
            }
            return "d3-point";
        })
        .style("fill", function(d) {
            if (d.booked) {
                return "#bbb";
            }
            return d.color;
        });

    svg
        .selectAll(".d3-text")
        .data(seats)
        .transition(transformTrasition)
        .attr("dy", d => scales.r(d.r) / 3)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", d => scales.r(d.r))
        .attr("class", d => {
            return d.active ? "d3-text active" : "d3-text";
        })
        .text(function(d) {
            return d.name || "";
        });
};

ns.destroy = function() {};

export default ns;
