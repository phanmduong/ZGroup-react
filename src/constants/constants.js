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

export const DATATABLE_LANGUAGE = {
    "lengthMenu": "Hiển thị _MENU_ sản phẩm trong 1 trang",
    "zeroRecords": "Không có kết quả nào phù hợp",
    "processing": "Đang xử lý...",
    "info": "Hiển trị trang _PAGE_ trên tổng số _PAGES_ trang",
    "infoEmpty": "Không có dữ liệu",
    "infoFiltered": "(lọc từ _MAX_ sản phẩm)",
    "search": "Tìm kiếm: ",
    "paginate": {
        "first": "đầu",
        "last": "cuối",
        "next": "tiếp",
        "previous": "trước"
    },
};