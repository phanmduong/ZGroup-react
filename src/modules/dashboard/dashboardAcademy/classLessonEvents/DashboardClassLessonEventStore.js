import {action, observable} from "mobx";
import {showErrorNotification} from "../../../../helpers/helper";
import {getAnalyticClassLessonEvent} from "../dashboardAcademyApi";





export default class DashboardClassLessonEventStore {
    @observable isLoading = false;
    @observable classes = [];
    @observable currentTab = "registering";

    @action
    loadAnalytic = (filter) => {
        if(!(filter.course_id || filter.class_id)) return;
        this.isLoading = true;
        //course_id, classId = '', startDate = '', endDate = ''
        getAnalyticClassLessonEvent(filter.course_id, filter.class_id,filter.start_time, filter.end_time).then((res) => {
            console.log(res.data);
            this.classes = res.data.classes;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };


}
