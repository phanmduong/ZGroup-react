import {OPEN_MODAL_REGISTER_DETAIL} from "../../constants/actionTypes";


export function openModalRegisterDetail(selectedStudentId) {
    history.pushState({
        type: OPEN_MODAL_REGISTER_DETAIL,
        studentId: selectedStudentId,
        prevUrl: window.location.href
    }, "modal", `/sales/info-student/${selectedStudentId}`);
    window.dispatchEvent(new Event('popstate'));
}
