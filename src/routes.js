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
import StudySessionContainer from "./modules/studysession/StudySessionContainer";

export default (
    <Route>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={ManageStaffsContainer}/>
            <Route path="manage/quan-li-nhan-su" component={ManageStaffsContainer}/>
            <Route path="add-staff" component={AddStaffContainer} type="create"/>
            <Route path="staff/:staffId/edit" component={AddStaffContainer} type="edit"/>

            {/*Begin Role route*/}
            <Route path="manage-role" component={ManageRoleContainer}/>
            <Route path="create-role" component={CreateRoleContainer}/>
            <Route path="role/:roleId/edit" component={EditRoleContainer}/>
            {/*End Role route*/}

            {/*Begin base route*/}
            <Route path="base/list" component={BasesContainer}/>
            <Route path="base/create" component={CreateBaseContainer} type="create"/>
            <Route path="base/:baseId/edit" component={CreateBaseContainer} type="edit"/>
            {/*End Base route*/}

            {/*Begin tasks route*/}
            <Route path="project/list" component={ProjectListContainer}/>
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
            <Route path="/manage/registerlist" component={RegisterListContainer}/>
            {/*End register student routes*/}

            {/*Begin register student routes*/}
            <Route path="/my-profile" component={ProfileContainer}/>
            <Route path="/edit-profile" component={EditProfileContainer}/>
            {/*End register student routes*/}

            {/*Begin study session routes*/}
            <Route path="/manage/studysession" component={StudySessionContainer}/>
            {/*End study session routes*/}
        </Route>
        <Route path="login" component={LoginContainer}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
