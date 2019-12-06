import React from 'react';
import InfoStudentContainer from "../infoStudent/InfoStudentContainer";
import {Modal} from 'react-bootstrap';



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


export default (GlobalModalContainer);
