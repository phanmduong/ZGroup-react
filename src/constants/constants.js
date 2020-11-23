import * as env from "./env";

export const QUESTION_TYPE = [
    {
        value: 0,
        label: "Textbox"
    },
    {
        value: 1,
        label: "Radio"
    },
    {
        value: 2,
        label: "Checkbox"
    }
];

export const MARITAL = [
    {
        id: 0,
        name: ""
    },
    {
        id: 1,
        name: "Chưa kết hôn"
    },
    {
        id: 2,
        name: "Đã kết hôn"
    }
];

export const TYPE_NOTI = [
    {
        label: "Web",
        value: "social"
    },
    {
        label: "Trang quản lý",
        value: "manage"
    },
    {
        label: "App",
        value: "mobile_social"
    },
    {
        label: "App quản lý",
        value: "mobile_manage"
    }
];

export const LITERACY = [
    {
        id: 0,
        name: ""
    },
    {
        id: 1,
        name: "Đại học"
    },
    {
        id: 2,
        name: "Cao đẳng"
    }
];

export const STATUS_IMPORT_GOODS = [
    {
        label: "Lưu tạm",
        value: "uncompleted"
    },
    {
        label: "Hoàn thành",
        value: "completed"
    }
];

export const DAY_OF_WEEK = [
    {
        value: "Thứ hai",
        key: "Thứ hai"
    },
    {
        value: "Thứ ba",
        key: "Thứ ba"
    },
    {
        value: "Thứ tư",
        key: "Thứ tư"
    },
    {
        value: "Thứ năm",
        key: "Thứ năm"
    },
    {
        value: "Thứ sáu",
        key: "Thứ sáu"
    },
    {
        value: "Thứ bảy",
        key: "Thứ bảy"
    },
    {
        value: "Chủ nhật",
        key: "Chủ nhật"
    }
];

// Cặp (name ; id) dùng cho FormInputSelect

export const GENDER = [
    {
        name: "Nam",
        id: "1",
        label: "Nam",
        value: "1"
    },
    {
        name: "Nữ",
        id: "2",
        label: "Nữ",
        value: "2"
    },

    {
        name: "Khác",
        id: "0",
        label: "Khác",
        value: "0"
    },

];

// Cặp (label ; value) dùng cho ReactSelect
export const CUSTOMTYPE = [
    {
        label: "Tất cả",
        value: 2
    },
    {
        label: "Khách hàng còn nợ",
        value: "debt"
    },
    {
        label: "Khách hàng đã mua",
        value: "paid"
    }
];

export const PAYMENT = [
    {
        label: "Tiền mặt",
        value: "cash"
    },
    {
        label: "Chuyển khoản",
        value: "transfer"
    },
    {
        label: "Thẻ",
        value: "credit"
    }
];

export const ORDER_STATUS = [
    {
        order: 0,
        label: "Đặt hàng",
        value: "place_order"
    },
    {
        order: 1,
        label: "Chưa gọi",
        value: "not_reach"
    },
    {
        order: 2,
        label: "Chờ chuyển khoản",
        value: "transfering"
    },
    {
        order: 3,
        label: "Xác nhận",
        value: "confirm_order"
    },
    {
        order: 4,
        label: "Giao hàng",
        value: "ship_order"
    },
    {
        order: 5,
        label: "Hoàn thành",
        value: "completed_order"
    },
    {
        order: 6,
        label: "Hủy",
        value: "cancel"
    }
];

export const TRANSFER_PURPOSE = [
    {
        purpose: 0,
        label: "Đặt cọc",
        value: "deposit"
    },
    {
        purpose: 1,
        label: "Thanh toán tiền hàng đặt",
        value: "pay_order"
    },
    {
        purpose: 2,
        label: "Mua hàng sẵn",
        value: "pay_good"
    }
];

export const TRANSFER_PURPOSE_COLOR = {
    deposit: "#a52a2a",
    pay_order: "#8B008B",
    pay_good: "#F08080"
};

export const REGISTER_STATUS = [
    {
        register: 0,
        label: "Đăng ký mới",
        value: "new-register"
    },
    {
        register: 1,
        label: "Đã gọi",
        value: "called"
    },
    {
        register: 2,
        label: "Đã trả",
        value: "paid"
    },
    {
        register: 3,
        label: "Đã trả đủ",
        value: "fully-paid"
    },
    {
        register: 4,
        label: "Hoàn thành",
        value: "completed"
    },
    {
        register: 5,
        label: "Kết thúc",
        value: "end"
    },
    {
        register: 6,
        label: "Đã hoàn tiền",
        value: "refunded"
    },
];

export const ORDERED_STATUS = [
    {
        order: 0,
        label: "Đơn mới",
        value: "place_order"
    },
    {
        order: 1,
        label: "Đã báo giá",
        value: "sent_price"
    },
    {
        order: 2,
        label: "Xác nhận",
        value: "confirm_order"
    },
    {
        order: 3,
        label: "Đặt hàng",
        value: "ordered"
    },
    {
        order: 4,
        label: "Dự kiến ngày về",
        value: "arrive_date"
    },
    {
        order: 5,
        label: "Đã về VN",
        value: "arrived"
    },
    {
        order: 6,
        label: "Giao hàng",
        value: "ship"
    },
    {
        order: 7,
        label: "Hoàn thành",
        value: "completed"
    },
    {
        order: 8,
        label: "Hủy",
        value: "cancel"
    }
];

export const ORDERED_STATUS_TRANSFER = [
    {
        value: "Trạng thái ban đầu",
        key: "origin"
    },
    {
        order: 0,
        value: "Chuyển sang Đã báo giá",
        key: "sent_price"
    },
    {
        order: 1,
        value: "Chuyển sang Xác nhận",
        key: "confirm_order"
    },
    {
        order: 2,
        value: "Chuyển sang Đặt hàng",
        key: "ordered"
    },
    {
        order: 3,
        value: "Chuyển sang Dự kiến ngày về",
        key: "arrive_date"
    },
    {
        order: 4,
        value: "Chuyển sang Đã về VN",
        key: "arrived"
    },
    {
        order: 5,
        value: "Chuyển sang Giao hàng",
        key: "ship"
    },
    {
        order: 6,
        value: "Chuyển sang Hoàn thành",
        key: "completed"
    },
    {
        order: 7,
        value: "Chuyển sang Hủy",
        key: "cancel"
    }
];

export const TYPE_CLASSES = [
    {
        label: "Hoạt động",
        value: "active"
    },
    {
        label: "Chờ",
        value: "waiting"
    },
    {
        label: "Kèm 1-1",
        value: "solo"
    },
    {
        label: "Doanh nghiệp",
        value: "business"
    },
];
export const TYPE_CLASSES_OBJECT =
    {
        "active": "Hoạt động",
        "waiting": "Chờ",
        "solo": "Kèm 1-1",
        "business": "Doanh nghiệp",
        null: 'Không có'
    }
;


export const STATUS_WORK = [
    {
        //0
        label: "Đợi chấp nhận",
        action: "Chấp nhận",
        value: "pending"
    },
    {
        //1
        label: "Đang thực hiện",
        action: "Xin gia hạn",
        value: "doing"
    },
    {
        //2
        label: "Hoàn thành",
        action: "",
        value: "done"
    },
    {
        //3
        label: "Hủy",
        action: "",
        value: "cancel"
    },
    {
        //4
        label: "Chi tiền",
        action: "",
        value: "pay"
    },
    {
        //5
        label: "Lưu trữ",
        action: "",
        value: "archive"
    }
];

export const STATUS_MONEY_TRANSFER = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "Đang giao dịch",
        value: "0"
    },
    {
        label: "Thành công",
        value: "1"
    },
    {
        label: "Hủy",
        value: "-1"
    }
];

export const TYPE_TRANSACTION = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "Chuyển tiền",
        value: "0"
    },
    {
        label: "Thu",
        value: "1"
    },
    {
        label: "Chi",
        value: "2"
    },
    {
        label: "Hoàn tiền học viên",
        value: "3"
    },
];

export const TYPE_MONEY_TRANSFER = [
    {
        label: "Tất cả",
        value: ""
    },
    {
        label: "Nhận",
        value: "receive"
    },
    {
        label: "Gửi",
        value: "send"
    }
];

export const TYPE_MONEY = [
    {
        value: "Thu",
        key: "1"
    },
    {
        value: "Chi",
        key: "2"
    }
];

export const STATUS_REGISTER_ROOM = [
    {
        label: "Đăng kí",
        value: "seed"
    },
    {
        label: "Đang xem",
        value: "view"
    },
    {
        label: "Hủy",
        value: "cancel"
    },
    {
        label: "Hoàn thành",
        value: "done"
    }
];

export const KIND_REGISTER_ROOM = [
    {
        label: "Tiệc cưới",
        value: "Tiệc cưới",
    },
    {
        label: "Hội nghị - Hội thảo",
        value: "Hội nghị - Hội thảo",
    },
    {
        label: "Tiệc tri ân khách hàng",
        value: "Tiệc tri ân khách hàng",
    },
    {
        label: "Tiệc sinh nhật",
        value: "Tiệc sinh nhật",
    }, {
        label: "Sự kiện ca nhạc, thời trang",
        value: "Sự kiện ca nhạc, thời trang",
    }, {
        label: "Tiệc ngoài trời",
        value: "Tiệc ngoài trời",
    }
];

export const CRM_TYPE_CLIENT = [
    {
        key: -1,
        value: 'Tất cả'
    },
    {
        key: 0,
        value: 'Nhận biết'
    },
    {
        key: 1,
        value: 'Dùng thử'
    },
    {
        key: 2,
        value: 'Thân thiết'
    },
    {
        key: 3,
        value: 'Trung thành'
    },
];

export const STATUS_ISSUE = {
    pending: {
        label: "Đang xác nhận",
        color: "#bcbcbc"
    },
    accepted: {
        label: "Xác nhận",
        color: "#ffe400"
    },
    processing: {
        label: "Đang xử lý",
        color: "#00b4ff"
    },
    completed: {
        label: "Hoàn thành",
        color: "#00ff06"
    }
};

export const LEAD_COLORS = [
    '#dff0d8', '#daedf7', '#f2dede', '#fcf8e3'
];

export const ORDER_STATUS_COLORS = {
    place_order: "#f9f9f9",
    confirm_order: "#b5d0fc",
    ship_order: "#b8ffad",
    completed_order: "#e2e2e2",
    cancel: "#fcb7ab"
};

export const ORDERED_STATUS_COLORS = {
    place_order: "#dddddd",
    sent_price: "#b5d0fc",
    confirm_order: "#b8ffad",
    ordered: "#e2e2e2",
    arrive_date: "#006400",
    arrived: "#fcb7ab",
    ship: "#00ff00",
    completed: "#ccff66",
    cancel: "#ffcc33"
};

export const MAX_TIME_SHIFT_REIGSTER = "15:00:00";
export const MAX_TIME_WORK_SHIFT_REIGSTER = "20:00:00";
export const DATE = 60 * 60 * 24;
const LINK_UPLOAD_IMAGE_EDITOR = env.MANAGE_API_URL + "/upload-image-editor";

export function linkUploadImageEditor() {
    let token = localStorage.getItem("token");
    return LINK_UPLOAD_IMAGE_EDITOR + "?token=" + token;
}

export const DATE_FORMAT = "DD-MM-YYYY";
export const DATETIME_FILE_NAME_FORMAT = "DD_MM_YYYY";
export const DATETIME_FORMAT = "HH:mm DD-MM-YYYY";
export const DATETIME_VN_FORMAT = "DD/MM/YYYY HH:mm:ss";
export const DATE_VN_FORMAT = "DD/MM/YYYY";
export const DATETIME_SEAT_FORMAT = "DD/MM/YYYY HH:mm";
export const DATETIME_FORMAT_SQL = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT_SQL = 'YYYY-MM-DD';
export const FULLTIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT_H_M = "HH:mm";

export const MAX_USER_SHOW_WORK_SHIFT = 5;

export const PRINT_ORDER_STATUS = ["Chưa duyệt", "Đã duyệt", "Đã nhận"];


// nhận diện đầu số
export const viettel = "data:image/png;base64,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";
export const mobifone = "http://vnreview.vn/image/59/50/595076.jpg";
export const vinaphone = "http://files.vforum.vn/2013/T05/img/diendanbaclieu-36407-my-documentsscrn-vinaphone.jpg";
export const vietnamobile = "http://www.vietnamobile.com.vn/images/logo.png";
export const gmobile = "https://banthe247.com/upload/files/cach-nap-the-gmobile.jpg";

export const PHONE_HEAD_3 = {
    "086": viettel,
    "096": viettel,
    "097": viettel,
    "098": viettel,
    "090": mobifone,
    "093": mobifone,
    "091": vinaphone,
    "094": vinaphone,
    "092": vietnamobile,
    "099": gmobile
};

export const PHONE_HEAD_4 = {
    "0162": viettel,
    "0163": viettel,
    "0164": viettel,
    "0165": viettel,
    "0166": viettel,
    "0167": viettel,
    "0168": viettel,
    "0169": viettel,
    "0120": mobifone,
    "0121": mobifone,
    "0122": mobifone,
    "0126": mobifone,
    "0128": mobifone,
    "0123": vinaphone,
    "0124": vinaphone,
    "0125": vinaphone,
    "0127": vinaphone,
    "0129": vinaphone,
    "0188": vietnamobile,
    "0186": vietnamobile,
    "0199": gmobile
};

/////
export const CONTRACT_TYPES = [
    "Bản quyền trong nước",
    "Bản quyền nước ngoài",
    "Dịch giả",
    "Biên tập",
    "Minh hoạ",
    "Nguyên tắc",
    "Mua bán",
    "Tăng chiết khấu",
    "Liên kết xuất bản",
    "In ấn ba bên",
    "Truyền thông",
    "Lao động",
    "Thuê khoán",
    "Sử dụng dịch vụ",
    "Khác",
];

export const RATIO_CHECKIN_CHECKOUT_TEACHING_PASS = 70;
export const RATIO_TOTAL_STUDENT_TEACHING_PASS = 65;
export const RATIO_COMMENT_PRODUCT_PASS = 40;
export const RATIO_RATING_TEACHING_PASS = 4;
export const RATIO_MONEY_REGISTER = 60;
export const RATIO_ATTENDANCE_CLASS = 65;
export const MAX_STUDIED_COURSE_STUDY_PACK = 5;
export const FILTER_STUDY_PACK_REGISTER = [
    {
        key: "",
        value: "Tất cả",
    },
    {
        key: "more2course",
        value: 'Học hơn 1 khóa 1 tháng'
    },
    {
        key: "more2gen",
        value: 'Học 1 môn 2 lần'
    },
    {
        key: "user_not_accuracy",
        value: 'Chưa xác minh'
    },
];

export const PAYMENT_METHODS_OBJECT = {
    internet_banking: "Chuyển khoản",
    cash: "Tiền mặt",
    swipe: "Quẹt thẻ"
};

export const PAYMENT_METHODS = [
    {
        value: "internet_banking",
        label: "Chuyển khoản"
    },
    {
        value: "cash",
        label: "Tiền mặt"
    },
    {
        value: "swipe",
        label: "Quẹt thẻ"
    }
];

export const DISCOUNTYPE = [

    {
        suffix: 'đ',
        name: 'Số tiền',
        id: 'fix',
    }, {
        suffix: '%',
        name: 'Phần trăm',
        id: 'percentage',
    },

];

export const GAPI_CLIENT_ID = '975308952047-i1mdqsc9ovn5iq4mnhjuv88g09g7lu93.apps.googleusercontent.com';


export const googleAnalyticMetrics = {
    sessions: "ga:sessions",
    averageTimeOnPage: "ga:avgTimeOnPage",
    bounceRate: "ga:bounceRate",
    pageViews: "ga:pageviews",
};
export const googleAnalyticDimensions = {
    date: "ga:date",
};

export const allowedDateFormats = ['DD/MM/YYYY', 'D/M/YYYY', 'DD.MM.YYYY', 'D.M.YYYY', 'DD. MM. YYYY', 'D. M. YYYY', "YYYY/MM/DD", "YYYY-MM-DD",
    'DD-MM-YYYY', 'D-M-YYYY', "DD-MM", "DD/MM", "MM/YYYY", "MM-YYYY", "M/YYYY", "M-YYYY", "M.YYYY", "MM.YYYY", "YYYY",
    "HH:mm DD/MM/YYYY", "HH:mm:ss DD/MM/YYYY", "HH:mm DD-MM-YYYY", "HH:mm:ss DD-MM-YYYY",
    "DD/MM/YYYY HH:mm", "DD/MM/YYYY HH:mm:ss", "DD-MM-YYYY HH:mm", "DD-MM-YYYY HH:mm:ss",
];


export const HISTORY_CARE_TYPES = {
    SELECT_OPTIONS: [
        {value: 'entrance_exam', label: 'Thi đầu vào',},
        {value: 'study_history', label: 'Lịch sử học tập',},
        {value: 'note', label: 'Ghi chú',},
        {value: 'appointment', label: 'Hẹn gặp mặt',},
    ],
    OBJECT_OPTIONS: {
        entrance_exam: {name: 'Thi đầu vào', icon: 'description', color: '#4fa2f7'},
        study_history: {name: 'Học tập trước đó', icon: 'hourglass_empty', color: '#fe874e'},
        note: {name: 'Ghi chú', icon: 'notes', color: '#4855d1'},
        appointment: {name: 'Hẹn gặp mặt', icon: 'face', color: '#4e9fb4'},
        email: {name: 'Đã gửi Email tự động', icon: 'mail_outline', color: '#E25241', status: 'Thành công'},
        sms: {name: 'Đã gửi SMS tự động', icon: 'chat', color: '#32CA41', status: 'Thành công'},
        tele_call: {name: 'Đã gọi điện thoại', icon: 'call', color: '#32CA41', status: 'Thành công'},
        notification: {
            name: 'Đã gửi Notification tự động',
            icon: 'notifications',
            color: '#FFDB5A',
            status: 'Thành công'
        },
        null: {name: 'Thông tin', icon: 'info', color: 'grey'}
    }
};
//when added, need to add empty array to init state infoStudent
export const STATUS_REFS = {
    leads: 'leads',
    classes: 'classes',
    registers: 'registers',
    tickets: 'tickets',
    tele_calls: 'tele_calls',
};

export const CIRCLE_PICKER_COLORS = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
];


export const LESSON_EVENT_TYPES_OBJECT = {
    book: {
        name: 'Bookworm',
        type: 'book',
        modalText: 'KIỂM TRA SÁCH',
        placeholder: 'Nhập nhận xét',
        progress_icon: 'book',
        progress_bar_color: '#61a1f0'
    },
    comment: {
        name: 'Nhận xét',
        type: 'comment',
        modalText: 'NHẬN XÉT',
        placeholder: 'Nhập nhận xét',
        progress_icon: 'comment',
        progress_bar_color: '#32ca41'
    },
    writing: {
        name: 'Bài viết',
        type: 'writing',
        modalText: 'BÀI VIẾT',
        placeholder: 'Nhập nhận xét',
        progress_icon: 'subject',
        progress_bar_color: '#78a2d2'
    },
};
export const LESSON_EVENT_TYPES_ARRAY = Object.entries(LESSON_EVENT_TYPES_OBJECT).map(entry => LESSON_EVENT_TYPES_OBJECT[entry[0]].type);

export const DAY_CREATE_SHIFT = [
    {
        "label": "Thứ 2",
        "value": "mondays"
    }, {
        "label": "Thứ 3",
        "value": "tuesdays"
    }, {
        "label": "Thứ 4",
        "value": "wednesdays"
    }, {
        "label": "Thứ 5",
        "value": "thursdays"
    },
    {
        "label": "Thứ 6",
        "value": "fridays"
    },
    {
        "label": "Thứ 7",
        "value": "saturdays"
    },
    {
        "label": "Chủ nhật",
        "value": "sundays"
    },
];

export const REGISTER_CALL_STATUS_CLASS_NAMES = {
    success: 'btn-success',
    failed: 'btn-danger',
    calling: 'btn-info',
    null:'',
    undefined:'',
};



export const LEAD_EXPORT_FIELDS_OBJECT = {
    stt:{id:"stt",name: "Số thứ tự",},
    name:{id:"name",name: "Họ và tên",},
    dob:{id:"dob",name: "Ngày sinh",},
    phone:{id:"phone",name: "Số điện thoại",},
    gender:{id:"gender",name: "Giới tính",},
    email:{id:"email",name: "Email",},
    work:{id:"work",name: "Công việc",},
    university:{id:"university",name: "Trường học",},
    identity_code:{id:"identity_code",name: "Mã CMND",},
    father_name:{id:"father_name",name: "Tên phụ huynh 1",},
    mother_name:{id:"mother_name",name: "Tên phụ huynh 2",},
    nationality:{id:"nationality",name: "Quốc tịch",},
    address:{id:"address",name: "Địa chỉ",},
    image1:{id:"image1",name: "Ảnh CMND 1",},
    image2:{id:"image2",name: "Ảnh CMND 2",},
    image_urls:{id:"image_urls",name: "Ảnh học viên",},
    imported_by:{id:"imported_by",name: "Người nhập (Import Person)",},
    imported_at:{id:"imported_at",name: "Ngày nhập",},
    pic:{id:"pic",name: "Người phụ trách (EC in-charge)",},
    mock_exams:{id:"mock_exams",name: "Thi thử",},
    tele_calls:{id:"tele_calls",name: "Các cuộc gọi", children:[
            {id:'caller.name',name: "Người gọi",},
            {id:'call_status_text',name: "Trạng thái",},
            {id:'note',name: "Ghi chú",},
            {id:'created_at',name: "Thời gian gọi",},
        ]},
    all_class_names:{id:"all_class_names",name: "Các môn học đã đăng kí",},
    interest_courses:{id:"interest_courses",name: "Các môn học đang quan tâm",},
    city:{id:"city",name: "Thành phố",},
    lead_status:{id:"lead_status",name: "Trạng thái",},
    campaign:{id:"campaign",name: "Chiến dịch",},
    source:{id:"source",name: "Nguồn",},
    how_know:{id:"how_know",name: "Cách tiếp cận",},
    created_at:{id:"created_at",name: "Ngày tạo",},
    rate:{id:"rate",name: "Đánh giá",},
    note:{id:"note",name: "Ghi chú",},
    district:{id:"district",name: "Quận",},
    mock_exams_text:{id:"mock_exams_text",name: "Thông tin thi thử (PT)",},
    last_call_time:{id:"last_call_time",name: "Last call",},
    last_call_result:{id:"last_call_result",name: "Last call status",},
    last_deal_status_text:{id:"last_deal_status_text",name: "Last  Deal status",},
};


export const LEAD_EXPORT_FIELDS_ARRAY = Object.entries(LEAD_EXPORT_FIELDS_OBJECT)
    .map(entry => {
        return {...LEAD_EXPORT_FIELDS_OBJECT[entry[0]]};
    });

export const CALL_STATUSES_TO_TEXT = {
    success: 'Gọi thành công',
    calling: 'Đang gọi',
    failed: 'Gọi thất bại'
};


export const REGISTER_EXPORT_FIELDS_OBJECT = {
    stt:{id:"stt",name: "Số thứ tự",},
    'studyClass.name':{id:"studyClass.name",name: "Lớp",},
    'studyClass.type':{id:"studyClass.type",name: "Loại lớp",},
    'tele_call.call_status_text':{id:"tele_call.call_status_text",name: "Gọi",},
    'student.name':{id:"student.name",name: "Họ và tên",},
    'student.phone':{id:"student.phone",name: "Số điện thoại",},
    'student.email':{id:"student.email",name: "Email",},
    province:{id:"province",name: "Thành phố",},
    code:{id:"code",name: "Mã học viên",},
    money:{id:"money",name: "Học phí",},
    'saler.name':{id:"saler.name",name: "Saler",},
    'marketing_campaign.name':{id:"marketing_campaign.name",name: "Chiến dịch",},
    'base.name':{id:"base.name",name: "Cơ sở",},
    'source.name':{id:"source.name",name: "Nguồn",},
    how_know:{id:"how_know",name: "Cách tiếp cận",},
    dob:{id:"dob",name: "Ngày sinh",},
    district:{id:"district",name: "Quận",},
    work:{id:"work",name: "Nghề nghiệp",},
    university:{id:"university",name: "Trường học",},
    created_at:{id:"created_at",name: "Ngày tạo",},
    mock_exams_text:{id:"mock_exams_text",name: "Thông tin thi thử (PT)",},
};

