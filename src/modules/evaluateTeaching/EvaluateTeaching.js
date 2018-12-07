import React from "react";
import Loading from "../../components/common/Loading";
import store from "./EvaluateTeachingStore";
import {observer} from "mobx-react";
import {getShortName, isEmptyInput, validateLinkImage} from "../../helpers/helper";
import {
    RATIO_CHECKIN_CHECKOUT_TEACHING_PASS,
    RATIO_RATING_TEACHING_PASS,
    RATIO_TOTAL_STUDENT_TEACHING_PASS
} from "../../constants/constants";

@observer
class EvaluateTeaching extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadEvaluate();
    }

    renderItem = (data) => {
        let ratioCheckinCheckout = data.checkin_checkout_passed * 100 / data.checkin_checkout_total;
        const checkinCheckoutPass = ratioCheckinCheckout > RATIO_CHECKIN_CHECKOUT_TEACHING_PASS;
        const studentPass = data.ratio_student_attendance > RATIO_TOTAL_STUDENT_TEACHING_PASS;
        const ratingPass = isEmptyInput(data.total_rated_person) || data.ratio_rating > RATIO_RATING_TEACHING_PASS;
        const level = this.levelTeaching(checkinCheckoutPass, studentPass, ratingPass);
        const startGen = store.gens.filter(gen => gen.id == data.user.start_gen_id);
        console.log(startGen);

        return (

            <div className="col-md-3 col-sm-6" style={{marginTop: 40}}>
                <div className="card card-profile">
                    <div className="card-avatar">
                        <a className="content-avatar">
                            <div className="img"
                                 style={{
                                     background: 'url(' + validateLinkImage(data.user.avatar_url) + ') center center / cover',
                                     width: '130px',
                                     height: '130px'
                                 }}
                            />
                        </a>
                    </div>
                    <div className="card-content">
                        {/*<h6 className="category text-gray">{current_role.role_title}</h6>*/}
                        <h4 className="card-title bold">{getShortName(data.user.name)}</h4>
                        <p className="description">
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: level.color}}
                            >
                                {level.text}
                            </button>
                        </p>
                        <div className="cursor-pointer" onClick={() => this.openModalCheckinCheckout(data.user)}>
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ đúng giờ</div>
                                <div className="bold">
                                    {`${Math.round(ratioCheckinCheckout)}%/${RATIO_CHECKIN_CHECKOUT_TEACHING_PASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: ratioCheckinCheckout + '%',
                                         backgroundColor: checkinCheckoutPass ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ học viên</div>
                                <div className="bold">
                                    {`${Math.round(data.ratio_student_attendance)}%/${RATIO_TOTAL_STUDENT_TEACHING_PASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: data.ratio_student_attendance + '%',
                                         backgroundColor: studentPass ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ đánh giá</div>
                                <div className="bold">
                                    {`${isEmptyInput(data.ratio_rating) ? 5 : Math.round(data.ratio_rating * 10) / 10
                                        }/5 (${RATIO_RATING_TEACHING_PASS}/5)`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: (isEmptyInput(data.ratio_rating) ? 100 : data.ratio_rating * 100 / 5) + '%',
                                         backgroundColor: ratingPass ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        Bắt đầu làm việc từ khóa {startGen[0] ? startGen[0].name : '(không có thông tin)'}
                    </div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div>
                {
                    store.isLoading ? <Loading/> :
                        <div className="row">
                            {
                                store.data.map((item) => {
                                        return this.renderItem(item);
                                    }
                                )}
                        </div>
                }
            </div>

        );
    }

    levelTeaching(checkinCheckoutPass, studentPass, ratingPass) {
        let count = 0;
        if (checkinCheckoutPass) count++;
        if (studentPass) count++;
        if (ratingPass) count++;
        switch (count) {
            case 3:
                return {
                    color: '#4caf50',
                    text: "Bậc A"
                };
            case 2:
                return {
                    color: '#00bcd4',
                    text: "Bậc B"
                };
            case 1:
                return {
                    color: '#ff9800',
                    text: "Bậc C"
                };
            default:
                return {
                    color: '#f44336',
                    text: "Bậc D"
                }
                    ;
        }

    }

    openModalCheckinCheckout(user) {
        store.selectedUser = user;
        store.showModalCheckinCheckout = true;
    }
}

EvaluateTeaching.propTypes = {};

export default EvaluateTeaching;

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
