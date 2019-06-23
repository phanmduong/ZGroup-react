import React from "react";
import {observer} from "mobx-react";
import FormInputText from "../../components/common/FormInputText";
import {Modal} from "react-bootstrap";
import * as helper from "../../helpers/helper";

@observer
class AddSalaryBonus extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = this.props.store;
    }

    closeModal = () => {
        this.store.openModalAddSalaryBonus = false;
    }

    submitAddSalaryBonus = () => {
        if ($('#form-add-bonus-salary').valid()) {
            this.store.submitAddSalaryBonus();
        }
    }

    updateForm = (e) => {
        let {name, value} = e.target;
        this.store.salaryBonus = {
            ...this.store.salaryBonus,
            [name]: value
        }

    }

    componentDidMount() {
        helper.setFormValidation('#form-add-bonus-salary');
    }

    render() {

        return (
            <Modal
                show={this.store.openModalAddSalaryBonus}
                onHide={this.store.isAddingSalaryBonus ? null : this.closeModal}
            >
                <Modal.Header closeButton={true}>
                    <h4 className="modal-title">Thêm lương thưởng</h4>
                </Modal.Header>
                <Modal.Body>
                    <form
                        id="form-add-bonus-salary"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                        <FormInputText
                            label="Số tiền thưởng"
                            value={this.store.salaryBonus.amount}
                            updateFormData={this.updateForm}
                            required
                            name="amount"
                            type="number"
                        />
                        <FormInputText
                            label="Lý do"
                            value={this.store.salaryBonus.note}
                            updateFormData={this.updateForm}
                            name="note"
                            required
                        />
                        {this.store.isAddingSalaryBonus ?
                            (
                                <button type="button" className="btn btn-success disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/> Đang thêm
                                </button>

                            )
                            :
                            (
                                <button type="button" className="btn btn-success"
                                        onClick={this.submitAddSalaryBonus}
                                > Thêm
                                </button>
                            )

                        }
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

AddSalaryBonus.propTypes = {};

export default AddSalaryBonus;

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
