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
        label: "Đặt hàng",
        value: "place_order"
    },
    {
        label: "Xác nhận",
        value: "confirm_order"
    },
    {
        label: "Giao hàng",
        value: "ship_order"
    },
    {
        label: "Hoàn thành",
        value: "completed_order"
    },
    {
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


export const MAX_TIME_SHIFT_REIGSTER = '15:00:00';
export const DATE = 60 * 60 * 24;
const LINK_UPLOAD_IMAGE_EDITOR = env.MANAGE_API_URL + '/upload-image-editor';

export function linkUploadImageEditor() {
    let token = localStorage.getItem('token');
    return LINK_UPLOAD_IMAGE_EDITOR + '?token=' + token;
}

export const DATETIME_FORMAT = "HH:mm DD-MM-YYYY";
export const DATETIME_FORMAT_SQL = "YYYY-MM-DD HH:mm:ss";
export const FULLTIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT_H_M = "HH:mm";
