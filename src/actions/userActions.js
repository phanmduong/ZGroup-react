import {editChoiceProvinceApi} from "../apis/userApis";

export function choiceProvince(provinceId, relead = true) {
    editChoiceProvinceApi(provinceId).then(() => {
        if (relead) {
            location.reload();
        }
    }).catch(() => {
    });
}
