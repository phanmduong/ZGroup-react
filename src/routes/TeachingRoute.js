import ScheduleClassContainer from "../modules/scheduleClass/ScheduleClassContainer";
import ScheduleTeachingContainer from "../modules/scheduleTeaching/ScheduleTeachingContainer";
import GensContainer from "../modules/gens/GensContainer";
import CoursesContainer from "../modules/courses/CoursesContainer";
import CreateEditCoursesContainer from "../modules/courses/coursesForm/CoursesCreateEditContainer";
import coursesCreateEditGeneral from "../modules/courses/coursesForm/coursesCreateEditGeneral";
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
import RegistersClassContainer from "../modules/classes/class/registers/RegistersContainer";
import ProgressClassContainer from "../modules/classes/class/progress/ProgressContainer";
import CareClassContainer from "../modules/classes/class/care/CareContainer";
import InfoStudentContainer from "../modules/infoStudent/InfoStudentContainer";
import RegistersContainer from "../modules/infoStudent/registers/RegistersContainer";
import HistoryCallContainer from "../modules/infoStudent/historyCalls/HistoryCallContainer";
import ProgressContainer from "../modules/infoStudent/progress/ProgressContainer";
import CareContainer from "../modules/infoStudent/care/CareContainer";
import LabelManageContainer from "../modules/labelManage/LabelManageContainer";
import EditCoursesContainer from "../modules/courses/coursesForm/EditCoursesContainer";

/**
 * Tab Teaching
 */
export default [

    {
        path: "/teaching/schedule-teaching",
        // path: "/manage/scheduleclass",
        component: ScheduleTeachingContainer
    },
    {
        path: "/teaching/scheduleclass",
        // path: "/manage/scheduleclass",
        component: ScheduleClassContainer
    },
    {
        path: "/teaching/studysession",
        // path: "/manage/studysession",
        component: StudySessionContainer
    },
    {
        path: "/teaching/gens",
        // path: "/manage/gens",
        component: GensContainer
    },
    {
        path: "/teaching/courses",
        // path: "/manage/courses",
        component: CoursesContainer
    },
    {
        path: "/teaching/courses/lessons/edit/:courseId/:lessonId",
        // path: "/manage/courses/lessons/edit/:lessonId",
        component: LessonsContainer
    },
    {
        path: "/teaching/courses/lessons/create/:courseId",
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
                component: coursesCreateEditGeneral
            },
            {
                path: "documents",
                component: coursesCreateEditDocuments
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
                path: "registers",
                component: RegistersClassContainer
            },
            {
                path: "progress",
                component: ProgressClassContainer
            },
            {
                path: "care",
                component: CareClassContainer
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
                path: "care",
                component: CareContainer
            },
        ]
    },
    {
        path: "/teaching/label",
        component: LabelManageContainer
    }

];
