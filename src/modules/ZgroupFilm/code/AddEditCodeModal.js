import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import FormInputDate from "../../../components/common/FormInputDate";
import {bindActionCreators} from "redux";
import * as codeAction from "./codeAction";
import Loading from "../../../components/common/Loading";


class AddEditCodeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);

    }
    updateFormData(event) {
        const field = event.target.name;
        let code = {...this.props.handleCodeModal};
        code[field] = event.target.value;
        this.props.codeAction.handleCodeModal(code);
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
                                    label="Số lượng"
                                    name="number"
                                    updateFormData={this.updateFormData}
                                    value={code.number||''}
                                    type="number"
                                    required
                                    minValue={1}
                                    maxValue = "20"
                                />
                            </div>
                            <div>
                                <FormInputText
                                    type="number"
                                    label="Trị giá"
                                    name="value"
                                    updateFormData={this.updateFormData}
                                    value={code.value||''}
                                    required
                                />
                            </div>
                            <FormInputDate
                                label="Ngày áp dụng"
                                name="start_date"
                                updateFormData={this.updateFormData}
                                value={code.start_date || ""}
                                id="form-start-day"
                                required
                            />
                            <FormInputDate
                                label="Ngày kết thúc"
                                name="end_date"
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
                                                onClick={()=>{
                                                    //console.log("aaa",code)
                                                    //this.props.codeAction.creatCode(code)
                                                }}
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
    addEditCodeModal: PropTypes.bool.require,
    isAddEditCode: PropTypes.bool.require,
    codeAction: PropTypes.object.require,
    handleCodeModal: PropTypes.object.require,
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
