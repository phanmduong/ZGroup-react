import {observable, action} from "mobx";
import {getHonors} from './queries.graphql';
import {golangGraphqlClient} from "../../graphql/graphqlClient";
import {graphqlSuccess} from "../../graphql/graphqlSuccess";
import * as  HonorApi from "./HonorApi";
import {showNotification, showErrorNotification, confirm} from "../../helpers/helper";
import moment from "moment";
import {DATE_FORMAT_SQL, DATETIME_FORMAT} from "../../constants/constants";


class Store {
    @observable data = {};
    @observable isLoading = false;
    @observable isSaving = false;
    @observable isEdit = false;
    @observable honor = {};
    @observable showAddModal = false;
    @observable error = null;


    @action
    loadHonorStaffs(){
        this.isLoading = true;
        this.error = null;
        HonorApi.loadHonorStaffs().then((res)=>{
            this.data.honors = res.data.data;
        }).catch((e)=>{
            this.error = e.message;
        }).finally(()=>{
            this.isLoading = false;
        });
    }

    @action
    async getData() {
        this.isLoading = true;
        this.error = null;

        const variables = {};

        try {
            const res = await golangGraphqlClient
                .query({
                    query: getHonors,
                    variables: variables
                });
            const data = res.data;

            if (graphqlSuccess(res.networkStatus)) {
                this.data = data;
            } else {
                this.error = "Có lỗi xảy ra";
            }
        }
        catch (error) {
            this.error = "Có lỗi xảy ra";
        } finally {
            this.isLoading = false;
        }
    }

    @action
    addHonorStaffs(){
        this.showAddModal = true;
        this.isEdit =false;

    }

    @action
    editHonor(data){
        this.isEdit =true;
        this.showAddModal = true;
        this.honor = data;
    }



    @action
    async deleteHonor(data){
        await confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn xóa?",
            () => {
                HonorApi.deleteHonorStaffs(data).then((res)=>{
                    showNotification(res.data.message || "Lưu thành công");
                    this.loadHonorStaffs();
                }).catch((e)=>{
                    showErrorNotification(e.message);
                });
            },
        );


    }

    @action
    closeAddModal(){
        this.showAddModal = false;
    }



    @action
    submitData(data, callback){
        this.isSaving = true;
        this.error = null;
        let start_time = moment(data.start_time, DATETIME_FORMAT).format(DATE_FORMAT_SQL);

        data.start_time =start_time;

        if(data.end_time){
            let end_time = moment(data.end_time, DATETIME_FORMAT).format(DATE_FORMAT_SQL);
            data.end_time =end_time;
        }


        HonorApi.addHonorStaffs(data).then((res)=>{
            showNotification(res.data.message || "Lưu thành công");
            this.loadHonorStaffs();
            callback();
        }).catch((e)=>{
            showErrorNotification(e.message);
        }).finally(()=>{
            this.isSaving = false;
            this.showAddModal =false;
        });
    }
}

export default Store;