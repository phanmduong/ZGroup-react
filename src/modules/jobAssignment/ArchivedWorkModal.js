/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';

class ArchivedWorkModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps() {

    }


    render() {

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Công việc đã lưu trữ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isLoadingArchivedWork ? <Loading/> :
                        this.props.archivedWorks.map(()=>{

                        })
                    }</Modal.Body>
            </Modal>

        );
    }
}

ArchivedWorkModal.propTypes = {
    isLoadingArchivedWork: PropTypes.bool.isRequired,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    archivedWork: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isSaving : state.jobAssignment.isSaving,
        archivedWorks : state.jobAssignment.archivedWorks,
        isLoadingArchivedWork : state.jobAssignment.isLoadingArchivedWork,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedWorkModal);