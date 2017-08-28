import React from 'react';
import PropTypes from 'prop-types';

const UploadAttachmentPopover = ({toggle}) => {
    return (
        <div className="kt-overlay">
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <h4>Đính kèm từ</h4>
        </div>
    );
};
UploadAttachmentPopover.propTypes = {
    toggle: PropTypes.func.isRequired
};

export default UploadAttachmentPopover;