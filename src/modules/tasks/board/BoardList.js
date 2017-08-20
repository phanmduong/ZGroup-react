import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import _ from 'lodash';

class BoardList extends React.Component {
    constructor(props, context) {
        super(props, context);
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

    render() {
        return (
            <div className="board-container">
                {this.props.boards.sort((a, b) => a.order - b.order).map((board) => {
                    return (
                        <div key={board.id} className="card card-container">
                            <div className="btn-add-card card-header card-header-icon undraggable btn-rose"
                                 data-background-color="blue">
                                <i className="material-icons">note_add</i>
                            </div>
                            <h4 className="undraggable">{board.title}</h4>

                            <div className="board">
                                {_.range(1, 3).map((index) => {
                                    return (
                                        <div key={index} className="card-content">
                                            <div className="card">
                                                <div className="card-content" style={{paddingBottom: 0}}>
                                                    <p className="card-title">Last Campaign Performance</p>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="stats">
                                                        <i className="material-icons">access_time</i> campaign
                                                        sent
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
                         onClick={this.props.openCreateBoardModal}>
                        <div>
                            <i className="material-icons flex-item">control_point</i>
                        </div>
                        <div className="card-title flex-item"> Tạo bảng mới
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BoardList.propTypes = {
    boards: PropTypes.array.isRequired,
    openCreateBoardModal: PropTypes.func.isRequired
};

export default BoardList;