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

/**
 * Tab Blog
 */
export default [
    {
        path: "/manage/scheduleclass",
        component: ScheduleClassContainer
    },
    {
        path: "/manage/gens",
        component: GensContainer
    },
    {
        path: "/manage/registerlist(/:salerId)",
        component: RegisterListContainer
    },
    {
        path: "/manage/waitlist",
        component: RegisterListContainer
    },
    {
        path: "/registerlist/:campaignId/:genId",
        component: RegisterListContainer
    },
    {
        path: "/manage/courses",
        component: CoursesContainer
    },
    {
        path: "/manage/courses/lessons/edit/:lessonId",
        component: LessonsContainer
    },
    {
        path: "/manage/courses/lessons/create/:courseId",
        component: LessonsContainer
    },
    {
        path: "/manage/attendance",
        component: AttendanceContainer
    },
    {
        path: "/manage/attendance/:classId",
        component: ListLessonContainer
    },
    {
        path: "/excel/teachers/:genId",
        component: TeachersExcelContainer
    },
    {
        path: "/manage/classes(/:teacherId)",
        component: ClassesContainer
    },
    {
        path: "/manage/courses/edit/:courseId",
        component: CreateEditCoursesContainer,
        type: "edit",
        children: [
            {
                path: "/",
                component: coursesCreateEditGeneral
            },
            {
                path: "/documents",
                component: coursesCreateEditDocuments
            },
            {
                path: "/studying",
                component: coursesCreateEditStudying
            },
            {
                path: "/curriculum",
                component: coursesCreateEditCurriculum
            },
            {
                path: "/interested",
                component: coursesCreateEditInterested
            }
        ]
    },
    {
        path: "/manage/courses/create",
        component: CreateEditCoursesContainer,
        type: "create",
        children: [
            {
                path: "/",
                component: coursesCreateEditGeneral
            },
            {
                path: "/documents",
                component: coursesCreateEditGeneral
            },
            {
                path: "/studying",
                component: coursesCreateEditGeneral
            },
            {
                path: "/curriculum",
                component: coursesCreateEditGeneral
            },
            {
                path: "/interested",
                component: coursesCreateEditGeneral
            }
        ]
    }
];
