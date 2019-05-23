import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import {toggleOverviewModal} from './surveyActions';
import {loadSurveyOverview} from "./surveyApi";
import Loading from "../../components/common/Loading";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

class SurveyOverviewContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            result: [],
            answers: [],
            isLoading: false,
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.showOverviewModal || !this.props.showOverviewModal)
            && (nextProps.survey.id !== this.props.survey.id)) {
            this.loadData(nextProps);
        }
    }

    handleClose() {
        this.props.actions.toggleOverviewModal(false);
    }

    async loadData(nextProps = null) {
        this.setState({
            isLoading: true
        });
        let res = null;
        if (nextProps && nextProps.survey && nextProps.survey.id) res = await loadSurveyOverview(nextProps.survey.id);

        let result = [];
        let answers = [];
        if (res && res.data) {
            result = res.data.data.result;
            answers = res.data.data.user_answers;
        }
        this.setState({
            result, answers,
            isLoading: false
        });
    }

    getBarChart = (question, key) => {

        let count_arr = [];
        let ans_arr = question.answers.map((ans) => {
            count_arr.push(0);
            return ans.content;
        });

        this.state.answers.forEach((obj) => {
            ans_arr.forEach((ans, i) => {
                if ($.isArray(obj[key])) {
                    obj[key].forEach((sub) => {
                        if (sub === ans) {
                            count_arr[i]++;
                        }
                    });
                } else if (ans === obj[key]) {
                    count_arr[i]++;
                }
            });

        });
        return (
            <div key={key} className="margin-vertical-30">
                <h5 className="bold">{question.content}</h5>
                <BarChart
                    label={ans_arr}
                    data={[count_arr]}
                    id={"barchart_ans_" + question.id}
                />
            </div>);

    };


    getPieChart = (question, key) => {

        let count_arr = [];
        let ans_arr = question.answers.map((ans) => {
            count_arr.push(0);
            return ans.content;
        });

        this.state.answers.forEach((obj) => {
            ans_arr.forEach((ans, i) => {


                if ($.isArray(obj[key])) {
                    obj[key].forEach((sub) => {
                        if (sub === ans) {
                            count_arr[i]++;
                        }
                    });
                } else if (ans === obj[key]) {
                    count_arr[i]++;
                }
            });

        });

        return <div key={key} className="margin-vertical-30">
            <h5 className="bold">{question.content}</h5>
            <PieChart

                label={ans_arr}
                data={count_arr}
                id={"piechart_ans_" + question.id}
            />
        </div>;

    };

    getTableAnswers(question, key) {
        return (
            <div key={key} className="margin-vertical-30">
                <h5 className="bold">{question.content}</h5>
                <div className="table-responsive" style={{overflowY: "scroll", height: 500}}>

                    <table id="datatables"
                           className="table table-striped table-no-bordered table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th>Câu trả lời</th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.state.answers.map((ans, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{ans[key]}</td>
                                </tr>
                            );

                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        console.log(this.state);

        return (
            <Modal show={this.props.showOverviewModal} onHide={this.handleClose} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title><h4 className="bold">{this.props.survey.name}</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.isLoading ? <Loading/> : (
                            <div>{this.state.result.length > 0 && this.state.result.map((question, key) => {
                                switch (question.type) {
                                    case 0:
                                        return this.getTableAnswers(question, key);
                                    case 1:
                                        return this.getPieChart(question, key);
                                    case 2:
                                        return this.getBarChart(question, key);
                                    default:
                                        return <div key={key}>{question.content}</div>;
                                }
                            })}</div>
                        )
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

SurveyOverviewContainer.propTypes = {
    showOverviewModal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showOverviewModal: state.survey.showOverviewModal,
        survey: state.survey.survey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({toggleOverviewModal}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyOverviewContainer);