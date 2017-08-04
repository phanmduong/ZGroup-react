<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Route::get('warning', function () {
//
//    return "you don't have right to access this page";
//});
//Route::get('ping', function () {
//
//    return "OK";
//});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::post('uploadfile', 'PublicController@upload_file');
Route::get('manage/email/open', 'PublicController@open_email');
Route::post('manage/receive_notifications', 'PublicController@receive_notifications');
Route::post('manage/receive_video_convert_notifications', 'PublicController@receive_video_convert_notifications');
Route::get('access_forbidden', 'PublicController@access_forbidden');

//Route::post('/api/topic/{topicId}/images','PublicController@store_images');
Route::group(['domain' => 'manage.zgroup.{ga}'], function () {
    Route::get('/login', 'PublicController@manage');
    Route::get('/', 'PublicController@manage');
    Route::get('/manage/quan-li-nhan-su', 'PublicController@manage');
    Route::get('/add-staff', 'PublicController@manage');
});

Route::group(['domain' => 'zgroup.{ga}'], function () {
    Route::get('/', 'PublicController@redirectManage');
});

Route::group(['domain' => 'manageapi.zgroup.{ga}'], function () {
    Route::get('/tabs', 'ManageTabApiController@get_tabs');
    Route::get('/get-staffs', 'ManageStaffApiController@get_staffs');
    Route::get('/get-roles', 'ManageStaffApiController@get_roles');
    Route::post('change-role-staff', 'ManageStaffApiController@change_role');
    Route::post('add-staff', "ManageStaffApiController@add_staff");
});

Route::group(['domain' => 'api.zgroup.{ga}'], function () {
    Route::group(['prefix' => 'v2'], function () {
        Route::get('gens/{gen_id}/dashboard/{base_id?}', 'MobileController@dashboardv2');
        Route::get('search-registers', 'MoneyManageApiController@search_registers');
        Route::post('pay-register', 'MoneyManageApiController@pay_register');
        Route::post('activate-class', 'ManageClassApiController@activate_class');
        Route::post('change-class-status', 'ManageClassApiController@change_class_status');
    });
    Route::get('/duong', 'PublicController@redirectManage');
    Route::get('/duong1', 'PublicController@redirectManage');
    Route::post('/login', 'AuthenticateController@login');
    Route::get('/refresh-token', 'MobileController@refreshToken');
    Route::get('/bases', 'MobileController@bases');
    Route::get('/gens', 'MobileController@gens');
    Route::get('/courses', 'MobileController@courses');
    Route::get('/courses/{courseId}/lessons', 'MobileController@lessons');
    Route::get('/gens/{gen_id}/bases/{baseId}/courses/{courseId}/classes', 'MobileController@classes');
    Route::get('/studentcode/{code}', 'MobileController@student_code');
    Route::post('/attendances/{attendance_id}', 'MobileController@attendance');
    Route::get('gens/{gen_id}/dashboard/{base_id?}', 'MobileController@dashboard');

    Route::get('/survey', 'SurveyApiController@get_survey');
    Route::post('/submit-survey', 'SurveyApiController@submit_survey');

    Route::get('/class/{classId}/students', 'ClassApiController@students');
    Route::get('/class/{classId}', 'ClassApiController@studyClass');
    Route::post('class/{classId}/form', 'ClassApiController@form');
    Route::post('/class/{classId}/enroll', 'ClassApiController@enroll');
    Route::get('/current-study-class', 'ClassApiController@currentStudyClass');

    Route::get('/newestcode', 'StudentApiController@get_newest_code');
    Route::get('/students', 'StudentApiController@search_student');

    Route::post('/getmoney', 'StudentApiController@get_money');
    Route::get('products', 'PublicApiController@products');
    Route::get('popular-products', 'PublicApiController@popular_products');
    Route::get('product/{productId}/content', 'PublicApiController@product_content');
    Route::get('product/{productId}/comments', 'PublicApiController@product_comments');
    Route::post('product/{productId}/like', 'ProductApiController@like');
    Route::get('product/{productId}/likers', 'ProductPublicApiController@likes');

    Route::post('product/{product_id}/feature', 'ProductApiController@feature');
    Route::post('product/{productId}/comment', 'ProductApiController@comment');
    Route::post('product/{productId}/update', 'ProductApiController@update_product');
    Route::post('product/{productId}/unlike', 'ProductApiController@unlike');

    Route::get('uncomment-products/{genId?}', 'ProductApiController@uncomment_products');

    Route::post('comment/{commentId}/delete', 'ProductApiController@delete_comment');

    Route::get('/staffs', 'MoneyApiController@staffs');
    Route::post('/transactions', 'MoneyApiController@create_transaction');
    Route::get('/transactions', 'MoneyApiController@get_transactions');
    Route::post('/confirm-transactions', 'MoneyApiController@confirm_transaction');

    Route::get('/courses-lite', 'CoursePublicApiController@courses');
    Route::get('/course/{linkId}', 'CoursePublicApiController@course');

    Route::post('/user', 'UserPublicApiController@store_user');
    Route::get('/user/{user_id}/side-nav', 'UserPublicApiController@user_side_nav_info');
    Route::get('/user/{user_id}/side-nav-groups', 'UserPublicApiController@load_user_side_nav_groups');
    Route::get('/user/{username}/profile', 'UserPublicApiController@user_profile');
    Route::get('/user/{username}/progress', 'UserPublicApiController@user_progress');
    Route::post('/update-user-info', 'UserApiController@update_user_info');
    Route::get('/products/{username}', 'UserPublicApiController@user_products');
    Route::post('/products/{username}', 'UserApiController@store_avatar');
    Route::post('/change-avatar', 'UserApiController@change_avatar');

    Route::post('/upload-image', 'UserApiController@upload_image');
    Route::post('/upload-image-froala', 'PublicApiController@upload_image_froala');
    Route::post('/upload-file-froala', 'PublicApiController@upload_file_froala');
    Route::post('/delete-image-froala', 'PublicApiController@delete_image_froala');
    Route::post('/upload-video', 'UserApiController@upload_video');
    Route::post('/delete-file', 'UserApiController@delete_file');
    Route::post('/save-product', 'UserApiController@save_product');
    Route::post('/delete-product/{product_id}', 'UserApiController@delete_product');

    Route::post('/order', 'UserPublicApiController@create_order');
    Route::post('/change-order-status', 'UserPublicApiController@change_order_status');
    Route::get('/item/{item_id}', 'UserPublicApiController@item');

    Route::get('/notifications', 'UserApiController@notifications');
    Route::get('/seen-all-notifications', 'UserApiController@seen_all_notifications');

    Route::get('/paid-courses', 'ResourceApiController@paid_courses');
    Route::get('/lesson/{lesson_id}', 'ResourceApiController@lesson');
    Route::get('/links/{linkId}', 'ResourceApiController@links');
    Route::get('/about-us-data', 'PublicApiController@about_us_data');

    Route::get('/search-users', 'PublicApiController@search_users');
    Route::get('/search-products', 'PublicApiController@search_products');
    Route::get('/product-categories', 'PublicApiController@product_categories');

    Route::post('/transcode-video', 'PublicApiController@create_transcoder_job');

    Route::get('/group/{groupId}', 'GroupPublicApiController@group');

    Route::post('/save-topic', 'GroupApiController@save_topic');
    Route::get('/topic/{topicId}/products', 'GroupPublicApiController@topic_products');
    Route::get('/topic/{topicId}/actions', 'GroupPublicApiController@topic_actions');
    Route::get('/topic/{topicId}/products', 'GroupPublicApiController@topic_products');
    Route::get('/topic/{topicId}', 'GroupPublicApiController@topic');
    Route::post('/topic/{topicId}/delete', 'GroupApiController@delete_topic');

    Route::get('/tcv-api/user', 'TopCVPublicApiController@user');
    Route::post('/tcv-api/user/cvs', 'TopCVPublicApiController@cvs');

    Route::post('/request-cv', "UserApiController@request_cv");
    Route::get('/create-cv/{user_id}', "PublicApiController@create_cv");
    Route::get('/cvs', "UserApiController@cvs");
    Route::post('/set-current-cv/{cv_id}', "UserApiController@set_current_cv");

    Route::get('/search-user-to-add', "UserPublicApiController@search_users");
    Route::post('/add-user-to-group', "UserApiController@add_user_to_group");
    Route::post('/join-topic', "UserApiController@join_topic");

    // begin api quản lý ca trực
    Route::get('current-shifts', 'ShiftApiController@get_current_shifts');
    Route::post('register-shift/{shiftId}', 'ShiftApiController@register_shift');
    Route::post('remove-shift-regis/{shiftId}', 'ShiftApiController@remove_shift_regis');
    // end api quản lý ca trực

    // api danh sach dang ki
    Route::get('register-list', 'StudentApiController@registerlist');
    Route::get('call-history', 'StudentApiController@callHistory');


    Route::post("manage/child1", 'ManageInfoController@getInfo');


});



Route::group(['middleware' => 'web'], function () {

    Route::group(['domain' => 'beta.colorme.{vn}'], function () {
        Route::get('/', 'PublicController@beta');
        Route::get('/about-us', 'PublicController@beta');
        Route::get('/post/{LinkId}', 'PublicController@beta');
        Route::get('/sign-in', 'PublicController@beta');
        Route::get('/upload-post', 'PublicConƒtroller@beta');
        Route::get('/course/{LinkId}', 'PublicController@beta');
        Route::get('/profile/{username}', 'PublicController@beta');
        Route::get('/profile/{username}/progress', 'PublicController@beta');
        Route::get('/profile/{username}/info', 'PublicController@beta');
        Route::get('resource/linkId}/lesson/{lessonId}', 'PublicController@beta');
        Route::get('/mua-sach', 'PublicController@beta');
    });
    Route::group(['prefix' => 'api'], function () {

        Route::post('createstudysession', 'ManageClassController@createStudySession');
        Route::get('studysessions', 'ManageClassController@getStudySessions');
        Route::get('schedules', 'ManageClassController@schedules');
        Route::post('createschedule', 'ManageClassController@createSchedule');
        Route::post('deleteschedule/{id}', 'ManageClassController@deleteSchedule');
        Route::post('deletestudysession/{id}', 'ManageClassController@deleteStudySession');

        Route::get('/nhanviens', 'RoleController@nhanViens');
        Route::get('/roles', 'RoleController@roles');
        Route::get('/roles/{roleId}', 'RoleController@role');

        Route::get('/search-user', 'RoleController@searchUser');
        Route::get('/tabs', 'RoleController@tabs');
        Route::post('/roles', 'RoleController@store_role');
        Route::post('/nhanviens/{staffId}/role', 'RoleController@change_role');
        Route::post('/nhanviens/{staffId}/base', 'RoleController@change_base');
        Route::delete('/roles/{roleId}', 'RoleController@delete_role');
        Route::delete('/nhanviens/{staffId}', 'RoleController@delete_staff');

        Route::get('/topics/{classId}', 'GroupController@topics');
        Route::post('/topic', 'GroupController@topic');
        Route::get('/topic/{topicId}', 'GroupController@topic_detail');

        Route::post('/topic/{topicId}/images', 'GroupController@store_images');
        Route::post('/topic/{topicId}/videos', 'GroupController@store_video');
        Route::post('/topic/{topicId}/product', 'GroupController@create_product');
        Route::get('/topic/{topicId}/upvote', 'GroupController@upvote');
        Route::get('/topic/{topicId}/downvote', 'GroupController@downvote');


        Route::get('/class/{classId}', 'GroupController@studyClass');
        Route::get('/class/{classId}/students', 'GroupController@students');

        Route::post('/shift-session', 'ManageShiftController@store_shift_session');
        Route::get('/shift-session', 'ManageShiftController@get_shift_session');
        Route::post('/shift-session/{id}', 'ManageShiftController@edit_shift_session');
        Route::get('/shift-session/{id}', 'ManageShiftController@get_one_shift_session');

        Route::post('surveylesson', 'SurveyController@create_survey_lesson');
        Route::post('removesurveylesson', 'SurveyController@remove_survey_lesson');
        Route::post('deletequestion', 'SurveyController@delete_question');

        Route::get('current-shifts/{gen_id?}', 'ManageShiftController@get_current_shifts');
        Route::get('get-bases', 'ManageShiftController@get_bases');
        Route::get('shifts-progress/{gen_id?}', 'ManageShiftController@shifts_progress');
        Route::get('shift-picks', 'ManageShiftController@get_shift_picks');
        Route::post('register-shift', 'ManageShiftController@register_shift');

        Route::post('remove-shift-regis', 'ManageShiftController@remove_shift_regis');

        Route::get('telesale/search-student', 'TelesaleController@search_student');

        Route::get('smslist', 'ManageSmsController@smsList');
        Route::post('create-sms-template', 'ManageSmsController@createSmsTemplate');
        Route::post('send-sms', 'ManageSmsController@sendSms');
        Route::get('sms-templates', 'ManageSmsController@smsTemplates');
        Route::get('sms-classes', 'ManageSmsController@smsClasses');

    });

    Route::get('/', 'PublicController@redirectManage');
    Route::get('/mua-sach', 'PublicCrawlController@buy_book');
    Route::get('/group/{group_id}', 'PublicController@beta');
    Route::get('/upload-post/{topic_id}', 'PublicController@beta');
    Route::get('/group/{group_id}/topic/{topic_id}', 'PublicController@beta');
    Route::get('/group/{group_id}/create-topic', 'PublicController@beta');
    Route::get('/group/{group_id}/topic/{topic_id}/posts', 'PublicController@beta');
    Route::get('/post/{post_id}/edit', 'PublicController@beta');
    Route::get('/search', 'PublicController@beta');
    Route::get('/courses', 'PublicController@beta');
    Route::get('/notifications-list', 'PublicController@beta');
    Route::get('/posts/{popular}', 'PublicController@beta');
    Route::get('/about-us', 'PublicController@beta');
    Route::get('/', 'PublicCrawlController@home');
    Route::get('/post/{LinkId}', 'PublicCrawlController@post');
    Route::get('/sign-in', 'PublicController@beta');
    Route::get('/upload-post', 'PublicController@beta');
    Route::get('/course/{LinkId}', 'PublicCrawlController@course');
    Route::get('/profile/{username}', 'PublicController@beta');
    Route::get('/profile/{username}/progress', 'PublicController@beta');
    Route::get('/profile/{username}/info', 'PublicController@beta');
    Route::get('resource/{linkId}/lesson/{lessonId}', 'PublicController@beta');

    Route::get('manage/changeclass/{registerId}', 'ManageStudentController@change_class');
    Route::get('manage/confirmchangeclass', 'ManageStudentController@confirm_change_class');

    Route::get('manage/comment', 'ManagePostController@posts');
    Route::get('manage/comment-list', 'ManagePostController@staff_comment_list');


    Route::get("manage/sms", 'ManageSmsController@sms');
    Route::get("manage/sendsms/{smsId}", 'ManageSmsController@sms');
    Route::get("manage/createsms", 'ManageSmsController@sms');


    Route::get('download/danh-sach-hoc-vien-dong-tien', 'HomeController@download_paid_students');
//    Route::get('fire', function () {
//        // this fires the event
////        event(new App\Events\RealtimeNotification());
//        $data = [
//            'event' => 'test',
//            'data' => [
//                'power' => 10
//            ]
//        ];
//        \Illuminate\Support\Facades\Redis::publish('colorme-channel', json_encode($data));
//        return "event fired";
//
//    });

//    Route::get('test', function () {
//        // this checks for the event
//        return view('test');
//    });
    // Route::get("manage/testactivateclass","HomeController@activate_class");

    Route::get('manage/expenseincome/{year?}', 'MoneyController@expense_income');

    //quan ly lich truc
    Route::get('manage/shift', 'ManageShiftController@index');
    Route::get('manage/regis-shifts', 'ManageShiftController@regis_shifts');

    Route::get('/manage/downloadsurveyclass', 'SurveyController@download_survey_class');

    Route::get("group/class/{classId}", "GroupController@index");
    Route::get("group/classes", "GroupController@group_classes");

    Route::get("manage/quan-li-nhan-su", "RoleController@index");

    Route::get("classes/{classId}/students", "ClassController@students");
    Route::get("loadnotifications", "StudentController@load_notifications");
    Route::get("compute-certificate/{classId}", "ClassController@compute_certificate");

    Route::get('manage/new_subscriber', 'EmailController@new_subscriber');
    Route::post('manage/store_subscriber', 'EmailController@store_subscriber');
    Route::post('manage/sendmorelist', 'CampaignController@send_more_list');

    Route::get('manage/spendmoney', 'MoneyController@spend_money');
    Route::get('manage/personalspendlist', 'MoneyController@spend_list');
    Route::post('manage/storetransaction', 'MoneyController@store_transaction');
    Route::get('manage/spendlist', 'MoneyController@spend_list')->middleware(['is_admin']);
    Route::get('ajax/spendlistloadmore', 'MoneyController@ajax_spend_list_load_more');


    // begin quan ly marketing
    Route::get('manage/sales', 'ManageMarketingController@manage_sales');
    Route::get('manage/sale-list', 'ManageMarketingController@sale_list');
    Route::get('manage/marketing-campaign-detail/{id}', 'ManageMarketingController@marketing_campaign_detail');
    // end quan ly marketing

    Route::get('manage/mail/queue', 'CampaignController@queue_mail');
    Route::get('manage/template/view', 'CampaignController@view_template');
    Route::get('manage/campaign/edit', 'CampaignController@edit_campaign');
    Route::get('manage/campaign/select_template', 'CampaignController@select_template');
    Route::post('manage/campaign/store_email_template', 'CampaignController@store_email_template');
    Route::post('manage/campaign/store_campaign', 'CampaignController@store_campaign');
    Route::get('manage/campaign', 'CampaignController@campaign');
    Route::get('manage/campaigns', 'CampaignController@index');
    Route::get('manage/campaign/new', 'CampaignController@new_campaign');
//    Subscribers
    Route::get('manage/subscribers_list', 'EmailController@subscribers_list');
    Route::get('manage/new_subscribers_list', 'EmailController@new_subscribers_list');
    Route::post('manage/store_subscribers_list', 'EmailController@store_subscribers_list');
    Route::get('manage/subscribers', 'EmailController@subscribers');
    Route::get('manage/upload_subscribers_csv', 'EmailController@upload_subscribers_csv');
    Route::post('manage/subscribers_list/handle_file_upload', 'EmailController@handle_file_upload');

    Route::post('manage/savelesson', 'HomeController@save_lesson');
    Route::get('manage/allrating', 'PersonalRatingController@all_rating');
    Route::get('manage/personalrating', 'PersonalRatingController@index');
    Route::get('manage/ratingdetail', 'PersonalRatingController@rating_detail');

    Route::get('searchautocomplete', 'PublicController@search_autocomplete');
//    Route::get('search', 'PublicController@search');

    Route::get('product/getlikedusers', 'PublicController@get_liked_users');

    Route::get('student/editblogpost/{id}', 'StudentController@edit_blog_post');

    Route::get('manage/producttags', 'TagController@index');
    Route::get('manage/newtag', 'TagController@new_tag');
    Route::post('manage/storetag', 'TagController@store_tag');
    Route::get('manage/deletetag/{id}', 'TagController@delete_tag');

    Route::get('/test', 'PublicController@test');

    Route::post('storeemail', 'PublicController@store_email');

    //api
    Route::get('api/getproductdata/{product}', 'PublicController@get_product_data');

    //ajax
    Route::get('ajax/getcomments/{product_id}', 'PublicController@get_comment_new');
    Route::get('ajax/load-more-product-profile/{user_id}/{last_product_id}/{limit}', 'PublicController@load_more_product_profile');
    Route::post('product/storeview', 'PublicController@store_view');

    //Public Route
    Route::get('courses/{user_id}/{campaign_id}', 'PublicController@courses');
    Route::get('classes/register/{class_id?}/{user_id?}/{campaign_id?}', 'PublicController@register_class');
    Route::get('classes/{course_id?}/{user_id?}/{campaign_id?}', 'PublicController@classes');

    Route::post('classes/register_store', 'PublicController@register_store');
    Route::get('register_success', 'PublicController@register_success_confirm');
    Route::get('mail', 'PublicController@test_mail');
    Route::get('editmail', 'PublicController@edit_mail');

    Route::get('/landing/{name}', 'PublicController@landing');

    // Authentication Routes...
    $this->get('login', 'Auth\AuthController@showLoginForm');
    $this->post('login', 'Auth\AuthController@login');
    $this->get('logout', 'Auth\AuthController@logout');

    // Registration Routes...
    $this->get('register', 'Auth\AuthController@showRegistrationForm');
    $this->post('register', 'Auth\AuthController@register');

    // Password Reset Routes...
    $this->get('password/reset/{token?}', 'Auth\PasswordController@showResetForm');
    $this->get('password/reset', 'Auth\PasswordController@getEmail');
    $this->get('home', 'PasswordController@doneResetPassword');
    $this->post('password/email', 'Auth\PasswordController@sendResetLinkEmail');
    $this->post('password/reset', 'Auth\PasswordController@reset');

    Route::get('manage/dashboard', 'HomeController@index');
    Route::get('manage/getdashboarddata/{base_id?}/{gen_id?}', 'HomeController@get_dashboard_data');

    Route::get('manage/categories', 'ManageProductController@index');
    Route::get('category', 'PublicController@products');
    Route::get('manage/newcategory', 'ManageProductController@new_category');
    Route::get('manage/category/{id}', 'ManageProductController@edit_category');
    Route::get('manage/deletecategory/{id}', 'ManageProductController@delete_category');
    Route::post('manage/storecategoryproduct', 'ManageProductController@store_category_product');

    Route::get('manage/tabs', 'HomeController@show_tabs');
    Route::get('manage/moneycollect', 'HomeController@money_collect');
    Route::get('manage/roles', 'HomeController@show_roles');

    Route::get('manage/scheduleclass', 'ManageClassController@schedule');
    Route::get('manage/studysession', 'ManageClassController@studySession');

    Route::get('manage/telesalehistory/{page?}', 'HomeController@all_tele_sale_history');
    Route::get('manage/get_telecalls_list', 'HomeController@telecalls_list');

    Route::get('manage/gens/{page?}', 'HomeController@manage_gens');
    Route::get('manage/courses/{page?}', 'HomeController@courses');
    Route::get('manage/classes/{page?}', 'HomeController@classes');
    Route::get('manage/registerlist', 'HomeController@registerList');
    Route::get('manage/waitlist', 'HomeController@waitList');
    Route::get('manage/study-history/{student_id}', 'HomeController@study_history');
    Route::get('manage/studentsneedcall/{page?}', 'HomeController@student_needs_call');
    Route::get('manage/keepmoney/{page?}', 'HomeController@keep_money')->middleware(['is_admin']);

    Route::post('manage/storegen', 'HomeController@store_gen');
    Route::post('manage/storecourse', 'HomeController@store_course');
    Route::post('manage/storeclass', 'HomeController@store_class');
    Route::post('manage/changeclassstatus', 'HomeController@change_class_status');
    Route::post('manage/ajaxchangecallstatus', 'HomeController@ajax_call_status');
    Route::post('manage/getcallhistory', 'HomeController@ajax_get_call_history');
    Route::post('manage/searchstudent', 'HomeController@search_student');
    Route::post('manage/getmoney', 'HomeController@get_money');
    Route::post('manage/storeeditgen', 'HomeController@store_edit_gen');
    Route::post('manage/setstudenttocalled', 'HomeController@set_student_to_called');
    Route::post('manage/storesendmoney', 'HomeController@store_send_money');
    Route::post('manage/confirmtransaction', 'HomeController@confirm_transaction');
    Route::post('manage/storelesson', 'HomeController@store_lesson');
    Route::post('manage/refreshclasslesson', 'HomeController@update_class_lesson');
    Route::post('manage/saveclasslessontime', 'HomeController@save_class_lesson_time');
    Route::post('manage/activateclass', 'HomeController@activate_class');
    Route::post('manage/changeattendstatus', 'HomeController@change_attend_status');
    Route::post('manage/changehwstatus', 'HomeController@change_hw_status');
    Route::post('manage/changeattendance', 'HomeController@change_attendance');
    Route::get('manage/set_class_lesson_time', 'HomeController@set_class_lesson_time');

    Route::get('manage/duplicateclass/{class_id}', 'HomeController@duplicate_class');

    Route::post('manage/marketingemail', 'HomeController@marketing_email');

    //Quan ly landing page
    Route::get('manage/landing-edit/{id?}', 'HomeController@landing_edit');
    Route::post('manage/landing-store', 'HomeController@landing_store');
    Route::get('manage/landing-create/{id?}', 'HomeController@landing_create');
    Route::get('manage/landing-duplicate/{id?}', 'HomeController@landing_duplicate');
    Route::get('manage/landing-delete/{id?}', 'HomeController@landing_delete');

    //quan ly co so va quan ly phong
    Route::get('manage/bases/{base_id?}', 'BaseController@index');
    Route::get('manage/newbase', 'BaseController@new_base');
    Route::get('manage/editbase/{base_id?}', 'BaseController@new_base');
    Route::post('manage/storebase', 'BaseController@store_base');
    Route::get('manage/deleteroom/{room_id}', 'BaseController@delete_room');
    Route::post('manage/storeroom', 'BaseController@store_room');
    Route::get('manage/deletebase/{base_id}', 'BaseController@delete_base');

    Route::get('newsfeed', 'PublicController@newsfeed');

    Route::post('newsfeedloadmore', 'PublicController@news_feed_load_more');
    Route::get('newsfeedloadmore', 'PublicController@news_feed_load_more');

    Route::post('storecomment', 'StudentController@store_comment');
    Route::post('notifications/count', 'StudentController@count_notification');

    Route::post('getcomment', 'PublicController@get_comment');

    Route::post('getproduct', 'PublicController@get_product');


    //student routes
    Route::get('student/user-info/{id}', 'PublicController@get_user_info');
    Route::get('product/upload', 'StudentController@upload_product');

    Route::post('student/getcoursesregistered', 'StudentController@get_classes_registered');
    Route::post('student/changeclass', 'StudentController@change_class');

    Route::post('student/storeproduct', 'StudentController@store_product');
    Route::post('student/storeblogpost', 'StudentController@store_blog_post');

    Route::get('student/lessoncontent/{lesson_id?}', 'StudentController@lesson_content');
    Route::post('storelike', 'StudentController@store_like');
    Route::post('student/getlessoncontent', 'StudentController@get_lesson_content');
    Route::post('student/deleteproduct', 'StudentController@delete_product');

    Route::get('student/lessons', 'StudentController@get_lessons_by_class');
    Route::get('student/uploadimage', 'StudentController@upload_image');
    Route::get('groups/{class_name}', 'StudentController@newsfeed');
//    Route::get('notifications', 'StudentController@notifications');

    Route::get('student/classes/{class_id?}', 'StudentController@classes');

    Route::get('bai-tap-colorme', 'PublicController@product_detail');
//    Route::get('post/{name}', 'PublicController@product_detail');

//    Route::get('profile/{code}', 'PublicController@profile');
//    Route::get('profile/edit/{id?}', 'StudentController@edit_profile');
//    Route::post('profile/save_profile/{id?}', 'StudentController@save_profile_info');
//    Route::post('profile/save_ava', 'StudentController@save_avatar');
//    Route::post('profile/save_cover', 'StudentController@save_cover');
    Route::get('student/links/{course_id?}', 'StudentController@links');

    Route::get('manage/addlink/{course_id}', 'HomeController@add_links');
    Route::post('manage/storelink', 'HomeController@store_links');
    Route::get('manage/editlink/{id}', 'HomeController@edit_links');
    Route::get('manage/deletelink/{course_id}/{id}', 'HomeController@delete_links');
    Route::get('manage/addcourse', 'HomeController@add_course');
    Route::get('manage/addlesson/{course_id}', 'HomeController@add_lesson');
    Route::get('manage/editlesson/{id}', 'HomeController@edit_lesson');
    Route::get('manage/sendmoney', 'HomeController@send_money');
    Route::get('manage/editgen/{gen_id?}', 'HomeController@edit_gen');
    Route::get('manage/editcourse/{course_id?}', 'HomeController@edit_course');
    Route::get('manage/editclass/{class_id?}', 'HomeController@edit_class');
    Route::get('manage/addclass', 'HomeController@add_class');
    Route::get('manage/telesale', 'HomeController@telesale');
    Route::get('manage/autostaff', 'HomeController@auto_staff');
    Route::get('manage/autostudent', 'HomeController@auto_student');
    Route::get('manage/deleteclass/{class_id?}', 'HomeController@delete_class');
    Route::get('manage/deleteregister/{register_id?}', 'HomeController@delete_register');
    Route::get('manage/attendance', 'HomeController@attendance');
    Route::get('manage/attendancelist/{class_lesson_id}', 'HomeController@attendance_list');
    Route::get('manage/paidlist/{page?}', 'HomeController@paid_list');

    Route::get('manage/downloadsurveyfile', 'SurveyController@download_survey_file');
    Route::get('manage/survey', 'SurveyController@index');
    Route::get('manage/survey/{survey_id}', 'SurveyController@detail');
    Route::get('manage/attachmailgoodbye/{survey_id}', 'SurveyController@attach_mail_goodbye');

    Route::post('manage/storesurvey', 'SurveyController@store_survey');
    Route::post('survey/storeanswer', 'SurveyController@store_answer');
    Route::post('survey/preview', 'SurveyController@survey_preview');

    Route::get('manage/downloadsurvey', 'SurveyController@download_survey');
    Route::get('survey/test', 'SurveyController@test');
    Route::get('survey/classes', 'SurveyController@classes');
    Route::get('rating/classes', 'SurveyController@send_rating');

    Route::get('survey/download', 'SurveyController@download_survey');
    Route::post('manage/storequestion', 'SurveyController@store_question');
    Route::post('survey/storesurveyanswer', 'SurveyController@store_survey_answer');
    Route::post('ajax/sendsurvey', 'SurveyController@ajax_send_survey');
    Route::post('ajax/sendrating', 'SurveyController@ajax_send_rating');
    Route::post('ajax/storerating', 'StudentController@store_rating');
    Route::post('ajax/debug_fb', 'PublicController@re_scrape_fb');

    Route::post('ajax/getattendancesbycode', 'HomeController@get_attendances_by_code');
    //telesale route
    Route::get('manage/getstudentforcall', 'HomeController@get_student_for_call');
    Route::get('manage/call_student', 'HomeController@call_student');

    // scan qrcode
    Route::get('manage/scanqrcode', 'HomeController@scan_qr_code');

    Route::get('api/getuserdata', 'PublicController@get_user_data');
    Route::get('manage/order-list', 'OrderController@orders');
    Route::get('manage/warehouses', 'OrderController@warehouses');
    Route::get('manage/imported-goods', 'OrderController@imported_goods');
    Route::get('manage/create-warehouse', 'OrderController@create_warehouse');
    Route::post('manage/store-warehouse', 'OrderController@store_warehouse');
    Route::post('manage/imported-goods', 'OrderController@imported_goods');
    Route::post('manage/store-imported-goods', 'OrderController@store_imported_goods');
    Route::get('manage/import-goods', 'OrderController@import_goods');
    Route::get('manage/warehouse/{warehouse_id}', 'OrderController@warehouse');
    Route::get('manage/close-order/{order_id}', 'OrderController@close_order');
    Route::post('manage/store-order-money', 'OrderController@store_order_money');
    Route::post('manage/move-warehouse', 'OrderController@move_warehouse');
    Route::get('manage/delivered-orders', 'OrderController@delivered_orders');

    Route::get('manage/marketing-campaign', 'ManageMarketingController@marketing_campaign_list');
    Route::get('manage/create-marketing-campaign', 'ManageMarketingController@create_marketing_campaign');
    Route::post('manage/store-marketing-campaign', 'ManageMarketingController@store_marketing_campaign');
    Route::get('manage/delete-marketing-campaign/{campaign_id}', 'ManageMarketingController@delete_marketing_campaign');
    Route::get('/manage/staff/add-staff', 'RoleController@add_staff');
});
