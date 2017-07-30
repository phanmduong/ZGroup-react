import {combineReducers} from 'redux';
import dashboardReducer from './dashboardReducer';
import loginReducer from './loginReducer';
import registerListReducer from'./registerListReducer';
import genListReducer from'./genListReducer';
import searchRegistersReducer from './searchRegistersReducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  login: loginReducer,
  registerList: registerListReducer,
  genList: genListReducer,
  searchRegisters: searchRegistersReducer
});

export default rootReducer;
