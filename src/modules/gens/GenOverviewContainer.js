import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import {saveContentToFile} from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";

// import {GENDER} from "../../constants/constants";
// import BubbleChart from "./Bubble";


class GenOverviewContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

    }


    handleClose = () => {
        this.props.toggleOverviewModal(false);
    };


    sortObj(input) {
        let arr = [];
        for (let obj in input) {
            arr.push([obj, input[obj]]);
        }
        arr.sort((a, b) => {
            return -a[1] + b[1];
        });

        return arr;
    }

    getGenderOverview = (genders) => {
        let labels = Object.keys(genders);
        let tmp = {...genders};
        genders = {"Không có thông tin": 0};
        labels.forEach((obj) => {
            if (obj.length == 0) {
                genders["Không có thông tin"] += tmp[obj];
            } else {
                genders = {...genders, [obj]: tmp[obj]};
            }
        });

        labels = Object.keys(genders);
        let data = labels.map((obj) => {
            return genders[obj];
        });
        labels = labels.map((obj) => {

            switch (obj) {
                case "0":
                    return "Khác";
                case "1":
                    return "Nam";
                case "2":
                    return "Nữ";
                default:
                    return "Không có thông tin";
            }
        });
        return (
            <div className="margin-vertical-30">
                <h5 className="bold">Giới tính</h5>
                <PieChart
                    label={labels}
                    data={data}
                    id={"gender_student"}
                />
            </div>
        );
    };

    getBarchatOverview = (inp, id, text) => {
        inp = this.sortObj(inp);
        let labels = [];
        let data = [];
        inp.forEach((obj) => {
            let key = obj[0];
            let val = obj[1];
            if (key.length > 3) {
                labels.push(key + " (" + val + ")");
                data.push(val);
            }
        });
        return (
            <div className="margin-vertical-30">
                <h5 className="bold">{text}</h5>
                <BarChart
                    label={labels}
                    data={[data]}
                    id={"barchart_" + id}
                />
            </div>
        );
    };
    getRatingOverview = (inp, id, text) => {
        if (!inp || inp.length == 0) return (
            <div className="margin-vertical-30">
                <h5 className="bold">{text}</h5>
                <div>Không có dữ liệu</div>
            </div>
        );
        inp.sort((a, b) => {
            return (b.tc - a.tc) || (b.ta - a.ta);
        });
        let labels = [];
        let ta = [];
        let tc = [];
        inp.forEach((obj) => {
            let key = obj.name;
            let val_ta = obj.ta;
            let val_tc = obj.tc;
            if (key.length > 3) {
                labels.push(key);
                ta.push(val_ta);
                tc.push(val_tc);
            }
        });
        return (
            <div className="margin-vertical-30">
                <h5 className="bold">{text}</h5>
                <BarChart
                    label={labels}
                    data={[tc, ta]}
                    id={"barchart_" + id}
                />
            </div>
        );
    };

    saveChart = (id) => {
        let svg = document.getElementById(id).children[0].outerHTML;
        saveContentToFile(svg, 'chart.svg');
    };

    getBubbleChart = (inp, id, text) => {

        inp = this.sortObj(inp);
        let data = [];
        inp.forEach((obj) => {
            let key = obj[0];
            let val = obj[1];

            if (key.length > 3) {
                data.push({
                    Name: key,
                    Count: val
                });
            }
        });

        let chart_id = "bubble_chart_" + id;

        return (
            <div className="margin-vertical-30">
                <div className="flex flex-align-items-center">
                    <h5 className="bold">{text}</h5>
                    <TooltipButton text="Lưu " placement="top">
                        <button onClick={() => this.saveChart(chart_id)}
                                className="btn btn-rose btn-round btn-xs button-add none-margin" type="button"
                                data-toggle="dropdown">
                            <i className="material-icons"
                               style={{width: 14, marginLeft: -4, paddingTop: 2,}}
                            >file_download</i>
                        </button>
                    </TooltipButton>
                </div>
                <BubbleChart
                    data={data}
                    id={chart_id}
                    width={852}
                    height={500}
                />
            </div>
        );

    };

    render() {

        let {years, universities, addresses, genders, courses, rating} = this.props.overview;

        return (
            <Modal show={this.props.showModalOverview} onHide={this.handleClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title><h4 className="bold">{this.props.gen.description || "Overview"}</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {
                        this.props.isLoadingOverview ? <Loading/> : (
                            <div>
                                {this.getGenderOverview(genders)}
                                {this.getBarchatOverview(years, 1, "Năm sinh")}
                                {this.getBubbleChart(universities, 2, "Trường đại học")}
                                {this.getBubbleChart(addresses, 3, "Quận")}
                                {this.getBarchatOverview(courses, 4, "Môn học")}
                                {this.getRatingOverview(rating, 5, "Đánh giá")}

                            </div>
                        )
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

GenOverviewContainer.propTypes = {
    showModalOverview: PropTypes.bool.isRequired,
    gen: PropTypes.object.isRequired
};

export default GenOverviewContainer;