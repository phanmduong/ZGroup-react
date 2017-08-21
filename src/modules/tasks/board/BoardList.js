import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';

class BoardList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.timeout = null;
    }

    componentDidMount() {
        const containers = Array.prototype.slice.call(document.querySelectorAll(".board"));
        const drake = Dragula(containers, {
            moves: function (el) {
                if (el.className.indexOf("undraggable") !== -1) {
                    return false;
                }
                return true; // elements are always draggable by default
            }.bind(this),
            accepts: function () {
                return true; // elements can be dropped in any of the `containers` by default
            }.bind(this),
            copy: true
        });
        drake.on('drop', function (el, target, source, sibling) {
            // console.log(source.id);
            // console.log(target.id);
            // console.log(el.id);
            // console.log(sibling);
            target.removeChild(el);
            let siblingOrder = 0;
            if (sibling) {
                siblingOrder = sibling.id;
            }
            this.props.moveCard(source.id, target.id, el.id, siblingOrder);
        }.bind(this));
    }

    render() {
        return (
            <div className="board-container">
                {this.props.boards.sort((a, b) => a.order - b.order).map((board) => {
                    return (
                        <div key={board.id} className="card card-container">
                            <div className="board-title undraggable">
                                {board.title}
                                <div className="board-action">
                                    <a onClick={() => this.props.editBoard(board)}>
                                        <i className="material-icons">edit</i>
                                    </a>
                                    <a onClick={() => this.props.addCard(board)}>
                                        <i className="material-icons">add</i>
                                    </a>
                                </div>
                            </div>

                            <div className="board" id={board.id}>
                                {board.cards.sort((a, b) => a.order - b.order).map((card) => {
                                    if (card) {
                                        return (
                                            <div key={card.id} id={card.id} order={card.order} className="card-content">
                                                <div className="card">
                                                    <div className="card-content" style={{paddingBottom: 0}}>
                                                        <p className="card-title">{card.title}</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i>
                                                            {" " + card.created_at}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        console.log(card);
                                        return (
                                            <div>undefined</div>
                                        );
                                    }

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
    openCreateBoardModal: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    editBoard: PropTypes.func.isRequired
};

export default BoardList;