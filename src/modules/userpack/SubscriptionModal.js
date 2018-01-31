import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as userpacksActions from './userpacksActions';
// import * as userpacksApis from "./userpacksApis";
import {Modal} from 'react-bootstrap';

import TooltipButton from '../../components/common/TooltipButton';
import FormInputText from '../../components/common/FormInputText';
import AddSubcriptionKindModal from "./AddSubcriptionKindModal";

import ReactSelect from "react-select";


class SubscriptionModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModal: false,
        };
        // this.loadSubscriptionsKind = this.loadSubscriptionsKind.bind(this);
        this.changeSubscriptionKind = this.changeSubscriptionKind.bind(this);
        this.updateFormSubscription = this.updateFormSubscription.bind(this);
        this.updateFormSubscriptionKind = this.updateFormSubscriptionKind.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.addSubscriptionKind = this.addSubscriptionKind.bind(this);
        this.addSubscription = this.addSubscription.bind(this);
        this.loadSubscriptionKinds = this.loadSubscriptionKinds.bind(this);
    }

    componentWillMount() {
        this.loadSubscriptionKinds();
    }

    loadSubscriptionKinds(){
        this.props.userpacksActions.loadSubscriptionKinds();

    }
    openModal(data) {
        this.setState({isOpenModal: true});
        this.props.userpacksActions.updateFormSubscriptionKind(data);
    }

    closeModal() {
        this.setState({isOpenModal: false});
    }

    // loadSubscriptionsKind(input, callback) {
    //     if (this.timeOut !== null) {
    //         clearTimeout(this.timeOut);
    //     }
    //     this.timeOut = setTimeout(function () {
    //         userpacksApis.loadSubscriptionsKindApi(input).then(res => {
    //             let subscriptionsKind = res.data.message.subscription_kinds.map((subscriptionKind) => {
    //                 return {
    //                     ...subscriptionKind,
    //                     ...{
    //                         value: subscriptionKind.id,
    //                         label: subscriptionKind.name,
    //                     }
    //                 };
    //             });
    //             callback(null, {options: subscriptionsKind, complete: true});
    //         });
    //     }.bind(this), 500);
    // }


    updateFormSubscription(event) {
        const field = event.target.name;
        let data = {...this.props.subscription};
        data[field] = event.target.value;
        this.props.userpacksActions.updateFormSubscription(data);
    }

    updateFormSubscriptionKind(event) {
        const field = event.target.name;
        let data = {...this.props.subscriptionKind};
        data[field] = event.target.value;
        this.props.userpacksActions.updateFormSubscriptionKind(data);
    }

    changeSubscriptionKind(event) {
        const field = "subscriptionKind";
        let data = {...this.props.subscription};
        data[field] = event.value;
        this.props.userpacksActions.updateFormSubscription(data);
    }

    addSubscription(e) {
        if (this.props.isEdit) {
            this.props.userpacksActions.editSubscription(this.props.userpack.id, this.props.subscription, this.props.closeModal);
        }
        else {
            this.props.userpacksActions.addSubscription(this.props.userpack.id, this.props.subscription, this.props.closeModal);
        }
        e.preventDefault();
    }

    addSubscriptionKind(e) {
        this.props.userpacksActions.addSubscriptionKind(this.props.subscriptionKind, this.closeModal, this.loadSubscriptionKinds);
        e.preventDefault();
    }


    render() {

        let {price, description, subscriptionKind} = this.props.subscription;
        return (
            <div>
                <form id="form-subscription">

                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">announcement</i>
                        </div>
                        <div className="card-content"><h4
                            className="card-title">{this.props.isEdit ? "Chỉnh sửa đăng kí gói thành viên " : "Thêm đăng kí gói thành viên "}</h4>
                            <div className="row">
                                <div className="col-md-7">
                                    <FormInputText
                                        type="number"
                                        label="Giá cả"
                                        required
                                        name="price"
                                        updateFormData={this.updateFormSubscription}
                                        value={price}
                                        minValue = "0"
                                    />
                                    <div className="row" style={{ marginTop : 40}}>
                                        <div className="col-md-10">
                                            {/*<ReactSelect.Async*/}
                                            {/*loadOptions={this.loadSubscriptionsKind}*/}
                                            {/*loadingPlaceholder="Đang tải..."*/}
                                            {/*placeholder="Chọn loại subscription"*/}
                                            {/*searchPromptText="Không có dữ liệu "*/}
                                            {/*onChange={this.changeSubscriptionKind}*/}
                                            {/*value={subscriptionKind}*/}
                                            {/*/>*/}
                                            <label className="label-control">Chọn gói đăng kí</label>
                                            <ReactSelect
                                                value={subscriptionKind}
                                                options={this.props.subscriptionKinds}
                                                onChange={this.changeSubscriptionKind}
                                                placeholder="Chọn gói đăng kí"
                                            />
                                            {/*<select*/}
                                                {/*className="form-control"*/}
                                                {/*value={subscriptionKind}*/}
                                                {/*onChange={this.updateFormSubscription}*/}
                                                {/*name="subscriptionKind">*/}
                                                {/*{this.props.subscriptionKinds !== null && this.props.subscriptionKinds !== undefined &&*/}
                                                {/*this.props.subscriptionKinds.map((item, key) => {*/}
                                                    {/*return (*/}
                                                        {/*<option key={key}*/}
                                                                {/*value={item.id}>*/}
                                                            {/*{item.name}*/}
                                                        {/*</option>);*/}
                                                {/*})}*/}
                                            {/*</select>*/}
                                        </div>
                                        <TooltipButton placement="top" text="Thêm loại đăng kí">
                                            <div className="col-md-2" style={{marginTop: 18}}>
                                                <a className="btn btn-rose btn-sm"
                                                   onClick={() => {
                                                       this.openModal({});
                                                   }}>
                                                    <i className="material-icons">control_point</i>
                                                </a>
                                            </div>
                                        </TooltipButton>
                                    </div>


                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label className="control-label"/>Mô tả
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="7"
                                            value={description && description}
                                            onChange={(e) => this.updateFormSubscription(e)}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-8"/>
                        <div className="col-md-4">
                            {this.props.isSavingSubscription ?
                                (
                                    <button
                                        className="btn btn-sm btn-success disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        {this.props.isEdit ? "Đang sửa" : "Đang thêm"}
                                    </button>
                                )
                                :
                                (
                                    <button className="btn btn-success btn-sm"
                                            onClick={(e) => {
                                                this.addSubscription(e);
                                            }}>
                                        <i className="material-icons">save</i>
                                        {this.props.isEdit ? "Sửa" : "Thêm"}
                                    </button>
                                )
                            }

                            <button className="btn btn-sm btn-danger"
                                    onClick={(e) => {
                                        this.props.closeModal();
                                        e.preventDefault();
                                    }}
                            >
                                <i className="material-icons">cancel</i> Huỷ
                            </button>
                        </div>
                    </div>
                </form>


                <Modal show={this.state.isOpenModal} bsSize="sm" bsStyle="primary" onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>Gói khách hàng</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-subscription-kind">

                            <AddSubcriptionKindModal
                                updateFormSubscriptionKind={this.updateFormSubscriptionKind}
                                subscriptionKind={this.props.subscriptionKind}
                            />

                            <div style={{display: "flex", flexDirection: "row-reverse"}}>
                                <button className="btn btn-sm btn-danger"
                                        onClick={(e) => {
                                            this.closeModal();
                                            e.preventDefault();
                                        }}
                                >
                                    <i className="material-icons">cancel</i> Huỷ
                                </button>
                                {this.props.isSavingSubscriptionKind ?
                                    (
                                        <button
                                            className="btn btn-sm btn-success disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {'Đang lưu'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-success btn-sm"
                                                onClick={(e) => {
                                                    this.addSubscriptionKind(e);
                                                }}>
                                            <i className="material-icons">save</i>
                                            {'Lưu'}
                                        </button>
                                    )
                                }


                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

SubscriptionModal.propTypes = {
    subscription: PropTypes.object,
    subscriptionKind: PropTypes.object,
    userpacksActions: PropTypes.object.isRequired,
    isSavingSubscription: PropTypes.bool.isRequired,
    isSavingSubscriptionKind: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    userpack: PropTypes.object.isRequired,
    subscriptionKinds: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        subscription: state.userpacks.subscription,
        subscriptionKind: state.userpacks.subscriptionKind,
        userpack: state.userpacks.userpack,
        isSavingSubscription: state.userpacks.isSavingSubscription,
        isSavingSubscriptionKind: state.userpacks.isSavingSubscriptionKind,
        subscriptionKinds: state.userpacks.subscriptionKinds,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userpacksActions: bindActionCreators(userpacksActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionModal);