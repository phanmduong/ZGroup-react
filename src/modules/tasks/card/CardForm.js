import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../../components/common/FormInputText";
import {isEmptyInput} from "../../../helpers/helper";

const CardForm = ({updateFormData, card, submit, isSaving}) => {
    const {title, description} = card;
    return (
        <form
            id="card-form"
            role="form" onSubmit={(event) => {
            event.preventDefault();
            submit();
        }}>

            <FormInputText
                placeholder="Nhập tên thẻ"
                label="Tên thẻ"
                name="title"
                updateFormData={updateFormData}
                value={title}/>
            <FormInputText
                placeholder="Nhập mô tả"
                label="Mô tả"
                name="description"
                updateFormData={updateFormData}
                value={description}/>
            <div>
                {isSaving ?
                    (
                        <button
                            type="button"
                            className="btn btn-rose disabled">
                            <i className="fa fa-spinner fa-spin"/> Đang tạo thẻ
                        </button>
                    ) :
                    (
                        <button
                            disabled={isEmptyInput(title)}
                            type="button"
                            className="btn btn-rose"
                            onClick={submit}>
                            Tạo thẻ
                        </button>
                    )}
            </div>
        </form>
    );
};

CardForm.propTypes = {
    card: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default CardForm;