import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActions from "../requestActions";
import * as PropTypes from "prop-types";
import Loading from "../../../../components/common/Loading";
import FormInputDate from "../../../../components/common/FormInputDate";
import CheckBoxMaterial from "../../../../components/common/CheckBoxMaterial";
import Avatar from "../../../../components/common/Avatar";
import { DATE_FORMAT,DATETIME_FORMAT_SQL } from "../../../../constants/constants";
import moment from "moment";
import { browserHistory } from 'react-router';
import * as helper from "../../../../helpers/helper";



class CreateRequestVacationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                command_code: "",
                staff: props.user,
                request_date: "",
                start_time: "",
                end_time: "",
                type: "nopay",
                reason: "",
            },
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.submitData = this.submitData.bind(this);

    }

    componentWillMount() {
        if(this.props.routeParams.requestId){
            this.props.requestActions.getRequestVacation(
                this.props.routeParams.requestId, 
                (data)=>{
                    data.start_time = moment(data.start_time).format( DATE_FORMAT);
                    data.end_time = moment(data.end_time).format( DATE_FORMAT);
                    data.request_date = moment(data.request_date).format( DATE_FORMAT);
                    return this.setState({data});
                }
            );
        }
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }


    updateFormData(e) {

        let field = e.target.name;
        let value = e.target.value;
        if (field == "type") value = (this.state.data.type == "nopay") ? "pay" : "nopay";
        let data = { ...this.state.data };
        data[field] = value;
        this.setState({ data });
    }

    submitData() {
        let  data  = {...this.state.data};
        
        if ( helper.isEmptyInput(data.end_time) || !moment(data.end_time).isValid()) {
            helper.showErrorNotification("Vui lòng chọn ngày kết thúc");
            return;
        }
        if (helper.isEmptyInput(data.start_time) || !moment(data.start_time).isValid()) {
            helper.showErrorNotification("Vui lòng chọn ngày bắt đầu");
            return;
        }

        data.request_date = moment(moment.now()).format(DATETIME_FORMAT_SQL);
        data.start_time = moment(data.start_time).format(DATETIME_FORMAT_SQL);
        data.end_time = moment(data.end_time).format(DATETIME_FORMAT_SQL);

        
        if(this.props.routeParams.requestId){
            this.props.requestActions.editRequestVacation(this.props.routeParams.requestId,data);
        }else{
            this.props.requestActions.createRequestVacation(data);
        }
    }

    exit() {
        helper.confirm(
            "warning",
            "Cảnh báo",
            "Bạn có chắc muốn thoát? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                browserHistory.push("/administration/request/vacation");
            },
        );
    }

    render() {
        
        let { isLoading, isCommitting } = this.props;
        let { data } = this.state;
        let date1 = data.start_time;
        let date2 = data.end_time;

        //console.log("data test",data);

        return (
            <div>
                {
                    isLoading ? <Loading /> :
                        <div className="content">
                            <div className="container-fluid">
                                <form role="form" id="form-request-vacation" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">local_hotel</i>
                                                </div>
                                                <div className="card-content">
                                                    <h4 className="card-title">Xin nghỉ phép</h4>
                                                    <div className="row">
                                                        <div className="col-md-6">

                                                            <div className="col-md-12">
                                                                <FormInputDate
                                                                    name="start_time"
                                                                    id="start-time"
                                                                    label="Nghỉ phép từ ngày:"
                                                                    value={date1}
                                                                    updateFormData={this.updateFormData}
                                                                    format={DATE_FORMAT}
                                                                    placeholder={DATE_FORMAT}
                                                                    required={true}
                                                                    //maxDate={date2}
                                                                    disabled={isLoading}
                                                                />
                                                            </div>
                                                            <div className="col-md-12">
                                                                <FormInputDate
                                                                    name="end_time"
                                                                    id="end-time"
                                                                    label="Đến ngày:"
                                                                    value={date2}
                                                                    updateFormData={this.updateFormData}
                                                                    format={DATE_FORMAT}
                                                                    placeholder={DATE_FORMAT}
                                                                    required={true}
                                                                    //minDate={date1}
                                                                    disabled={isLoading}
                                                                />
                                                            </div>
                                                            <div className="col-md-12">
                                                                <CheckBoxMaterial
                                                                    label="Nghỉ có lương"
                                                                    name="type"
                                                                    checked={data.type == "pay"}
                                                                    onChange={this.updateFormData}
                                                                    disabled={isLoading}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="control-label">Ghi chú</label>
                                                            <div className="comment-input-wrapper">
                                                                <textarea
                                                                    id="textarea-card-comment"
                                                                    name="reason"
                                                                    onChange={this.updateFormData}
                                                                    value={data.reason}
                                                                    onKeyUp={() => { }}
                                                                    placeholder="Lý do xin nghỉ"
                                                                    className="comment-input"
                                                                    required
                                                                    style={{ width: "100%", margin: "10px", height: "165px", }}
                                                                    disabled={isLoading}
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
                                                                onClick={this.submitData} disabled={isLoading}
                                                            ><i className="material-icons">add</i>Yêu cầu</button>}

                                                        <button className="btn btn-fill" type="button" disabled={isCommitting}
                                                            onClick={this.exit}
                                                        ><i className="material-icons">cancel</i> Hủy</button>
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

CreateRequestVacationContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequestVacationContainer);

