import {editChoiceProvinceApi} from "../apis/userApis";

export function choiceProvince(provinceId, reload = true) {
    editChoiceProvinceApi(provinceId).then(() => {
        if (reload) {
            location.reload();
        }
    }).catch(() => {
    });
}
