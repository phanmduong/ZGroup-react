import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import App from "../components/App";
// Import actions here!!
import * as loginActions from "../modules/login/loginActions";
import * as helper from "../helpers/helper";
import {Modal} from "react-bootstrap";
import RuleContainer from "../modules/rule/RuleContainer";
import GlobalLoadingContainer from "../modules/globalLoading/GlobalLoadingContainer";
import FirstLoginContainer from "../modules/firstLogin/FirstLoginContainer";

let self;

class AppContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLogOut = this.onLogOut.bind(this);
        self = this;

        this.state = {
            showModalRule: false,
        };
        this.openModalRule = this.openModalRule.bind(this);
        this.closeModalRule = this.closeModalRule.bind(this);
        /* eslint-disable */
        if (
            this.props.user &&
            this.props.user.role !== 0 &&
            this.props.user.id > 0 &&
            window.OneSignal
        ) {
            helper.onesignalSetUserId(this.props.user.id);
            /* eslint-disable */
            if (window.OneSignal) {
                window.OneSignal.sendTag("device_type", "manage", function (tagsSent,) {
                    console.log("tag ok ", tagsSent);
                });
            }

            /* eslint-enable */
        }
        /* eslint-enable */
    }

    componentWillMount() {
        this.checkToken();
        this.props.loginActions.getUserLocal();
    }

    componentDidUpdate() {
        helper.initMaterial();
    }

    checkToken() {
        let tokenLocal = helper.getTokenLocal();
        tokenLocal
            .then(function () {
                self.props.loginActions.getUserLocal();
            })
            .catch(function () {
                self.onLogOut();
            });

        let token = localStorage.getItem("token");
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
        helper.closeSidebar();
        helper.removeDataLoginLocal();
        helper.onesignalSetUserId(0);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        /* eslint-disable */
        if (process.env.NODE_ENV === "production") {
            window.open("/logout", "_self");
        } else {
            this.props.router.push('/login');
        }
        /* eslint-enable */

    }

    closeModalRule() {
        this.setState({showModalRule: false});
    }

    openModalRule() {
        this.setState({
            showModalRule: true,
        });
    }

    render() {
        return (
            <div>


                <GlobalLoadingContainer/>

                <FirstLoginContainer/>

                <App
                    pathname={this.props.location.pathname}
                    {...this.props}
                    onLogOut={this.onLogOut}
                    openModalRule={this.openModalRule}
                />
                <Modal
                    show={this.state.showModalRule}
                    onHide={this.closeModalRule}
                    bsSize="large"
                >
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
    location: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
