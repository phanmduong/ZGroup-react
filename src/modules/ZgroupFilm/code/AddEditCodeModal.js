import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import FormInputDate from "../../../components/common/FormInputDate";
import {bindActionCreators} from "redux";
import * as codeAction from "./codeAction";



class AddEditCodeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return(
            <Modal
                show={this.props.addEditCodeModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {this.props.codeAction.openModal();});

                }}>
                <a onClick={() => {this.props.codeAction.openModal();}}
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
                                    name="type"
                                    updateFormData={()=>{}}
                                    value={''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Số lượng"
                                    name="type"
                                    updateFormData={()=>{}}
                                    value={''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Trị giá"
                                    name="type"
                                    updateFormData={()=>{}}
                                    value={''}
                                    required
                                />
                            </div>
                            <FormInputDate
                                label="Ngày áp dụng"
                                name="start_date"
                                updateFormData={()=>{}}
                                value={""}
                                id="form-start-day"
                                required
                            />
                            <FormInputDate
                                label="Ngày kết thúc"
                                name="end_date"
                                updateFormData={()=>{}}
                                value={""}
                                id="form-end-day"
                                required
                            />
                            <br/>

                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {this.props.codeAction.openModal();}}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {this.props.codeAction.openModal();}}
                                            >
                                                Huỷ
                                            </button>
                                        </div>


                                    </div>

                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
AddEditCodeModal.propTypes = {
    addEditCodeModal: PropTypes.bool.require,
    codeAction: PropTypes.object.require,
};

function mapStateToProps(state) {
    return {
        addEditCodeModal: state.code.addEditCodeModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCodeModal);
