import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateCheckInCheckoutStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import AttendanceTeacher from "./AttendanceTeacher";
import * as helper from "../../../helpers/helper";
import {RATIO_CHECKIN_CHECKOUT_TEACHING_PASS} from "../../../constants/constants";

@observer
class CheckinCheckoutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        }
    }

    componentWillMount() {
        this.store = new store(this.props.gens, this.props.selectedGenId, this.props.user, this.props.shift_type);
        this.store.loadData();
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    render() {
        let raito = !this.store.isLoading ? (this.store.checkincheckoutPassed.length * 100 / (
            this.store.checkincheckoutRejected.length + this.store.checkincheckoutPassed.length)) : 0;
        let pass = raito > RATIO_CHECKIN_CHECKOUT_TEACHING_PASS;
        if(isNaN(raito) || (!this.store.isLoading && this.store.checkincheckoutPassed.length == 0)){
            raito = 100;
            pass = true;
        }
        return (
            <div>
                {
                    this.store.gens && this.store.gens.length > 0 &&
                    <div className="flex flex-justify-content-center">
                        <div style={{width: 200}}>
                            <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.store.gensData}
                                value={this.store.selectedGenId}
                                onChange={this.onChangeGen}
                            />
                        </div>
                    </div>
                }
                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + helper.validateLinkImage(this.store.user.avatar_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {this.store.user.name}
                        </div>
                        {/*<div>Lịch sử Check in/ Check out</div>*/}
                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ đúng giờ</div>
                                <div className="bold">
                                    {`${raito}%/${RATIO_CHECKIN_CHECKOUT_TEACHING_PASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raito + '%',
                                         backgroundColor: pass
                                             ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                                <li className={this.state.tab === 1 ? "active nav-item" : "nav-item"}>
                                    <a style={{width: 150}} onClick={() => this.setState({tab: 1})}>
                                        Đúng giờ ({this.store.checkincheckoutPassed.length})
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                                <li className={this.state.tab === 2 ? "active nav-item" : "nav-item"}>
                                    <a style={{width: 150}} onClick={() => this.setState({tab: 2})}>
                                        Vi phạm ({this.store.checkincheckoutRejected.length})
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                            </ul>
                            <div>
                                {this.state.tab == 1 ? this.renderCheckinCheckout(this.store.checkincheckoutPassed) : this.renderCheckinCheckout(this.store.checkincheckoutRejected)}
                            </div>
                        </div>
                    }

                </div>

            </div>

        );
    }


    renderCheckinCheckout(data) {
        data = helper.groupBy(data, shift => shift.date, ["shift", "childs"]);
        return (
            <div>
                {data.map(function (obj, index) {
                    return (
                        <div key={index}>
                            <div className="flex-row-center" style={{margin: '20px 0'}}>
                                <div className="text-h5">
                                    <strong>Ngày {obj.shift}</strong>
                                </div>
                            </div>
                            {
                                obj.childs.map((shift, index2) => {
                                    return (
                                        <AttendanceTeacher
                                            data={shift}
                                            key={index2}
                                        />)
                                })
                            }
                        </div>
                    );
                })
                }
            </div>
        )
    }
}

CheckinCheckoutContainer.propTypes = {};

export default CheckinCheckoutContainer;

