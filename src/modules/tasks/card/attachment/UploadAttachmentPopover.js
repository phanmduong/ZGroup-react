import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import UploadButton from "../../../../components/common/uploadButton/UploadButton";
import Loading from "../../../../components/common/Loading";

const UploadAttachmentPopover = ({toggle, handleChange, isUploading, progress}) => {
    return (
        <div className="kt-overlay" style={{width: "300px", marginLeft: -100}}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <h4>Đính kèm từ</h4>
            {
                isUploading ?
                    (
                        <div>
                            <Loading text={"Đang tải lên... " + progress + "%"}/>
                            <div className="progress progress-line">
                                <div className="progress-bar progress-bar-rose"
                                     role="progressbar" aria-valuenow="60" aria-valuemin="0"
                                     aria-valuemax="100"
                                     style={{width: progress + "%"}}>
                                    <span className="sr-only">{progress}% Complete</span>
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <ListGroup>
                            <ListGroupItem className="kt-btn-upload-attachment-container">
                                <UploadButton
                                    className="kt-btn-upload-attachment"
                                    onChange={handleChange}>
                                    <div>Máy tính</div>
                                </UploadButton>
                            </ListGroupItem>
                        </ListGroup>
                    )
            }
        </div>
    );
};
UploadAttachmentPopover.propTypes = {
    toggle: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default UploadAttachmentPopover;