import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import * as barcodeActions from "./barcodeActions";
import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";

// Import actions here!!

class CreateBarcodeModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let barcode = { ...this.props.barcode };
        barcode[field] = event.target.value;
        this.props.barcodeActions.updateBarcodeFormData(barcode);
    }

    close() {
        this.props.barcodeActions.closeCreateBarcodeModal(false);
    }

    submit() {
        this.props.barcodeActions.createBarcode({
            ...this.props.barcode,
            type: this.props.type,
        }, ()=>this.props.barcodeActions.loadBarcodes(this.props.currentPage, this.props.type, null));
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.barcode.id ? "Sửa" : "Tạo"} Barcode
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        name="value"
                        label="Giá trị"
                        value={this.props.barcode.value}
                        updateFormData={this.updateFormData}
                        required
                    />
                </Modal.Body>
                <Modal.Footer>
                    {this.props.isSaving ? (
                        <Loading />
                    ) : (
                        <div>
                            <Button
                                disabled={!this.props.barcode.value}
                                className="btn btn-rose"
                                onClick={this.submit}
                            >
                                Lưu
                            </Button>
                            <Button onClick={this.close}>Đóng</Button>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        );
    }
}

CreateBarcodeModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    barcodeActions: PropTypes.object.isRequired,
    barcode: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,

};

function mapStateToProps(state) {
    return {
        showModal: state.good.barcode.createBarcode.showModal,
        barcode: state.good.barcode.createBarcode.barcode,
        isSaving: state.good.barcode.createBarcode.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        barcodeActions: bindActionCreators(barcodeActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    CreateBarcodeModalContainer,
);
