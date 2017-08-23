import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import * as taskActions from '../taskActions';
import ReactEditor from "../../../components/common/ReactEditor";
import {BASE_URL} from '../../../constants/env';

class CardDetailModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateEditor = this.updateEditor.bind(this);
        this.toggleEditCardDescription = this.toggleEditCardDescription.bind(this);
        this.state = {
            isEditing: false
        };
    }

    updateEditor(content) {
        this.props.taskActions.updateCardDescription(content);
    }

    toggleEditCardDescription() {
        // this.props.taskActions.editCardDescription();
        this.setState({
            isEditing: !this.state.isEditing
        });
    }


    render() {
        const editTooltip = (
            <Tooltip id="tooltip">Chỉnh sửa mô tả công việc</Tooltip>
        );
        return (
            <Modal show={this.props.showModal}
                   bsSize="large" aria-labelledby="contained-modal-title-lg"
                   onHide={this.props.taskActions.closeCardDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="card-modal-title">{this.props.card.title}</Modal.Title>
                    <p> Trong bảng <strong>{this.props.card.board && this.props.card.board.title}</strong></p>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        <strong>Mô tả</strong>
                        <OverlayTrigger placement="right" overlay={editTooltip}>
                            <a className="card-modal-button" onClick={this.toggleEditCardDescription}>
                                <i className="material-icons">edit</i>
                            </a>
                        </OverlayTrigger>
                    </h4>
                    {
                        this.state.isEditing ? (
                            <ReactEditor
                                urlPost={BASE_URL + "/upload-image?token=" + localStorage.getItem('token')}
                                fileField="image"
                                value={this.props.card.description}
                                updateEditor={this.updateEditor}/>
                        ) : (
                            <div dangerouslySetInnerHTML={{__html: this.props.card.description}}>
                            </div>
                        )
                    }


                </Modal.Body>
            </Modal>
        );
    }
}

CardDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.cardDetail.showModal,
        isEditing: state.task.cardDetail.isEditing,
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailModalContainer);