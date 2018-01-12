import initialState from '../../reducers/initialState';
import {
    BEGIN_LOAD_SURVEY_DETAIL, BEGIN_LOAD_SURVEYS_LIST, BEGIN_SAVE_QUESTION, LOAD_SURVEY_DETAIL_SUCCESS,
    LOAD_SURVEYS_LIST_SUCCESS, SAVE_QUESTION_SUCCESS,
    TOGGLE_EDIT_SURVEY, UPDATE_QUESTION_FORM_DATA
} from "../../constants/actionTypes";

export default function surveyReducer(state = initialState.survey, action) {
    switch (action.type) {
        case BEGIN_SAVE_QUESTION:
            return {
                ...state,
                isSavingQuestion: true
            };
        case SAVE_QUESTION_SUCCESS:
            return {
                ...state,
                isSavingQuestion: false,
                showEditQuestionModal: false
            };

        case UPDATE_QUESTION_FORM_DATA:
            return {
                ...state,
                question: action.question
            };
        case TOGGLE_EDIT_SURVEY:
            return {
                ...state,
                showEditQuestionModal: action.showModal,
                question: action.question
            };
        case BEGIN_LOAD_SURVEY_DETAIL:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_SURVEY_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                survey: action.survey
            };
        case BEGIN_LOAD_SURVEYS_LIST:
            return {
                ...state,
                isLoading: true,

            };
        case LOAD_SURVEYS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                surveys: action.surveys,
            };
        default:
            return state;
    }
}
