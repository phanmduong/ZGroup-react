import {observable, computed} from "mobx";

class Store {
    @observable steps = [];
    @observable currentOrder = 1;

    constructor(steps) {
        this.steps = steps;
    }

    @computed get currentStep() {
        return this.steps[this.currentOrder];
    }

    getStep(order = this.currentOrder) {
        return this.steps[order];
    }

}

export default Store;