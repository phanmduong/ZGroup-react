import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import * as boardActions from './boardActions';
import Loading from "../../../components/common/Loading";

class ArchiveBoardsModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showModal && !this.props.showModal) {
            this.props.boardActions.loadArchiveBoards(nextProps.projectId);
        }
    }

    close() {
        this.props.boardActions.showArchiveBoardsModal(false);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Bảng đã lưu trữ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <ListGroup>
                                {
                                    this.props.boards && this.props.boards.map(
                                        (board) => (
                                            <ListGroupItem
                                                key={board.id}
                                                style={{display: "flex", justifyContent: "space-between"}}>
                                                <span>{board.title}</span>
                                                <a onClick={() => this.props.boardActions.unarchiveBoard(board)}>
                                                    <i className="material-icons">unarchive</i>
                                                </a>
                                            </ListGroupItem>
                                        )
                                    )
                                }
                            </ListGroup>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ArchiveBoardsModalContainer.propTypes = {
    boardActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    projectId: PropTypes.number.isRequired,
    boards: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.archiveBoard.showModal,
        isLoading: state.task.archiveBoard.isLoading,
        boards: state.task.archiveBoard.boards
    };
}

function mapDispatchToProps(dispatch) {
    return {
        boardActions: bindActionCreators(boardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveBoardsModalContainer);