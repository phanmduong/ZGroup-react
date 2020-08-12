import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import * as studentActions from "../studentActions";
import Loading from "../../../components/common/Loading";
import {dotNumber, isEmptyInput} from "../../../helpers/helper";
import {DISCOUNTYPE, PAYMENT_METHODS_OBJECT} from "../../../constants/constants";
import CreateCouponOverlay from "../overlays/CreateCouponOverlay";
import EmptyData from "../../../components/common/EmptyData";

class HistoryCollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

    }


    componentWillMount() {
        this.props.studentActions.loadHistoryCollectMoney(this.studentId);
    }

    render() {
        return (
            <div className="tab-pane active">

                {this.props.isLoadingHistoryCollectMoney ? <Loading/>
                    :
                    <ul className="timeline timeline-simple">
                        <li className="timeline-inverted">
                            <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                <i className="material-icons">add</i>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <div className="flex flex-align-items-center margin-top-5">
                                        <CreateCouponOverlay
                                            className="btn btn-actions"
                                        />
                                    </div>
                                </div>
                                <div className="timeline-body margin-vertical-30"/>

                            </div>
                        </li>
                        {
                            this.props.historyCollectMoney && this.props.historyCollectMoney.length > 0 ? this.props.historyCollectMoney.map(function (register, index) {
                                    return (
                                        <li className="timeline-inverted" key={index}>
                                            <div className="timeline-badge">
                                                <img className="circle" src={register.class.icon_url} alt=""/>
                                            </div>
                                            <div className="timeline-panel">
                                                <h4>
                                                    <b>{register.class.name}</b>
                                                </h4>
                                                <div className="timeline-body">
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">access_time</i>
                                                        <b>&nbsp; &nbsp; Ngày tạo: {register.paid_time} </b>
                                                    </div>
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">access_time</i>
                                                        <b>&nbsp; &nbsp; Ngày thực nhận: {register.actual_input_at} </b>
                                                    </div>
                                                    {!isEmptyInput(register.note) && <div className="flex-row-center">
                                                        <i className="material-icons">create</i>&nbsp; &nbsp;
                                                        Ghi chú: {register.note}
                                                    </div>}
                                                    {
                                                        register.collector &&
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">account_box
                                                            </i>&nbsp; &nbsp; Người thu: {register.collector.name}
                                                        </div>
                                                    }
                                                    {register.coupons && register.coupons.map((coupon, i) => {
                                                        let type = DISCOUNTYPE.filter(t => t.id == coupon.discount_type)[0] || {};
                                                        let text = `${coupon.name}  (-${coupon.discount_value}${type.suffix})`;
                                                        return (
                                                            <div className="flex-row-center flex-align-items-center"
                                                                 key={i}>
                                                                <i className="material-icons">monetization_on
                                                                </i>&nbsp; &nbsp;
                                                                <button className="btn btn-xs"
                                                                        style={{margin: '5px 0', background: coupon.color}}
                                                                >
                                                                    {text}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="timeline-heading margin-top-10">
                                                    <div className="flex-row-center">
                                                        <button className="btn btn-xs btn-rose"
                                                                style={{width: '70px'}}
                                                        >
                                                            {dotNumber(register.money)}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                        <button className="btn btn-xs btn-success"
                                                            // style={{width: '70px'}}
                                                        >
                                                            {PAYMENT_METHODS_OBJECT[register.payment_method]}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    );
                                }) :
                                <EmptyData/>
                        }
                    </ul>
                }

            </div>
        );
    }
}

HistoryCollectMoneyContainer.propTypes = {
    historyCollectMoney: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingHistoryCollectMoney: PropTypes.bool.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCollectMoney: state.infoStudent.historyCollectMoney,
        isLoadingHistoryCollectMoney: state.infoStudent.isLoadingHistoryCollectMoney,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HistoryCollectMoneyContainer);
