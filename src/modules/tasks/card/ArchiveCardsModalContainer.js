import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import {Button, Modal} from "react-bootstrap";
import Loading from "../../../components/common/Loading";
import CardItem from "./CardItem";


class ArchiveCardsModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            page: 1
        };
    }


    close() {
        this.props.taskActions.closeArchiveCardModal();
    }



    loadMore() {
        this.props.taskActions.loadArchiveCards(this.props.projectId, this.state.page + 1);
        this.setState({
            page: this.state.page + 1
        });
    }



    render() {

        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Lưu trữ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.cards.map((card) => {
                        return (
                            <CardItem
                                unarchiveCard={this.props.taskActions.unarchiveCard}
                                key={card.id}
                                openCardDetailModal={this.props.taskActions.openCardDetailModal}
                                updateCardInBoard={this.props.taskActions.updateCardInBoard}
                                card={card}/>
                        );
                    })}
                    {
                        !this.props.isEmpty && (
                            <div style={{textAlign: "center"}}>
                                {
                                    this.props.isLoading ? <Loading/> :
                                        <Button onClick={this.loadMore}>Tải thêm</Button>
                                }
                            </div>
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

ArchiveCardsModalContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    projectId: PropTypes.number.isRequired,
    cards: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.task.archiveCard.isLoading,
        cards: state.task.archiveCard.cards,
        isEmpty: state.task.archiveCard.isEmpty,
        showModal: state.task.archiveCard.showModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveCardsModalContainer);