import React from 'react';
import * as helper from '../../../helpers/helper';
import FormInputText from '../../../components/common/FormInputText';
import PropTypes from 'prop-types';

class EditGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedGood: {}
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.storeGood = this.storeGood.bind(this);
    }

    componentWillMount() {
        this.setState({
            selectedGood: this.props.good
        });
    }

    componentDidMount() {
        helper.setFormValidation("#form-edit-import_good");
    }

    updateFormData(event) {
        const field = event.target.name;
        let selectedGood = {...this.state.selectedGood};
        if (field == 'import_price') {
            if (!isNaN(Number(event.target.value.toString().replace(/\./g, "")))) {
                selectedGood[field] = Number(event.target.value.toString().replace(/\./g, ""));
            }
        } else {
            selectedGood[field] = event.target.value;
        }
        this.setState({
            selectedGood: selectedGood
        });
    }

    storeGood() {
        if ($("#form-edit-import_good").valid()) {
            this.props.editGood(this.state.selectedGood);
        }
    }

    render() {
        return (
            <div>
                <form id="form-edit-import_good" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div className="row">
                        <div className="col-md-4">
                            <FormInputText
                                label="Tên sản phẩm"
                                value={this.state.selectedGood.name}
                                updateFormData={this.updateFormData}
                                disabled={this.state.selectedGood.id}
                                name="name"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Mã sản phẩm"
                                value={this.state.selectedGood.code}
                                updateFormData={this.updateFormData}
                                name="code"
                                disabled={this.state.selectedGood.id}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Barcode"
                                value={this.state.selectedGood.barcode}
                                updateFormData={this.updateFormData}
                                disabled={this.state.selectedGood.id}
                                name="barcode"
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormInputText
                                label="Số lượng"
                                value={this.state.selectedGood.quantity}
                                updateFormData={this.updateFormData}
                                name="quantity"
                                type="number"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Giá vốn"
                                value={helper.dotNumber(this.state.selectedGood.import_price)}
                                updateFormData={this.updateFormData}
                                name="import_price"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Giá bán"
                                value={helper.dotNumber(this.state.selectedGood.price)}
                                updateFormData={this.updateFormData}
                                name="price"
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn btn-success" onClick={this.storeGood}>
                                <i className="material-icons">save</i> Sửa
                            </button>
                            <button className="btn btn-danger" onClick={this.props.closeModal}>
                                <i className="material-icons">cancel</i> Huỷ
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditGood.propTypes = {
    editGood: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    good: PropTypes.object.isRequired,
};

export default EditGood;
