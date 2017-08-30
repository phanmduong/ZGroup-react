import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as taskActions from '../taskActions';
import CardBody from "./CardBody";
import Loading from "../../../components/common/Loading";

class CardDetailModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateEditor = this.updateEditor.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.toggleEditCardDescription = this.toggleEditCardDescription.bind(this);
        this.state = {
            isEditing: false,
            description: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.card.id && nextProps.card.id) {
            this.props.taskActions.loadCardDetail(nextProps.card.id);
        }
        this.setState({
            description: nextProps.card.description
        });
    }

    updateEditor(content) {
        this.setState({
            description: content
        });
    }

    toggleEditCardDescription() {
        // this.props.taskActions.editCardDescription();
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    saveCard() {
        this.props.taskActions
            .saveCard({...this.props.card, description: this.state.description})
            .then(() => {
                this.toggleEditCardDescription();
            });
    }

    cancelEdit() {
        this.setState({
            isEditing: false,
            description: this.props.card.description
        });
    }


    render() {

        return (
            <Modal
                enforceFocus={false}
                show={this.props.showModal}
                bsSize="large" aria-labelledby="contained-modal-title-lg"
                onHide={this.props.taskActions.closeCardDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="card-modal-title">{this.props.card.title}</Modal.Title>
                    <p> Trong bảng <strong>{this.props.card.board && this.props.card.board.title}</strong></p>
                </Modal.Header>
                <Modal.Body style={{paddingTop: 0}}>
                    {
                        this.props.isLoading ?
                            <Loading/> : (
                                <CardBody
                                    deleteFile={this.props.taskActions.deleteFile}
                                    toggleEditCardDescription={this.toggleEditCardDescription}
                                    isSavingCard={this.props.isSavingCard}
                                    description={this.state.description}
                                    updateEditor={this.updateEditor}
                                    saveCard={this.saveCard}
                                    cancelEdit={this.cancelEdit}
                                    isEditing={this.state.isEditing}
                                    card={this.props.card}/>
                            )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

CardDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSavingCard: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.cardDetail.showModal,
        isLoading: state.task.cardDetail.isLoading,
        isSavingCard: state.task.cardDetail.isSavingCard,
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailModalContainer);