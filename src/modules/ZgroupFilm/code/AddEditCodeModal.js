import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import FormInputMoney from "../../../components/common/FormInputMoney";
import FormInputDate from "../../../components/common/FormInputDate";
import {bindActionCreators} from "redux";
import * as codeAction from "./codeAction";
import Loading from "../../../components/common/Loading";
import moment from "moment/moment";


class AddEditCodeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);

    }

    updateFormData(event) {
        const field = event.target.name;
        let code = {...this.props.handleCodeModal};
        code[field] = event.target.value;
        this.props.codeAction.handleCodeModal(code);
    }


    submit(code) {
        if (
            helper.isEmptyInput(code.description)
            || helper.isEmptyInput(code.number)
            || helper.isEmptyInput(code.start_date)
            || helper.isEmptyInput(code.end_date)
            || helper.isEmptyInput(code.value)
            || helper.isEmptyInput(code.length)
        ) {
            if (helper.isEmptyInput(code.description)) helper.showErrorNotification("Bạn cần miêu tả mã giảm giá");
            if (helper.isEmptyInput(code.number)) helper.showErrorNotification("Bạn cần nhập số lượng");
            if (helper.isEmptyInput(code.value)) helper.showErrorNotification("Bạn cần nhập giá trị");
            if (helper.isEmptyInput(code.start_date)) helper.showErrorNotification("Bạn cần nhập ngày áp dụng");
            if (helper.isEmptyInput(code.end_date)) helper.showErrorNotification("Bạn cần nhập ngày kết thúc");
            if (helper.isEmptyInput(code.length)) helper.showErrorNotification("Bạn cần nhập độ dài mã giảm giá");
        } else {
            //console.log("aaa", a);
            if (code.codes) this.props.codeAction.editCode(code);
            else this.props.codeAction.creatCode(code);


        }
    }

    render() {
        let code = this.props.handleCodeModal;
        return (
            <Modal
                show={this.props.addEditCodeModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                            this.props.codeAction.openModal();
                        });

                }}>
                <a onClick={() => {
                    this.props.codeAction.openModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý mã giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <FormInputText
                                    label="Ý nghĩa"
                                    name="description"
                                    updateFormData={this.updateFormData}
                                    value={code.description || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Số lượng (Bé hơn 100)"
                                    name="number"
                                    updateFormData={this.updateFormData}
                                    value={code.number || ''}
                                    type="number"
                                    required
                                    minValue="1"
                                    maxValue="100"
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Số ký tự (Nằm trong 4 -> 16)"
                                    name="length"
                                    updateFormData={this.updateFormData}
                                    value={code.length || ''}
                                    type="number"
                                    required
                                    minValue="4"
                                    maxValue="16"
                                />
                            </div>
                            <div>
                                <FormInputMoney
                                    type="number"
                                    label="Trị giá (VNĐ)"
                                    name="value"
                                    updateFormData={this.updateFormData}
                                    value={code.value}
                                    required
                                />
                            </div>
                            <FormInputDate
                                label="Ngày áp dụng"
                                name="start_date"
                                minDate={moment().add(1, 'days').format('YYYY-MM-DD')}
                                updateFormData={this.updateFormData}
                                value={"" || code.start_date}
                                id="form-start-day"
                                required
                            />
                            <FormInputDate
                                label="Ngày kết thúc"
                                name="end_date"
                                minDate={code.start_date}
                                updateFormData={this.updateFormData}
                                value={code.end_date || ""}
                                id="form-end-day"
                                required
                            />
                            <br/>
                            {
                                this.props.isAddEditCode ? <Loading/> :
                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => this.submit(code)}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    this.props.codeAction.openModal();
                                                }}
                                            >
                                                Huỷ
                                            </button>
                                        </div>


                                    </div>
                            }


                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddEditCodeModal.propTypes = {
    addEditCodeModal: PropTypes.bool.isRequired,
    isAddEditCode: PropTypes.bool.isRequired,
    codeAction: PropTypes.object.isRequired,
    handleCodeModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        addEditCodeModal: state.code.addEditCodeModal,
        handleCodeModal: state.code.handleCodeModal,
        isAddEditCode: state.code.isAddEditCode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCodeModal);
