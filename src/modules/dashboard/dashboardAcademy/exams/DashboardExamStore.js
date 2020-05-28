import {action, observable} from "mobx";
import {getAnalyticExam} from "../../../courses/courseApi";
import {showErrorNotification} from "../../../../helpers/helper";





export default class DashboardExamStore {
    @observable isLoading = false;
    @observable analytic_exam = [];
    @observable currentTab = "registering";

    @action
    loadAnalytic = (filter) => {
        if(!(filter.course_id || filter.class_id)) return;
        this.isLoading = true;
        //course_id, classId = '', startDate = '', endDate = ''
        filter.class_id = 3235;
        getAnalyticExam(filter.course_id, filter.class_id,filter.start_time, filter.end_time).then((res) => {
            console.log(res.data);
            this.analytic_exam = res.data.analytic_exam;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };


}
