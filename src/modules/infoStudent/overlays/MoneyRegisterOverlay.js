import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Loading from "../../../components/common/Loading";
import FormInputText from "../../../components/common/FormInputText";
import {payMoney} from "../../collectMoney/collectMoneyApi";
import {PAYMENT_METHODS} from "../../../constants/constants";
import ReactSelect from 'react-select';
import {
    dotNumber,
    isEmptyInput,
    showErrorNotification,
    showNotification,
    showTypeNotification
} from "../../../helpers/helper";

class MoneyRegisterOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            isLoading: false,
            register: {
                ...this.props.register,
                money: 0,
                note: '',
                payment_method: ''
            }
        };
        this.state = this.initState;
    }

    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        if (!this.state.isLoading) {
            this.setState(this.initState);
        }
    };
    updateFormData = (event) => {
        const {name, value} = event.target;
        let register = {...this.state.register};

        if (name == "money") {
            if (!isNaN(Number(value.toString().replace(/\./g, "")))) {
                register[name] = Number(value.toString().replace(/\./g, ""));
            }
        } else {
            register[name] = value;
        }
        this.setState({register});
        $('#form-collect-money').validate({
            rules:{money:'required'},
            messages:{'money':'Vui lòng nhập số tiền!'}
        });
    };
    onPaymentMethodChange = (obj) => {
        let res = obj ? obj.value : '';
        let register = {...this.state.register};
        register['payment_method'] = res;
        this.setState({
            register: register
        });
    };
    payMoneyStudent = () => {
        let {register} = this.state;


        if ($('#form-collect-money').valid()) {
            if (isEmptyInput(this.state.register.payment_method)) {
                showTypeNotification("Vui lòng chọn phương thức thanh toán", "warning");
                return;
            }
            this.setState({isLoading:true});
            payMoney({
                id: register.id,
                money: "" + register.money,
                code: register.code,
                note: register.note,
                payment_method: register.payment_method
            }).then((res)=>{
                if(res.data.status == 1){
                    showNotification('Nộp tiền thành công!');
                    this.props.reload();
                }else{
                    showErrorNotification(res.data.message);
                }

            }).catch(()=>{
                showErrorNotification("Có lỗi xảy ra!");
            }).finally(()=>{
                this.setState({isLoading:false});
            });
        }

    };

    render() {
        let {isLoading} = this.state;
        return (

            <div style={{position: "relative"}} className="">
                <button className="btn btn-register-action" mask="create"
                        onClick={this.toggle}
                        disabled={isLoading}
                        ref="target">
                    Nộp học phí
                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-call-register" style={{
                        width: 300,
                        marginTop: 10
                    }}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Nộp tiền học viên</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {isLoading ? <Loading/> :
                            <form id="form-collect-money" onSubmit={(e) => e.preventDefault()}>
                                <FormInputText
                                    name="money"
                                    placeholder="Số tiền"
                                    value={dotNumber(this.state.register.money)}
                                    required
                                    type="text"
                                    updateFormData={this.updateFormData}
                                />
                                <FormInputText
                                    name="note"
                                    placeholder="Note"
                                    value={this.state.register.note}
                                    updateFormData={this.updateFormData}
                                />
                                <FormInputText
                                    placeholder="Mã học viên"
                                    name="code"
                                    updateFormData={this.updateFormData}
                                    value={this.state.register.code}
                                    type="text"
                                    disabled={this.state.register.is_paid}
                                />

                                <ReactSelect
                                    disabled={this.state.isLoading}
                                    className="form-group"
                                    options={PAYMENT_METHODS}
                                    onChange={this.onPaymentMethodChange}
                                    value={this.state.register.payment_method}
                                    placeholder="Phương thức thanh toán"
                                    name="payment_method"
                                />

                            </form>

                        }
                        <div>
                            <button type="button"
                                    className="btn btn-success width-100 text-center"
                                    disabled={isLoading}
                                    style={{backgroundColor: '#2acc4c'}}
                                    onClick={this.payMoneyStudent}>
                                Hoàn tất
                            </button>
                            <button type="button"
                                    disabled={isLoading}
                                    className="btn btn-white width-100 text-center"
                                    data-dismiss="modal"
                                    onClick={this.close}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </Overlay>
            </div>


        );
    }
}


export default MoneyRegisterOverlay;