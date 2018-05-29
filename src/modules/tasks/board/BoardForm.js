import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../../components/common/FormInputText";
import {isEmptyInput} from "../../../helpers/helper";

const BoardForm = ({updateFormData, board, submit, isSaving}) => {
    const {title, id} = board;
    return (
        <form
            id="board-form"
            role="form" onSubmit={(event) => {
            event.preventDefault();
            submit();
        }}>

            <FormInputText
                placeholder="Nhập tên bảng"
                label="Tên bảng"
                name="title"
                updateFormData={updateFormData}
                value={title}/>
            <div>
                {isSaving ?
                    (
                        <button
                            type="button"
                            className="btn btn-rose disabled">
                            <i className="fa fa-spinner fa-spin"/> Đang tạo
                        </button>
                    ) :
                    (
                        <button
                            disabled={isEmptyInput(title)}
                            type="button"
                            className="btn btn-rose"
                            onClick={submit}>
                            {id ? "Sửa bảng" : "Tạo bảng"}
                        </button>
                    )}
            </div>
        </form>
    );
};

BoardForm.propTypes = {
    board: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default BoardForm;