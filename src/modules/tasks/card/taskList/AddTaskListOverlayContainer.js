import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as taskActions from '../../taskActions';
import * as bookActions from '../../../book/bookActions';
import {bindActionCreators} from "redux";
import TaskFormPopover from "./TaskFormPopover";
import {showNotification} from "../../../../helpers/helper";

class AddTaskListOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.saveTaskList = this.saveTaskList.bind(this);
        this.updateCreateTaskListFormData = this.updateCreateTaskListFormData.bind(this);
        this.onChangeTaskList = this.onChangeTaskList.bind(this);
        this.saveTaskListTemplate = this.saveTaskListTemplate.bind(this);
        this.state = {
            show: false,
            isLoading: false,
            page: 1,
            selectedTaskList: null
        };
    }

    toggle() {
        if (!this.state.show) {
            this.props.bookActions.loadAllTaskListTemplates();
        }
        this.setState({show: !this.state.show});
    }


    saveTaskList() {
        this.props.taskActions
            .saveTaskList({...this.props.taskList, card_id: this.props.card.id})
            .then(() => {
                showNotification("Tạo danh sách việc thành công");
                this.toggle();
            });
    }

    saveTaskListTemplate() {
        this.props.taskActions
            .saveTaskListTemplate(this.state.selectedTaskList.value, this.props.card.id)
            .then(() => {
                showNotification("Thêm quy trình thành công");
                this.toggle();
            });
    }

    updateCreateTaskListFormData(event) {
        const value = event.target.value;
        const field = event.target.name;
        let taskList = {...this.props.taskList};
        taskList[field] = value;
        this.props.taskActions.updateCreateTaskListFormData(taskList);
    }

    onChangeTaskList(value) {
        this.setState({selectedTaskList: value});
    }

    render() {
        return (
            <div>
                {
                    ((this.props.isProcess && this.props.card.taskLists && this.props.card.taskLists.length === 0)
                        || !this.props.isProcess) && (
                        <div style={{position: "relative"}}>
                            <button className="btn btn-default card-detail-btn-action"
                                    ref="target" onClick={this.toggle}>
                                <i className="material-icons">work</i> Việc cần làm
                            </button>
                            <Overlay
                                rootClose={true}
                                show={this.state.show}
                                onHide={() => this.setState({show: false})}
                                placement="bottom"
                                container={this}
                                target={() => ReactDOM.findDOMNode(this.refs.target)}>

                                <TaskFormPopover
                                    isProcess={this.props.isProcess}
                                    saveTaskListTemplate={this.saveTaskListTemplate}
                                    isLoading={this.props.isLoading}
                                    selectedTaskList={this.state.selectedTaskList}
                                    taskLists={this.props.taskLists}
                                    onChangeTaskList={this.onChangeTaskList}
                                    isSavingTaskList={this.props.isSavingTaskList}
                                    taskList={this.props.taskList}
                                    updateCreateTaskListFormData={this.updateCreateTaskListFormData}
                                    saveTaskList={this.saveTaskList}
                                    toggle={this.toggle}/>

                            </Overlay>
                        </div>
                    )
                }
            </div>
        );
    }
}


AddTaskListOverlayContainer.propTypes = {
    isSavingTaskList: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired,
    taskList: PropTypes.object.isRequired,
    taskLists: PropTypes.array.isRequired,
    card: PropTypes.object.isRequired,
    isProcess: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        isSavingTaskList: state.task.createTaskList.isSavingTaskList,
        taskList: state.task.createTaskList.taskList,
        taskLists: state.task.createTaskList.taskLists,
        isLoading: state.task.createTaskList.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch),
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskListOverlayContainer);
