import {editChoiceProvinceApi} from "../apis/userApis";

export function choiceProvince(provinceId, reload = true, callback) {
    editChoiceProvinceApi(provinceId).then(() => {
        if (reload) {
            location.reload();
        }
        if (callback) {
            callback();
        }
    }).catch(() => {
    });
}
