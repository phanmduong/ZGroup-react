import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../tasks/taskActions';
import * as boardActions from '../tasks/board/boardActions';
import BookProjectDetailModalContainer from "./BookProjectDetailModalContainer";
import ArchiveCardsModalContainer from "../tasks/card/ArchiveCardsModalContainer";
import * as projectPersonalSettingAction from '../tasks/project/projectPersonalSettingAction';
import ProjectPersonalSettingModalContainer from "../tasks/project/ProjectPersonalSettingModalContainer";
import ArchiveBoardsModalContainer from "../tasks/board/ArchiveBoardsModalContainer";

class BookProjectActionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openProjectSetting = this.openProjectSetting.bind(this);
        this.open = this.open.bind(this);
        this.openProjectPersonalSetting = this.openProjectPersonalSetting.bind(this);
        this.openArchiveBoardsModal = this.openArchiveBoardsModal.bind(this);
    }

    openProjectSetting() {
        this.props.taskActions.openProjectDetailModal(this.props.projectId);
    }

    open(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.taskActions.openArchiveCardModal();
        this.props.taskActions.loadArchiveCards(this.props.projectId);
    }

    openProjectPersonalSetting() {
        this.props.projectPersonalSettingAction.openClosePersonalSettingModal(true);
    }

    openArchiveBoardsModal() {
        this.props.boardActions.showArchiveBoardsModal(true);
    }

    render() {
        return (
            <div className="filter-item">
                <div className="dropdown">
                    <a className="dropdown-toggle btn-more-dropdown" type="button" data-toggle="dropdown">
                        <i className="material-icons">more_horiz</i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li>
                            <a onClick={this.openArchiveBoardsModal}>Bảng đã lưu trữ</a>
                        </li>
                        <li><a onClick={this.open}>Thẻ đã lưu trữ</a></li>
                        {
                            this.props.isAdmin && <li><a onClick={this.openProjectSetting}>Cài đặt</a></li>
                        }
                        <li><a onClick={this.openProjectPersonalSetting}>Cài đặt cá nhân</a></li>
                    </ul>
                </div>
                <BookProjectDetailModalContainer/>
                <ProjectPersonalSettingModalContainer/>
                <ArchiveCardsModalContainer
                    projectId={this.props.projectId}/>
                <ArchiveBoardsModalContainer
                    projectId={this.props.projectId}/>
            </div>
        );
    }
}

BookProjectActionContainer.propTypes = {
    projectId: PropTypes.number.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    boardActions: PropTypes.object.isRequired,
    projectPersonalSettingAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch),
        boardActions: bindActionCreators(boardActions, dispatch),
        projectPersonalSettingAction: bindActionCreators(projectPersonalSettingAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookProjectActionContainer);