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
import StorePostContainer from "./modules/blog/StorePostContainer";
import PostsContainer from "./modules/blog/PostsContainer";
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
import EmailSubscribersListContainer from "./modules/emailSubscribersList/EmailSubscribersListContainer";
import ProcessListContainer from "./modules/book/ProcessListContainer";
import SubscribersContainer from "./modules/emailSubscribersList/SubscribersContainer";
import BookBoardListContainer from "./modules/book/BookBoardListContainer";
import EmailCampaignsContainer from "./modules/emailCampaigns/EmailCampaignsContainer";
import GoodListContainer from "./modules/good/GoodListContainer";
import CreateGoodContainer from "./modules/good/CreateGoodContainer";
import PropertiesListContainer from "./modules/good/PropertiesListContainer";
import ShiftRegistersContainer from "./modules/shiftRegisters/ShiftRegistersContainer";
import CreateGoodPropertyContainer from "./modules/good/CreateGoodPropertyContainer";
import TaskListTemplateContainer from "./modules/good/TaskListTemplateContainer";
import HistoryShiftRegistersContainer from "./modules/historyShiftRegisters/HistoryShiftRegistersContainer";
import ShiftSessionsContainer from "./modules/shiftSessions/ShiftSessionsContainer";
import CoursesContainer from './modules/courses/CoursesContainer';
import CategoriesContainer from './modules/categories/CategoriesContainer';

import OrdersContainer from './modules/goodOrders/OrdersContainer';
import OrderContainer from './modules/goodOrders/order/OrderContainer';
import ProductListContainer from './modules/productList/ProductListContainer';
// import GoodDetailContainer from "./modules/good/GoodDetailContainer";
import ImportGoodsContainer from './modules/importGoods/ImportGoodsContainer';
import ImportContainer from './modules/importGoods/importGood/ImportContainer';
import StoreImportContainer from './modules/importGoods/importGood/StoreImportContainer';
import GoodDetailContainer from "./modules/good/GoodDetailContainer";
import WareHouseContainer from "./modules/wareHouse/WareHouseContainer";
import CustomerContainer from "./modules/customer/CustomerContainer";
import InventoryGoodContainer from "./modules/inventoryGood/InventoryGoodContainer";

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
            <Route path="/blog/new-post" component={StorePostContainer} type="create"/>
            <Route path="/blog/post/:postId/edit" component={StorePostContainer} type="edit"/>
            <Route path="/blog/posts" component={PostsContainer} />
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

            {/*Begin good routes*/}
            <Route path="/good/:type/process" component={ProcessListContainer}/>
            <Route path="/good/:goodId/detail" component={GoodDetailContainer}/>
            <Route path="/good/:type/properties" component={PropertiesListContainer}/>
            <Route path="/good/:type/property/create" component={CreateGoodPropertyContainer}/>
            <Route path="/property-item/:id/edit" component={CreateGoodPropertyContainer}/>
            <Route path="/tasklist-template/:id" component={TaskListTemplateContainer}/>


            <Route path="/:type/manufacture" component={BookBoardListContainer}/>
            <Route path="/good/:type/all" component={GoodListContainer}/>
            <Route path="/good/:goodId/edit" component={CreateGoodContainer} type="edit"/>
            <Route path="good/:type/create" component={CreateGoodContainer} type="create"/>
            <Route path="good/create" component={CreateGoodContainer} type="create"/>
            {/*End good routes*/}

            {/*Begin class routes*/}
            <Route path="/class/:classId" component={ClassContainer}>
                <IndexRoute component={InfoClassContainer}/>
                <Route path="history-teaching" component={HistoryTeachingContainer}/>
                <Route path="registers" component={RegistersClassContainer}/>
                <Route path="progress" component={ProgressClassContainer}/>
                <Route path="care" component={CareClassContainer}/>
            </Route>
            {/*End class routes*/}

            {/*Begin email subscribers list routes*/}
            <Route path="/manage/subscribers_list" component={EmailSubscribersListContainer}/>
            <Route path="/email/subscribers(/:listId)" component={SubscribersContainer}/>
            {/*End email subscribers list routes*/}

            {/*Begin email campaigns routes*/}
            <Route path="/manage/campaigns(/:ownerId)" component={EmailCampaignsContainer}/>
            {/*End email campaigns routes*/}

            {/*Begin shift register routes*/}
            <Route path="/manage/regis-shifts" component={ShiftRegistersContainer}/>
            <Route path="/register-shifts/history" component={HistoryShiftRegistersContainer}/>
            {/*End shift register routes*/}

            {/*Begin shift session routes*/}
            <Route path="/manage/shift" component={ShiftSessionsContainer}/>
            {/*End shift session routes */}

            {/*Begin course routes */}
            <Route path="/manage/courses" component={CoursesContainer}/>
            {/*End course routes */}
                                               l

            {/*Begin categories routes */}
            <Route path="/goods/categories" component={CategoriesContainer}/>
            {/*End categories routes */}



            {/*Begin good order routes */}
            <Route path="/goods/orders" component={OrdersContainer}/>
            <Route path="/goods/order/:orderId" component={OrderContainer}/>
            {/*End good order routes */}

            {/*Begin product-list routes */}
            <Route path="/goods/products" component={ProductListContainer}/>
            {/*End product-list routes*/}

            {/*Begin inventory-good routes*/}
            <Route path="/goods/inventories" components={InventoryGoodContainer}/>
            {/*End inventory-good routes*/}

            {/*Begin import goods routes */}
            <Route path="/import-goods" component={ImportGoodsContainer}/>
            <Route path="/import-good/create" component={StoreImportContainer} type="create"/>
            <Route path="/import-good/:importGoodId" component={ImportContainer}/>
            {/*End import goods routes*/}

            {/*Begin warehouse routes */}
            <Route path="/goods/warehouses" component={WareHouseContainer}/>
            {/*End warehouse routes*/}

            {/*Begin customer routes */}
            <Route path="/goods/customer" component={CustomerContainer}/>
            {/*End customer routes*/}

        </Route>
        <Route path="login" component={LoginContainer}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
