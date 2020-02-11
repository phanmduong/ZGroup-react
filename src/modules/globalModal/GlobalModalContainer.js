import React from 'react';
import InfoStudentContainer from "../infoStudent/InfoStudentContainer";
import {Modal} from 'react-bootstrap';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as studentActions from "../infoStudent/studentActions";


class GlobalModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            registerDetail: {
                studentId: null,
                showModalRegisterDetail: false,
            }
        };

    }

    componentDidMount() {
        window.onpopstate = () => {
            let regexModalInfoStudent = /\/*sales\/info-student\/[0-9]+\/*\S*/;
            if(regexModalInfoStudent.test(window.location.pathname)){
                let studentId = window.location.pathname.match(/[0-9]+/)[0];
                this.setState({
                    registerDetail: {
                        studentId,
                        showModalRegisterDetail: true,
                    }
                });
            }

        };
    }

    closeModalRegisterDetail = () => {
        let {state} = window.history;
        this.setState({registerDetail: {showModalRegisterDetail: false}});
        this.props.studentActions.setInfoStudent({});
        history.pushState({}, "modal", state.prevUrl);

    };

    render() {
        let {registerDetail} = this.state;
        return (<div>
            <Modal show={registerDetail.showModalRegisterDetail}
                   dialogClassName="modal-xlg"
                   onHide={this.closeModalRegisterDetail}
                   bsSize="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin học viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InfoStudentContainer
                        studentId={registerDetail.studentId}/>
                </Modal.Body>
            </Modal>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalModalContainer);
