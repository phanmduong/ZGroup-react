/**
 * Created by phanmduong on 9/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    dotNumber,
    formatPhone,
    getShortName, isClassWait,
    isEmptyInput, setFormValidation,
    showTypeNotification,
    validateLinkImage
} from "../../helpers/helper";
import FormInputText from "../../components/common/FormInputText";
import {PAYMENT_METHODS} from "../../constants/constants";
import ReactSelect from 'react-select';

class CollectMoneyForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            register: {
                id: props.register.id,
                payment_method: props.staff.id == 228 ? 'internet_banking' : '',
                money: 0,
                note: 0,
                code: props.register.is_paid ? props.register.code : (
                    isClassWait(props.register.class_type)
                        ? props.nextWaitingCode
                        : props.nextCode)
            }
        }
    }

    componentDidUpdate() {
        setFormValidation('#form-collect-money');
    }

    updateFormData = (event) => {
        const field = event.target.name;
        let register = {...this.state.register};
        if (event.target.type === "checkbox") {
            register[field] = event.target.checked;
        } else {
            if (field == "money") {
                if (!isNaN(Number(event.target.value.toString().replace(/\./g, "")))) {
                    register[field] = Number(event.target.value.toString().replace(/\./g, ""));
                }
            } else {
                register[field] = event.target.value;
            }
        }
        this.setState({
            register: register
        });
    }

    onPaymentMethodChange = (obj) => {
        let res = obj ? obj.value : '';
        let register = {...this.state.register};
        register['payment_method'] = res;
        this.setState({
            register: register
        });
    }

    submitForm = () => {
        if ($('#form-collect-money').valid()) {
            if (isEmptyInput(this.state.register.payment_method)) {
                showTypeNotification("Vui lòng chọn phương thức thanh toán", "warning");
                return;
            }
            this.props.collectMoney(this.state.register);
        }
    };


    render() {
        const user = this.props.user;
        const register = this.props.register;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-3 flex-row-center flex-justify-content-center">
                        <div className="circle-avatar" style={{
                            background: 'url(' + validateLinkImage(register.icon_url) + ') center center / cover',
                            width: '100px',
                            height: '100px',
                            marginBottom: 20
                        }}
                        />
                    </div>
                    <div className="col-sm-9">
                        <div style={{flex: 1}}>
                            <div className="bold" style={{fontSize: 20}}>
                                {user.name}
                            </div>
                            <div className="category">
                                {formatPhone(user.phone)}
                            </div>
                            <div className="category">
                                {user.email}
                            </div>
                            <div style={{width: '100%', height: 1, backgroundColor: '#868686', margin: "10px 0"}}/>
                            <div className="bold" style={{fontSize: 20}}>
                                {register.class_name}
                            </div>
                            {
                                register.saler &&
                                (
                                    <div className="flex flex-row flex-row-center">
                                        <div style={{marginRight: 10}}>Saler</div>
                                        <div className="btn btn-xs"
                                             style={{backgroundColor: '#' + register.saler.color}}
                                        >
                                            {getShortName(register.saler.name)}
                                            <div className="ripple-container"/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <form id="form-collect-money" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <FormInputText
                        label="Số tiền"
                        name="money"
                        updateFormData={this.updateFormData}
                        value={dotNumber(this.state.register.money)}
                        type="text"
                        required
                    />
                    <FormInputText
                        label="Chú thích"
                        name="note"
                        updateFormData={this.updateFormData}
                        value={this.state.register.note}
                        type="text"
                    />
                    <FormInputText
                        label="Mã học viên"
                        name="code"
                        updateFormData={this.updateFormData}
                        value={this.state.register.code}
                        type="text"
                        disabled={register.is_paid}
                    />
                    <div className="form-group">
                        <label className="">
                            Phương thức thanh toán
                        </label>
                        <ReactSelect
                            disabled={this.props.isCollectingMoney}
                            className=""
                            options={PAYMENT_METHODS}
                            onChange={this.onPaymentMethodChange}
                            value={this.state.register.payment_method}
                            defaultMessage="Tuỳ chọn"
                            name="payment_method"
                        />
                    </div>
                    {this.props.isCollectingMoney ?
                        (
                            <button
                                className="btn btn-fill btn-rose disabled"
                            >
                                <i className="fa fa-spinner fa-spin"/> Đang nộp
                            </button>
                        )
                        :
                        <button className="btn btn-rose"
                                onClick={this.submitForm}
                        > Nộp tiền
                        </button>
                    }

                </form>
            </div>
        );
    }
}

CollectMoneyForm.propTypes = {
    user: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    collectMoney: PropTypes.func.isRequired,
    isCollectingMoney: PropTypes.bool.isRequired,
};

export default CollectMoneyForm;
