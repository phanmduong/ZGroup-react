import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";

class AddGoodPropertyModal extends React.Component {
    constructor(props, context) {
        super(props, context);


    }

    textAreaAdjust(event) {
        const o = event.target;
        o.style.height = "1px";
        o.style.height = (10 + o.scrollHeight) + "px";
    }

    render() {
        const {property} = this.props;
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thuộc tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        label="Tên thuộc tính"
                        updateFormData={this.props.onChange}
                        value={property.name || ""}
                        name="name"/>
                    <label className="control-label">Giá trị thuộc tính</label>
                    <textarea
                        name="value"
                        onChange={this.props.onChange}
                        value={property.value || ""}
                        onKeyUp={this.textAreaAdjust}
                        placeholder="Nhập giá trị của thuộc tính..."
                        className="comment-input"/>
                </Modal.Body>
            </Modal>
        );
    }
}

AddGoodPropertyModal.propTypes = {
    showModal: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
};

export default AddGoodPropertyModal;