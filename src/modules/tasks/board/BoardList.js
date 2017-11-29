import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import CardList from "../card/CardList";

class BoardList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.initBoardDragula = this.initBoardDragula.bind(this);
        this.initBoardContainerDragula = this.initBoardContainerDragula.bind(this);
        this.drake = null;
        this.boardDrake = null;
    }


    componentDidMount() {
        this.initBoardDragula();
        this.initBoardContainerDragula();
    }

    componentDidUpdate() {
        this.initBoardDragula();
        this.initBoardContainerDragula();
    }

    initBoardContainerDragula() {
        if (!this.props.canDragBoard) {
            return true;
        }
        if (this.boardDrake) {
            this.boardDrake.destroy();
        }
        const containers = Array.prototype.slice.call(document.querySelectorAll(".board-container"));
        this.boardDrake = Dragula(containers, {
            moves: function (el, container, handle) {

                if (el.className.indexOf("undraggable") !== -1
                    || handle.classList.contains('keetool-card')) {
                    return false;
                }
                return true; // elements are always draggable by default
            },
            accepts: function () {
                return true; // elements can be dropped in any of the `containers` by default
            },
            revertOnSpill: true
        });
        this.boardDrake.on('drop', function (el, target, source, sibling) {
            this.boardDrake.cancel();

            let siblingOrder = -1;
            if (sibling) {
                siblingOrder = Number(sibling.dataset.order);
            }

            this.props.moveBoard(Number(source.id), Number(target.id), Number(el.id), siblingOrder);
            return true;
        }.bind(this));
    }

    initBoardDragula() {
        if (!this.props.canDragCard) {
            return true;
        }
        if (this.drake) {
            this.drake.destroy();
        }
        const containers = Array.prototype.slice.call(document.querySelectorAll(".board"));
        this.drake = Dragula(containers, {
            moves: function (el) {
                if (el.className.indexOf("undraggable") !== -1) {
                    return false;
                }

                return true; // elements are always draggable by default
            },
            accepts: function () {
                return true; // elements can be dropped in any of the `containers` by default
            },
            revertOnSpill: true
        });
        this.drake.on('drop', function (el, target, source, sibling) {

            this.drake.cancel();

            let siblingOrder = -1;
            if (sibling) {
                siblingOrder = Number(sibling.dataset.order);
            }

            if (target !== source) {
                // target.removeChild(el);
                // console.log(sibling);
                // console.log("order: " + sibling.dataset.order);

                this.props.moveCard(source.id, target.id, el.id, siblingOrder);
            } else {
                this.props.changeOrderCard(Number(source.id), Number(el.id), siblingOrder);
            }
            return true;
        }.bind(this));
    }

    render() {
        return (
            <div className="board-canvas">
                <div className="board-container">
                    {this.props.boards.sort((a, b) => a.order - b.order).map((board) => {
                        return (
                            <div key={board.id} data-order={board.order} id={board.id}
                                 className="card card-container keetool-board">
                                <div className="board-title undraggable">
                                    <span style={{fontWeight: 600}}>{board.title}</span>
                                    <div className="board-action">

                                        <div className="dropdown">
                                            <a className="dropdown-toggle btn-more-dropdown" type="button"
                                               data-toggle="dropdown">
                                                <i className="material-icons">more_horiz</i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li className="more-dropdown-item">
                                                    <a onClick={() => this.props.editBoard(board)}>
                                                        <i className="material-icons">edit</i>
                                                        Sửa tên bảng
                                                    </a>
                                                </li>
                                                <li className="more-dropdown-item">
                                                    <a onClick={() => this.props.addCard(board)}>
                                                        <i className="material-icons">add</i>
                                                        Thêm thẻ
                                                    </a>
                                                </li>
                                                <li className="more-dropdown-item">
                                                    <a onClick={() => this.props.archiveBoard(board)}>
                                                        <i className="material-icons">archive</i>
                                                        Lưu trữ
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <CardList
                                    board={board}
                                    display={this.props.display}
                                    archiveCard={this.props.archiveCard}
                                    updateCardInBoard={this.props.updateCardInBoard}
                                    openCardDetailModal={this.props.openCardDetailModal}
                                />

                            </div>
                        );
                    })}
                    <div className="card-container undraggable" data-order="-1">
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
            </div>
        );
    }
}

BoardList.propTypes = {
    canDragBoard: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
    ]),
    canDragCard: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
    ]),
    boards: PropTypes.array.isRequired,
    display: PropTypes.string,
    archiveBoard: PropTypes.func.isRequired,
    openCreateBoardModal: PropTypes.func.isRequired,
    changeOrderCard: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    updateCardInBoard: PropTypes.func.isRequired,
    archiveCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveBoard: PropTypes.func.isRequired,
    openCardDetailModal: PropTypes.func.isRequired,
    editBoard: PropTypes.func.isRequired
};

export default BoardList;