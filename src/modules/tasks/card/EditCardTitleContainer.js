import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, FormControl, FormGroup, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {updateCardTitle} from "../taskApi";
import * as taskActions from "../taskActions";

// Import actions here!!

class EditCardTitleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            card: {},
            isSaving: false
        };
        this.close = this.close.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.open = this.open.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            card: nextProps.card
        });
    }

    save() {
        const {card} = this.state;
        updateCardTitle(card);
        this.setState({
            showModal: false
        });
        this.props.taskActions.updateCardData(card);
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    handleOnChange(event) {
        const card = {
            ...this.props.card,
            title: event.target.value
        };
        this.setState({card});
    }

    render() {
        const editTooltip = (
            <Tooltip id="tooltip">Chỉnh sửa tiêu đề</Tooltip>
        );
        return (
            <div style={{display: "inline-block"}}>
                {
                    !this.props.isLoading && (
                        <OverlayTrigger placement="right" overlay={editTooltip}>
                            <a onClick={this.open} className="card-modal-button">
                                <i className="material-icons">edit</i>
                            </a>
                        </OverlayTrigger>
                    )
                }

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa tiêu đề thẻ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup style={{marginTop: 0}} controlId="formControlsTextarea">
                            <FormControl
                                style={{minHeight: 150}}
                                name="title"
                                onChange={this.handleOnChange}
                                value={this.state.card.title}
                                componentClass="textarea"
                                placeholder="Nhập nội dung"/>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button className="btn-rose" onClick={this.save}>Lưu</Button>
                        <Button onClick={this.close}>Đóng</Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

EditCardTitleContainer.propTypes = {
    card: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCardTitleContainer);