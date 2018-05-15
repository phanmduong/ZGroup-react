import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../../components/common/Avatar";
import Switch from "../../../components/common/Switch";

const ProjectMemberPopover = ({
                                  setAdmin, toggle, member, assignProjectMember
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
                    <Switch
                        onText="Quản trị viên"
                        offText="Thành viên"
                        onChange={setAdmin}
                        value={member.is_admin || false}/>
                    <button onClick={assignProjectMember} className="btn btn-default btn-sm">Xoá khỏi dự án</button>
                </div>
            </div>
        </div>
    );
};

ProjectMemberPopover.propTypes = {
    member: PropTypes.object.isRequired,
    assignProjectMember: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    setAdmin: PropTypes.func.isRequired
};

export default ProjectMemberPopover;