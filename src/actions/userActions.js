import {editChoiceProvinceApi} from "../apis/userApis";

export function choiceProvince(provinceId) {
    editChoiceProvinceApi(provinceId).then(() => {
        location.reload();
    }).catch(() => {
    });
}
