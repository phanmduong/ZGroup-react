import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomePage from '../components/dashboard/Dashboard';
// import Loading from '../components/common/Loading';
// import GenList from '../components/dashboard/GenList';
// import Header from '../components/common/Header';

// Import actions here!!
import * as dashboardActions from '../actions/dashboardActions';
import * as gensActions from '../actions/gensActions';
import * as loginActions from '../actions/loginActions';

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadDashboardDataGen = this.loadDashboardDataGen.bind(this);
        this.changeGen = this.changeGen.bind(this);
    }

    componentWillMount() {
        this.props.gensActions.loadGensData();
    }

    componentDidUpdate() {

    }

    loadDashboardDataGen(genId) {
        this.props.dashboardActions.loadDashboardData(genId);
    }

    changeGen(event) {
        let genId = event.target.value;
        this.props.dashboardActions.loadDashboardData(genId);
    }

    render() {
        // return (
        //     <div id="page-wrapper">
        //
        //         <div className="container-fluid">
        //
        //             <Header header="Thống kê tổng quan" title="Trang chủ" iconTitle="fa fa-fw fa-dashboard"/>
        //
        //             {this.props.genIsLoading ? ( <Loading/>) : (
        //                 <div>
        //                     <GenList genList={this.props.genList} onChange={this.changeGen}
        //                              loadDashboardDataGen={this.loadDashboardDataGen}/>
        //                     {this.props.isLoading ? (
        //                         <Loading/>) : (
        //                         < HomePage registers_count={this.props.registers_count}
        //                                    total_money={this.props.total_money}
        //                                    registers_number={this.props.registers_number}
        //                                    paid_number={this.props.paid_number}
        //                                    remain_days={this.props.remain_days} date_array={this.props.date_array}
        //                                    money_by_date={this.props.money_by_date} classes={this.props.classes}
        //                                    registers_by_date={this.props.registers_by_date}
        //                                    paid_by_date={this.props.paid_by_date}
        //                                    registers_by_hour={this.props.registers_by_hour}
        //                                    orders_by_hour={this.props.orders_by_hour}
        //                                    uncalled_number={this.props.uncalled_number}
        //                                    zero_paid_num={this.props.zero_paid_num}
        //                                    total_classes={this.props.total_classes}
        //                                    month_ago={this.props.month_ago}
        //                                    loadDashboardDataGen={this.loadDashboardDataGen}
        //                         />
        //                     )}</div>
        //             )};
        //         </div>
        //     </div>
        // );
        return (
            <HomePage registers_count={this.props.registers_count}
                                           total_money={this.props.total_money}
                                           registers_number={this.props.registers_number}
                                           paid_number={this.props.paid_number}
                                           remain_days={this.props.remain_days} date_array={this.props.date_array}
                                           money_by_date={this.props.money_by_date} classes={this.props.classes}
                                           registers_by_date={this.props.registers_by_date}
                                           paid_by_date={this.props.paid_by_date}
                                           registers_by_hour={this.props.registers_by_hour}
                                           orders_by_hour={this.props.orders_by_hour}
                                           uncalled_number={this.props.uncalled_number}
                                           zero_paid_num={this.props.zero_paid_num}
                                           total_classes={this.props.total_classes}
                                           month_ago={this.props.month_ago}
                                           loadDashboardDataGen={this.loadDashboardDataGen}
                                />
        );
    }
}

DashboardContainer.propTypes = {
    dashboardActions: PropTypes.object.isRequired,
    gensActions: PropTypes.object.isRequired,
    loginActions: PropTypes.object.isRequired,
    registers_count: PropTypes.number.isRequired,
    total_money: PropTypes.string.isRequired,
    registers_number: PropTypes.number.isRequired,
    paid_number: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    remain_days: PropTypes.number.isRequired,
    date_array: PropTypes.array.isRequired,
    money_by_date: PropTypes.array.isRequired,
    classes: PropTypes.array.isRequired,
    registers_by_date: PropTypes.array.isRequired,
    paid_by_date: PropTypes.array.isRequired,
    registers_by_hour: PropTypes.array.isRequired,
    orders_by_hour: PropTypes.array.isRequired,
    month_ago: PropTypes.array.isRequired,
    uncalled_number: PropTypes.number.isRequired,
    zero_paid_num: PropTypes.number.isRequired,
    total_classes: PropTypes.number.isRequired,
    genList: PropTypes.array.isRequired,
    genIsLoading: PropTypes.bool.isRequired
};

DashboardContainer.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        registers_count: state.dashboard.registers_count,
        total_money: state.dashboard.total_money,
        registers_number: state.dashboard.registers_number,
        paid_number: state.dashboard.paid_number,
        isLoading: state.dashboard.isLoading,
        remain_days: state.dashboard.remain_days,
        date_array: state.dashboard.date_array,
        money_by_date: state.dashboard.money_by_date,
        classes: state.dashboard.classes,
        registers_by_date: state.dashboard.registers_by_date,
        paid_by_date: state.dashboard.paid_by_date,
        registers_by_hour: state.dashboard.registers_by_hour,
        orders_by_hour: state.dashboard.orders_by_hour,
        month_ago: state.dashboard.month_ago,
        uncalled_number: state.dashboard.uncalled_number,
        zero_paid_num: state.dashboard.zero_paid_num,
        total_classes: state.dashboard.total_classes,
        genList: state.genList.gens,
        genIsLoading: state.genList.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
        gensActions: bindActionCreators(gensActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
