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

// import {loadUserpackApi} from './registerManageApi';


class UserpackModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeSubscription = this.onChangeSubscription.bind(this);
        this.onChangeUserpack = this.onChangeUserpack.bind(this);
    }

    // loadUserpack(input, callback) {
    //     if (this.timeOut !== null) {
    //         clearTimeout(this.timeOut);
    //     }
    //     this.timeOut = setTimeout(function () {
    //         loadUserpackApi(input).then(res => {
    //             let userpacks = res.data.user_packs.map((userpack) => {
    //                 return {
    //                     ...userpacks,
    //                     ...{
    //                         value: userpack.id,
    //                         label: userpack.name,
    //                     }
    //                 };
    //             });
    //             callback(null, {options: userpacks, complete: true});
    //         });
    //     }.bind(this), 500);
    // }

    componentWillMount() {
        this.props.registerManageAction.loadUserpacks();
    }

    onChangeUserpack(value) {
        let select = {...this.props.select, userpack_id: value.value};
        let subscriptions = this.props.userpacks.filter((userpack) => userpack.id === value.value )[0].subscriptions;
        this.props.registerManageAction.updateSubscriptions(subscriptions);
        this.props.registerManageAction.updateSelect(select);
    }

    onChangeSubscription(value) {
        let subscription = this.props.subscriptions.filter(subscription => subscription.id === value.value)[0];
        let select = {...this.props.select, subscription_id: value.value, price :subscription.price, hours : subscription.subcription_kind.hours};
        this.props.registerManageAction.updateSelect(select);
    }

    render() {
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
                                    options={this.props.userpacks && this.props.userpacks.map(userpack => {
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
                            <div className="form-group">
                                <label className="label-control">Gói đăng kí</label>
                                <Select
                                    name="type"
                                    value={this.props.select ? this.props.select.subscription_id : ""}
                                    options={this.props.subscriptions && this.props.subscriptions.map(subscription => {
                                        return {
                                            ...subscription,
                                            value: subscription.id,
                                            label: subscription.description,
                                        };
                                    })}
                                    onChange={this.onChangeSubscription}
                                    clearable={false}
                                />
                            </div>
                        </div>

                        {/*<div className="row">*/}
                            {/*<div className="col-md-6">*/}
                                {/*<div className="form-group">*/}
                                    {/*<FormInputDate*/}
                                        {/*label="Bắt đầu"*/}
                                        {/*name="start_time"*/}
                                        {/*value={start_time}*/}
                                        {/*placeholder="dd/mm/yyyy"*/}
                                        {/*updateFormData={this.updateFormData}*/}
                                        {/*id="form-start-time"*/}
                                        {/*required={true}*/}
                                        {/*maxDate={this.props.coupon.end_time !== '' ? this.props.coupon.end_time : ''}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6">*/}
                                {/*<div className="form-group">*/}
                                    {/*<FormInputDate*/}
                                        {/*label="Kết thúc"*/}
                                        {/*name="end_time"*/}
                                        {/*value={end_time}*/}
                                        {/*placeholder="dd/mm/yyyy"*/}
                                        {/*updateFormData={this.updateFormData}*/}
                                        {/*id="form-end-time"*/}
                                        {/*required={true}*/}
                                        {/*minDate={this.props.coupon.start_time !== '' ? this.props.coupon.start_time : ''}*/}
                                    {/*/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                    </div>

                }
            </div>
        );
    }
}

UserpackModal.propTypes = {
    select: PropTypes.object.isRequired,
    userpacks: PropTypes.array,
    subscriptions: PropTypes.array,
    registerManageAction: PropTypes.object.isRequired,
    isLoadingUserpack: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        select: state.registerManage.select,
        userpacks: state.registerManage.userpacks,
        subscriptions: state.registerManage.subscriptions,
        isLoadingUserpack: state.registerManage.isLoadingUserpack,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageAction: bindActionCreators(registerManageAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserpackModal);