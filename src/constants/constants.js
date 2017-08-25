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

const LINK_UPLOAD_IMAGE_EDITOR = env.MANAGE_API_URL + '/upload-image-editor';

export function linkUploadImageEditor() {
    let token = localStorage.getItem('token');
    return LINK_UPLOAD_IMAGE_EDITOR + '?token=' + token;
}