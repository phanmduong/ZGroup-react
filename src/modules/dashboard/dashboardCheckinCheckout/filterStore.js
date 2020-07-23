import {observable} from "mobx";
import moment from 'moment';

class FilterStore {
    @observable isLoading = false;
    @observable gens = [];

    @observable filter = {
        start_time: moment().subtract(30, 'days'),
        end_time: moment().subtract(0, 'days'),
        base_id: 0,
        checkin_out_status: '',
    };

    // @action
    // loadData = () => {
    //     this.isLoading = true;
    //     parallel({
    //         // gens: (callback) => {
    //         //     loadGens().then((res) => {
    //         //         this.gens = res.data.data.gens;
    //         //
    //         //         const currentGen = this.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];
    //         //
    //         //         this.filter.start_time = moment(currentGen.start_time);
    //         //         this.filter.end_time = moment(currentGen.end_time);
    //         //
    //         //         this.filter.gen_id = res.data.data.current_gen.id;
    //         //         callback(null, {});
    //         //     }).catch((e) => {
    //         //         showErrorNotification('Có lỗi xảy ra!');
    //         //         console.log(e);
    //         //         callback(e, null);
    //         //     });
    //         // },
    //         // courses: (callback) => {
    //         //     getCourseActiveApi().then((res) => {
    //         //         this.courses = res.data.courses;
    //         //         callback(null, {});
    //         //     }).catch((e) => {
    //         //         showErrorNotification('Có lỗi xảy ra!');
    //         //         console.log(e);
    //         //         callback(e, null);
    //         //     });
    //         // },
    //         // sources: (callback) => {
    //         //     getSourcesApi().then((res) => {
    //         //         this.sources = res.data.sources;
    //         //         callback(null, {});
    //         //     }).catch((e) => {
    //         //         showErrorNotification('Có lỗi xảy ra!');
    //         //         console.log(e);
    //         //         callback(e, null);
    //         //     });
    //         // },
    //         // marketingCampaigns: (callback) => {
    //         //     getMarketingCampaignsApi().then((res) => {
    //         //         this.marketing_campaigns = res.data.marketing_campaigns;
    //         //         callback(null, {});
    //         //     }).catch((e) => {
    //         //         showErrorNotification('Có lỗi xảy ra!');
    //         //         console.log(e);
    //         //         callback(e, null);
    //         //     });
    //         // }
    //     }).then(() => {
    //     }).finally(() => {
    //         this.isLoading = false;
    //     });
    //
    //
    // };
}

export default new FilterStore();
