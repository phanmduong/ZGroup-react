import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as moneyTransferActions from "./moneyTransferActions";
import Loading from "../../components/common/Loading";
import {CHANNEL, NO_AVATAR} from "../../constants/env";
import {avatarEmpty, dotNumber, isEmptyInput, setFormValidation, showTypeNotification} from "../../helpers/helper";
import * as moneyTransferApi from "./moneyTransferApi";
import ReactSelect from 'react-select';
import ItemReactSelect from "../../components/common/ItemReactSelect";
import FormInputText from "../../components/common/FormInputText";
import ReceiveTransactions from "./ReceiveTransactions";
import socket from "../../services/socketio";

class MoneyTransferContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            staff: "",
            money: ""
        };
        this.loadStaffs = this.loadStaffs.bind(this);
        this.changeStaff = this.changeStaff.bind(this);
        this.createTransaction = this.createTransaction.bind(this);

    }

    componentWillMount() {
        this.props.moneyTransferActions.getUser();
        const channel = CHANNEL + ":notification";
        socket.on(channel, (data) => {
            if (data.notification && data.notification.transaction && (data.notification.transaction.sender_id === this.props.user.id ||
                    data.notification.transaction.receiver_id === this.props.user.id)) {
                this.props.moneyTransferActions.getUser();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingUser != this.props.isLoadingUser && !nextProps.isLoadingUser && nextProps.user) {
            this.setState({money: nextProps.user.money});
        }
    }

    changeStaff(value) {
        let staff = value && value.value ? value.value : "";
        this.setState({staff: staff, page: 1});
    }

    loadStaffs(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            moneyTransferApi.searchStaffs(input).then(res => {
                let staffs = [];
                res.data.staffs.map((staff) => {
                    if (staff.id !== this.props.user.id) {
                        staffs.push({
                            ...staff,
                            ...{
                                value: staff.id,
                                label: staff.name
                            }
                        });
                    }
                });
                callback(null, {options: staffs, complete: true});
            });
        }.bind(this), 500);
    }

    createTransaction() {
        if (isEmptyInput(this.state.staff)) {
            showTypeNotification("Vui lòng chọn nhân viên", 'warning');
            return;
        }
        setFormValidation("#form-money-transfer");
        if ($('#form-money-transfer').valid()) {

            if (this.state.money > this.props.user.money) {
                showTypeNotification("Vui lòng nhập số tiền ít hơn", 'warning');
                return;
            }

            if (this.state.money < 0) {
                showTypeNotification("Vui lòng nhập số tiền lớn hơn 0", 'warning');
                return;
            }

            this.props.moneyTransferActions.createTransaction(this.state.staff, this.state.money);
        }
    }

    render() {
        let avatar = avatarEmpty(this.props.user.avatar_url) ?
            NO_AVATAR : this.props.user.avatar_url;
        return (
            <div>
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">perm_identity</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Chuyển tiền</h4>
                        {
                            this.props.isLoadingUser ?
                                <Loading/>
                                :
                                <div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="flex flex-row-center">
                                                <div
                                                    style={{
                                                        background: 'url(' + avatar + ') center center / cover',
                                                        width: '80px',
                                                        height: '80px',
                                                        borderRadius: '50%'
                                                    }}
                                                />
                                                <div className="flex flex-col margin-left-20">
                                                    <div className="font-size-1_5em">
                                                        <strong>{this.props.user.name}</strong></div>
                                                    <div
                                                        className="font-weight-400">{dotNumber(this.props.user.money)}đ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row margin-vertical-30">
                                        <div className="col-md-5" style={{zIndex: 1000}}>
                                            <label className="label-control">Tìm nhân viên</label>
                                            <ReactSelect.Async
                                                loadOptions={this.loadStaffs}
                                                loadingPlaceholder="Đang tải..."
                                                placeholder="Chọn nhân viên"
                                                searchPromptText="Không có dữ liệu nhân viên"
                                                onChange={this.changeStaff}
                                                value={this.state.staff}
                                                optionRenderer={(option) => {
                                                    return (
                                                        <ItemReactSelect label={option.label}
                                                                         url={option.avatar_url}/>
                                                    );
                                                }}
                                                valueRenderer={(option) => {
                                                    return (
                                                        <ItemReactSelect label={option.label}
                                                                         url={option.avatar_url}/>
                                                    );
                                                }}
                                            />
                                        </div>
                                        <form id="form-money-transfer" onSubmit={(e) => {
                                            e.preventDefault();
                                        }}>
                                            <div className="col-md-4">
                                                <FormInputText
                                                    label={"Nhập số tiền"}
                                                    value={dotNumber(this.state.money)}
                                                    updateFormData={(event) => {
                                                        if (!isNaN(Number(event.target.value.toString().replace(/\./g, "")))) {
                                                            this.setState({
                                                                money: Number(event.target.value.toString().replace(/\./g, ""))
                                                            });
                                                        }
                                                    }}
                                                    name="money"/>
                                            </div>
                                        </form>
                                        <div className="col-md-3">
                                            {
                                                this.props.user.status == 2
                                                    ?
                                                    <button
                                                        className="btn btn-fill btn-rose btn-round disabled"
                                                    > <i className="fa fa-spinner fa-spin"/>
                                                        Đang giao dịch
                                                    </button>
                                                    :
                                                    this.props.isCreatingTransaction
                                                        ?
                                                        <button
                                                            className="btn btn-fill btn-rose btn-round disabled"
                                                        ><i className="fa fa-spinner fa-spin"/>
                                                            Đang tạo giao dịch
                                                        </button>
                                                        :
                                                        <button
                                                            className="btn btn-fill btn-rose btn-round"
                                                            onClick={this.createTransaction}
                                                        >
                                                            Chuyển tiền
                                                        </button>
                                            }

                                        </div>
                                    </div>
                                </div>

                        }

                    </div>
                </div>
                <ReceiveTransactions/>
            </div>
        );
    }
}

MoneyTransferContainer.propTypes = {
    isLoadingUser: PropTypes.bool,
    isCreatingTransaction: PropTypes.bool,
    user: PropTypes.object,
    moneyTransferActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoadingUser: state.moneyTransfer.isLoadingUser,
        isCreatingTransaction: state.moneyTransfer.isCreatingTransaction,
        user: state.moneyTransfer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moneyTransferActions: bindActionCreators(moneyTransferActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransferContainer);