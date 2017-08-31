import React from 'react';
import PropTypes from 'prop-types';
import FormInputDateTime from "../../../../components/common/FormInputDateTime";
import Loading from "../../../../components/common/Loading";

const DeadlinePopover = ({toggle, handleChange, saveDeadline, isSavingDeadline}) => {
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
                {
                    isSavingDeadline ? <Loading/> : (
                        <div>
                            <button onClick={saveDeadline} className="btn btn-rose">Lưu</button>
                            {/*<button onClick={saveDeadline} className="btn btn-rose">Xoá</button>*/}
                        </div>
                    )
                }
            </div>
        </div>
    );
};
DeadlinePopover.propTypes = {
    toggle: PropTypes.func.isRequired,
    isSavingDeadline: PropTypes.bool.isRequired,
    saveDeadline: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default DeadlinePopover;