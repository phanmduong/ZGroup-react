import ScheduleClassContainer from "../modules/scheduleClass/ScheduleClassContainer";
import ScheduleTeachingContainer from "../modules/scheduleTeaching/ScheduleTeachingContainer";
import GensContainer from "../modules/gens/GensContainer";
import CoursesContainer from "../modules/courses/CoursesContainer";
import CreateEditCoursesContainer from "../modules/courses/coursesForm/CoursesCreateEditContainer";
import coursesCreateEditGeneral from "../modules/courses/coursesForm/CoursesCreateEditGeneral";
import coursesCreateEditCurriculum from "../modules/courses/coursesForm/coursesCreateEditCurriculum";
import coursesCreateEditDocuments from "../modules/courses/coursesForm/coursesCreateEditDocuments";
import coursesCreateEditTerm from "../modules/courses/coursesForm/coursesCreateEditTerm";
import coursesCreateEditInterested from "../modules/courses/coursesForm/coursesCreateEditInterested";
import coursesCreateEditPixel from "../modules/courses/coursesForm/coursesCreateEditPixel";
import LessonsContainer from "../modules/lessons/LessonsContainer";
import AttendanceContainer from "../modules/attendance/AttendanceContainer";
import ListLessonContainer from "../modules/attendance/ListLessonContainer";
import ClassesContainer from "../modules/classes/ClassesContainer";
import TeachersExcelContainer from "../modules/excel/TeachersExcelContainer";
import StudySessionContainer from "../modules/studySession/StudySessionContainer";
import ClassContainer from "../modules/classes/class/ClassContainer";
import InfoClassContainer from "../modules/classes/class/info/InfoClassContainer";
import HistoryTeachingContainer from "../modules/classes/class/historyTeaching/HistoryTeachingContainer";
import ClassCheckinCheckoutContainer from "../modules/classes/class/registers/ClassCheckinCheckoutContainer";
import ProgressClassContainer from "../modules/classes/class/progress/ProgressContainer";
import ScoreClassContainer from "../modules/classes/class/care/ScoreClassContainer";
import InfoStudentContainer from "../modules/infoStudent/InfoStudentContainer";
import RegistersContainer from "../modules/infoStudent/registers/RegistersContainer";
import HistoryCallContainer from "../modules/infoStudent/historyCalls/HistoryCallContainer";
import ProgressContainer from "../modules/infoStudent/progress/ProgressContainer";
import CareContainer from "../modules/infoStudent/historyCollectMoney/HistoryCollectMoneyContainer";
import LabelManageContainer from "../modules/labelManage/LabelManageContainer";
import EditCoursesContainer from "../modules/courses/coursesForm/EditCoursesContainer";
import EvaluateTeachingContainer from "../modules/evaluateTeaching/EvaluateTeachingContainer";
import EvaluatePersonTeachingContainer from "../modules/evaluateTeaching/Personal/EvaluatePersonTeachingContainer";
import EvaluateClassesContainer from "../modules/evaluateClasses/EvaluateClassesContainer";
import coursesCreateEditExamTemplate from "../modules/courses/coursesForm/coursesCreateEditExamTemplate";

/**
 * Tab Teaching
 */
export default [

    {
        path: "/teaching/teaching-schedule-old",
        // path: "/manage/scheduleclass",
        component: ScheduleTeachingContainer
    },
    {
        path: "/teaching/scheduleclass-old",
        // path: "/manage/scheduleclass",
        component: ScheduleClassContainer
    },
    {
        path: "/teaching/studysession-old",
        // path: "/manage/studysession",
        component: StudySessionContainer
    },
    {
        path: "/teaching/gens-old",
        // path: "/manage/gens",
        component: GensContainer
    },
    {
        path: "/teaching/courses-old",
        // path: "/manage/courses",
        component: CoursesContainer
    },
    {
        path: "/teaching/courses/lessons/edit/:courseId/:lessonId/old",
        // path: "/manage/courses/lessons/edit/:lessonId",
        component: LessonsContainer
    },
    {
        path: "/teaching/courses/lessons/create/:courseId/old",
        // path: "/manage/courses/lessons/create/:courseId",
        component: LessonsContainer
    },
    {
        path: "/teaching/attendance",
        // path: "/manage/attendance",
        component: AttendanceContainer
    },
    {
        path: "/teaching/attendance/:classId",
        // path: "/manage/attendance/:classId",
        component: ListLessonContainer
    },
    {
        path: "/teaching/excel/teachers/:genId",
        // path: "/excel/teachers/:genId",
        component: TeachersExcelContainer
    },
    {
        path: "/teaching/classes(/:teacherId)",
        // path: "/manage/classes(/:teacherId)",
        component: ClassesContainer
    },
    {
        path: "/teaching/courses/edit/:courseId",
        // path: "/manage/courses/edit/:courseId",
        component: EditCoursesContainer,
        type: "edit",
        // path children ko có / phía trước nhé ( "/documents" thế này là sai) đúng là "documents"
        children: [
            {
                path: "/",
                component: coursesCreateEditCurriculum
            },
            {
                path: "documents",
                component: coursesCreateEditDocuments
            },
            {
                path: "exam-template",
                component: coursesCreateEditExamTemplate
            },
            {
                path: "term",
                component: coursesCreateEditTerm
            },
            {
                path: "curriculum",
                component: coursesCreateEditCurriculum
            },
            {
                path: "interested",
                component: coursesCreateEditInterested
            },
            {
                path: "pixel",
                component: coursesCreateEditPixel
            }
        ]
    },
    {
        path: "/teaching/courses/create",
        // path: "/manage/courses/create",
        component: CreateEditCoursesContainer,
        type: "create",
        // path children ko có / phía trước nhé ( "/documents" thế này là sai) đúng là "documents"
        children: [
            {
                path: "/",
                component: coursesCreateEditGeneral
            },
            {
                path: "documents",
                component: coursesCreateEditGeneral
            },
            {
                path: "term",
                component: coursesCreateEditGeneral
            },
            {
                path: "curriculum",
                component: coursesCreateEditGeneral
            },
            {
                path: "interested",
                component: coursesCreateEditGeneral
            },
            {
                path: "pixel",
                component: coursesCreateEditGeneral
            },
        ]
    },
    {
        path: "/teaching/class/:classId",
        // path: "/manage/courses/create",
        component: ClassContainer,
        // path children ko có / phía trước nhé ( "/documents" thế này là sai) đúng là "documents"
        children: [
            {
                path: "/",
                component: InfoClassContainer
            },
            {
                path: "history-teaching",
                component: HistoryTeachingContainer
            },
            {
                path: "checkin-checkout",
                component: ClassCheckinCheckoutContainer
            },
            {
                path: "progress",
                component: ProgressClassContainer
            },
            {
                path: "score",
                component: ScoreClassContainer
            }
        ]
    },
    {
        path: "/teaching/info-student/:studentId",
        // path: "/manage/courses/create",
        component: InfoStudentContainer,
        // path children ko có / phía trước nhé ( "/documents" thế này là sai) đúng là "documents"
        children: [
            {
                path: "/",
                component: RegistersContainer
            },
            {
                path: "history-calls",
                component: HistoryCallContainer
            },
            {
                path: "progress",
                component: ProgressContainer
            },
            {
                path: "historyCollectMoney",
                component: CareContainer
            },
        ]
    },
    {
        path: "/teaching/label",
        component: LabelManageContainer
    },
    {
        path: "/teaching/evaluate",
        component: EvaluateTeachingContainer
    },
    {
        path: "/teaching/evaluate-personal(/:userID)",
        component: EvaluatePersonTeachingContainer
    },
    {
        path: "/teaching/evaluate-classes",
        component: EvaluateClassesContainer
    },

];
