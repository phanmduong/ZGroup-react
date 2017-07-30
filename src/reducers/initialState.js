export default {
  dashboard: {
    registers_count: 0,
    total_money: "0",
    registers_number: 0,
    paid_number: 0,
    uncalled_number: 0,
    zero_paid_num: 0,
    total_classes: 0,
    isLoading: false,
    remain_days: 0,
    date_array: [],
    money_by_date: [],
    classes: [],
    registers_by_date: [],
    paid_by_date: [],
    registers_by_hour: [],
    orders_by_hour: [],
    month_ago: []

  },
  login: {
    email: "",
    password: "",
    token: "",
    isLoading: false,
    error: false,
    user: {
      role: -1
    }
  },
  user: {},
  registerList: {
    registers: [],
    isLoading: false
  },
  genList: {
    gens: [],
    isLoading: true
  },

  searchRegisters: {
    isLoading: false,
    data: {
      next_code: "",
      next_waiting_code: "",
      users: []
    },
    status: 0
  }

};
