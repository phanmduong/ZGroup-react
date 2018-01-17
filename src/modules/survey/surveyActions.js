import {
    BEGIN_LOAD_SURVEY_DETAIL,
    BEGIN_LOAD_SURVEYS_LIST,
    LOAD_SURVEYS_LIST_SUCCESS,
    LOAD_SURVEY_DETAIL_SUCCESS,
    TOGGLE_EDIT_SURVEY, UPDATE_QUESTION_FORM_DATA, BEGIN_SAVE_QUESTION, SAVE_QUESTION_SUCCESS
    , UPDATE_ANSWER, UPDATE_QUESTIONS_ORDER
} from '../../constants/actionTypes';
import * as surveyApi from './surveyApi';
import {showErrorMessage} from "../../helpers/helper";


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

const loadSurveyDetailPrivate = async (dispatch, surveyId) => {
    dispatch({type: BEGIN_LOAD_SURVEY_DETAIL});
    const res = await surveyApi.loadSurvey(surveyId);
    dispatch({
        type: LOAD_SURVEY_DETAIL_SUCCESS,
        survey: res.data.data.survey
    });
};

export const loadSurveyDetail = (surveyId) => {
    return (dispatch) => {
        loadSurveyDetailPrivate(dispatch, surveyId);
    };
};

export const toggleEditQuestion = (showModal, question = {}) => {
    return (dispatch) => {
        const action = {
            type: TOGGLE_EDIT_SURVEY,
            showModal,
            question
        };
        dispatch(action);
    };
};

export const updateQuestionFormData = (question) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_QUESTION_FORM_DATA,
            question
        });
    };
};

export const saveQuestion = (question) => {
    return async (dispatch, getState) => {
        const survey = getState().survey.survey;
        dispatch({
            type: BEGIN_SAVE_QUESTION,
        });

        const res = await surveyApi.saveQuestion(survey.id, {
            ...question,
            answers: JSON.stringify(question.answers)
        });

        if (res.data.status === 1) {
            loadSurveyDetailPrivate(dispatch, survey.id);
            dispatch({
                type: SAVE_QUESTION_SUCCESS
            });
        } else {
            showErrorMessage("Lỗi", res.data.message);
        }
    };
};

export const updateAnswerToStore = (answer) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_ANSWER,
            answer
        });
    };
};

export const saveAnswer = (answer) => {
    return () => {
        surveyApi.saveAnswer(answer);
    };
};

export const changeQuestionsOrder = (questionId, siblingOrder, inQuestions) => {
    return function (dispatch) {
        let order = 0;

        const question = inQuestions.filter(b => b.id === questionId)[0];
        const questions = inQuestions.filter(b => b.id !== questionId);


        let newQuestions = [];
        if (siblingOrder === -1) {
            const temp = [...questions, question];
            temp.forEach((b) => {
                newQuestions = [...newQuestions, {...b, order}];
                order += 1;
            });
        } else {
            const index = questions.findIndex((b) => {
                return b.order === siblingOrder;
            });

            const part1 = questions.slice(0, index);
            const part2 = questions.slice(index);

            const temp = [...part1, question, ...part2];

            temp.forEach((c) => {
                newQuestions = [...newQuestions, {...c, order}];
                order += 1;
            });
        }

        surveyApi.updateQuestionOrders(newQuestions);

        dispatch({
            type: UPDATE_QUESTIONS_ORDER,
            questions: newQuestions
        });
    };
};