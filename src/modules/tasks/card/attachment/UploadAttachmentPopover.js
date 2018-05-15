import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import UploadButton from "../../../../components/common/uploadButton/UploadButton";
import Loading from "../../../../components/common/Loading";
import UrlAttachContainer from "./UrlAttachContainer";

const UploadAttachmentPopover = ({toggle, handleChange, files, card, addToComment}) => {
    return (
        <div className="kt-overlay" style={{width: "300px", marginLeft: -30}}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <h4>Đính kèm từ</h4>
            {
                files.length > 0 ?
                    (
                        <div>
                            {
                                files.map((fileWrapper) => (
                                    <div key={fileWrapper.index}>
                                        {fileWrapper.progress >= 100 ?
                                            <Loading text={"Hệ thống đang xử lý..."}/>
                                            : <Loading text={"Đang tải lên... " + fileWrapper.progress + "%"}/>}

                                        <div>{fileWrapper.name}</div>
                                        <div className="progress progress-line">
                                            <div className="progress-bar progress-bar-rose"
                                                 role="progressbar" aria-valuenow="60" aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{width: fileWrapper.progress + "%"}}>
                                                <span className="sr-only">{fileWrapper.progress}% Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
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
                            <ListGroupItem className="kt-btn-upload-attachment-container">
                                <div style={{paddingLeft: 15}}>
                                    <UrlAttachContainer
                                        addToComment={addToComment}
                                        card={card}/>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    )
            }
        </div>
    );
};
UploadAttachmentPopover.propTypes = {
    toggle: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    files: PropTypes.array.isRequired,
    addToComment: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default UploadAttachmentPopover;