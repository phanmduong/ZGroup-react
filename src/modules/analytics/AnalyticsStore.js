import {loadBlogs} from "./AnalyticsApi";

export default new class AnalyticsStore {
    @observable isLoading = false;


    @action
    loadGens() {
        this.isLoading = true;
        loadBlogs().then((res) => {

        }).finally(() => {
            this.isLoading = false;
        });
    }

}