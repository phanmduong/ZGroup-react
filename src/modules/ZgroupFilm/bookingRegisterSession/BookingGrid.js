import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import * as d3 from "d3";

//import * as helper from "../../../helpers/helper";


class BookingGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.creatBarChart = this.creatBarChart.bind(this);
    }

    componentDidMount() {
        this.creatBarChart();

    }

    componentDidUpdate() {
        this.creatBarChart();
    }

    creatBarChart() {
        const node = this.node;
        const node2 = this.node2;
        let data = this.props.seatForBooking;
        let ghedachon = [];
        const height = this.props.height;
        const width = this.props.width;
        let sum = 0;
        //console.log("size",height,width);
        let svg = d3
            .select(node)
            .append("svg")
            .attr("viewBox", "0 0 " + width + " " + height);
        let g = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
        g.append("circle").attr('r', function (d) {
            return 10 * d.r;
        });
        g.append("text").attr('fill', 'white').attr('text-anchor', 'middle').attr('alignment-baseline', 'central')
            .attr("font-size", "20px")
            .attr("font-family", "sans-serif").text(function (d) {
            return d.name;
        });

        function add(dataSet) {
            //let rightColum =
            d3.select(node2)
                .selectAll("span")
                .data(dataSet)
                .enter()
                .append("span")
                .text('')
                .text(function (d) {
                    return d.name + "         ";
                });

        }

        function render(dataset) {
            d3.select('svg').selectAll('g').data(dataset)
                .on('click', function (d) {

                    if (d.archived === 1) {
                        sum = sum - parseInt(d.price);
                        d.archived = 0;
                        ghedachon = ghedachon.filter((e) => e !== d);
                        d3.selectAll(".total-pay")
                            .text(
                                sum/1000+".000 VNĐ"
                            );
                        add(ghedachon);
                        render(data);
                    } else {
                        d.archived = 1;
                        sum = sum + parseInt(d.price);
                        ghedachon = [...ghedachon, d];
                        d3.selectAll(".total-pay")
                            .text(
                                (sum)/1000+".000 VNĐ"
                            );
                        add(ghedachon);
                        render(data);
                    }

                })
                .select("circle").style('fill', function (d) {
                return d.archived !== 1 ? d.color : "gray";

            });

        }

        render(data);
        add(ghedachon);

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-screen.png"/><br/><br/>
                    <div ref={node => this.node = node}/>
                    <div style={{textAlign: "right"}}>
                        <div>
                            <button
                                type="button"
                                className="btn btn-rose"
                                onClick={() => {
                                    this.props.filmAction.toggleBookingModal();
                                }}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <h1>Các ghế đã đặt</h1>
                    <div ref={node2 => this.node2 = node2}/>
                    <h2>
                        Giá vé
                        <p className="total-pay"/>
                    </h2>
                </div>

            </div>


        );
    }
}

BookingGrid.propTypes = {
    room_id: PropTypes.number.isRequired,
    filmAction: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    seatForBooking: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        rooms: state.film.rooms,
        seatForBooking: state.film.seatForBooking,
        width: state.film.width,
        height: state.film.height,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingGrid);