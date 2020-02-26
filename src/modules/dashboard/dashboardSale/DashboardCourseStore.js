import {action, get, observable} from "mobx";
import {loadCoursesApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";


export default class DashboardCourseStore {
    @observable isLoading = false;
    @observable courses = [];

    @action
    loadCourses = (filter) => {
        this.isLoading = true;
        loadCoursesApi(filter).then((res) => {
            this.courses = res.data.courses;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra")
        }).finally(() => {
            this.isLoading = false;
        });
    };

    @get
    get totalCourse() {
        return this.courses && this.courses.length > 0 ? this.courses.reduce((a, b) => {
            return {
                "name": "Tất cả",
                "revenue": a.revenue + b.revenue,
                "target": {
                    "total_target": a.target.total_target + b.target.total_target,
                    "total_paid_register": a.target.total_paid_register + b.target.total_paid_register,
                },
                "register_target": {
                    "total_register_target": a.register_target.total_register_target + b.register_target.total_register_target,
                    "total_register": a.register_target.total_register + b.register_target.total_register,
                },
                "total_class": {
                    "total_class_full": a.total_class.total_class_full + b.total_class.total_class_full,
                    "total": a.total_class.total + b.total_class.total,
                }
            }
        }) : {
            "name": "Tất cả",
            "revenue": 0,
            "target": {},
            "register_target": {},
            "total_class": {}
        };
    }

}
