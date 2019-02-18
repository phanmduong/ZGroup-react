import {observable, action} from "mobx";
// import {initGapi, loadGapi} from "./GapiClass";

/* eslint-disable */

export default new class AnalyticsStore {
    @observable isLoading = false;

    constructor() {


    }

    @action
    loadData() {
        this.isLoading = true;
    }

}