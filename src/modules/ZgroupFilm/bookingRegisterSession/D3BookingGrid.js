import * as d3 from "d3";


const D3BookingGrid= {};
D3BookingGrid.create = (el,data) => {
    // D3 Code to create the chart
    let width = 1200;
    let height = 800;
    let svg = d3
        .select(".svg-container")
        .append("svg")
        .attr("viewBox","0 0 "+width+" "+height);
    let g = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
    g.append("circle").attr('r',function (d) {return 10*d.r} );
    g.append("text").attr('fill', 'white').attr('text-anchor','middle' ).attr('alignment-baseline','central' )
        .attr("font-size", "20px")
        .attr("font-family", "sans-serif").text(function(d){return d.name;});
    function render(dataset) {
        d3.select('svg').selectAll('g').data(dataset).on('click',function(d){if(d.archived === 1){d.archived =0; render(data)} else {d.archived=1; render(data)}}).select("circle").style('fill', function (d){return d.archived == 0 ? d.color : "gray" })
    }
    render(data);

};
 // D3BookingGrid.update = (el, data, chart) => {
 //     // D3 Code to update the chart
 // };
D3BookingGrid.destroy = () => {
    // Cleaning code here
};
export default D3BookingGrid;