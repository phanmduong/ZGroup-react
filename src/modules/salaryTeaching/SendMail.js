import React from "react";
import {observer} from "mobx-react";
import {Modal} from "react-bootstrap";
import Checkbox from "../../components/common/Checkbox";
import {getValueFromKey} from "../../helpers/entity/object";

@observer
class SendMail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = this.props.store;
        this.state = {
            data: this.store.getData.map((data) => {
                return {...data, isSendMail: true};
            }),
            checkboxAll: true
        };
    }

    onChangeCheckBox = (teaching_salary_id) => {
        let data = this.state.data.map((item) => {
            if (item.teaching_salary_id == teaching_salary_id) {
                return {
                    ...item,
                    isSendMail: !item.isSendMail
                };
            }
            return {
                ...item
            };
        });
        this.setState({data});
    }

    sendingEmail = () => {
        let salaryIds = this.state.data.filter((item) => item.isSendMail).map((item) => item.teaching_salary_id);
        this.store.sendingEmail(salaryIds);
    };

    checkboxAll = () => {
        let data = this.state.data.map((item) => {
            return {
                ...item,
                isSendMail: !this.state.checkboxAll
            };
        });
        this.setState({data, checkboxAll: !this.state.checkboxAll});
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
                    {this.state.data && this.state.data.map((data) => {
                        return (
                            <Checkbox label={data.user.name + ' (' + getValueFromKey(data.user, "province.name") + ') '}
                                      checked={data.isSendMail} checkBoxLeft

                                      onChange={() => this.onChangeCheckBox(data.teaching_salary_id)}/>
                        );
                    })}
                    <div
                        className={"btn btn-success btn-round " + (this.store.isSendingEmail ? "disabled" : "")}
                        style={{width: '100%'}}
                        onClick={
                            this.sendingEmail}
                    >
                        Gửi mail
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SendMail;



