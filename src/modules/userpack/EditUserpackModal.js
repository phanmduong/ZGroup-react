import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as userpacksActions from './userpacksActions';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import Loading from '../../components/common/Loading';
import {NO_IMAGE} from '../../constants/env';
import FormInputText from '../../components/common/FormInputText';
import {Modal} from 'react-bootstrap';
import SubscriptionModal from "./SubscriptionModal";


class EditUserpackModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModal: false,
            isEdit: false,
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        this.props.userpacksActions.loadDetailUserpack(this.props.userpack.id);
        this.props.userpacksActions.loadSubscriptionsInUserpack(this.props.userpack.id);
    }

    openModal(isEdit, subscription) {
        this.setState({isOpenModal: true, isEdit: isEdit});
        let data = {...subscription};
        if (subscription.subcription_kind !== undefined && subscription.subcription_kind !== null) {
            data["subscriptionKind"] = subscription.subcription_kind.id;
        }    // đưa id trong object  ra ngoài
        this.props.userpacksActions.updateFormSubscription(data);
    }

    closeModal() {
        this.setState({isOpenModal: false});
    }

    editUserpack(e) {
        this.props.userpacksActions.editUserpack(this.props.userpack, this.props.closeModalEdit);
        e.preventDefault();
    }


    render() {
        let {name, avatar_url, isUpdatingImage, detail, subscriptions} = this.props.userpack;

        return (
            <div>
                <form role="form" id="form-userpack">

                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">announcement</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Thông tin về gói khách hàng </h4>
                            {this.props.isLoadingUserpack ? <Loading/> :
                                <div className="row">
                                    {isUpdatingImage ?
                                        <Loading/>
                                        :
                                        <TooltipButton text="Chọn ảnh đại diện" placement="top">
                                            <a type="button">
                                                <img
                                                    src={helper.isEmptyInput(avatar_url) ?
                                                        NO_IMAGE : avatar_url
                                                    }/>
                                                <input type="file"
                                                       accept=".jpg,.png,.gif"
                                                       onChange={this.props.handleFileUpload}
                                                       style={{
                                                           cursor: 'pointer',
                                                           opacity: "0.0",
                                                           // position: "absolute",
                                                           top: 0,
                                                           left: 0,
                                                           bottom: 0,
                                                           right: 0,
                                                           width: "100%",
                                                           height: "100%"
                                                       }}
                                                />
                                            </a>
                                        </TooltipButton>
                                    }


                                    <FormInputText
                                        label="Tên gói"
                                        required
                                        name="name"
                                        updateFormData={this.props.updateFormUserpack}
                                        value={name}
                                    />
                                    <div className="form-group">
                                        <label className="control-label">Ghi chú</label>
                                        <textarea
                                            className="form-control"
                                            name="detail"
                                            rows="3"
                                            value={detail && detail}
                                            onChange={(e) => this.props.updateFormUserpack(e)}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                            {/*<div style={{display: "flex", flexDirection: "column-reverse", marginTop: 55}}>*/}
                                {/*<a className="btn btn-round btn-sm btn-primary"*/}
                                   {/*ref="target" onClick={() => this.openModal(false, {*/}
                                    {/*price: 0,*/}
                                    {/*id: 0,*/}
                                    {/*description: "",*/}
                                    {/*subscriptionKind: "",*/}
                                {/*})}>*/}
                                    {/*<span>*/}
                                        {/*<i className="material-icons">add</i>Thêm đăng kí gói*/}
                                    {/*</span>*/}
                                {/*</a>*/}
                            {/*</div>*/}
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">announcement</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Thông tin về gói đăng kí </h4>

                            {this.props.isLoadingSubInUserpack ? <Loading/> :
                                <table className="table table-hover">
                                    {subscriptions.length === 0 ?
                                        null :
                                        <thead>
                                        <tr className="text-rose" role="row">
                                            <th>Mô tả</th>
                                            <th>Giá</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                    }

                                    <tbody>

                                    {subscriptions && subscriptions.map((subscription, key) => {
                                        return (
                                            <tr role="row" className="even" key={key}>
                                                <td>{subscription.description || "Chưa có mô tả"}</td>
                                                <td>{subscription.price}</td>
                                                <td>
                                                    <div className="btn-group-action">
                                                        <div style={{display: 'inline-block'}}>
                                                            <a data-toggle="tooltip" title type="button"
                                                               rel="tooltip"
                                                               data-original-title="Sửa"
                                                               onClick={() => this.openModal(true, subscription)}
                                                            >
                                                                <i className="material-icons">edit</i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            }

                        </div>
                    </div>


                    <div style={{display: "flex", justifyContent: "flex-end", marginTop: 40}}>
                        <button className="btn btn-fill btn-default"
                                type="button" onClick={() => this.openModal(false, {
                            price: 0,
                            id: 0,
                            description: "",
                            subscriptionKind: "",
                        })}>
                            <i className="material-icons">add</i>Thêm đăng kí gói
                        </button>
                        {this.props.isSavingEditUserpack ?
                            (
                                <button className="btn btn-fill btn-rose" type="button">
                                    <i className="fa fa-spinner fa-spin disabled"/>
                                    {' Đang sửa'}
                                </button>
                            )
                            :
                            (
                                <button className="btn btn-fill btn-rose" type="button"
                                        onClick={(e) => {
                                            this.editUserpack(e);
                                        }}>
                                    <i className="material-icons">save</i>
                                    {' Lưu'}
                                </button>
                            )
                        }


                    </div>
                </form>


                <Modal show={this.state.isOpenModal} bsSize="lg" bsStyle="primary" onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <SubscriptionModal
                            closeModal={this.closeModal}
                            isEdit={this.state.isEdit}
                        />
                    </Modal.Body>
                </Modal>


            </div>

        );
    }
}

EditUserpackModal.propTypes = {
    isSavingEditUserpack: PropTypes.bool,
    isLoadingUserpack: PropTypes.bool,
    isLoadingSubInUserpack: PropTypes.bool,
    userpack: PropTypes.object,
    userpacksActions: PropTypes.object.isRequired,
    subscription: PropTypes.object,
    handleFileUpload: PropTypes.func,
    updateFormUserpack: PropTypes.func,
    closeModalEdit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingPost: state.userpacks.isLoadingPost,
        subscription: state.userpacks.subscription,
        isLoadingUserpack: state.userpacks.isLoadingUserpack,
        isLoadingSubInUserpack: state.userpacks.isLoadingSubInUserpack,
        userpack: state.userpacks.userpack,
        isSavingEditUserpack: state.userpacks.isSavingEditUserpack,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userpacksActions: bindActionCreators(userpacksActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserpackModal);