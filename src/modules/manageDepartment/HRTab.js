import React                    from 'react';
import {Link} from 'react-router';
import PropTypes from "prop-types";

class HRTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {};
    }

    render(){
        return(
            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                <li className={this.props.path == "manage/quan-li-nhan-su" ? "active nav-item" : "nav-item"}>
                    <Link to="hr/manage/quan-li-nhan-su">
                        Nhân viên
                        <div className="ripple-container"/>
                    </Link>
                </li>
                <li className={this.props.path == "manage-role" ? "active nav-item" : " nav-item"}>
                    <Link to="hr/manage-role">
                        Chức vụ
                        <div className="ripple-container"/>
                    </Link>
                </li>
                <li className={this.props.path == "manage-department" ? "active nav-item" : "nav-item"}>
                    <Link to="hr/manage-department">
                        Bộ phận
                        <div className="ripple-container"/>
                    </Link>
                </li>
                <li className={this.props.path == "manage-profile" ? "active nav-item" : "nav-item"}>
                    <Link to="hr/manage-profile">
                        Thông tin cá nhân
                        <div className="ripple-container"/>
                    </Link>
                </li>
            </ul>
        );
    }

}

HRTab.propTypes = {
    path: PropTypes.string,
};


export default (HRTab);
