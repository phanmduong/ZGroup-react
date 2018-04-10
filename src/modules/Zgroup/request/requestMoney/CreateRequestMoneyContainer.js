import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActions from "../requestActions";
import * as PropTypes from "prop-types";
import Loading from "../../../../components/common/Loading";
import FormInputText from "../../../../components/common/FormInputText";
import CheckBoxMaterial from "../../../../components/common/CheckBoxMaterial";
import Avatar from "../../../../components/common/Avatar";
import { DATE_FORMAT } from "../../../../constants/constants";
import moment from "moment";
import { browserHistory } from 'react-router';
import * as helper from "../../../../helpers/helper";



class CreateRequestMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                command_code: "",
                staff: props.user,
                request_date: "",
                type: "cash",
                money_payment: 0,
                reason: "",

            },
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.submitData = this.submitData.bind(this);

    }

    componentWillMount() {
        if(this.props.routeParams.requestId){
            this.props.requestActions.getRequestMoney(
                this.props.routeParams.requestId, 
                (data)=>{
                    return this.setState({data});
                }
            );
        }        
    }

    componentDidMount(){
        helper.setFormValidation("form-request-money");
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }


    updateFormData(e) {

        let field = e.target.name;
        let value = e.target.value;
        switch(field){
            case "type_cash":{
                field = "type";
                value = "cash";
                break;
            }
            
            case "type_atm":{
                field = "type";
                value = "atm";
                break;
            }
        }
        let data = { ...this.state.data };
        data[field] = value;
        this.setState({ data });
    }

    submitData() {
        let { data } = this.state;
        data.request_date = moment(moment.now()).format(DATE_FORMAT);
        if ($('#form-request-money').valid()) 
        if(this.props.routeParams.requestId){
            this.props.requestActions.editRequestMoney(this.props.routeParams.requestId,data);
        }else{
            this.props.requestActions.createRequestMoney(data);
        }
    }

    exit() {
        helper.confirm(
            "warning",
            "Cảnh báo",
            "Bạn có chắc muốn thoát? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                browserHistory.push("/administration/request/money");
            },
        );
    }

    render() {
        
        let { isLoading,isCommitting } = this.props;
        let { data } = this.state;
        const disableField = isCommitting || isCommitting;
        return (
            <div>
                {
                    isLoading ? <Loading /> :
                        <div className="content">
                            <div className="container-fluid">
                                <form role="form" id="form-request-money" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">attach_money</i>
                                                </div>
                                                <div className="card-content">
                                                    <h4 className="card-title">Xin tạm ứng</h4>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="col-md-12">
                                                                <div>Số tiền</div>
                                                                <FormInputText 
                                                                    name="money_payment"
                                                                    label=""
                                                                    type="number"
                                                                    minValue="0"
                                                                    updateFormData={this.updateFormData}
                                                                    disabled={disableField}
                                                                    value={data.money_payment}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-12"/>
                                                            <div className="col-md-12">Hình thức</div>
                                                            <div className="col-md-6">
                                                                <CheckBoxMaterial
                                                                    label="Chuyển khoản"
                                                                    name="type_atm"
                                                                    checked={data.type == "atm"}
                                                                    onChange={this.updateFormData}
                                                                    disabled={disableField}
                                                                />
                                                            </div>

                                                            <div className="col-md-6">
                                                                <CheckBoxMaterial
                                                                    label="Tiền mặt"
                                                                    name="type_cash"
                                                                    checked={data.type == "cash"}
                                                                    onChange={this.updateFormData}
                                                                    disabled={disableField}
                                                                />
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="control-label">Ghi chú</div>
                                                            <div className="comment-input-wrapper">
                                                                <textarea
                                                                    id="textarea-card-comment"
                                                                    name="reason"
                                                                    onChange={this.updateFormData}
                                                                    value={data.reason}
                                                                    onKeyUp={() => { }}
                                                                    placeholder="Nhập tại đây"
                                                                    className="comment-input"
                                                                    required
                                                                    style={{ width: "100%", margin: "10px", height: "165px", }}
                                                                    disabled={disableField}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>


                                                        {isCommitting ?
                                                            <button className="btn btn-fill btn-rose  disabled" type="button">
                                                                <i className="fa fa-spinner fa-spin" /> Đang yêu cầu</button>
                                                            :
                                                            <button className="btn btn-fill btn-rose" type="button"
                                                                onClick={this.submitData} disabled={disableField}
                                                            ><i className="material-icons">add</i>Yêu cầu</button>}

                                                        <button className="btn btn-fill" type="button" disabled={isCommitting}
                                                            onClick={this.exit}
                                                        ><i className="material-icons">cancel</i> Hủy
                                                                </button>
                                                    </div> 

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">info</i>
                                                </div>
                                                <div className="card-content">
                                                    <h4 className="card-title">Thông tin</h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Avatar
                                                                url={data.staff.avatar_url}
                                                                size={100}
                                                                style={{ width: "100%", height: 170, maxHeight: 170, maxWidth: 170 }}
                                                            /><br />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label>Tên nhân viên</label>
                                                            <div>{data.staff.name}</div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label>SĐT</label>
                                                            <div>{data.staff.phone}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                }
            </div>
        );
    }
}

CreateRequestMoneyContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool.isRequired,
    requestActions: PropTypes.object,
    paginator: PropTypes.object,
    user: PropTypes.object,
    routeParams: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.request.isLoading,
        isCommitting: state.request.isCommitting,
        paginator: state.request.paginator,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestActions: bindActionCreators(requestActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequestMoneyContainer);

