import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import App from "../components/App";
import * as loginActions from "../modules/login/loginActions";
import * as provinceActions from "../actions/provinceActions";
import * as baseActions from "../actions/baseActions";
import * as userActions from "../actions/userActions";
import * as helper from "../helpers/helper";
import {isEmptyInput} from "../helpers/helper";
import {Modal} from "react-bootstrap";
import RuleContainer from "../modules/rule/RuleContainer";
import GlobalLoadingContainer from "../modules/globalLoading/GlobalLoadingContainer";
import GlobalModalContainer from "../modules/globalModal/GlobalModalContainer";
import MyTaskContainer from "../modules/myTasks/MyTaskContainer";
import Sidebar from "react-sidebar";


class AppContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLogOut = this.onLogOut.bind(this);

        this.state = {
            showModalRule: false,
            sidebarOpen: false,
            totalTaskNotComplete: 0
        };
        this.openModalRule = this.openModalRule.bind(this);
        this.closeModalRule = this.closeModalRule.bind(this);

    }

    onSetSidebarOpen = (status) => {
        this.setState({sidebarOpen: status});
    };

    componentWillMount() {
        this.checkToken();
        this.props.loginActions.getUserLocal();
        this.props.provinceActions.loadAllProvinces();
        this.props.baseActions.loadAllBases();
        if (this.props.location.query && this.props.location.query) {
            this.onChangeBase(this.props.location.query.base_id);
        }
    }

    componentDidUpdate() {
        helper.initMaterial();
        /* eslint-disable */
        if (this.props.user && this.props.user.role !== 0 && this.props.user.id > 0) {
            console.log('send tag user_id');
            if (window.sendTagNoti) {
                window.sendTagNoti('user_id', this.props.user.id);
            }

            /* eslint-enable */
        }
        /* eslint-enable */
    }

    checkToken() {


        let token = helper.getStorage('token');
        let user = JSON.parse(localStorage.getItem("user"));
        if (user === null || user.role === null || user.role === 0) {
            this.onLogOut();
        }
        if (token === null || token.trim() === "") {
            this.onLogOut();
        } else {
            this.props.loginActions.getUserLocal();
        }
    }

    onLogOut() {
        helper.confirm('warning', 'Đăng xuất', 'Bạn có chắc muốn đăng xuất khỏi hệ thống?',
            () => {
                helper.closeSidebar();
                helper.removeDataLoginLocal();
                helper.onesignalSetUserId(0);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                /* eslint-disable */
                if (process.env.NODE_ENV === "production") {
                    window.open("/logout", "_self");
                } else {
                    this.props.router.push("/login");
                }
                /* eslint-enable */
            }
        );

    }

    closeModalRule() {
        this.setState({showModalRule: false});
    }

    openModalRule() {
        this.setState({
            showModalRule: true,
        });
    }

    updateTotalTask = (number) => {
        this.setState({totalTaskNotComplete: number});
    };

    onChangeProvince = (provinceId) => {
        let user = {...this.props.user};
        user.choice_province_id = provinceId;
        localStorage.setItem("user", JSON.stringify(user));
        userActions.choiceProvince(provinceId);
    };

    onChangeBase = (baseID) => {
        this.props.baseActions.selectedBase(baseID);
    };

    render() {

        return (
            <div>
                {this.props.user && !isEmptyInput(this.props.user.id) &&
                <Sidebar
                    sidebar={<MyTaskContainer updateTotalTask={this.updateTotalTask} user={this.props.user}/>}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{sidebar: {background: "white"}, root: {zIndex: this.state.sidebarOpen ? 1040 : 0}}}
                    pullRight
                >
                    <div/>
                </Sidebar>
                }

                <GlobalLoadingContainer/>

                {/*<FirstLoginContainer/>*/}
                <GlobalModalContainer/>
                <App
                    pathname={this.props.location.pathname}
                    {...this.props}
                    onLogOut={this.onLogOut}
                    openModalRule={this.openModalRule}
                    onSetSidebarOpen={this.onSetSidebarOpen}
                    totalTaskNotComplete={this.state.totalTaskNotComplete}
                    onChangeProvince={this.onChangeProvince}
                    onChangeBase={this.onChangeBase}

                />

                <Modal show={this.state.showModalRule} onHide={this.closeModalRule} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3>
                                <strong>NỘI QUY VÀ QUY ĐỊNH THƯỞNG PHẠT</strong>
                            </h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RuleContainer/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

AppContainer.contextTypes = {
    router: PropTypes.object,
};

AppContainer.propTypes = {
    loginActions: PropTypes.object.isRequired,
    provinceActions: PropTypes.object.isRequired,
    baseActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    selectedBaseId: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
        provinces: state.global.provinces,
        bases: state.global.bases,
        selectedBaseId: state.global.selectedBaseId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        provinceActions: bindActionCreators(provinceActions, dispatch),
        baseActions: bindActionCreators(baseActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
