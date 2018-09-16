import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../../../components/common/FormInputText";
import {isEmptyInput} from "../../../../helpers/helper";

const TaskListForm = ({updateFormData, taskList, submit, isSaving}) => {
    const {title} = taskList;
    return (
        <form
            id="taskList-form"
            role="form" onSubmit={(event) => {
            event.preventDefault();
            submit();
        }}>

            <FormInputText
                label="Tên danh sách"
                name="title"
                updateFormData={updateFormData}
                value={title}/>
            <div>
                {isSaving ?
                    (
                        <button
                            type="button"
                            className="btn btn-rose disabled">
                            <i className="fa fa-spinner fa-spin"/> Đang thêm
                        </button>
                    ) :
                    (
                        <button
                            // style={{margin: 0}}
                            disabled={isEmptyInput(title)}
                            type="button"
                            className="btn btn-rose"
                            onClick={submit}>
                            Thêm
                        </button>
                    )}
            </div>
        </form>
    );
};

TaskListForm.propTypes = {
    taskList: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default TaskListForm;