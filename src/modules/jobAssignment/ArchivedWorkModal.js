/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';
import  CardWork from '../jobAssignment/CardWork';
import {STATUS_WORK} from "../../constants/constants";

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
        let {user,archivedWorks} = this.props;
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
                        <div  data-order="0" className="card card-container keetool-board" style={{width: "100%"}}>
                            <div className="board">
                                {
                                    archivedWorks.length <= 0 &&
                                    <h3 style={{textAlign: "center"}}>Chưa có công việc nào được lưu trữ.</h3>
                                }
                                {
                                    archivedWorks.map((work)=>{
                                        return (
                                            <CardWork
                                                key={work.id}
                                                work={work}
                                                status={STATUS_WORK[5].value}
                                                openInfoModal={()=>{return this.props.openInfoModal(work);}}
                                                user={user}
                                                unArchiveWork={this.props.unArchiveWork}
                                            />
                                        );
                                    })

                                }
                            </div>
                        </div>
                    }
                </Modal.Body>
            </Modal>

        );
    }
}

ArchivedWorkModal.propTypes = {
    isLoadingArchivedWork: PropTypes.bool.isRequired,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    openInfoModal: PropTypes.func,
    archivedWork: PropTypes.array,
    unArchiveWork: PropTypes.func,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading : state.jobAssignment.isLoading,
        isSaving : state.jobAssignment.isSaving,
        archivedWorks : state.jobAssignment.archivedWorks,
        isLoadingArchivedWork : state.jobAssignment.isLoadingArchivedWork,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedWorkModal);