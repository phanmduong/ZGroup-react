import {observable, computed, action} from "mobx";
import moment from "moment";
import {getTasksApi} from "./taskApi";

class Store {
    @observable selectedDate = {};
    @observable tasks = [];
    @observable isLoading = false;

    @action getTasks() {
        this.isLoading = true;
        getTasksApi(moment(this.selectedDate).format("YYYY-MM-DD")).then((res) => {
            this.tasks = res.data.data.tasks;
        }).finally(() => {
            this.isLoading = false;
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