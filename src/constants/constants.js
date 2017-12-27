import * as env from './env';

export const MARITAL = [
    {
        id: 0,
        name: ''
    },
    {
        id: 1,
        name: 'Chưa kết hôn'
    },
    {
        id: 2,
        name: 'Đã kết hôn'
    }
];

export const LITERACY = [
    {
        id: 0,
        name: ''
    },
    {
        id: 1,
        name: 'Đại học'
    },
    {
        id: 2,
        name: 'Cao đẳng'
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
        value: 'Thứ hai',
        key: 'Thứ hai'
    },
    {
        value: 'Thứ ba',
        key: 'Thứ ba',
    },
    {
        value: 'Thứ tư',
        key: 'Thứ tư',
    },
    {
        value: 'Thứ năm',
        key: 'Thứ năm',
    },
    {
        value: 'Thứ sáu',
        key: 'Thứ sáu',
    },
    {
        value: 'Thứ bảy',
        key: 'Thứ bảy',
    },
    {
        value: 'Chủ nhật',
        key: 'Chủ nhật',
    },
];

// Cặp (name ; id) dùng cho FormInputSelect

export const GENDER = [
    {
        name: '',
        id: '',
    },
    {
        name: 'Nam',
        id: '1',
    },
    {
        name: 'Nữ',
        id: '2',
    }
];

// Cặp (label ; value) dùng cho ReactSelect
export const CUSTOMTYPE = [

    {
        label: 'Tất cả',
        value: 2,
    },
    {
        label: 'Khách hàng còn nợ',
        value: '0',
    },
    {
        label: 'Khách hàng đã mua',
        value: 1,
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
        label: "Xác nhận",
        value: "confirm_order"
    },
    {
        order: 3,
        label: "Giao hàng",
        value: "ship_order"
    },
    {
        order: 4,
        label: "Hoàn thành",
        value: "completed_order"
    },
    {
        order: 5,
        label: "Hủy",
        value: "cancel"
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
    }
];

export const ORDER_STATUS_COLORS = {
    place_order: "#f9f9f9",
    confirm_order: "#b5d0fc",
    ship_order: "#b8ffad",
    completed_order: "#e2e2e2",
    cancel: "#fcb7ab"
};


export const MAX_TIME_SHIFT_REIGSTER = '15:00:00';
export const MAX_TIME_WORK_SHIFT_REIGSTER = '20:00:00';
export const DATE = 60 * 60 * 24;
const LINK_UPLOAD_IMAGE_EDITOR = env.MANAGE_API_URL + '/upload-image-editor';

export function linkUploadImageEditor() {
    let token = localStorage.getItem('token');
    return LINK_UPLOAD_IMAGE_EDITOR + '?token=' + token;
}

export const DATETIME_FILE_NAME_FORMAT = "DD_MM_YYYY";
export const DATETIME_FORMAT = "HH:mm DD-MM-YYYY";
export const DATETIME_VN_FORMAT = "DD/MM/YYYY HH:mm:ss";
export const DATETIME_FORMAT_SQL = "YYYY-MM-DD HH:mm:ss";
export const FULLTIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT_H_M = "HH:mm";

export const MAX_USER_SHOW_WORK_SHIFT = 5;
