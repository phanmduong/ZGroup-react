import React from 'react';
import InfoStudentContainer from "../infoStudent/InfoStudentContainer";
import {Modal} from 'react-bootstrap';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as studentActions from "../infoStudent/studentActions";
import ProfileEmployee from "../manageStaff/profile/ProfileEmployee";


class GlobalModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            registerDetail: {
                studentId: null,
                showModalRegisterDetail: false,
            },
            staffDetail: {
                staffId: null,
                showModalStaffDetail: false,
            }
        };

    }

    componentDidMount() {
        window.onpopstate = () => {
            let regexModalInfoStudent = /\/*sales\/info-student\/[0-9]+\/*\S*/;
            if (regexModalInfoStudent.test(window.location.pathname)) {
                let studentId = window.location.pathname.match(/[0-9]+/)[0];
                this.setState({
                    registerDetail: {
                        studentId,
                        showModalRegisterDetail: true,
                    }
                });
            }
            let regexModalStaffStudent = /\/*hr\/staff\/[0-9]+\/*\S*/;

            if (regexModalStaffStudent.test(window.location.pathname)) {
                console.log(window.location.pathname);
                let staffId = window.location.pathname.match(/[0-9]+/)[0];
                this.setState({
                    staffDetail: {
                        staffId,
                        showModalStaffDetail: true,
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

    closeModalStaffDetail = () => {
        let {state} = window.history;
        this.setState({staffDetail: {showModalStaffDetail: false}});
        history.pushState({}, "modal", state.prevUrl);

    };

    render() {
        let {registerDetail, staffDetail} = this.state;
        return (<div>
            <Modal show={registerDetail.showModalRegisterDetail}
                   dialogClassName="modal-xlg"
                   onHide={this.closeModalRegisterDetail}
                   bsSize="lg"
            >
                <Modal.Header closeButton>
                    {/*<Modal.Title>Thông tin học viên</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    {
                        registerDetail.showModalRegisterDetail && <InfoStudentContainer
                            studentId={registerDetail.studentId}/>
                    }
                </Modal.Body>
            </Modal>
            <Modal show={staffDetail.showModalStaffDetail}
                   dialogClassName="modal-xlg"
                   onHide={this.closeModalStaffDetail}
                   bsSize="lg"
            >
                <Modal.Header closeButton>
                    {/*<Modal.Title>Thông tin học viên</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    {
                        staffDetail.showModalStaffDetail &&
                        <ProfileEmployee
                            staffId={staffDetail.staffId}
                        />
                    }
                    {/*<InfoStudentContainer*/}
                    {/*    studentId={registerDetail.studentId}/>*/}
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
