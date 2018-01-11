import {
    BEGIN_LOAD_SURVEY_DETAIL,
    BEGIN_LOAD_SURVEYS_LIST,
    LOAD_SURVEYS_LIST_SUCCESS,
    LOAD_SURVEY_DETAIL_SUCCESS
} from '../../constants/actionTypes';
import * as surveyApi from './surveyApi';


export const loadSurveys = (page = 1, search = '') => {
    return async function (dispatch) {
        dispatch({type: BEGIN_LOAD_SURVEYS_LIST});
        const res = await surveyApi.loadSurveys(page, search);
        dispatch({
            type: LOAD_SURVEYS_LIST_SUCCESS,
            surveys: res.data.surveys
        });
    };
};

export const loadSurveyDetail = (surveyId) => {
    return async (dispatch) => {
        dispatch({type: BEGIN_LOAD_SURVEY_DETAIL});
        const res = await surveyApi.loadSurvey(surveyId);
        dispatch({
            type: LOAD_SURVEY_DETAIL_SUCCESS,
            survey: res.data.data.survey
        });

    };
};