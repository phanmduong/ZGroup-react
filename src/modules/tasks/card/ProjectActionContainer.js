import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ProjectDetailModalContainer from "../project/ProjectDetailModalContainer";
import ArchiveCardsModalContainer from "./ArchiveCardsModalContainer";
import * as taskActions from '../taskActions';

class ProjectActionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openProjectSetting = this.openProjectSetting.bind(this);
        this.open = this.open.bind(this);
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

    render() {
        return (
            <div className="filter-item">
                <div className="dropdown">
                    <a className="dropdown-toggle btn-more-dropdown" type="button" data-toggle="dropdown">
                        <i className="material-icons">more_horiz</i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li><a onClick={this.open}>Thẻ đã lưu trữ</a></li>
                        {
                            this.props.isAdmin && <li><a onClick={this.openProjectSetting}>Cài đặt</a></li>
                        }

                    </ul>
                </div>
                <ProjectDetailModalContainer/>
                <ArchiveCardsModalContainer
                    isAdmin={this.props.isAdmin}
                    projectId={this.props.projectId}/>
            </div>
        );
    }
}

ProjectActionContainer.propTypes = {
    projectId: PropTypes.number.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectActionContainer);