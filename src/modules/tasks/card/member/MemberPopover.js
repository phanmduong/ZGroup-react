import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../../../components/common/Avatar";

const MemberPopover = ({
                           toggle, member, assignMember
                       }) => {
    return (
        <div className="kt-overlay" style={{marginTop: 2}}>
            <button
                onClick={toggle}
                type="button" className="close"
                style={{color: '#5a5a5a'}}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
            </button>
            <div style={{display: "flex"}}>
                <Avatar url={member.avatar_url} size={50}/>
                <div style={{margin: "0px 40px 0 5px"}}>
                    <div><strong>{member.name}</strong></div>
                    <div className="quite">{member.email}</div>
                    <button onClick={assignMember} className="btn btn-default btn-sm">Gỡ bỏ khỏi thẻ</button>
                </div>
            </div>
        </div>
    );
};

MemberPopover.propTypes = {
    member: PropTypes.object.isRequired,
    assignMember: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};

export default MemberPopover;