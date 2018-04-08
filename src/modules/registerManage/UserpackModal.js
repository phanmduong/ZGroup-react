import React from 'react';
import PropTypes from 'prop-types';
// import * as helper from '../../helpers/helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerManageAction from './registerManageAction';
// import {Button} from "react-bootstrap";
import Select from 'react-select';
import Loading from "../../components/common/Loading";
// import FormInputDate from "../../components/common/FormInputDate";
import FormInputText from "../../components/common/FormInputText";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import {DATETIME_FORMAT_SQL} from "../../constants/constants";
// import FormInputDate from "../../components/common/FormInputDate";

// import {loadUserpackApi} from './registerManageApi';


class UserpackModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeSubscription = this.onChangeSubscription.bind(this);
        this.onChangeUserpack = this.onChangeUserpack.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }


    componentDidMount() {
        this.props.registerManageAction.loadUserpacks();
        if (this.props.register.subscription) {
            const register = this.props.register;
            let select = {
                ...this.props.select,
                subscription_id: register.subscription.id,
                price: register.subscription.price,
                hours: register.subscription.hours,
                userpack_id: register.subscription.user_pack.id,
                subscriptions: register.subscription.user_pack.subscriptions,
                start_time: register.start_time,
                end_time: register.end_time,
                extra_time: register.extra_time,
                note: register.note,
            };
            // console.log("didmount",select);
            this.props.registerManageAction.updateSelect(select);
        }
        else {
            this.props.registerManageAction.updateSelect({
                extra_time: 0,
                hours: 0,
            });
        }
    }

    onChangeUserpack(value) {
        let subscriptions = this.props.userpacks.filter((userpack) => userpack.id === value.value)[0].subscriptions;
        let select = {...this.props.select, userpack_id: value.value, subscriptions: subscriptions};
        this.props.registerManageAction.updateSelect(select);
    }

    onChangeSubscription(value) {
        let subscription = this.props.select.subscriptions.filter(subscription => subscription.id === value.value)[0];
        let select = {
            ...this.props.select,
            subscription_id: value.value,
            price: subscription.price,
            hours: subscription.subcription_kind.hours,
            extra_time: subscription.extra_time,
        };
        this.props.registerManageAction.updateSelect(select);
    }

    updateFormData(event) {
        console.log("updateFormData",event.target.name);
        const field = event.target.name;
        let select = {...this.props.select};
        select[field] = event.target.value;
        this.props.registerManageAction.updateSelect(select);
    }

    addSubscription(e) {
        this.props.registerManageAction.addSubscription(this.props.register.id, this.props.select, this.props.closeUserpackModal);
        e.preventDefault();
    }

    render() {
        // const {subscriptions} =     this.props.select;
        return (
            <div className="card">
                <div className="card-header card-header-icon " data-background-color="rose">
                    <i className="material-icons">people</i>
                </div>
                {this.props.isLoadingUserpack ? <Loading/> :
                    <div className="card-content">
                        <h4 className="card-title">Đặt chỗ</h4>
                        <div className="row">
                            <div className="form-group">
                                <label className="label-control">Gói khách hàng</label>
                                <Select
                                    name="userpack"
                                    value={this.props.select ? this.props.select.userpack_id : ""}
                                    options={this.props.select && this.props.userpacks.map(userpack => {
                                        // console.log("aaaaa");
                                        return {
                                            ...userpack,
                                            value: userpack.id,
                                            label: userpack.name
                                        };
                                    })}
                                    onChange={this.onChangeUserpack}
                                    clearable={false}
                                />
                            </div>
                            {this.props.select.subscriptions ?
                                <div className="form-group">
                                    <label className="label-control">Gói đăng kí</label>
                                    <Select
                                        name="subscription"
                                        value={this.props.select ? this.props.select.subscription_id : ""}
                                        options={this.props.select && this.props.select.subscriptions.map(subscription => {
                                            // console.log("bbbbbbbb");
                                            return {
                                                ...subscription,
                                                value: subscription.id,
                                                label: subscription.subcription_kind.name,
                                            };
                                        })}
                                        onChange={this.onChangeSubscription}
                                        clearable={false}
                                    />
                                </div> : null
                            }

                        </div>


                        <FormInputText
                            label="Thời gian khuyến mãi"
                            name="extra_time"
                            type="number"
                            value={this.props.select.extra_time}
                            updateFormData={this.updateFormData}
                            minValue="0"
                        />

                        <FormInputText
                            label="Ghi chú"
                            name="note"
                            type="text"
                            value={this.props.select.note}
                            updateFormData={this.updateFormData}
                        />
                        <div className="row">
                            <div className="col-md-6">
                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    name="start_time"
                                    id="start_time"
                                    label="Từ ngày"
                                    value={this.props.select.start_time}
                                    updateFormData={this.updateFormData}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">
                                        Đến ngày
                                    </label>
                                    <div>
                                        <input
                                            value={this.props.select.end_time}
                                            disabled={true}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8"/>
                            <div className="col-md-4">
                                {this.props.isSavingSubscription ?
                                    (
                                        <button className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {'Đang lưu'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button"
                                                onClick={(e) => {
                                                    this.addSubscription(e);
                                                }}>
                                            <i className="material-icons">save</i>
                                            {'Lưu'}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

UserpackModal.propTypes = {
    select: PropTypes.object.isRequired,
    userpacks: PropTypes.array,
    closeUserpackModal: PropTypes.func,
    subscriptions: PropTypes.array,
    register: PropTypes.object.isRequired,
    registerManageAction: PropTypes.object.isRequired,
    isLoadingUserpack: PropTypes.bool.isRequired,
    isSavingSubscription: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        select: state.registerManage.select,
        userpacks: state.registerManage.userpacks,
        subscriptions: state.registerManage.subscriptions,
        isLoadingUserpack: state.registerManage.isLoadingUserpack,
        isSavingSubscription: state.registerManage.isSavingSubscription,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageAction: bindActionCreators(registerManageAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserpackModal);