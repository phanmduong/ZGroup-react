import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../../../components/common/FormInputText";
import {CirclePicker} from "react-color";

const ProjectDetailCommon = ({updateFormData, project, changeColor}) => {
    return (
        <div>
            <FormInputText
                placeholder="Nhập tên dự án"
                label="Tên dự án"
                name="title"
                updateFormData={updateFormData}
                value={project.title}/>
            <FormInputText
                placeholder="Nhập mô tả dự án"
                label="Mô tả dự án"
                name="description"
                updateFormData={updateFormData}
                value={project.description}/>

            <CirclePicker
                width="100%"
                color={project.color || ""}
                onChangeComplete={changeColor}/>

        </div>
    );
};

ProjectDetailCommon.propTypes = {
    updateFormData: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
};

export default ProjectDetailCommon;