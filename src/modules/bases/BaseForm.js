import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";

const BaseForm = ({updateFormData, base, error, submit, isSavingBase}) => {
    const {name, address} = base;
    return (
        <form role="form">
            <FormInputText
                placeholder="Nhập tên cơ sở"
                label="Tên cơ sở"
                name="name"
                updateFormData={updateFormData}
                value={name}
                notiValidate="Vui lòng nhập họ và tên"
                isValidate={error.name === null}/>
            <FormInputText
                placeholder="Nhập địa chỉ cơ sở"
                label="Địa chỉ cơ sở"
                name="address"
                updateFormData={updateFormData}
                value={address}
                notiValidate="Vui lòng nhập địa chỉ cơ sở"
                isValidate={error.address === null}/>
            <div className="container-button-group-staff">
                {isSavingBase ?
                    (
                        <button
                            type="button"
                            className="btn btn-primary disabled"
                        >
                            <i className="fa fa-spinner fa-spin"/> Đang Submit
                        </button>
                    ) :
                    (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={submit}
                        >
                            Submit
                        </button>
                    )}
            </div>
        </form>
    );
};

BaseForm.propTypes = {
    base: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    isSavingBase: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default BaseForm;