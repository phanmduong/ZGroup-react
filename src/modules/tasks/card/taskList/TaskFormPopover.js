import React from 'react';
import PropTypes from 'prop-types';
import TaskListForm from "./TaskListForm";
import Select from "react-select";
import Loading from "../../../../components/common/Loading";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const TaskFormPopover = ({
                             taskLists, onChangeTaskList, selectedTaskList, isLoading, saveTaskListTemplate,
                             toggle, taskList, saveTaskList, toggleCreateNew,
                             createNewTask, isSavingTaskList, updateCreateTaskListFormData
                         }) => {
    const tooltip = (
        <Tooltip id="tooltip">Tạo danh sách việc cần làm mới</Tooltip>
    );
    return (
        <div className="kt-overlay">
            <div style={{display: "flex", justifyContent: "space-between", paddingBottom: 10}}>

                {
                    createNewTask ? (
                            <button
                                onClick={toggleCreateNew}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">
                                    <i className="material-icons">keyboard_arrow_left</i>
                                </span>
                            </button>
                        ) :
                        (
                            <OverlayTrigger placement="top" overlay={tooltip}>
                                <button
                                    onClick={toggleCreateNew}
                                    type="button" className="close"
                                    style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">
                                    <i className="material-icons">add</i>
                                </span>
                                </button>
                            </OverlayTrigger>
                        )
                }
                <button
                    onClick={toggle}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
            </div>
            {
                isLoading ? (
                    <Loading/>
                ) : (
                    <div>
                        {
                            createNewTask ? (
                                <TaskListForm
                                    taskList={taskList}
                                    submit={saveTaskList}
                                    isSaving={isSavingTaskList}
                                    updateFormData={updateCreateTaskListFormData}/>
                            ) : (
                                <div>
                                    <Select
                                        placeholder='Chọn quy trình'
                                        style={{width: 150}}
                                        defaultMessage={'Chọn quy trình'}
                                        options={taskLists.map((taskList) => {
                                            return {
                                                value: taskList.id,
                                                label: taskList.title
                                            };
                                        })}
                                        disableRound
                                        value={selectedTaskList}
                                        onChange={onChangeTaskList}/>
                                    {isSavingTaskList ?
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
                                                disabled={selectedTaskList === null}
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={saveTaskListTemplate}>
                                                Thêm
                                            </button>
                                        )}

                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};
TaskFormPopover.propTypes = {
    taskLists: PropTypes.array.isRequired,
    onChangeTaskList: PropTypes.func.isRequired,
    saveTaskListTemplate: PropTypes.func.isRequired,
    toggleCreateNew: PropTypes.func.isRequired,
    selectedTaskList: PropTypes.object,
    taskList: PropTypes.object.isRequired,
    isSavingTaskList: PropTypes.bool.isRequired,
    createNewTask: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    saveTaskList: PropTypes.func.isRequired,
    updateCreateTaskListFormData: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};

export default TaskFormPopover;