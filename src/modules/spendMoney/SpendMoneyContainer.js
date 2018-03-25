import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import Select from "../../components/common/Select";
import {TYPE_MONEY} from "../../constants/constants";
import HistoryTransaction from "./HistoryTransaction";
import * as spendMoneyActions from './spendMoneyActions';
import Loading from "../../components/common/Loading";
import {avatarEmpty, dotNumber, setFormValidation, showTypeNotification, isEmptyInput} from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";

class SpendMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            money: "0",
            note: "",
            type: null,
            category_id: null,
        };
    }

    componentWillMount() {
        this.props.spendMoneyActions.loadCategoryTransactions();
        this.props.spendMoneyActions.getUser();
    }

    convertDataCategories(data) {
        if (data) {
            data = data.map((item) => {
                return {
                    key: item.id,
                    value: item.name,
                };
            });
        }
        return data;
    }

    createSpendMoney() {
        setFormValidation("#form-spend-money");
        if ($("#form-spend-money").valid()) {
            if (this.state.money < 0) {
                showTypeNotification("Vui lòng nhập số tiền lớn hơn hoặc bằng 0", 'warning');
                return;
            }

            if (isEmptyInput(this.state.type)) {
                showTypeNotification("Vui lòng chọn loại giao dịch", 'warning');
                return;
            }

            if (this.state.money > this.props.user.money && this.state.type == 2) {
                showTypeNotification("Vui lòng chi số tiền ít hơn bạn có", 'warning');
                return;
            }

            this.props.spendMoneyActions.createSpendMoney({
                money: this.state.money,
                note: this.state.note,
                type: this.state.type,
                category_id: this.state.category_id,
            });
        }
    }

    render() {
        let avatar = avatarEmpty(this.props.user.avatar_url) ?
            NO_AVATAR : this.props.user.avatar_url;
        const isLoading = this.props.isLoadingCategories && this.props.isLoadingUser;
        return (
            <div>
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">perm_identity</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Thu/Chi</h4>
                        {
                            isLoading ?
                                <Loading/>
                                :
                                <div>
                                    <div className="row">
                                        <div className="col-md-12 margin-vertical-30">
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
                                    <form id="form-spend-money" onSubmit={(e) => {
                                        e.preventDefault();
                                    }}>
                                        <div className="row">
                                            <div className="col-md-8">

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
                                                    required
                                                    name="money"/>
                                                <FormInputText
                                                    required
                                                    label={"Nhập ghi chú"}
                                                    value={this.state.note}
                                                    updateFormData={(event) => {
                                                        this.setState({
                                                            note: event.target.value
                                                        });
                                                    }}
                                                    name="note"/>

                                            </div>
                                            <div className="col-md-4">
                                                <Select
                                                    value={this.state.type}
                                                    options={TYPE_MONEY}
                                                    defaultMessage="Chọn loại giao dịch"
                                                    onChange={(value) => this.setState({type: value})}
                                                />
                                                <Select
                                                    value={this.state.category_id}
                                                    options={this.convertDataCategories(this.props.categories)}
                                                    defaultMessage="Chọn nhóm"
                                                    onChange={(value) => this.setState({category_id: value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {
                                                    this.props.isCreatingTransaction ?
                                                        <button className="btn btn-rose disabled"
                                                        >
                                                            <i className="fa fa-spinner fa-spin"/>
                                                            Đang tạo
                                                        </button>
                                                        :
                                                        <button className="btn btn-rose"
                                                                onClick={() => this.createSpendMoney()}>
                                                            Tạo
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                        }

                    </div>
                </div>
                <HistoryTransaction/>
            </div>
        );
    }
}

SpendMoneyContainer.propTypes = {
    categories: PropTypes.array.isRequired,
    spendMoneyActions: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isLoadingUser: PropTypes.bool.isRequired,
    isLoadingCategories: PropTypes.bool.isRequired,
    isCreatingTransaction: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingCategories: state.spendMoney.isLoadingCategories,
        categories: state.spendMoney.categories,
        user: state.spendMoney.user,
        isLoadingUser: state.spendMoney.isLoadingUser,
        isCreatingTransaction: state.spendMoney.isCreatingTransaction,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spendMoneyActions: bindActionCreators(spendMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpendMoneyContainer);