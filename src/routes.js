import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LoginContainer from './modules/login/LoginContainer';
import AppContainer from './containers/AppContainer';
import ManageStaffsContainer from './modules/manageStaff/ManageStaffsContainer';
import AddStaffContainer from './modules/manageStaff/AddStaffContainer';
import ManageRoleContainer from './modules/role/ManageRoleContainer';
import CreateRoleContainer from './modules/role/CreateRoleContainer';
import EditRoleContainer from './modules/role/EditRoleContainer';
import NotFoundPage from './components/NotFoundPage';
import BasesContainer from "./modules/bases/BasesContainer";
import CreateBaseContainer from "./modules/bases/CreateBaseContainer";
import ProjectListContainer from "./modules/tasks/project/ProjectListContainer";
import CreateProjectContainer from "./modules/tasks/project/CreateProjectContainer";
import BoardListContainer from "./modules/tasks/board/BoardListContainer";
import RegisterListContainer from "./modules/registerStudents/RegisterListContainer";
import EmailTemplatesContainer from "./modules/emailTemplates/EmailTemplatesContainer";
import EmailFormsContainer from "./modules/emailForms/EmailFormsContainer";
import CreateEmailFormContainer from "./modules/emailForms/CreateEmailFormContainer";
import CreateEmailTemplateContainer from "./modules/emailTemplates/CreateEmailTemplateContainer";
import BlogContainer from "./modules/blog/BlogContainer";
import ProfileContainer from "./modules/profile/ProfileContainer";
import EditProfileContainer from "./modules/profile/EditProfileContainer";
import StudySessionContainer from "./modules/studySession/StudySessionContainer";
import ScheduleClassContainer from "./modules/scheduleClass/ScheduleClassContainer";
import GensContainer from "./modules/gens/GensContainer";
import RegistersContainer from "./modules/infoStudent/registers/RegistersContainer";
import InfoStudentContainer from "./modules/infoStudent/InfoStudentContainer";
import HistoryCallContainer from "./modules/infoStudent/historyCalls/HistoryCallContainer";
import ProgressContainer from "./modules/infoStudent/progress/ProgressContainer";
import CareContainer from "./modules/infoStudent/care/CareContainer";
import CalendarContainer from "./modules/tasks/calendar/CalendarContainer";
import DashboardContainer from "./modules/dashboard/DashboardContainer";
import CollectMoneyContainer from "./modules/collectMoney/CollectMoneyContainer";
import HistoryCollectMoneyContainer from "./modules/historyCollectMoney/HistoryCollectMoneyContainer";
import HistoryCallsContainer from "./modules/historyCalls/HistoryCallsContainer";
import ClassesContainer from "./modules/classes/ClassesContainer";
import ArchiveProjectListContainer from "./modules/tasks/project/ArchiveProjectListContainer";
import ClassContainer from "./modules/classes/class/ClassContainer";
import InfoClassContainer from "./modules/classes/class/info/InfoClassContainer";
import CareClassContainer from "./modules/classes/class/care/CareContainer";
import RegistersClassContainer from "./modules/classes/class/registers/RegistersContainer";
import HistoryTeachingContainer from "./modules/classes/class/historyTeaching/HistoryTeachingContainer";
import ProgressClassContainer from "./modules/classes/class/progress/ProgressContainer";

export default (
    <Route>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={DashboardContainer}/>
            {/*Begin dashboard routes*/}
            <Route path="/manage/dashboard" component={DashboardContainer}/>
            {/*End dashboard routes*/}

            <Route path="manage/quan-li-nhan-su" component={ManageStaffsContainer}/>
            <Route path="add-staff" component={AddStaffContainer} type="create"/>
            <Route path="staff/:staffId/edit" component={AddStaffContainer} type="edit"/>

            {/*Begin Role route*/}
            <Route path="manage-role" component={ManageRoleContainer}/>
            <Route path="create-role" component={CreateRoleContainer}/>
            <Route path="role/:roleId/edit" component={EditRoleContainer}/>
            {/*End Role route*/}

            {/*Begin base route*/}
            <Route path="/manage/bases" component={BasesContainer}/>
            <Route path="base/create" component={CreateBaseContainer} type="create"/>
            <Route path="base/:baseId/edit" component={CreateBaseContainer} type="edit"/>
            {/*End Base route*/}

            {/*Begin tasks route*/}
            <Route path="/calendar" component={CalendarContainer}/>
            <Route path="project/list" component={ProjectListContainer}/>
            <Route path="project/archive" component={ArchiveProjectListContainer}/>
            <Route path="project/create" component={CreateProjectContainer} type="create"/>
            <Route path="project/:projectId/edit" component={CreateProjectContainer} type="edit"/>
            <Route path="project/:projectId/boards" component={BoardListContainer}/>
            {/*End tasks route*/}

            {/*Begin Email marketing routes*/}
            <Route path="/email-maketing/templates" component={EmailTemplatesContainer}/>
            <Route path="/email-template/create" component={CreateEmailTemplateContainer} type="create"/>
            <Route path="/email-template/:emailTemplateId/edit" component={CreateEmailTemplateContainer} type="edit"/>
            <Route path="/email-maketing/forms" component={EmailFormsContainer}/>
            <Route path="/email-form/create" component={CreateEmailFormContainer} type="create"/>
            <Route path="/email-form/:emailFormId/edit" component={CreateEmailFormContainer} type="edit"/>
            {/*End Email marketing routes*/}

            {/*Begin blog routes*/}
            <Route path="/blog/new-post" component={BlogContainer} type="create"/>
            {/*End blog routes*/}

            {/*Begin register student routes*/}
            <Route path="/manage/registerlist(/:salerId)" component={RegisterListContainer}/>
            {/*End register student routes*/}

            {/*Begin register student routes*/}
            <Route path="/my-profile" component={ProfileContainer}/>
            <Route path="/edit-profile" component={EditProfileContainer}/>
            {/*End register student routes*/}

            {/*Begin study session routes*/}
            <Route path="/manage/studysession" component={StudySessionContainer}/>
            {/*End study session routes*/}

            {/*Begin study session routes*/}
            <Route path="/manage/scheduleclass" component={ScheduleClassContainer}/>
            {/*End study session routes*/}

            {/*Begin gens routes*/}
            <Route path="/manage/gens" component={GensContainer}/>
            {/*End gens routes*/}

            {/*Begin info student routes*/}
            <Route path="/info-student/:studentId" component={InfoStudentContainer}>
                <IndexRoute component={RegistersContainer}/>
                <Route path="history-calls" component={HistoryCallContainer}/>
                <Route path="progress" component={ProgressContainer}/>
                <Route path="care" component={CareContainer}/>
            </Route>
            {/*End info student routes*/}

            {/*Begin collect money routes*/}
            <Route path="/manage/moneycollect" component={CollectMoneyContainer}/>
            {/*End collect money routes*/}

            {/*Begin history collect money routes*/}
            <Route path="/manage/paidlist" component={HistoryCollectMoneyContainer}/>
            {/*End history collect money routes*/}

            {/*Begin history collect money routes*/}
            <Route path="/manage/telesalehistory(/:callerId)" component={HistoryCallsContainer}/>
            {/*End history collect money routes*/}

            {/*Begin class routes*/}
            <Route path="/manage/classes(/:teacherId)" component={ClassesContainer}/>
            {/*End class routes*/}

            {/*Begin class routes*/}
            <Route path="/class/:classId" component={ClassContainer}>
                <IndexRoute component={InfoClassContainer}/>
                <Route path="history-teaching" component={HistoryTeachingContainer}/>
                <Route path="registers" component={RegistersClassContainer}/>
                <Route path="progress" component={ProgressClassContainer}/>
                <Route path="care" component={CareClassContainer}/>
            </Route>
            {/*End class routes*/}

        </Route>
        <Route path="login" component={LoginContainer}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
