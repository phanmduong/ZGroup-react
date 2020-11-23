import {action, computed, observable} from "mobx";
import {loadGens} from "../../dashboardApi";
import {isEmptyInput, showErrorNotification} from "../../../../helpers/helper";
import moment from 'moment';
import {parallel} from "async";
import { getCourseActiveApi} from "../dashboardAcademyApi";
import {findClass} from "../../../registerStudentsV2/registerListApi";

class FilterExamStore {
    @observable isLoading = false;
    @observable gens = [];
    @observable courses = [];

    @observable filter = {
        start_time: moment().subtract(1, 'year'),
        end_time: moment().subtract(0, 'days'),
        course_id: 0,
        class_id: 0,
        class: null,
    };



    @computed
    get coursesData() {
        return [{value: 0, label: "Tất cả môn học"}, ...this.courses.map(course => {
            return {...course, value: course.id, label: course.name};
        })];
    }




    @action
    loadData = () => {
        this.isLoading = true;
        parallel({
            gens: (callback) => {
                loadGens().then((res) => {
                    this.gens = res.data.data.gens;

                    // const currentGen = this.gens.filter((gen) => gen.id == res.data.data.current_gen.id)[0];

                    // this.filter.start_time = moment(currentGen.start_time);
                    // this.filter.end_time = moment(currentGen.end_time);

                    this.filter.gen_id = res.data.data.current_gen.id;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },
            courses: (callback) => {
                getCourseActiveApi().then((res) => {
                    this.courses = res.data.courses;
                    callback(null, {});
                }).catch((e) => {
                    showErrorNotification('Có lỗi xảy ra!');
                    console.log(e);
                    callback(e, null);
                });
            },

        }).then(() => {
        }).finally(() => {
            this.isLoading = false;
        });


    };
    @action
    searchClasses = (input, callback) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut.classes !== null) {
            clearTimeout(this.timeOut.classes);
        }
        this.timeOut.classes = setTimeout(function () {
            findClass(input).then(res => {
                let data = res.data.map((obj) => {
                    return {
                        ...obj,
                        ...{
                            value: obj.id,
                            label: obj.name,
                            avatar_url: obj.course ? obj.course.icon_url : '',
                        }
                    };
                });
                callback(null, {options: data, complete: true});
            });
        }.bind(this), 500);
    };
}

export default new FilterExamStore();
