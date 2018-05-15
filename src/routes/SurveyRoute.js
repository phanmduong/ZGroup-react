import SurveyContainer from "../modules/survey/SurveyContainer";
import SurveyDetailContainer from "../modules/survey/SurveyDetailContainer";

export default [
    {
        path: "/survey/all",
        component: SurveyContainer
    },
    {
        path: "/survey/:surveyId",
        component: SurveyDetailContainer
    }
];
