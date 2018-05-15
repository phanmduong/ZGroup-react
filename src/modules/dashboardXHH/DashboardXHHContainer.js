/**
 * Created by phanmduong on 9/3/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from '../../components/common/Loading';
import * as dashboardXHHActions from './dashboardXHHActions';
import DashboardXHHComponent from './DashboardXHHComponent';
import PropTypes from 'prop-types';


class DashboardXHHContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.dashboardXHHActions.loadDashboardData();
    }

    render() {
        return (
            <div>

                {this.props.isLoading ? <Loading/> :
                    (
                        <DashboardXHHComponent
                            {...this.props}
                        />
                    )
                }
            </div>
        )
            ;
    }
}

DashboardXHHContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dashboard: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dashboardXHHActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.dashboardXHH.isLoading,
        dashboard: state.dashboardXHH.dashboard,
        user: state.dashboardXHH.dashboard.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardXHHActions: bindActionCreators(dashboardXHHActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardXHHContainer);
