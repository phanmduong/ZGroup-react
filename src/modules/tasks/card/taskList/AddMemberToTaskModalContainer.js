import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as taskActions from '../../taskActions';
import * as bookActions from '../../../book/bookActions';
import MemberReactSelectValue from "../../board/filter/MemberReactSelectValue";
import MemberReactSelectOption from "../../board/filter/MemberReactSelectOption";
import Select from "react-select";
import Loading from "../../../../components/common/Loading";

class AddMemberToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.userSelectChange = this.userSelectChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal && nextProps.task.id)
            this.props.taskActions.loadAvailableMembers(nextProps.task);
    }

    close() {
        this.props.taskActions.closeAddMemberToTaskModal();
    }

    userSelectChange(val) {
        this.props.taskActions.updateAssignMemberToTaskForm(val);
    }

    save() {
        if(this.props.isTemplate) {
            this.props.bookActions.saveMemberTask(this.props.task, this.props.selectedMember);
        } else {
            this.props.taskActions.saveMemberTask(this.props.task, this.props.selectedMember, this.props.card);
        }
    }


    render() {
        return (
            <Modal bsSize="small" show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Phân công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <Select
                                placeholder="Nhập tên"
                                style={{width: "100%"}}
                                value={this.props.selectedMember}
                                name="members"
                                valueComponent={MemberReactSelectValue}
                                optionComponent={MemberReactSelectOption}
                                options={this.props.members}
                                onChange={this.userSelectChange}
                            />
                        )
                    }


                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button className="btn btn-rose" onClick={this.save}>Lưu</Button>
                                <Button onClick={this.close}>Đóng</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AddMemberToTaskModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isTemplate: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired,
    selectedMember: PropTypes.object,
    members: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.task.addMemberToTask.isLoading,
        isSaving: state.task.addMemberToTask.isSaving,
        showModal: state.task.addMemberToTask.showModal,
        task: state.task.addMemberToTask.task,
        card: state.task.cardDetail.card,
        members: state.task.addMemberToTask.members.map((member) => {
            return {
                ...member,
                value: member.id,
                label: member.name
            };
        }),
        selectedMember: state.task.addMemberToTask.selectedMember
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch),
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberToTaskModalContainer);