import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import UploadButton from "../../../../components/common/uploadButton/UploadButton";

const UploadAttachmentPopover = ({toggle, handleChange}) => {
    return (
        <div className="kt-overlay" style={{width: "250px", marginLeft: -50}}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <h4>Đính kèm từ</h4>
            <ListGroup>
                <ListGroupItem className="kt-btn-upload-attachment-container">
                    <UploadButton
                        className="kt-btn-upload-attachment"
                        onChange={handleChange}>
                        <div>Máy tính</div>
                    </UploadButton>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
};
UploadAttachmentPopover.propTypes = {
    toggle: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default UploadAttachmentPopover;