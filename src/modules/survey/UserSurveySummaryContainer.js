import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal, ProgressBar} from "react-bootstrap";
import {toggleSummaryModal} from './surveyActions';
import {loadSurveySummaryResult} from "./surveyApi";
import Avatar from "../../components/common/Avatar";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";

class UserSurveySummaryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            summary: [],
            isLoading: false,
            maxNum: 0,
            paginator: {
                current_page: 1,
                total_pages: 1
            }
        };
        this.loadData = this.loadData.bind(this);
    }

    handleClose() {
        this.props.actions.toggleSummaryModal(false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showSummaryModal || !this.props.showSummaryModal) {
            this.loadData(1, nextProps);
        }
    }

    async loadData(page = 1, nextProps = null) {
        this.setState({
            isLoading: true,
            paginator: {
                ...this.state.paginator,
                current_page: page
            }
        });
        let res = null;
        if (nextProps)
            res = await loadSurveySummaryResult(nextProps.survey.id);
        else
            res = await loadSurveySummaryResult(this.props.survey.id, page);
        const {summary, paginator, max_num} = res.data;
        this.setState({
            summary,
            paginator,
            isLoading: false,
            maxNum: max_num
        });
    }

    render() {

        return (
            <Modal show={this.props.showSummaryModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.survey.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.isLoading ? <Loading/> : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-primary">
                                    <tr className="text-rose">
                                        <th>Tên nhân viên</th>
                                        <th>Số lần thực hiện</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.summary && this.state.summary.map((staff, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Avatar
                                                        style={{display: "inline-block"}}
                                                        url={staff.avatar_url}
                                                        size={20}/>
                                                    <div style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                        top: -4
                                                    }}>
                                                        {staff.name}
                                                    </div>
                                                </td>
                                                <td>

                                                    {staff.num} / {this.state.maxNum}
                                                    <ProgressBar
                                                        bsStyle="success"
                                                        now={staff.num * 100 / this.state.maxNum}/>
                                                </td>

                                            </tr>
                                        ))

                                    }

                                    </tbody>
                                </table>
                                <Pagination currentPage={this.state.paginator.current_page || 0}
                                            totalPages={this.state.paginator.total_pages || 0}
                                            loadDataPage={this.loadData}/>
                            </div>
                        )
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

UserSurveySummaryContainer.propTypes = {
    showSummaryModal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showSummaryModal: state.survey.showSummaryModal,
        survey: state.survey.survey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({toggleSummaryModal}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSurveySummaryContainer);