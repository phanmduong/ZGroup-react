import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import App from '../components/App';
// Import actions here!!
import * as loginActions from '../modules/login/loginActions';
import * as helper from '../helpers/helper';


let self;
class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLogOut = this.onLogOut.bind(this);
        self = this;
    }

    componentWillMount() {
        this.checkToken();
        this.props.loginActions.getUserLocal();
    }

    checkToken(){
        let tokenLocal = helper.getTokenLocal();
        tokenLocal.then(function () {
            self.props.loginActions.getUserLocal();
        }).catch(function () {
            self.onLogOut();
        });

        let token = localStorage.getItem('token');
        if (token === null || token.trim() === '') {
            this.onLogOut();
        }
        else {
            this.props.loginActions.getUserLocal();
        }
    }

    onLogOut() {
        helper.removeDataLoginLocal();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.context.router.push('login');
        this.props.loginActions.logOut();
    }

    render() {
        return (
            <App
                pathname={this.props.location.pathname}
                {...this.props}
                onLogOut={this.onLogOut}
            />
        );
    }
}


DashboardContainer.contextTypes = {
    router: PropTypes.object
};

DashboardContainer.propTypes={
    loginActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
