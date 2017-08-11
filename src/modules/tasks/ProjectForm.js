import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import {isEmptyInput} from "../../helpers/helper";

const ProjectForm = ({updateFormData, project, error, submit, isSaving}) => {
    const {title, description} = project;
    return (
        <form role="form">

            <FormInputText
                placeholder="Nhập tên dự án"
                label="Tên dự án"
                name="title"
                updateFormData={updateFormData}
                value={title}
                errorMessage="Vui lòng nhập tên dự án"
                isNotValid={!isEmptyInput(error.title)}/>
            <FormInputText
                placeholder="Nhập mô tả dự án"
                label="Mô tả dự án"
                name="description"
                updateFormData={updateFormData}
                value={description}
                errorMessage="Vui lòng nhập mô tả dự án"
                isNotValid={!isEmptyInput(error.description)}/>
            <div>
                {isSaving ?
                    (
                        <button
                            type="button"
                            className="btn btn-primary disabled">
                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                        </button>
                    ) :
                    (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={submit}>
                            Tải lên
                        </button>
                    )}
            </div>
        </form>
    );
};

ProjectForm.propTypes = {
    project: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default ProjectForm;