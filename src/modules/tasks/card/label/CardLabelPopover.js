import React from 'react';
import PropTypes from 'prop-types';
// import {ListGroup, ListGroupItem} from "react-bootstrap";
// import UploadButton from "../../../../components/common/uploadButton/UploadButton";
// import Loading from "../../../../components/common/Loading";

const CardLabelPopover = ({toggle}) => {
    return (
        <div className="kt-overlay" style={{width: "300px", marginLeft: -30}}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <h4>Nhãn</h4>
        </div>
    );
};
CardLabelPopover.propTypes = {
    toggle: PropTypes.func.isRequired,
    // files: PropTypes.array.isRequired,
    // handleChange: PropTypes.func.isRequired
};

export default CardLabelPopover;