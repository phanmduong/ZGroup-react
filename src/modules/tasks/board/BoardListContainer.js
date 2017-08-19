/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import _ from 'lodash';
import * as taskActions from '../taskActions';
import * as PropTypes from "prop-types";
import CreateBoardModalContainer from "./CreateBoardModalContainer";

class BoardListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openCreateBoardModal = this.openCreateBoardModal.bind(this);
    }

    componentDidMount() {
        const containers = Array.prototype.slice.call(document.querySelectorAll(".board"));
        Dragula(containers, {
            moves: function (el) {
                if (el.className.indexOf("undraggable") !== -1) {
                    return false;
                }
                return true; // elements are always draggable by default
            },
        });
    }

    openCreateBoardModal() {
        this.props.taskActions.changeStatusCreateBoardModal(true);
    }


    render() {
        return (
            <div>
                <CreateBoardModalContainer projectId={this.props.params.projectId}/>
                <div className="board-container">
                    {_.range(1, 3).map((index) => {
                        return (
                            <div key={index} className="card card-container">
                                <div
                                    className="card-header card-header-icon undraggable"
                                    data-background-color="blue">
                                    <i className="material-icons">timeline</i>
                                </div>
                                <h4 className="undraggable">Global Sales by</h4>

                                <div className="board">
                                    {_.range(1, 5).map((index) => {
                                        return (
                                            <div key={index} className="card-content">
                                                <div className="card">
                                                    <div className="card-content" style={{paddingBottom: 0}}>
                                                        <p className="card-title">Last Campaign Performance</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> campaign sent
                                                            2
                                                            days ago
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}


                                </div>
                            </div>
                        );
                    })}
                    <div className="card-container">
                        <div className="create-new-board" style={{marginTop: 0}}
                             onClick={this.openCreateBoardModal}>
                            <div>
                                <i className="material-icons flex-item">control_point</i>
                            </div>
                            <div className="card-title flex-item"> Tạo bảng mới
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BoardListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardListContainer);