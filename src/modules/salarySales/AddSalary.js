import React from "react";
import {observer} from "mobx-react";
import FormInputText from "../../components/common/FormInputText";
import {Modal} from "react-bootstrap";
import * as helper from "../../helpers/helper";

@observer
class AddSalary extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = this.props.store;
    }

    closeModal = () => {
        this.store.openModalAddSalary = false;
    }

    submitAddSalary = () => {
        if ($('#form-add-salary').valid()) {
            this.store.submitAddSalary();
        }
    }

    updateForm = (e) => {
        let {name, value} = e.target;
        this.store.salary = {
            ...this.store.salary,
            [name]: value
        };

    }

    componentDidMount() {
        helper.setFormValidation('#form-add-salary');
    }

    render() {

        return (
            <Modal
                show={this.store.openModalAddSalary}
                onHide={this.store.isAddingSalary ? null : this.closeModal}
            >
                <Modal.Header closeButton={true}>
                    <h4 className="modal-title">Thêm lương</h4>
                </Modal.Header>
                <Modal.Body>
                    <form
                        id="form-add-salary"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                        <FormInputText
                            label="Số tiền lương"
                            value={this.store.salary.money}
                            updateFormData={this.updateForm}
                            required
                            name="money"
                            type="number"
                        />
                        <FormInputText
                            label="Lý do"
                            value={this.store.salary.note}
                            updateFormData={this.updateForm}
                            name="note"
                            required
                        />
                        {this.store.isAddingSalary ?
                            (
                                <button type="button" className="btn btn-success disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/> Đang thêm
                                </button>

                            )
                            :
                            (
                                <button type="button" className="btn btn-success"
                                        onClick={this.submitAddSalary}
                                > Thêm
                                </button>
                            )

                        }
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

AddSalary.propTypes = {};

export default AddSalary;


