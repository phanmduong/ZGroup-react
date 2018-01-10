import * as types from '../../constants/actionTypes';
import * as surveyApi from './surveyApi';
// import * as helper from '../../helpers/helper';

export const loadSurveys = (page = 1,search = '') => {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_SURVEYS_LIST});
        surveyApi.loadSurveys(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SURVEYS_LIST_SUCCESS,
                    surveys: res.data.surveys
                });
            });
    };
};