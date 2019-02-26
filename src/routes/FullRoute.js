import React from 'react';
// import coursesCreateEditInterested from "../modules/courses/coursesForm/coursesCreateEditInterested";
// import ArchiveProjectListContainer from "../modules/tasks/project/ArchiveProjectListContainer";
// import ScheduleClassContainer from "../modules/scheduleClass/ScheduleClassContainer";
// import CategoriesContainer from "../modules/categories/CategoriesContainer";
// import EmailSubscribersListContainer from "../modules/emailSubscribersList/EmailSubscribersListContainer";
// import CoursesContainer from "../modules/courses/CoursesContainer";
// import ProjectListContainer from "../modules/tasks/project/ProjectListContainer";
// import MarketingCampaignContainer from "../modules/marketingCampaign/MarketingCampaignContainer";
// import ClassesContainer from "../modules/classes/ClassesContainer";
// import RegistersClassContainer from "../modules/classes/class/registers/RegistersContainer";
// import ProfileContainer from "../modules/profile/ProfileContainer";
// import ProcessListContainer from "../modules/book/ProcessListContainer";
// import InfoCustomerContainer from "../modules/customer/InfoCustomerContainer";
// import CalendarContainer from "../modules/tasks/calendar/CalendarContainer";
// import BasesContainer from "../modules/bases/BasesContainer";
// import ListLessonContainer from "../modules/attendance/ListLessonContainer";
// import SubscribersContainer from "../modules/emailSubscribersList/SubscribersContainer";
// import OverviewSales from "../modules/summarySales/OverviewSales";
// import ManageRoleContainer from "../modules/role/ManageRoleContainer";
// import StorePostContainer from "../modules/blog/StorePostContainer";
// import InfoStudentContainer from "../modules/infoStudent/InfoStudentContainer";
// import coursesCreateEditStudying from "../modules/courses/coursesForm/coursesCreateEditStudying";
// import ManageStaffsContainer from "../modules/manageStaff/ManageStaffsContainer";
// import CreateRoleContainer from "../modules/role/CreateRoleContainer";
// import WareHouseContainer from "../modules/wareHouse/WareHouseContainer";
// import EmailFormsContainer from "../modules/emailForms/EmailFormsContainer";
// import coursesCreateEditDocuments from "../modules/courses/coursesForm/coursesCreateEditDocuments";
// import SupplierContainer from "../modules/supplier/SupplierContainer";
// import RoomsContainer from "../modules/rooms/RoomsContainer";
// import TeachersExcelContainer from "../modules/excel/TeachersExcelContainer";
// import OrderContainer from "../modules/goodOrders/order/OrderContainer";
// import AddDiscountContainer from "../modules/addDiscount/AddDiscountContainer";
// import SummaryMarketingCampaignContainer from "../modules/summaryMarketingCampaign/SummaryMarketingCampaignContainer";
// import EmailCampaignsContainer from "../modules/emailCampaigns/EmailCampaignsContainer";
// import GoodDetailContainer from "../modules/good/GoodDetailContainer";
// import AttendanceStaffsContainer from "../modules/attendanceStaffs/AttendanceStaffsContainer";
// import ManageDepartmentContainer from "../modules/manageDepartment/ManageDepartmentContainer";
// import HistoryCallContainer from "../modules/infoStudent/historyCalls/HistoryCallContainer";
// import HistoryCallsContainer from "../modules/historyCalls/HistoryCallsContainer";
// import CreateProjectContainer from "../modules/tasks/project/CreateProjectContainer";
// import RegisterListContainer from "../modules/registerStudents/RegisterListContainer";
// import coursesCreateEditGeneral from "../modules/courses/coursesForm/coursesCreateEditGeneral";
// import CustomerContainer from "../modules/customer/CustomerContainer";
// import HistoryCollectMoneyContainer from "../modules/historyCollectMoney/HistoryCollectMoneyContainer";
// import CreateBaseContainer from "../modules/bases/CreateBaseContainer";
// import HistoryTeachingContainer from "../modules/classes/class/historyTeaching/HistoryTeachingContainer";
// import CreateGoodPropertyContainer from "../modules/good/CreateGoodPropertyContainer";
// import ProgressClassContainer from "../modules/classes/class/progress/ProgressContainer";
import AppContainer from "../containers/AppContainer";
// import EmailTemplatesContainer from "../modules/emailTemplates/EmailTemplatesContainer";
// import EditProfileContainer from "../modules/profile/EditProfileContainer";
// import BarcodesContainer from "../modules/book/barcode/BarcodesContainer";
// import ProductListContainer from "../modules/productList/ProductListContainer";
// import GroupCustomerContainer from "../modules/groupCustomer/GroupCustomerContainer";
// import SummarySalesContainer from "../modules/summarySales/SummarySalesContainer";
// import CreateProductContainer from "../modules/createProduct/CreateProductContainer";
// import ProductSystemContainer from "../modules/createProduct/ProductSystemContainer";
// import ProgressContainer from "../modules/infoStudent/progress/ProgressContainer";
// import BookBoardListContainer from "../modules/book/BookBoardListContainer";
// import ShiftRegistersContainer from "../modules/shiftRegisters/ShiftRegistersContainer";
// import CreateGoodContainer from "../modules/good/CreateGoodContainer";
// import InfoClassContainer from "../modules/classes/class/info/InfoClassContainer";
// import PostsContainer from "../modules/blog/PostsContainer";
// import InventoryGoodContainer from "../modules/inventoryGood/InventoryGoodContainer";
// import DiscountContainer from "../modules/discount/DiscountContainer";
// import CreateEmailFormContainer from "../modules/emailForms/CreateEmailFormContainer";
// import StatisticSales from "../modules/summarySales/StatisticSales";
// import StudySessionContainer from "../modules/studySession/StudySessionContainer";
// import CreateEditCoursesContainer from "../modules/courses/coursesForm/CoursesCreateEditContainer";
// import RegistersContainer from "../modules/infoStudent/registers/RegistersContainer";
// import coursesCreateEditCurriculum from "../modules/courses/coursesForm/coursesCreateEditCurriculum";
// import StoreImportContainer from "../modules/importGoods/importGood/StoreImportContainer";
// import EditRoleContainer from "../modules/role/EditRoleContainer";
// import TaskListTemplateContainer from "../modules/good/TaskListTemplateContainer";
// import ImportGoodsContainer from "../modules/importGoods/ImportGoodsContainer";
// import BoardListContainer from "../modules/tasks/board/BoardListContainer";
// import CareContainer from "../modules/infoStudent/historyCollectMoney/CareContainer";
// import ImportContainer from "../modules/importGoods/importGood/ImportContainer";
// import ProductWebsiteContainer from "../modules/createProduct/ProductWebsiteContainer";
// import CreateEmailTemplateContainer from "../modules/emailTemplates/CreateEmailTemplateContainer";
// import AttendanceContainer from "../modules/attendance/AttendanceContainer";
// import AddStaffContainer from "../modules/manageStaff/AddStaffContainer";
// import CollectMoneyContainer from "../modules/collectMoney/CollectMoneyContainer";
// import HistoryShiftRegistersContainer from "../modules/historyShiftRegisters/HistoryShiftRegistersContainer";
// import PropertiesListContainer from "../modules/good/PropertiesListContainer";
// import ShiftSessionsContainer from "../modules/shiftSessions/ShiftSessionsContainer";
// import GensContainer from "../modules/gens/GensContainer";
// import CareClassContainer from "../modules/classes/class/historyCollectMoney/CareContainer";
// import DashboardContainer from "../modules/dashboard/DashboardContainer";
// import GoodListContainer from "../modules/good/GoodListContainer";
// import ClassContainer from "../modules/classes/class/ClassContainer";
// import LessonsContainer from "../modules/lessons/LessonsContainer";
// import OrdersContainer from "../modules/goodOrders/OrdersContainer";
import {Route} from "react-router";

export default (
    <Route path="/" component={AppContainer}>
        {/*<IndexRoute component={DashboardContainer}/>*/}
        {/*Begin dashboard routes*/}
        {/*<Route path="/manage/dashboard" component={DashboardContainer}/>*/}
        {/*End dashboard routes*/}

        {/*<Route path="manage/quan-li-nhan-su" component={ManageStaffsContainer}/>*/}
        {/*<Route path="add-staff" component={AddStaffContainer} type="create"/>*/}
        {/*<Route path="staff/:staffId/edit" component={AddStaffContainer} type="edit"/>*/}

        {/*Begin Role route*/}
        {/*<Route path="manage-role" component={ManageRoleContainer}/>*/}
        {/*<Route path="create-role" component={CreateRoleContainer}/>*/}
        {/*<Route path="role/:roleId/edit" component={EditRoleContainer}/>*/}
        {/*End Role route*/}

        {/*Begin base route*/}
        {/*<Route path="/manage/bases" component={BasesContainer}/>*/}
        {/*<Route path="/manage/rooms" component={RoomsContainer}/>*/}
        {/*<Route path="base/create" component={CreateBaseContainer} type="create"/>*/}
        {/*<Route path="base/:baseId/edit" component={CreateBaseContainer} type="edit"/>*/}
        {/*End Base route*/}

        {/*Begin tasks route*/}
        {/*<Route path="/calendar" component={CalendarContainer}/>*/}
        {/*<Route path="project/list" component={ProjectListContainer}/>*/}
        {/*<Route path="project/archive" component={ArchiveProjectListContainer}/>*/}
        {/*<Route path="project/create" component={CreateProjectContainer} type="create"/>*/}
        {/*<Route path="project/:projectId/edit" component={CreateProjectContainer} type="edit"/>*/}
        {/*<Route path="project/:projectId/boards" component={BoardListContainer}/>*/}
        {/*End tasks route*/}

        {/*Begin Email marketing routes*/}
        {/*<Route path="/email-maketing/templates" component={EmailTemplatesContainer}/>*/}
        {/*<Route path="/email-template/create" component={CreateEmailTemplateContainer} type="create"/>*/}
        {/*<Route path="/email-template/:emailTemplateId/edit" component={CreateEmailTemplateContainer} type="edit"/>*/}
        {/*<Route path="/email-maketing/forms" component={EmailFormsContainer}/>*/}
        {/*<Route path="/email-form/create" component={CreateEmailFormContainer} type="create"/>*/}
        {/*<Route path="/email-form/:emailFormId/edit" component={CreateEmailFormContainer} type="edit"/>*/}
        {/*End Email marketing routes*/}

        {/*Begin blog routes*/}
        {/*<Route path="/blog/new-post" component={StorePostContainer} type="create"/>*/}
        {/*<Route path="/blog/post/:postId/edit" component={StorePostContainer} type="edit"/>*/}
        {/*<Route path="/blog/posts" component={PostsContainer}/>*/}
        {/*End blog routes*/}

        {/*Begin register student routes*/}
        {/*<Route path="/manage/registerlist(/:salerId)" component={RegisterListContainer}/>*/}
        {/*<Route path="/manage/waitlist" component={RegisterListContainer}/>*/}
        {/*<Route path="/registerlist/:campaignId/:genId" component={RegisterListContainer}/>*/}
        {/*End register student routes*/}

        {/*/!*Begin register student routes*!/*/}
        {/*<Route path="/my-profile" component={ProfileContainer}/>*/}
        {/*<Route path="/edit-profile" component={EditProfileContainer}/>*/}
        {/*End register student routes*/}

        {/*Begin study session routes*/}
        {/*<Route path="/manage/studysession" component={StudySessionContainer}/>*/}
        {/*End study session routes*/}

        {/*Begin study session routes*/}
        {/*<Route path="/manage/scheduleclass" component={ScheduleClassContainer}/>*/}
        {/*End study session routes*/}

        {/*Begin gens routes*/}
        {/*<Route path="/manage/gens" component={GensContainer}/>*/}
        {/*End gens routes*/}

        {/*Begin info student routes*/}
        {/*<Route path="/info-student/:studentId" component={InfoStudentContainer}>*/}
        {/*<IndexRoute component={RegistersContainer}/>*/}
        {/*<Route path="history-calls" component={HistoryCallContainer}/>*/}
        {/*<Route path="progress" component={ProgressContainer}/>*/}
        {/*<Route path="historyCollectMoney" component={CareContainer}/>*/}
        {/*</Route>*/}
        {/*End info student routes*/}

        {/*Begin collect money routes*/}
        {/*<Route path="/manage/moneycollect" component={CollectMoneyContainer}/>*/}
        {/*End collect money routes*/}

        {/*Begin history collect money routes*/}
        {/*<Route path="/manage/paidlist" component={HistoryCollectMoneyContainer}/>*/}
        {/*End history collect money routes*/}

        {/*Begin history collect money routes*/}
        {/*<Route path="/manage/telesalehistory(/:callerId)" component={HistoryCallsContainer}/>*/}
        {/*End history collect money routes*/}

        {/*Begin class routes*/}
        {/*<Route path="/manage/classes(/:teacherId)" component={ClassesContainer}/>*/}
        {/*End class routes*/}

        {/*Begin good routes*/}
        {/*<Route path="/good/:type/process" component={ProcessListContainer}/>*/}
        {/*<Route path="/good/:goodId/detail" component={GoodDetailContainer}/>*/}
        {/*<Route path="/good/:type/properties" component={PropertiesListContainer}/>*/}
        {/*<Route path="/good/:type/property/create" component={CreateGoodPropertyContainer}/>*/}
        {/*<Route path="/property-item/:id/edit" component={CreateGoodPropertyContainer}/>*/}
        {/*<Route path="/tasklist-template/:id" component={TaskListTemplateContainer}/>*/}


        {/*<Route path="/barcodes" component={BarcodesContainer}/>*/}


        {/*<Route path="/:type/manufacture" component={BookBoardListContainer}/>*/}
        {/*<Route path="/good/:type/all" component={GoodListContainer}/>*/}
        {/*<Route path="/good/:goodId/edit" component={CreateGoodContainer} type="edit"/>*/}
        {/*<Route path="good/:type/create" component={CreateGoodContainer} type="create"/>*/}
        {/*<Route path="good/create" component={CreateGoodContainer} type="create"/>*/}
        {/*End good routes*/}

        {/*Begin class routes*/}
        {/*<Route path="/class/:classId" component={ClassContainer}>*/}
        {/*<IndexRoute component={InfoClassContainer}/>*/}
        {/*<Route path="history-teaching" component={HistoryTeachingContainer}/>*/}
        {/*<Route path="registers" component={RegistersClassContainer}/>*/}
        {/*<Route path="progress" component={ProgressClassContainer}/>*/}
        {/*<Route path="historyCollectMoney" component={CareClassContainer}/>*/}
        {/*</Route>*/}
        {/*End class routes*/}

        {/*Begin email subscribers list routes*/}
        {/*<Route path="/manage/subscribers_list" component={EmailSubscribersListContainer}/>*/}
        {/*<Route path="/email/subscribers(/:listId)" component={SubscribersContainer}/>*/}
        {/*End email subscribers list routes*/}

        {/*Begin email campaigns routes*/}
        {/*<Route path="/manage/campaigns(/:ownerId)" component={EmailCampaignsContainer}/>*/}
        {/*End email campaigns routes*/}

        {/*Begin shift register routes*/}
        {/*<Route path="/manage/regis-shifts" component={ShiftRegistersContainer}/>*/}
        {/*<Route path="/register-shifts/history" component={HistoryShiftRegistersContainer}/>*/}
        {/*End shift register routes*/}

        {/*Begin shift session routes*/}
        {/*<Route path="/manage/shift" component={ShiftSessionsContainer}/>*/}
        {/*End shift session routes */}

        {/*Begin course routes */}
        {/*<Route path="/manage/courses" component={CoursesContainer}/>*/}

        {/*<Route path="/manage/courses/edit/:courseId" component={CreateEditCoursesContainer} type="edit">*/}
        {/*<IndexRoute component={coursesCreateEditGeneral}/>*/}
        {/*<Route path="curriculum" component={coursesCreateEditCurriculum}/>*/}
        {/*<Route path="documents" component={coursesCreateEditDocuments}/>*/}
        {/*<Route path="studying" component={coursesCreateEditStudying}/>*/}
        {/*<Route path="interested" component={coursesCreateEditInterested}/>*/}
        {/*</Route>*/}
        {/*<Route path="/manage/courses/create" component={CreateEditCoursesContainer} type="create">*/}
        {/*<IndexRoute component={coursesCreateEditGeneral}/>*/}
        {/*<Route path="curriculum" component={coursesCreateEditGeneral}/>*/}
        {/*<Route path="documents" component={coursesCreateEditGeneral}/>*/}
        {/*<Route path="studying" component={coursesCreateEditGeneral}/>*/}
        {/*<Route path="interested" component={coursesCreateEditGeneral}/>*/}
        {/*</Route>*/}
        {/*End course routes */}

        {/*End lessons routes */}
        {/*<Route path="/manage/courses/lessons/edit/:lessonId" component={LessonsContainer}/>*/}
        {/*<Route path="/manage/courses/lessons/create/:courseId" component={LessonsContainer}/>*/}
        {/*End lessons routes */}

        {/*Begin lessons routes */}
        {/*<Route path="/manage/attendance" component={AttendanceContainer}/>*/}
        {/*<Route path="/manage/attendance/:classId" component={ListLessonContainer}/>*/}
        {/*End lessons routes */}

        l

        {/*Begin categories routes */}
        {/*<Route path="/goods/categories" component={CategoriesContainer}/>*/}
        {/*End categories routes */}


        {/*Begin good order routes */}
        {/*<Route path="/goods/orders" component={OrdersContainer}/>*/}
        {/*<Route path="/goods/order/:orderId" component={OrderContainer}/>*/}
        {/*End good order routes */}

        {/*Begin product-list routes */}
        {/*<Route path="/goods/products" component={ProductListContainer}/>*/}
        {/*End product-list routes*/}

        {/*Begin inventory-good routes*/}
        {/*<Route path="/goods/inventories" components={InventoryGoodContainer}/>*/}
        {/*End inventory-good routes*/}

        {/*Begin import goods routes */}
        {/*<Route path="/import-goods" component={ImportGoodsContainer}/>*/}
        {/*<Route path="/import-good/create" component={StoreImportContainer} type="create"/>*/}
        {/*<Route path="/import-good/:importGoodId/edit" component={StoreImportContainer} type="edit"/>*/}
        {/*<Route path="/import-good/:importGoodId" component={ImportContainer}/>*/}
        {/*End import goods routes*/}

        {/*Begin warehouse routes */}
        {/*<Route path="/goods/warehouses" component={WareHouseContainer}/>*/}
        {/*End warehouse routes*/}

        {/*Begin customer routes */}
        {/*<Route path="/goods/customer" component={CustomerContainer}/>*/}
        {/*<Route path="/goods/customer/info-customer/:customerId" component={InfoCustomerContainer}/>*/}
        {/*<Route path="/goods/group-customer" component={GroupCustomerContainer}/>*/}
        {/*End customer routes*/}


        {/*Begin marketing campaigns routes */}
        {/*<Route path="/manage/marketing-campaign" component={MarketingCampaignContainer}/>*/}
        {/*<Route path="/marketing-campaign/summary" component={SummaryMarketingCampaignContainer}/>*/}
        {/*End marketing campaigns routes*/}


        {/*Begin supplier routes */}
        {/*<Route path="/goods/supplier" component={SupplierContainer}/>*/}
        {/*End supplier routes*/}

        {/*Begin discount routes */}
        {/*<Route path="/discount/add" component={AddDiscountContainer}/>*/}
        {/*<Route path="/discount" component={DiscountContainer}/>*/}
        {/*<Route path="/discount/edit/:discountId" component={AddDiscountContainer}/>*/}
        {/*End discount routes*/}

        {/*Begin sales routes */}
        {/*<Route path="/manage/sales" component={SummarySalesContainer}>*/}
        {/*<IndexRoute component={OverviewSales}/>*/}
        {/*<Route path="statistic" component={StatisticSales}/>*/}
        {/*</Route>*/}
        {/*End sales routes*/}


        {/*Begin create-product routes */}
        {/*<Route path="/create-product" component={CreateProductContainer} type="create">*/}
        {/*<IndexRoute component={ProductSystemContainer}/>*/}
        {/*<Route path="website-display" component={ProductWebsiteContainer}/>*/}
        {/*</Route>*/}
        {/*End create-product routes*/}

        {/*Begin edit-product routes */}
        {/*<Route path="/product/:productId/edit" component={CreateProductContainer} type="edit">*/}
        {/*<IndexRoute component={ProductSystemContainer}/>*/}
        {/*<Route path="website-display" component={ProductWebsiteContainer}/>*/}
        {/*</Route>*/}
        {/*End edit-product routes*/}

        {/*Begin edit-product routes */}
        {/*<Route path="/staff/attendances" component={AttendanceStaffsContainer}/>*/}
        {/*End edit-product routes*/}

        {/*Begin edit-product routes */}
        {/*<Route path="/excel/teachers/:genId" component={TeachersExcelContainer}/>*/}
        {/*End edit-product routes*/}


        {/*Begin Role route*/}
        {/*<Route path="manage-department" component={ManageDepartmentContainer}/>*/}
        {/*End Role route*/}

    </Route>
);