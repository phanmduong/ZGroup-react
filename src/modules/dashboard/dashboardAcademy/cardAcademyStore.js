import {action, observable} from "mobx";
import {showErrorNotification} from "../../../helpers/helper";
import {analyticsClasses} from "./dashboardAcademyApi";

class CardAcademyStore {
    @observable isLoading = false;
    @observable data = {
        // enrollingClassesCount: 0,
        // studyingClassesCount: 0,
        // enrollingRegistersCount: 0,
        // studyingRegistersCount: 0,
    };

    @action
    analyticsClasses = (filter) => {
        this.isLoading = true;
        analyticsClasses(filter).then((res) => {
            this.data = res.data;
            console.log(res.data);
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

}

export default new CardAcademyStore();
