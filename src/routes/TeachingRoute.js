import ScheduleClassContainer from "../modules/scheduleClass/ScheduleClassContainer";
import GensContainer from "../modules/gens/GensContainer";
import RegisterListContainer from "../modules/registerStudents/RegisterListContainer";
import CoursesContainer from "../modules/courses/CoursesContainer";
import CreateEditCoursesContainer from "../modules/courses/coursesForm/CoursesCreateEditContainer";
import coursesCreateEditGeneral from "../modules/courses/coursesForm/coursesCreateEditGeneral";
import coursesCreateEditCurriculum from "../modules/courses/coursesForm/coursesCreateEditCurriculum";
import coursesCreateEditDocuments from "../modules/courses/coursesForm/coursesCreateEditDocuments";
import coursesCreateEditStudying from "../modules/courses/coursesForm/coursesCreateEditStudying";
import coursesCreateEditInterested from "../modules/courses/coursesForm/coursesCreateEditInterested";
import LessonsContainer from "../modules/lessons/LessonsContainer";
import AttendanceContainer from "../modules/attendance/AttendanceContainer";
import ListLessonContainer from "../modules/attendance/ListLessonContainer";
import ClassesContainer from "../modules/classes/ClassesContainer";
import TeachersExcelContainer from "../modules/excel/TeachersExcelContainer";
import StudySessionContainer from "../modules/studySession/StudySessionContainer";

/**
 * Tab Teaching
 */
export default [
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
        path: "/teaching/registerlist(/:salerId)",
        // path: "/manage/registerlist(/:salerId)",
        component: RegisterListContainer
    },
    {
        path: "/teaching/waitlist",
        // path: "/manage/waitlist",
        component: RegisterListContainer
    },
    {
        path: "/teaching/registerlist/:campaignId/:genId",
        // path: "/registerlist/:campaignId/:genId",
        component: RegisterListContainer
    },
    {
        path: "/teaching/courses",
        // path: "/manage/courses",
        component: CoursesContainer
    },
    {
        path: "/teaching/courses/lessons/edit/:lessonId",
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
        component: CreateEditCoursesContainer,
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
                path: "studying",
                component: coursesCreateEditStudying
            },
            {
                path: "curriculum",
                component: coursesCreateEditCurriculum
            },
            {
                path: "interested",
                component: coursesCreateEditInterested
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
                path: "studying",
                component: coursesCreateEditGeneral
            },
            {
                path: "curriculum",
                component: coursesCreateEditGeneral
            },
            {
                path: "interested",
                component: coursesCreateEditGeneral
            }
        ]
    }
];
