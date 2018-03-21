import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventActions from "../actions/eventActions";
import { Modal } from "react-bootstrap";
import ImageUploader from "../../../components/common/ImageUploader";

class StoreEventModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
    }

    handleFormUpdate(field, value) {
        const event = {
            ...this.props.event,
        };
        event[field] = value;
        this.props.eventActions.updateEventFormData(event);
    }

    render() {
        const { props } = this;
        return (
            <Modal
                id="store-event-modal"
                show={props.showStoreEventModal}
                bsStyle="primary"
                onHide={() => {}}
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <strong>Sự kiện</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-post">
                        <div className="container-fluid">
                            <div className="row">
                                <label className="label-control">
                                    Ảnh đại diện
                                </label>
                                <ImageUploader
                                    tooltipText="Chọn ảnh đại diện"
                                    handleFileUpload={url =>
                                        this.handleFormUpdate("avatar_url", url)
                                    }
                                    image_url={props.event.avatar_url}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

StoreEventModalContainer.propTypes = {
    eventActions: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    showStoreEventModal: PropTypes.bool.isRequired,
};

export default connect(
    state => {
        const { event, showStoreEventModal } = state.event;
        return { event, showStoreEventModal };
    },
    dispatch => {
        return {
            eventActions: bindActionCreators(eventActions, dispatch),
        };
    },
)(StoreEventModalContainer);
