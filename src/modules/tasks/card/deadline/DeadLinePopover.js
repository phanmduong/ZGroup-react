import React from 'react';
import PropTypes from 'prop-types';
import FormInputDateTime from "../../../../components/common/FormInputDateTime";

const DeadlinePopover = ({toggle, handleChange, saveDeadline}) => {
    return (
        <div className="kt-overlay" style={{width: "300px", marginLeft: -30}}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <h4>Sửa hạn chót</h4>
            <div>
                <FormInputDateTime name="dateline" id="deadline" updateFormData={handleChange}/>
                <button onClick={saveDeadline} className="btn btn-rose">Lưu</button>
                <button onClick={saveDeadline} className="btn btn-rose">Xoá</button>
            </div>
        </div>
    );
};
DeadlinePopover.propTypes = {
    toggle: PropTypes.func.isRequired,
    saveDeadline: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default DeadlinePopover;