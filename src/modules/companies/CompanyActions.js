import * as types from '../../constants/actionTypes';
import * as CompanyApi from './CompanyApi';
import * as helper from '../../helpers/helper';
import {browserHistory} from "react-router";

export function loadCompanies(page = 1, type ="", search="") {
    return function (dispatch){
      dispatch({
         type: types.BEGIN_LOAD_COMPANIES,
      });
      CompanyApi.loadCompanies(page , type, search)
          .then((res) => {
              dispatch({
                type: types.LOAD_COMPANIES_SUCCESS,
                data: res.data.company,
                paginator: res.data.paginator,
              });
          }).catch(()=>{
           helper.showNotification("Có lỗi xảy ra");
           dispatch({
              type: types.LOAD_COMPANIES_ERROR,
           });
      });
    };
}

export function loadCompany(id) {
    return function (dispatch){
        dispatch({
            type: types.BEGIN_LOAD_COMPANY,
        });
        CompanyApi.loadCompany(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_COMPANY_SUCCESS,
                    data: res.data.data.company,
                });
            }).catch(()=>{
            helper.showNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_COMPANY_ERROR,
            });
        });
    };
}
export function loadFields() {
    return function (dispatch){
        dispatch({
            type: types.BEGIN_LOAD_FIELDS,
        });
        CompanyApi.loadFields()
            .then((res) => {
                dispatch({
                    type: types.LOAD_FIELDS_SUCCESS,
                    data: res.data.data.fields,
                });
            }).catch(()=>{
            helper.showNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_FIELDS_ERROR,
            });
        });
    };
}
export function addCompany(object) {
    return function (dispatch){
        dispatch({
            type: types.BEGIN_ADD_COMPANY,
        });
        CompanyApi.addCompany(object)
            .then(() => {
                helper.showNotification("Thêm thành công");
                dispatch({
                    type: types.ADD_COMPANY_SUCCESS,
                });
                browserHistory.push("business/companies");
            }).catch(()=>{
            helper.showNotification("Có lỗi xảy ra");
            dispatch({
                type: types.ADD_COMPANY_ERROR,
            });
        });
    };
}
export function editCompany(id,object){
    return function (dispatch){
        dispatch({
            type: types.BEGIN_EDIT_COMPANY,
        });
        CompanyApi.editCompany(id,object)
            .then(() => {
                helper.showNotification("Sửa thành công");
                dispatch({
                    type: types.EDIT_COMPANY_SUCCESS,
                });
                browserHistory.push("business/companies");
            }).catch(()=>{
            helper.showNotification("Có lỗi xảy ra");
            dispatch({
                type: types.EDIT_COMPANY_ERROR,
            });
        });
    };
}
export function addField(name,loadFields) {
    return function (dispatch){
        dispatch({
            type: types.BEGIN_ADD_FIELD,
        });
        CompanyApi.addField(name)
            .then(() => {
                helper.showNotification("Thêm thành công");
                dispatch({
                    type: types.ADD_FIELD_SUCCESS,

                });
                loadFields();
            }).catch(()=>{
            helper.showNotification("Có lỗi xảy ra");
            dispatch({
                type: types.ADD_FIELD_ERROR,
            });
        });
    };
}
export function updateFormData(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_CREATE_COMPANY,
            data : data,
        });
    };
}
export function resetDataCompany(){
    return function (dispatch){
      dispatch({
         type: types.RESET_DATA_COMPANY,
      });
    };
}