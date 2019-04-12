import {action, observable} from "mobx";
import {load,test} from "./MeasurementApi";

export const store = new class Store {
    @observable isLoading = false;
    @observable data = [];
    @observable paginator = {};


    @action
    load=(query)=> {
        this.isLoading = true;
        load(query,(res)=>{
            console.log(res);
            this.data  =  res['1'];
            this.isLoading =false;
        });
    }
    @action
    test=()=> {
        this.isLoading = true;
        test((res)=>{
            console.log(res);

            this.isLoading =false;
        });
    }

}();
