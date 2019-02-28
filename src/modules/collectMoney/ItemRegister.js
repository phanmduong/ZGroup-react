import React from "react";
import * as helper from "../../helpers/helper";
import PropTypes from "prop-types";
import TooltipButton from "../../components/common/TooltipButton";

class ItemRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            register: {
                id: "",
                code: "",
                money: "",
                note: "",
                received_id_card: 0
            }
        };
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        this.setState({
            register: {
                ...this.state.register,
                ...{
                    id: this.props.register.id,
                    code: this.props.nextCode
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nextCode !== this.props.nextCode) {
            this.setState({
                register: {
                    ...this.state.register,
                    code: nextProps.nextCode
                }
            });
        }
    }

    updateFormData(event) {
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

    checkValidate() {
        if (helper.isEmptyInput(this.state.register.code)) {
            helper.showTypeNotification("Vui lòng nhập mã học viên", "warning");
            return;
        }

        if (helper.isEmptyInput(this.state.register.money)) {
            helper.showTypeNotification("Vui lòng nhập số tiền", "warning");
            return;
        }
        this.props.updateMoney(this.props.user, this.state.register);
    }

    render() {
        let register = this.props.register;
        return (
            <tr>
                <td>
                    <button
                        className="btn btn-round btn-fab btn-fab-mini text-white"
                        data-toggle="tooltip"
                        title=""
                        type="button"
                        rel="tooltip"
                        data-placement="right"
                        data-original-title={register.class_name}>
                        <img src={register.icon_url} alt=""/>
                    </button>
                </td>
                <td>{register.class_name}</td>
                <td className="text-center">{register.register_time}</td>
                {register.is_paid ? (
                    <td>{register.code}</td>
                ) : (
                    <td/>
                )}
                <td>
                    {
                        register.saler ?
                            (
                                <div className="btn btn-xs btn-main"
                                     style={{backgroundColor: '#' + register.saler.color}}
                                >
                                    {helper.getShortName(register.saler.name)}
                                    <div className="ripple-container"/>
                                </div>
                            )
                            :
                            (
                                <div className="btn btn-xs btn-main no-data"
                                >
                                    Không có
                                    <div className="ripple-container"/>
                                </div>
                            )

                    }
                </td>
                {
                    register.is_paid ?
                        <td>
                            {helper.dotNumber(register.money)}đ
                        </td>
                        : <td/>
                }

                <td>{register.coupon}</td>
                {register.is_paid ? (
                    <td className="text-center">
                        <div className="text-success">
                            <b>Đã nộp tiền</b>
                        </div>
                    </td>
                ) : (
                    <td className="text-center">Chưa nộp</td>
                )}
                <td>
                    {register.is_paid ?
                        <button className="btn btn-main btn-success"
                                onClick={() => this.props.openModalCollectMoney(this.props.register, this.props.user)}
                        >

                            Nộp thêm
                        </button>
                        :
                        <button className="btn btn-main btn-rose"
                                onClick={() => this.props.openModalCollectMoney(this.props.register, this.props.user)}
                        >
                            Nộp
                        </button>

                    }
                </td>
                <td>
                    <div className="btn-group-action">
                        <TooltipButton text={"Chi tiết"} placement={"top"}>
                            <a target="_blank" href={`/sales/info-student/${this.props.user.id}/history-collect-money`}>
                                <i className="material-icons">
                                    visibility
                                </i>
                            </a>
                        </TooltipButton>
                    </div>
                </td>

            </tr>
        );
    }
}

ItemRegister.propTypes = {
    nextCode: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    updateMoney: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isCollectingMoney: PropTypes.bool.isRequired
};

export default ItemRegister;
