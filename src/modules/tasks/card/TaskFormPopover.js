import React from 'react';
import PropTypes from 'prop-types';
import TaskListForm from "./TaskListForm";

const TaskFormPopover = ({
                             toggle, taskList, saveTaskList,
                             isSavingTaskList, updateCreateTaskListFormData
                         }) => {
    return (
        <div style={{
            position: 'absolute',
            backgroundColor: '#fff',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
            border: '1px solid #CCC',
            borderRadius: 3,
            marginLeft: -5,
            marginTop: 5,
            padding: 10,
        }}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <TaskListForm
                taskList={taskList}
                submit={saveTaskList}
                isSaving={isSavingTaskList}
                updateFormData={updateCreateTaskListFormData}/>
        </div>
    );
};
TaskFormPopover.propTypes = {
    taskList: PropTypes.object.isRequired,
    isSavingTaskList: PropTypes.bool.isRequired,
    saveTaskList: PropTypes.func.isRequired,
    updateCreateTaskListFormData: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};

export default TaskFormPopover;