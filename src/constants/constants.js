import * as env from "./env";

export const QUESTION_TYPE = [
    {
        value: 0,
        label: "Textbox",
    },
    {
        value: 1,
        label: "Radio",
    },
    {
        value: 2,
        label: "Checkbox",
    },
];

export const MARITAL = [
    {
        id: 0,
        name: "",
    },
    {
        id: 1,
        name: "Chưa kết hôn",
    },
    {
        id: 2,
        name: "Đã kết hôn",
    },
];

export const TYPE_NOTI = [
    {
        label: "Web",
        value: "social",
    },
    {
        label: "Trang quản lý",
        value: "manage",
    },
    {
        label: "App",
        value: "mobile_social",
    },
    {
        label: "App quản lý",
        value: "mobile_manage",
    },
];

export const LITERACY = [
    {
        id: 0,
        name: "",
    },
    {
        id: 1,
        name: "Đại học",
    },
    {
        id: 2,
        name: "Cao đẳng",
    },
];

export const STATUS_IMPORT_GOODS = [
    {
        label: "Lưu tạm",
        value: "uncompleted",
    },
    {
        label: "Hoàn thành",
        value: "completed",
    },
];

export const DAY_OF_WEEK = [
    {
        value: "Thứ hai",
        key: "Thứ hai",
    },
    {
        value: "Thứ ba",
        key: "Thứ ba",
    },
    {
        value: "Thứ tư",
        key: "Thứ tư",
    },
    {
        value: "Thứ năm",
        key: "Thứ năm",
    },
    {
        value: "Thứ sáu",
        key: "Thứ sáu",
    },
    {
        value: "Thứ bảy",
        key: "Thứ bảy",
    },
    {
        value: "Chủ nhật",
        key: "Chủ nhật",
    },
];

// Cặp (name ; id) dùng cho FormInputSelect

export const GENDER = [
    {
        name: "",
        id: "",
    },
    {
        name: "Nam",
        id: "1",
    },
    {
        name: "Nữ",
        id: "2",
    },
];

// Cặp (label ; value) dùng cho ReactSelect
export const CUSTOMTYPE = [
    {
        label: "Tất cả",
        value: 2,
    },
    {
        label: "Khách hàng còn nợ",
        value: "0",
    },
    {
        label: "Khách hàng đã mua",
        value: 1,
    },
];

export const PAYMENT = [
    {
        label: "Tiền mặt",
        value: "cash",
    },
    {
        label: "Chuyển khoản",
        value: "transfer",
    },
    {
        label: "Thẻ",
        value: "credit",
    },
];

export const ORDER_STATUS = [
    {
        order: 0,
        label: "Đặt hàng",
        value: "place_order",
    },
    {
        order: 1,
        label: "Chưa gọi",
        value: "not_reach",
    },
    {
        order: 2,
        label: "Xác nhận",
        value: "confirm_order",
    },
    {
        order: 3,
        label: "Giao hàng",
        value: "ship_order",
    },
    {
        order: 4,
        label: "Hoàn thành",
        value: "completed_order",
    },
    {
        order: 5,
        label: "Hủy",
        value: "cancel",
    },
];

export const TRANSFER_PURPOSE = [
    {
        purpose: 0,
        label: "Đặt cọc",
        value: "deposit",
    },
    {
        purpose: 1,
        label: "Thanh toán tiền hàng đặt",
        value: "pay_order",
    },
    {
        purpose: 2,
        label: "Mua hàng sẵn",
        value: "pay_good",
    },
];

export const TRANSFER_PURPOSE_COLOR = {
    deposit: "#a52a2a",
    pay_order: "#8B008B",
    pay_good: "#F08080",
};

export const REGISTER_STATUS = [
    {
        register: 0,
        label: "Đăng ký mới",
        value: "new-register",
    },
    {
        register: 1,
        label: "Đã gọi",
        value: "called",
    },
    {
        register: 2,
        label: "Đã trả",
        value: "paid",
    },
    {
        register: 3,
        label: "Đã trả đủ",
        value: "fully-paid",
    },
    {
        register: 4,
        label: "Hoàn thành",
        value: "completed",
    },
    {
        register: 5,
        label: "Kết thúc",
        value: "end",
    },
];

export const ORDERED_STATUS = [
    {
        order: 0,
        label: "Đơn mới",
        value: "place_order",
    },
    {
        order: 1,
        label: "Đã báo giá",
        value: "sent_price",
    },
    {
        order: 2,
        label: "Xác nhận",
        value: "confirm_order",
    },
    {
        order: 3,
        label: "Đặt hàng",
        value: "ordered",
    },
    {
        order: 4,
        label: "Đã về VN",
        value: "arrived",
    },
    {
        order: 5,
        label: "Giao hàng",
        value: "ship",
    },
    {
        order: 6,
        label: "Hoàn thành",
        value: "completed",
    },
    {
        order: 7,
        label: "Hủy",
        value: "cancel",
    },
];

export const TYPE_CLASSES = [
    {
        label: "Hoạt động",
        value: "active",
    },
    {
        label: "Chờ",
        value: "waiting",
    },
];
export const STATUS_WORK = [
    {
        //0
        label: "Đợi chấp nhận",
        action: "Chấp nhận",
        value: "pending",
    },
    {
        //1
        label: "Đang thực hiện",
        action: "Xin gia hạn",
        value: "doing",
    },
    {
        //2
        label: "Hoàn thành",
        action: "",
        value: "done",
    },
    {
        //3
        label: "Hủy",
        action: "",
        value: "cancel",
    },
    {
        //4
        label: "Chi tiền",
        action: "",
        value: "pay",
    },
    {
        //5
        label: "Lưu trữ",
        action: "",
        value: "archive",
    },
];

export const ORDER_STATUS_COLORS = {
    place_order: "#f9f9f9",
    confirm_order: "#b5d0fc",
    ship_order: "#b8ffad",
    completed_order: "#e2e2e2",
    cancel: "#fcb7ab",
};

export const ORDERED_STATUS_COLORS = {
    place_order: "#dddddd",
    sent_price: "#b5d0fc",
    confirm_order: "#b8ffad",
    ordered: "#e2e2e2",
    arrived: "#fcb7ab",
    ship: "#00ff00",
    completed: "#ccff66",
    cancel: "#ffcc33",
};

export const MAX_TIME_SHIFT_REIGSTER = "15:00:00";
export const MAX_TIME_WORK_SHIFT_REIGSTER = "20:00:00";
export const DATE = 60 * 60 * 24;
const LINK_UPLOAD_IMAGE_EDITOR = env.MANAGE_API_URL + "/upload-image-editor";

export function linkUploadImageEditor() {
    let token = localStorage.getItem("token");
    return LINK_UPLOAD_IMAGE_EDITOR + "?token=" + token;
}

export const DATETIME_FILE_NAME_FORMAT = "DD_MM_YYYY";
export const DATETIME_FORMAT = "HH:mm DD-MM-YYYY";
export const DATETIME_VN_FORMAT = "DD/MM/YYYY HH:mm:ss";
export const DATETIME_SEAT_FORMAT = "DD/MM/YYYY HH:mm";
export const DATETIME_FORMAT_SQL = "YYYY-MM-DD HH:mm:ss";
export const FULLTIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT_H_M = "HH:mm";

export const MAX_USER_SHOW_WORK_SHIFT = 5;

export const PRINT_ORDER_STATUS = ["Chưa duyệt", "Đã duyệt", "Đã nhận"];
