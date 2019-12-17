import {observable, computed, action} from "mobx";
import moment from "moment";
import {getAnalyticTasksApi, getEmployeesApi, getTasksApi} from "./taskApi";

class Store {
    @observable selectedDate = {};
    @observable tasks = [];
    @observable analyticTasks = [];
    @observable isLoading = false;
    @observable employees = [];
    @observable selectedEmployee = {};

    @action getTasks(updateTotalTask) {
        this.isLoading = true;
        getTasksApi(moment(this.selectedDate).format("YYYY-MM-DD"), this.selectedEmployee.id).then((res) => {
            this.tasks = res.data.tasks;
            if (updateTotalTask) {
                updateTotalTask();
            }
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @action getEmployees() {
        getEmployeesApi().then((res) => {
            this.employees = res.data.employees;
        }).finally(() => {
        });
    }

    @action getAnalyticsTasks() {
        getAnalyticTasksApi(this.selectedEmployee.id).then((res) => {
            this.analyticTasks = res.data.data.tasks;
        }).finally(() => {
        });
    }

    @computed
    get tasksCompleted() {
        return this.tasks.filter((task) => task.status == 1);
    }

    @computed
    get tasksNotComplete() {
        return this.tasks.filter((task) => task.status == 0);
    }
}

export default Store;