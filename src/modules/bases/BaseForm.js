import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import {isEmptyInput} from "../../helpers/helper";

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
                errorMessage="Vui lòng nhập họ và tên"
                isNotValid={!isEmptyInput(error.name)}/>
            <FormInputText
                placeholder="Nhập địa chỉ cơ sở"
                label="Địa chỉ cơ sở"
                name="address"
                updateFormData={updateFormData}
                value={address}
                errorMessage="Vui lòng nhập địa chỉ cơ sở"
                isNotValid={!isEmptyInput(error.address)}/>
            <div>
                {isSavingBase ?
                    (
                        <button
                            type="button"
                            className="btn btn-rose disabled"
                        >
                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                        </button>
                    ) :
                    (
                        <button
                            type="button"
                            className="btn btn-rose"
                            onClick={submit}
                        >
                            Tải lên
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