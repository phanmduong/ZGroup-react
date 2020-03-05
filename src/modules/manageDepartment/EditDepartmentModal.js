import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import * as helper from '../../helpers/helper';
import {CirclePicker} from 'react-color';

class EditDepartmentModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                name: '',
                color: '',
            },
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-department-edit');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-department-edit');
    }


    updateFormData(e) {
        const name = e.target.name;
        const value = e.target.value;
        let newdata = {...this.state.data};
        newdata[name] = value;
        this.setState({data: newdata});
    }

    changeColor(color) {
        let data = {...this.state.data};
        data.color = color.hex;
        this.setState({data: data});
    }

    onHide() {
        this.setState({
            data: {
                name: '',
                color: '',
            },
        });
        this.props.onHide();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.onHide}
                 bsSize="small"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bộ phận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-department-edit"  className="form-grey" onSubmit={null}>
                        <label>Tên bộ phận</label>
                        <FormInputText
                            placeholder="Tên bộ phận"
                            required
                            name="name"
                            updateFormData={this.updateFormData}
                            value={this.state.data.name}
                        />
                        <label className="margin-bottom-10">Chọn màu</label>
                        <CirclePicker width="100%"
                                      color={this.state.data.color || ''}
                                      onChangeComplete={this.changeColor}
                        />
                        <div className="flex-end margin-top-10">
                        {this.props.isEditingDepartment ?
                            <button className="btn button-green disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                            </button>
                            :
                            <button
                                className="btn button-green"
                                type="button"
                                onClick={() => {
                                    if ($('#form-department-edit').valid())
                                        return this.props.editDepartment(this.state.data);
                                }}
                            > Lưu </button>
                        }
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

EditDepartmentModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    editDepartment: PropTypes.func.isRequired,
    isEditingDepartment: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};

export default (EditDepartmentModal);
/**/