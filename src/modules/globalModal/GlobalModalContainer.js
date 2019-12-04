import React from 'react';
import InfoStudentContainer from "../infoStudent/InfoStudentContainer";
import {Modal} from 'react-bootstrap';
import {OPEN_MODAL_REGISTER_DETAIL} from '../../constants/actionTypes';


class GlobalModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            registerDetail:{
                studentId: null,
                showModalRegisterDetail: false,
            }
        };

    }

    componentDidMount() {
        window.onpopstate = () => {
            let {state} = window.history;
            switch (state.type) {
                case OPEN_MODAL_REGISTER_DETAIL:{
                    this.setState({
                        registerDetail:{
                            studentId: state.studentId,
                            showModalRegisterDetail: true,
                        }
                    });
                    break;
                }
            }
        };
    }

    render(){
        let {registerDetail} = this.state;
        return(<div>
            <Modal show={registerDetail.showModalRegisterDetail}
                   dialogClassName="modal-xlg"
                   onHide={()=>this.setState({registerDetail:{showModalRegisterDetail: false}})}
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
