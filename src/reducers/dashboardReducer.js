import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case types.BEGIN_LOAD_DASHBOARD_DATA:
      return Object.assign({}, state, {
        isLoading: true
      });
    case types.LOAD_DASHBOARD_DATA:
      return Object.assign({}, state,
        {
          isLoading: false,
          registers_count: action.registers_count,
          total_money: action.total_money,
          registers_number: action.registers_number,
          paid_number: action.paid_number,
          remain_days: action.remain_days,
          date_array: action.date_array,
          money_by_date: action.money_by_date,
          classes: action.classes,
          registers_by_date: action.registers_by_date,
          paid_by_date: action.paid_by_date,
          registers_by_hour: action.registers_by_hour,
          orders_by_hour: action.orders_by_hour,
          month_ago: action.month_ago,
          uncalled_number: action.uncalled_number,
          zero_paid_num: action.zero_paid_num,
          total_classes: action.total_classes,

        });
    default:
      return state;
  }
}
