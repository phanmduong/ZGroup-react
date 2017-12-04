import React from 'react';
// import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
// import FormInputSelect from '../../components/common/FormInputSelect';
// import FormInputDate from '../../components/common/FormInputDate';
// import {GENDER} from '../../constants/constants';


class GroupCustomerModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div>
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">people</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        Thêm nhóm khách hàng
                    </h4>
                    <div className= "row">
                        <div className= "col-md-9">

                    <FormInputText
                        label="Tên nhóm"
                        name="name"
                        // updateFormData={this.props.updateFormData}
                        required={true}
                        type="text"
                        // value={name}
                    />
                    <FormInputText
                        label="Mô tả"
                        name="description"
                        // updateFormData={this.props.updateFormData}
                        required={true}
                        type="email"
                        // value={description}
                        placeholder = "Nhập email (ví dụ : hung@gmail.com)"
                    />
                        </div>
                        <div className= "col-md-3">
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

GroupCustomerModal.propTypes = {

};


export default GroupCustomerModal;