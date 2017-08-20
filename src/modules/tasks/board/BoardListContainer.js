/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';

import * as taskActions from '../taskActions';
import * as PropTypes from "prop-types";
import CreateBoardModalContainer from "./CreateBoardModalContainer";
import Loading from "../../../components/common/Loading";
import BoardList from "./BoardList";

class BoardListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openCreateBoardModal = this.openCreateBoardModal.bind(this);
    }

    componentWillMount() {
        this.props.taskActions.loadBoards(this.props.params.projectId);
    }



    openCreateBoardModal() {
        this.props.taskActions.changeStatusCreateBoardModal(true);
    }

    render() {
        return (
            <div>
                <CreateBoardModalContainer projectId={this.props.params.projectId}/>
                {this.props.isLoadingBoards ? <Loading/> : (
                    <BoardList
                        openCreateBoardModal={this.openCreateBoardModal}
                        boards={this.props.boards}/>
                )}
            </div>
        );
    }
}

BoardListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    boards: PropTypes.array.isRequired,
    isLoadingBoards: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoadingBoards: state.task.boardList.isLoadingBoards,
        boards: state.task.boardList.boards
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardListContainer);