// import * as types from '../../constants/actionTypes';
import * as passwordApi from './passwordApi';
import * as helper from '../../helpers/helper';

export function loadAllCampaignList() {
    return function (dispatch) {
        dispatch({
            type: "LOAD_CAMPAIGNLIST_SUCCESS"
        });
    };
}

