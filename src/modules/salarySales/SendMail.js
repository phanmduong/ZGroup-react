import React from "react";
import {observer} from "mobx-react";
import {Modal} from "react-bootstrap";
import Checkbox from "../../components/common/Checkbox";

@observer
class SendMail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = this.props.store;
        this.state = {
            checkboxAll: true
        };
    }

    checkboxAll = () => {
        this.store.data = this.store.data.map((item) => {
            return {
                ...item,
                isSendMail: !this.state.checkboxAll
            };
        });
        this.setState({checkboxAll: !this.state.checkboxAll});
    }

    render() {

        return (
            <Modal
                show={this.store.openModalSendMail}
                onHide={() => this.store.openModalSendMail = false}
            >
                <Modal.Header closeButton={true}>
                    <h4 className="modal-title">Gửi mail lương</h4>
                </Modal.Header>
                < Modal.Body>
                    <Checkbox label={"Tất cả"} checked={this.state.checkboxAll} checkBoxLeft
                              onChange={this.checkboxAll}/>
                    {this.store.data && this.store.data.map((data) => {
                        return (
                            <Checkbox label={data.user.name} checked={data.isSendMail} checkBoxLeft onChange={() => {
                                data.isSendMail = !data.isSendMail
                            }}/>
                        );
                    })}
                    <div
                        className={"btn btn-success btn-round " + (this.store.isSendingEmail ? "disabled" : "")}
                        style={{width: '100%'}}
                        onClick={() => {
                            this.store.sendingEmail();
                        }}
                    >
                        Gửi mail
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default SendMail;