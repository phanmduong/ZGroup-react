import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";
import KeetoolPanel from "../../components/common/KeetoolPanel";
import {splitComma} from "../../helpers/helper";

class TaskTemplateItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddMemberToTaskModal = this.openAddMemberToTaskModal.bind(this);
        this.openTaskSpanModal = this.openTaskSpanModal.bind(this);
        this.openAddPropertyItemToTaskModal = this.openAddPropertyItemToTaskModal.bind(this);
    }

    openAddMemberToTaskModal() {
        this.props.openAddMemberToTaskModal(this.props.task);
    }

    openTaskSpanModal() {
        this.props.openTaskSpanModal(this.props.task);
    }

    openAddPropertyItemToTaskModal() {
        this.props.openAddPropertyItemToTaskModal(this.props.task);
    }

    render() {

        const {task} = this.props;
        return (
            <li className="timeline-inverted">
                <div className="timeline-badge success">
                    {this.props.index + 1}
                </div>
                <div className="timeline-panel" style={{position: "relative"}}>
                    <div className="dropdown" style={{
                        position: "absolute",
                        top: "5px",
                        right: "10px"
                    }}>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown">
                            <i className="material-icons">more_horiz</i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right">

                            <li className="more-dropdown-item">
                                <a onClick={this.openAddMemberToTaskModal}>
                                    <i className="material-icons">person</i>
                                    Phân thành viên
                                </a>
                            </li>
                            <li className="more-dropdown-item">
                                <a onClick={this.openTaskSpanModal}>
                                    <i className="material-icons">timer</i>
                                    Thời gian thực hiện
                                </a>
                            </li>
                            {
                                this.props.type && (
                                    <li className="more-dropdown-item">
                                        <a onClick={this.openAddPropertyItemToTaskModal}>
                                            <i className="material-icons">build</i>
                                            Cài đặt
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="timeline-heading">
                        <span className="label label-success">
                             {task.title}
                        </span>
                        {
                            !!task.span && (
                                <span style={{marginLeft: "4px"}} className="label label-default">
                                    <i className="ti-time"/> trong {task.span} giờ
                                </span>
                            )
                        }

                    </div>
                    <div className="timeline-body">
                        <KeetoolPanel
                            title={`Thuộc tính cần nhập (${task.good_property_items ? task.good_property_items.length : 0} thuộc tính)`}>
                            <div>
                                {
                                    task.good_property_items.sort((a, b) => a.order - b.order).map((item, index) => {
                                        return (
                                            <div
                                                data-order={item.order}
                                                key={item.id}>{index + 1}. {item.name}: {splitComma(item.prevalue)} {splitComma(item.preunit)}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </KeetoolPanel>
                        <KeetoolPanel
                            title={`Bảng đích (${task.board_tasks ? task.board_tasks.length : 0} bảng)`}>
                            <div>
                                {
                                    task.board_tasks && task.board_tasks.map((board, index) => {
                                            return (
                                                <div key={index}>
                                                    {board.board && (
                                                        <div>{board.board ?
                                                            board.board.title : ""}</div>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )
                                }
                            </div>
                        </KeetoolPanel>
                        <KeetoolPanel
                            title={`Thành viên (${task.members ? task.members.length : 0} thành viên)`}>
                            <div>
                                {
                                    task.members && task.members.map((member, index) => {
                                            return (
                                                <div key={index}>
                                                    <Avatar style={{
                                                        display: "inline-block",
                                                        position: "relative",
                                                        top: "7px",
                                                        marginLeft: "4px"
                                                    }} url={member.avatar_url} size={20}/>
                                                    {member.name}
                                                </div>
                                            );
                                        }
                                    )
                                }
                            </div>
                        </KeetoolPanel>
                    </div>
                </div>
            </li>
        );

    }

}

TaskTemplateItem.propTypes = {
    type: PropTypes.string,
    index: PropTypes.number.isRequired,
    openAddPropertyItemToTaskModal: PropTypes.func.isRequired,
    openAddMemberToTaskModal: PropTypes.func.isRequired,
    openTaskSpanModal: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    isTemplate: PropTypes.bool
};

TaskTemplateItem.defaultProps = {};

export default TaskTemplateItem;