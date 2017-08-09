import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import App from '../components/App';
// Import actions here!!
import * as loginActions from '../actions/loginActions';

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLogOut = this.onLogOut.bind(this);
    }

    onLogOut() {
        localStorage.removeItem('token');
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
