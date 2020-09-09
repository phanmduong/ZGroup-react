import React                    from 'react';
import {Link} from 'react-router';
import PropTypes from "prop-types";

const navStyle = {borderRadius: 5, textTransform: 'none', margin: 0, padding: '10px 20px'};

class HRTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {};
    }

    render(){
        return(
            <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                <li className={this.props.path == "manage/quan-li-nhan-su" ? "active nav-item" : "nav-item"}>
                    <Link to="hr/manage/quan-li-nhan-su"  style={{
                        ...navStyle
                    }}>
                        Nhân viên
                        <div className="ripple-container"/>
                    </Link>
                </li>
                <li className={this.props.path == "manage-role" ? "active nav-item" : " nav-item"}>
                    <Link to="hr/manage-role" style={{
                        ...navStyle
                    }}>
                        Chức vụ
                        <div className="ripple-container"/>
                    </Link>
                </li>
                <li className={this.props.path == "manage-department" ? "active nav-item" : "nav-item"}>
                    <Link to="hr/manage-department" style={{
                        ...navStyle
                    }}>
                        Phòng ban
                        <div className="ripple-container"/>
                    </Link>
                </li>
                {/*<li className={this.props.path == "manage-profile" ? "active nav-item" : "nav-item"}>*/}
                    {/*<Link to="hr/manage-profile" style={{
                                ...navStyle
                            }}>*/}
                        {/*Thông tin cá nhân*/}
                        {/*<div className="ripple-container"/>*/}
                    {/*</Link>*/}
                {/*</li>*/}
            </ul>
        );
    }

}

HRTab.propTypes = {
    path: PropTypes.string,
};


export default (HRTab);
