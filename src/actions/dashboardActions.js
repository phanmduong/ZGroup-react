import * as types from '../constants/actionTypes';
import * as dashboardApi from "../apis/DashboardApi";
import * as helper from '../helpers/helper';

export function loadDashboardData(genId) {
  return function (dispatch) {
    dispatch({type: types.BEGIN_LOAD_DASHBOARD_DATA});
    dashboardApi.loadDashboardData(genId)
      .then(function (res) {
        const totalMoney = helper.numberWithCommas(res.data.total_money / 1000);
        dispatch({
          type: types.LOAD_DASHBOARD_DATA,
          registers_count: 20,
          total_money: totalMoney,
          registers_number: res.data.register_number,
          paid_number: res.data.paid_number,
          remain_days: res.data.remain_days,
          date_array: res.data.date_array,
          money_by_date: res.data.money_by_date,
          classes: res.data.classes,
          registers_by_date: res.data.registers_by_date,
          paid_by_date: res.data.paid_by_date,
          registers_by_hour: res.data.registers_by_hour,
          orders_by_hour: res.data.orders_by_hour,
          month_ago: res.data.month_ago,
          uncalled_number: res.data.uncalled_number,
          zero_paid_num: res.data.zero_paid_num,
          total_classes: res.data.total_classes,
        });
      });
  };
}
