import initialState from '../../reducers/initialState';
import {
    ADD_ANSWER_TO_QUESTION,
    BEGIN_LOAD_SURVEY_DETAIL, BEGIN_LOAD_SURVEYS_LIST, BEGIN_SAVE_QUESTION,
    LOAD_SURVEY_DETAIL_SUCCESS,
    LOAD_SURVEYS_LIST_SUCCESS, REMOVE_ANSWER_FROM_QUESTION, SAVE_QUESTION_SUCCESS,
    TOGGLE_EDIT_SURVEY, UPDATE_ANSWER, UPDATE_QUESTION_FORM_DATA, UPDATE_QUESTIONS_ORDER
} from "../../constants/actionTypes";

export default function surveyReducer(state = initialState.survey, action) {
    switch (action.type) {
        case ADD_ANSWER_TO_QUESTION:
            return {
                ...state,
                question: {
                    ...state.question,
                    answers: state.question.answers ? [
                        ...state.question.answers,
                        action.answer
                    ] : [action.answer]
                }
            };
        case UPDATE_QUESTIONS_ORDER:
            return {
                ...state,
                survey: {
                    ...state.survey,
                    questions: action.questions
                }
            };
        case REMOVE_ANSWER_FROM_QUESTION:
            return {
                ...state,
                question: {
                    ...state.question,
                    answers: state.question.answers.filter((answer) => answer.id !== action.answer.id)
                }
            };
        case UPDATE_ANSWER:
            return {
                ...state,
                survey: {
                    ...state.survey,
                    questions: state.survey.questions.map((question) => {
                        if (Number(action.answer.question_id) === Number(question.id)) {
                            return {
                                ...question,
                                answers: question.answers.map((answer) => {
                                    if (answer.id === Number(action.answer.id)) {
                                        return action.answer;
                                    }
                                    return answer;
                                })
                            };
                        }
                        return question;
                    })
                }
            };
        case BEGIN_SAVE_QUESTION:
            return {
                ...state,
                isSavingQuestion: true
            };
        case SAVE_QUESTION_SUCCESS:
            return {
                ...state,
                isSavingQuestion: false,
                showEditQuestionModal: false,
                survey: {
                    ...state.survey,
                    questions: state.survey.questions.map((question) => {
                        if (question.id === action.question.id) {
                            return action.question;
                        }
                        return question;
                    })
                }
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
