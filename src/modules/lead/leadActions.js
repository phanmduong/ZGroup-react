import * as types from '../../constants/actionTypes';
import * as leadApi from './leadApi';
import {
    showErrorNotification,
    showNotification,
    showTypeNotification,
    showWarningNotification
} from "../../helpers/helper";
import async from "async";



/*eslint no-console: 0 */
export function getLeads({limit, page, search, startTime, endTime, staffId, rate, top, address, leadStatusId, orderBy, orderByType, source_id, campaign_id, duplicate, lead_tag, call_back_time, base_id,mock_exam_time,imported_at,appointment_time}) {

    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_LIST_LEAD});
        leadApi.loadLeads(limit, page, search, startTime, endTime, staffId, rate, top, address, leadStatusId, orderBy, orderByType, source_id, campaign_id, duplicate, lead_tag, call_back_time, base_id,mock_exam_time,imported_at,appointment_time)
            .then(res => {
                dispatch({
                    type: types.LOAD_LIST_LEAD_SUCCESS,
                    leads: res.data.leads,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    totalCount: res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_LIST_LEAD_ERROR});
            });
    };
}

export function uploadLeads(leads) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_LIST_LEAD});
        leadApi.uploadLeads(leads)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.UPLOAD_LIST_LEAD_SUCCESS,
                    });
                    showNotification("Lưu thành công");
                } else {
                    showErrorNotification(res.data.message);
                    dispatch({type: types.UPLOAD_LIST_LEAD_ERROR});
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra. Thử lại");
                dispatch({type: types.UPLOAD_LIST_LEAD_ERROR});
            });
    };
}

export function editInfoLead(lead, closeModal, openModalDuplicateLeads) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_INFO_LEAD});
        leadApi.editInfoLead(lead)
            .then(res => {
                if (res.data.status == 1) {
                    if(closeModal)closeModal(true);
                    dispatch({
                        type: types.EDIT_INFO_LEAD_SUCCESS,
                        lead: res.data.data.lead
                    });
                    showNotification("Lưu thành công");
                } else {
                    showErrorNotification('Người dùng đã tồn tại!');
                    openModalDuplicateLeads(res.data.data.duplicate_leads);
                    dispatch({type: types.EDIT_INFO_LEAD_ERROR, duplicate_leads: res.data.duplicate_leads});
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra. Thử lại");
                dispatch({type: types.EDIT_INFO_LEAD_ERROR});
            });
    };
}


export function changeLeadRate(lead) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_INFO_LEAD});
        showWarningNotification("Đang thực hiện...");
        leadApi.changeLeadRate(lead)
            .then(res => {
                if (res.data.status == 1) {

                    dispatch({
                        type: types.EDIT_INFO_LEAD_SUCCESS,
                        lead: res.data.data.lead
                    });
                    showNotification("Sửa thành công");
                } else {
                    showErrorNotification(res.data.message);
                    dispatch({type: types.EDIT_INFO_LEAD_ERROR});
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra. Thử lại");
                dispatch({type: types.EDIT_INFO_LEAD_ERROR});
            });
    };
}

export function updateLeadInList(lead){
    return function (dispatch){
      dispatch({
          type: types.EDIT_INFO_LEAD_SUCCESS,
          lead,
      })  ;
    };
}

export function removeLead(leadId, removeLeadSuccess) {
    showTypeNotification("Đang xóa lead", "info");
    leadApi.removeLead(leadId)
        .then(res => {
            if (res.data.status == 1) {
                removeLeadSuccess();
                showTypeNotification("Xóa lead thành công");
            } else {
                showErrorNotification(res.data.message);
            }
        })
        .catch(() => {
            showErrorNotification("Xóa lead thất bại");
        });
}
export function removeDistributionLead(leadId, removeLeadSuccess) {
    showTypeNotification("Đang xóa lead", "info");
    leadApi.removeDistributionLead([leadId])
        .then(res => {
            if (res.data.status == 1) {
                removeLeadSuccess();
                showTypeNotification("Xóa lead thành công");
            } else {
                showErrorNotification(res.data.message);
            }
        })
        .catch(() => {
            showErrorNotification("Xóa lead thất bại");
        });
}

export function uploadDistributionLead(leadIds, carerId, isAll, search, startTime, endTime, staffId, rate, top, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_DISTRIBUTION_LEAD});

        async.waterfall([
            function (callback) {
                if (isAll) {
                    leadApi.loadLeadWithIds(search, startTime, endTime, staffId, rate, top)
                        .then((res) => {
                            callback(null, res.data.data.lead_ids);
                        }).catch(() => {
                        callback("Có lỗi xảy ra");
                    });
                } else {
                    callback(null, leadIds);
                }
            },
            function (leadIds, callback) {
                leadApi.uploadDistributionLead(leadIds, carerId)
                    .then(res => {
                        if (res.data.status === 1) {
                            showNotification("Phân leads thành công");
                            closeModal();
                            dispatch({
                                type: types.UPLOAD_DISTRIBUTION_LEAD_SUCCESS,
                            });
                            callback(null);
                        } else {
                            callback(res.data.message);
                        }
                    })
                    .catch(() => {
                        callback("Có lỗi xảy ra");
                    });
            }

        ], function (err) {
            if (err) {
                showErrorNotification(err);
                dispatch({
                    type: types.UPLOAD_DISTRIBUTION_LEAD_ERROR,
                });
            }
        });

    };
}