import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Pagination from "../../components/common/Pagination";
import * as moneyTransferActions from "./moneyTransferActions";
import Loading from "../../components/common/Loading";
import {NO_AVATAR} from "../../constants/env";
import {avatarEmpty, dotNumber, isEmptyInput} from "../../helpers/helper";
import * as moneyTransferApi from "./moneyTransferApi";
import ReactSelect from 'react-select';
import ItemReactSelect from "../../components/common/ItemReactSelect";
import FormInputText from "../../components/common/FormInputText";

class MoneyTransferContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            staff: "",
        };
        this.loadStaffs = this.loadStaffs.bind(this);
        this.changeStaff = this.changeStaff.bind(this);

    }

    componentWillMount() {
        this.props.moneyTransferActions.getUser();
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
                console.log("staffs");
                callback(null, {options: staffs, complete: true});
            });
        }.bind(this), 500);
    }

    render() {
        let avatar = avatarEmpty(this.props.user.avatar_url) ?
            NO_AVATAR : this.props.user.avatar_url;
        return (
            <div className="row">
                <div className="col-md-12">
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
                                            <div className="col-md-5">
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
                                            <div className="col-md-4">
                                                <FormInputText
                                                    label={"Nhập số tiền"}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <button
                                                    className="btn btn-fill btn-rose btn-round"
                                                >
                                                    {this.props.user.status == 2 ? 'Đang giao dịch' : 'Chuyển tiền'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MoneyTransferContainer.propTypes = {};

function mapStateToProps(state) {
    return {
        isLoadingUser: state.moneyTransfer.isLoadingUser,
        user: state.moneyTransfer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moneyTransferActions: bindActionCreators(moneyTransferActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneyTransferContainer);