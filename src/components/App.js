 import React from "react";
import {NAME_COMPANY, LOGO_SIDEBAR, NO_AVATAR} from "../constants/env";
import Loading from "./common/Loading";
import PropTypes from "prop-types";
import TabContainer from "../modules/tab/TabContainer";
import {Link} from "react-router";
import * as helper from "../helpers/helper";
import NotificationContainer from "../modules/notification/NotificationContainer";
import Select from "./common/Select";
// import Select from "./common/Select";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
    componentDidMount() {
        helper.initMaterial();
    }

    onOpenNav = () => {
        let main_panel_height = $('.main-panel')[0].scrollHeight;
        let $layer = $('<div class="close-layer"></div>');
        $layer.css('height', main_panel_height + 'px');
        $layer.appendTo(".main-panel");

        setTimeout(function () {
            $layer.addClass('visible');
        }, 100);

        $layer.click(function () {
            $('html').removeClass('nav-open');

            $layer.removeClass('visible');

            setTimeout(function () {
                $layer.remove();
            }, 400);
        });

        $('html').addClass('nav-open');
    }

    render() {
        let avatar = helper.avatarEmpty(this.props.user ? this.props.user.avatar_url : "")
            ? NO_AVATAR
            : this.props.user.avatar_url;

        // let provinces = this.props.provinces ? this.props.provinces.map((province) => {
        //     return {key: province.id, value: province.name};
        // }) : [];
        // provinces = [{key: 0, value: "T.cả t.phố"}, ...provinces];
        //
        // let bases = this.props.bases ? this.props.bases.filter((base) => {
        //     if (this.props.user && this.props.user.choice_province_id > 0) {
        //         return base.district.province.id == this.props.user.choice_province_id;
        //     } else {
        //         return true;
        //     }
        // }).map((base) => {
        //     return {key: base.id, value: base.name};
        // }) : [];
        // bases = [{key: 0, value: "Tất cả cơ sở"}, ...bases];

        return (
            <div className="wrapper">
                <div
                    className="sidebar"
                    data-active-color="rose"
                    data-background-color="white"
                    data-image="#">
                    <div className="logo">
                        <Link to="/" className="simple-text">
                            {NAME_COMPANY}
                        </Link>
                    </div>
                    <div className="logo logo-mini">
                        <Link to="/" className="simple-text">
                            <img src={LOGO_SIDEBAR} className="logo-sidebar"/>
                        </Link>
                    </div>
                    <div className="sidebar-wrapper">
                        <div className="user">
                            <div className="photo">
                                <div
                                    className="img"
                                    style={{
                                        background: "url(" + avatar + ") center center / cover",
                                        width: "80px",
                                        height: "80px",
                                    }}
                                />
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="#collapseExample" className="collapsed">

                                    {this.props.user ? this.props.user.name : ""}
                                    <b className="caret"/>
                                </a>
                                <div className="collapse" id="collapseExample">
                                    <ul className="nav">
                                        <li>
                                            <a href="/profile/my-profile">Trang cá nhân</a>
                                        </li>
                                    </ul>
                                    <ul className="nav">
                                        <li>
                                            <a onClick={this.props.onLogOut}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <TabContainer pathname={this.props.pathname}/>
                    </div>
                </div>
                <div className="main-panel">
                    <nav className="navbar navbar-transparent navbar-absolute">
                        <div className="container-fluid">
                            {/*<div className="navbar-minimize">*/}
                            {/*    <button*/}
                            {/*        id="minimizeSidebar"*/}
                            {/*        className="btn btn-round btn-white btn-fill btn-just-icon">*/}
                            {/*        <i className="material-icons visible-on-sidebar-regular">more_vert</i>*/}
                            {/*        <i className="material-icons visible-on-sidebar-mini">view_list</i>*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            <div className="navbar-header flex-wrap">
                                {/*<Link className="navbar-brand" to="/">*/}
                                {/*    {" "}*/}
                                {/*    {NAME_COMPANY}{" "}*/}
                                {/*</Link>*/}


                                <div className="flex flex-row flex-align-items-center custom-dropdown">
                                    <div className="menu-nav-bar cursor-pointer" onClick={this.onOpenNav}
                                         style={{paddingLeft: 10}}>
                                        <i className="material-icons">
                                            menu
                                        </i>
                                        <div className="ripple-container"/>
                                    </div>
                                    {/*<div*/}
                                    {/*    style={{width: 150}}*/}

                                    {/*>*/}
                                    {/*    <Select*/}
                                    {/*        defaultMessage={'Chọn thành phố'}*/}
                                    {/*        options={provinces}*/}
                                    {/*        className="select-transparent"*/}
                                    {/*        value={this.props.user && this.props.user.choice_province_id ? this.props.user.choice_province_id : 0}*/}
                                    {/*        onChange={this.props.onChangeProvince}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {/*<div*/}
                                    {/*    style={{width: 150}}*/}
                                    {/*>*/}
                                    {/*    <Select*/}
                                    {/*        defaultMessage={'Chọn cơ sở'}*/}
                                    {/*        options={bases}*/}
                                    {/*        className="select-transparent"*/}
                                    {/*        value={this.props.selectedBaseId}*/}
                                    {/*        onChange={this.props.onChangeBase}*/}
                                    {/*        // onChange={this.onChangeGen}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </div>

                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a target="_blank"
                                           href="http://help.eduto.net"
                                           style={{padding: "3px 4px"}}>
                                            <button className="btn btn-round"
                                                    style={{backgroundColor: "#0084FF", padding: "8px 17px"}}>
                                                <div
                                                    className="flex flex-row flex-align-items-center flex-space-between width-100">
                                                    <img
                                                        src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1584071954RIklEYciE4gN4i3.png"
                                                        style={{height: 25, width: 'auto', marginRight: 10}}/>
                                                    <div>
                                                        Hướng dẫn
                                                    </div>


                                                </div>
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank"
                                           href={"http://m.me/edutosupport"}
                                           style={{padding: "3px 4px"}}>
                                            <button className="btn btn-round"
                                                    style={{backgroundColor: "#0084FF", padding: "8px 17px"}}>
                                                <div
                                                    className="flex flex-row flex-align-items-center flex-space-between width-100">
                                                    <img
                                                        src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1582862490iGYJTJn7HyGpeRB.png"
                                                        style={{height: 25, width: 'auto', marginRight: 10}}/>
                                                    <div>
                                                        Hỗ trợ
                                                    </div>
                                                </div>
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => this.props.onSetSidebarOpen(true)}>
                                            <i className="material-icons">chrome_reader_mode</i>
                                            {
                                                this.props.totalTaskNotComplete > 0 &&
                                                <span className="notification">{this.props.totalTaskNotComplete}</span>
                                            }
                                            <p className="hidden-lg hidden-md">Công việc</p>
                                        </a>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <a onClick={this.props.openModalRule}>*/}
                                    {/*        <i className="material-icons">info</i>*/}
                                    {/*        <p className="hidden-lg hidden-md">Quy định</p>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}
                                    <NotificationContainer/>
                                    <li>
                                        <a
                                            onClick={this.props.onLogOut}
                                            className="dropdown-toggle"
                                            data-toggle="dropdown">
                                            <i className="material-icons">exit_to_app</i>
                                            <p className="hidden-lg hidden-md">Đăng xuất</p>
                                        </a>
                                    </li>
                                    <li className="separator hidden-lg hidden-md"/>
                                </ul>
                                {/*<form className="navbar-form navbar-right" role="search">*/}
                                {/*    <div className="form-group form-search is-empty">*/}
                                {/*        <input type="text" className="form-control" placeholder="Search"/>*/}
                                {/*        <span className="material-input"/>*/}
                                {/*    </div>*/}
                                {/*    <button type="submit" className="btn btn-white btn-round btn-just-icon">*/}
                                {/*        <i className="material-icons">search</i>*/}
                                {/*        <div className="ripple-container"/>*/}
                                {/*    </button>*/}
                                {/*</form>*/}
                            </div>
                        </div>
                    </nav>
                    <div className="keetool-content">
                        <div className="container-fluid">
                            {!this.props.isLoadingTab ? (
                                this.props.children
                            ) : (
                                <div id="loading-page">
                                    <Loading/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
    pathname: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    onLogOut: PropTypes.func.isRequired,
    openModalRule: PropTypes.func.isRequired,
    isLoadingTab: PropTypes.bool,
};

export default App;
