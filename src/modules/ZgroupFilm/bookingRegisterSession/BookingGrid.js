import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import * as d3 from "d3";

class BookingGrid extends React.Component {
    constructor(props,context){
        super(props,context);
        this.creatBarChart = this.creatBarChart.bind(this);
    }
    componentWillMount() {
        this.creatBarChart();
        this.props.filmAction.loadAllRooms();
    }
    componentDidUpdate() {
        this.creatBarChart();
    }
    creatBarChart(){
        const node = this.node;
        let data = [
            {
                "id": 42,
                "name": "A1",
                "room_id": 17,
                "type": null,
                "x": 62.0425,
                "y": 61.2572,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-16 11:19:20",
                "archived": 0
            },
            {
                "id": 43,
                "name": "A2",
                "room_id": 17,
                "type": null,
                "x": 180.63,
                "y": 59.6865,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 44,
                "name": "A3",
                "room_id": 17,
                "type": null,
                "x": 301.574,
                "y": 61.2572,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 45,
                "name": "A4",
                "room_id": 17,
                "type": null,
                "x": 420.947,
                "y": 60.4718,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 46,
                "name": "A5",
                "room_id": 17,
                "type": null,
                "x": 540.32,
                "y": 60.4718,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 47,
                "name": "A6",
                "room_id": 17,
                "type": null,
                "x": 661.263,
                "y": 62.0425,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 48,
                "name": "A7",
                "room_id": 17,
                "type": null,
                "x": 779.851,
                "y": 58.9011,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 49,
                "name": "A8",
                "room_id": 17,
                "type": null,
                "x": 900.795,
                "y": 61.2572,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 50,
                "name": "A9",
                "room_id": 17,
                "type": null,
                "x": 1023.31,
                "y": 62.0425,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 51,
                "name": "A10",
                "room_id": 17,
                "type": null,
                "x": 1140.33,
                "y": 59.6865,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 52,
                "name": "B1",
                "room_id": 17,
                "type": null,
                "x": 60.4718,
                "y": 148.431,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 53,
                "name": "B2",
                "room_id": 17,
                "type": null,
                "x": 182.201,
                "y": 150.002,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 54,
                "name": "B3",
                "room_id": 17,
                "type": null,
                "x": 300.788,
                "y": 150.787,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 55,
                "name": "B4",
                "room_id": 17,
                "type": null,
                "x": 420.947,
                "y": 152.358,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 56,
                "name": "B5",
                "room_id": 17,
                "type": null,
                "x": 539.534,
                "y": 150.002,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 57,
                "name": "B6",
                "room_id": 17,
                "type": null,
                "x": 658.907,
                "y": 149.216,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 58,
                "name": "B7",
                "room_id": 17,
                "type": null,
                "x": 779.851,
                "y": 150.002,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 59,
                "name": "B8",
                "room_id": 17,
                "type": null,
                "x": 900.009,
                "y": 151.572,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 60,
                "name": "B9",
                "room_id": 17,
                "type": null,
                "x": 1020.17,
                "y": 150.002,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 61,
                "name": "B10",
                "room_id": 17,
                "type": null,
                "x": 1140.33,
                "y": 150.002,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 62,
                "name": "21",
                "room_id": 17,
                "type": null,
                "x": 60.4718,
                "y": 238.746,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 63,
                "name": "22",
                "room_id": 17,
                "type": null,
                "x": 179.845,
                "y": 238.746,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 64,
                "name": "23",
                "room_id": 17,
                "type": null,
                "x": 300.788,
                "y": 238.746,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 65,
                "name": "24",
                "room_id": 17,
                "type": null,
                "x": 420.161,
                "y": 239.531,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 66,
                "name": "25",
                "room_id": 17,
                "type": null,
                "x": 541.89,
                "y": 239.531,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 67,
                "name": "26",
                "room_id": 17,
                "type": null,
                "x": 662.049,
                "y": 240.317,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 68,
                "name": "27",
                "room_id": 17,
                "type": null,
                "x": 781.422,
                "y": 240.317,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 69,
                "name": "28",
                "room_id": 17,
                "type": null,
                "x": 900.795,
                "y": 238.746,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 70,
                "name": "29",
                "room_id": 17,
                "type": null,
                "x": 1022.52,
                "y": 240.317,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 71,
                "name": "30",
                "room_id": 17,
                "type": null,
                "x": 1141.11,
                "y": 238.746,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 72,
                "name": "31",
                "room_id": 17,
                "type": null,
                "x": 60.4718,
                "y": 330.632,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 73,
                "name": "32",
                "room_id": 17,
                "type": null,
                "x": 180.63,
                "y": 329.846,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 74,
                "name": "33",
                "room_id": 17,
                "type": null,
                "x": 302.359,
                "y": 331.417,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 75,
                "name": "34",
                "room_id": 17,
                "type": null,
                "x": 421.732,
                "y": 329.061,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 76,
                "name": "35",
                "room_id": 17,
                "type": null,
                "x": 541.105,
                "y": 328.276,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 77,
                "name": "36",
                "room_id": 17,
                "type": null,
                "x": 660.478,
                "y": 329.846,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 78,
                "name": "37",
                "room_id": 17,
                "type": null,
                "x": 780.636,
                "y": 330.632,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 79,
                "name": "38",
                "room_id": 17,
                "type": null,
                "x": 900.009,
                "y": 332.202,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 80,
                "name": "39",
                "room_id": 17,
                "type": null,
                "x": 1019.38,
                "y": 329.061,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 81,
                "name": "40",
                "room_id": 17,
                "type": null,
                "x": 1140.33,
                "y": 329.846,
                "r": 2,
                "color": "rgb(244, 67, 54)",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 82,
                "name": "41",
                "room_id": 17,
                "type": null,
                "x": 61.2572,
                "y": 420.947,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 83,
                "name": "42",
                "room_id": 17,
                "type": null,
                "x": 180.63,
                "y": 419.376,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 84,
                "name": "43",
                "room_id": 17,
                "type": null,
                "x": 300.003,
                "y": 420.947,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 85,
                "name": "44",
                "room_id": 17,
                "type": null,
                "x": 420.947,
                "y": 420.947,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 86,
                "name": "45",
                "room_id": 17,
                "type": null,
                "x": 541.105,
                "y": 420.947,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 87,
                "name": "46",
                "room_id": 17,
                "type": null,
                "x": 660.478,
                "y": 419.376,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 88,
                "name": "47",
                "room_id": 17,
                "type": null,
                "x": 780.636,
                "y": 420.947,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 89,
                "name": "48",
                "room_id": 17,
                "type": null,
                "x": 902.365,
                "y": 419.376,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 90,
                "name": "49",
                "room_id": 17,
                "type": null,
                "x": 1020.95,
                "y": 419.376,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 91,
                "name": "50",
                "room_id": 17,
                "type": null,
                "x": 1139.54,
                "y": 419.376,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-14 16:04:13",
                "archived": 0
            },
            {
                "id": 92,
                "name": "G1",
                "room_id": 17,
                "type": null,
                "x": 61.2572,
                "y": 511.262,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 93,
                "name": "G2",
                "room_id": 17,
                "type": null,
                "x": 179.845,
                "y": 508.12,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 94,
                "name": "G3",
                "room_id": 17,
                "type": null,
                "x": 300.788,
                "y": 511.262,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 95,
                "name": "G4",
                "room_id": 17,
                "type": null,
                "x": 422.517,
                "y": 508.906,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 96,
                "name": "G5",
                "room_id": 17,
                "type": null,
                "x": 540.32,
                "y": 510.476,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 97,
                "name": "G6",
                "room_id": 17,
                "type": null,
                "x": 659.693,
                "y": 511.262,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 98,
                "name": "G7",
                "room_id": 17,
                "type": null,
                "x": 779.066,
                "y": 509.691,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 99,
                "name": "G8",
                "room_id": 17,
                "type": null,
                "x": 900.795,
                "y": 509.691,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 100,
                "name": "G9",
                "room_id": 17,
                "type": null,
                "x": 1020.95,
                "y": 511.262,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:37:17",
                "archived": 0
            },
            {
                "id": 101,
                "name": "G10",
                "room_id": 17,
                "type": null,
                "x": 1140.33,
                "y": 510.476,
                "r": 2,
                "color": "#9c27b0",
                "created_at": "2018-05-14 16:04:13",
                "updated_at": "2018-05-15 16:38:22",
                "archived": 0
            }
        ];
        const height = 536;
        const width = 1200;
        let svg = d3
            .select(node)
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


    }
    render() {
        return (
           <div>
               <div ref={node => this.node = node}/>
               <div style={{textAlign: "right"}}>
                   <div>
                       <button
                           type="button"
                           className="btn btn-rose"
                           onClick={()=>{
                               this.props.filmAction.toggleBookingModal();
                           }}
                       >
                           Xác nhận
                       </button>
                   </div>
               </div>
           </div>


        );
    }
}

BookingGrid.propTypes = {
    room_id: PropTypes.number.isRequired,
    filmAction: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        rooms: state.film.rooms
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingGrid);