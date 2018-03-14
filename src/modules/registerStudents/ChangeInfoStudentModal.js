import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";


class ChangeInfoStudentModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.commitData = this.commitData.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-info-student');
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-info-student');
    }

    commitData() {

        if ($('#form-info-student').valid()
            && !helper.isEmptyInput(this.props.info.code)
            && !helper.isEmptyInput(this.props.info.money)
        ) {
            this.props.commitData(this.props.info);
        } else
            helper.showErrorNotification("Vui lòng điền đầy đủ thông tin.");
    }

    render() {
        return (
            <form role="form" id="form-info-student">
                <Modal
                    show={this.props.showChangeInfoStudent}
                    onHide={this.props.onHide}>
                    <Modal.Header closeButton><h3>Chỉnh sửa học viên: {this.props.info.name}</h3></Modal.Header>
                    <Modal.Body>

                        <FormInputText
                            name="code"
                            label="Mã học viên"
                            required
                            value={this.props.info.code}
                            updateFormData={this.props.updateData}
                            disabled={this.props.isCommitting}
                        />

                        <FormInputText
                            name="money"
                            type="number"
                            label="Học phí"
                            required
                            value={this.props.info.money}
                            updateFormData={this.props.updateData}
                            disabled={this.props.isCommitting || !this.props.info.editable_money}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.isCommitting ?
                            <button className="btn btn-rose disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang lưu
                            </button>
                            :
                            <button
                                className="btn btn-fill btn-rose"
                                type="button"
                                style={{width: "20%"}}
                                onClick={() => {
                                    return this.commitData();
                                }}
                            >Lưu</button>
                        }
                    </Modal.Footer>
                </Modal>

            </form>
        );
    }
}

ChangeInfoStudentModal.propTypes = {
    isCommitting: PropTypes.bool,
    showChangeInfoStudent: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
    info: PropTypes.object,
    updateData: PropTypes.func,
    commitData: PropTypes.func,
    staff: PropTypes.object

};

export default ChangeInfoStudentModal;