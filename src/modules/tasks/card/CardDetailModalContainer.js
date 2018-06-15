import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as taskActions from '../taskActions';
import CardBody from "./CardBody";
import Loading from "../../../components/common/Loading";
import socket from '../../../services/socketio';
import {CHANNEL} from "../../../constants/env";
import * as addChildGoodActions from '../../good/addChildGood/addChildGoodActions';
import EditCardTitleContainer from "./EditCardTitleContainer";

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

    componentWillMount() {
        const channel = CHANNEL + ":card_comment";
        socket.on(channel, (comment) => {
            if (this.props.card.id === Number(comment.card_id)) {
                this.props.taskActions.saveCardCommentSuccess(comment);
            }

        });
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
        let barcode = {
            value : "Không có",
            image_url : '',
        };
        if(this.props.card.good && this.props.card.good.barcode ){
            barcode = this.props.card.good.barcode;
        }
        return (
            <Modal
                enforceFocus={false}
                show={this.props.showModal}
                bsSize="large" aria-labelledby="contained-modal-title-lg"
                onHide={this.props.taskActions.closeCardDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="card-modal-title">
                        {this.props.card.title}


                        <EditCardTitleContainer isLoading={this.props.isLoading}/>


                    </Modal.Title>
                    <p>
                        Trong bảng <strong>{this.props.card.board && this.props.card.board.title}</strong>
                        <small style={{color: "#8f8f8f"}}> - {this.props.card.deadline_elapse}</small>
                    </p>
                    <p>
                        Barcode <br/> <strong>{barcode.value}</strong>
                        {barcode.image_url && (
															<img
																style={{
																	height: '25px',
                                                                    width: '150px',
                                                                    marginLeft: 10
																}}
																src={barcode.image_url}
																alt=""
															/>
														)}
                    </p>
                </Modal.Header>
                <Modal.Body style={{paddingTop: 0}}>
                    {
                        this.props.isLoading ?
                            <Loading/> : (
                                <CardBody
                                    openAddChildGoodModal={() => this.props.addChildGoodActions.showAddChildGoodModal(true)}
                                    isProcess={this.props.isProcess}
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
    addChildGoodActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isProcess: PropTypes.bool,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.cardDetail.showModal,
        isLoading: state.task.cardDetail.isLoading,
        user: state.login.user,
        isSavingCard: state.task.cardDetail.isSavingCard,
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addChildGoodActions: bindActionCreators(addChildGoodActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailModalContainer);