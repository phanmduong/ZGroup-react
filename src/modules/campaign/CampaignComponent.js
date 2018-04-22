import React from 'react';
import Pagination from "../../components/common/Pagination";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TooltipButton from "../../components/common/TooltipButton";
import {bindActionCreators} from 'redux';
import * as campaignAction from "./campaignAction";
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";

class CampaignComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.campaignId = this.props.params.campaignId;
        this.state = {
            page: 1,
            query: ''
        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.showAddMessageModal2 = this.showAddMessageModal2.bind(this);
        this.templatesSearchChange = this.templatesSearchChange.bind(this);
    }

    templatesSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.campaignAction.loadAllMessage(
                this.campaignId,
                1,
                value
            );
        }.bind(this), 500);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.campaignAction.loadAllMessage(this.campaignId, page, this.state.query);
    }

    showAddMessageModal2(message) {
        this.props.campaignAction.showAddMessageModal();
        this.props.campaignAction.upMessage(message);
    }

    render() {
        let first = this.props.totalCountMessage ? (this.props.currentPageMessage - 1) * this.props.limitMessage + 1 : 0;
        let end = this.props.currentPageMessage < this.props.totalPagesMessage ? this.props.currentPageMessage * this.props.limitMessage : this.props.totalCountMessage;

        return (
            <div className="campaign-content">
                <div className="form-group is-empty">
                    <div className="flex-row flex">
                        <h5 className="card-title" style={{lineHeight: "0px"}}>
                            <strong>{this.props.campaignName}</strong>
                        </h5>
                        <div className="dropdown">
                            <button data-toggle="dropdown" aria-expanded="false"
                                    className="dropdown-toggle button-plus">
                                <i className="material-icons" style={{fontSize: "20px"}}>add</i>
                            </button>
                            <ul className="dropdown-menu dropdown-primary">
                                <li>
                                    <a onClick={() => this.showAddMessageModal2({sms_template_type_id: 1})}>
                                        Thêm tin</a>
                                </li>
                                <li>
                                    <a onClick={() => {
                                        this.props.campaignAction.showAddReceiverModal();
                                    }}>Thêm người nhận</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Search
                        onChange={this.templatesSearchChange}
                        value={this.state.query}
                        placeholder="Nhập tên hoặc nội dung tin nhắn để tìm"
                    />
                </div>
                <br/><br/><br/>
                {
                    this.props.isLoadingMessage ? <Loading/> :
                        (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-rose">
                                    <tr className="text-rose">
                                        <th>Tên tin nhắn</th>
                                        <th>Nội dung</th>
                                        <th>Số tin đã gửi</th>
                                        <th>Ngày gửi</th>
                                        <th>Tạm tính</th>
                                        <th>Loại tin nhắn</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.allMessage && this.props.allMessage.map((message, index) => {
                                            let a = message.name.slice(0, 15);
                                            let b = message.content.slice(0, 30);
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <TooltipButton placement="top"
                                                                       text={message.name}>
                                                            <b>{a.length < 15 ? a : a.concat("...")}</b>
                                                        </TooltipButton>
                                                    </td>
                                                    <td>
                                                        <TooltipButton placement="top"
                                                                       text={message.content}>
                                                            <div>{b.length < 30 ? b : b.concat("...")}</div>
                                                        </TooltipButton>
                                                    </td>
                                                    <td>
                                                        <TooltipButton placement="top"
                                                                       text={`${message.sent_quantity} tin nhắn đã gửi`}>
                                                            <div>
                                                                <h6>{message.sent_quantity}/{message.sent_quantity + message.needed_quantity}</h6>
                                                                <div className="progress progress-line-danger">
                                                                    <div className="progress-bar progress-bar-success"
                                                                         style={{
                                                                             width:
                                                                                 (message.sent_quantity === 0) ? 0 :
                                                                                     message.sent_quantity * 100 / (message.sent_quantity + message.needed_quantity)
                                                                                     // 12 * 100 / 22
                                                                                     + '%'
                                                                         }}/>
                                                                </div>
                                                            </div>
                                                        </TooltipButton>
                                                    </td>
                                                    <td>
                                                        {message.send_time}
                                                    </td>
                                                    <td>
                                                        <TooltipButton placement="top"
                                                                       text={`Ngân sách`}>
                                                            <div>
                                                                {message.sent_quantity * 750}vnđ
                                                            </div>
                                                        </TooltipButton>
                                                    </td>
                                                    <td>
                                                        <a className="campaign-message-type"  style={{backgroundColor:message.sms_template_type.color}}
                                                        >
                                                            <span>{message.sms_template_type.name.toUpperCase()}</span></a>

                                                    </td>
                                                    <td>
                                                        <div className="btn-group-action">
                                                            <div style={{display: "inline-block"}}>
                                                                <TooltipButton placement="top"
                                                                               text={`Sửa`}><a
                                                                    onClick={() => this.showAddMessageModal2({...message,sms_template_type_id: message.sms_template_type.id})}
                                                                >
                                                                    <i className="material-icons">edit</i>
                                                                </a></TooltipButton>
                                                            </div>
                                                            {/*Thao tác xóa tin nhắn*/}
                                                            {/*<TooltipButton placement="top"*/}
                                                            {/*text={`Xóa`}>*/}
                                                            {/*<a><i className="material-icons">delete</i>*/}
                                                            {/*</a></TooltipButton>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                }

                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCountMessage}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPagesMessage}
                            currentPage={this.props.currentPageMessage}
                            loadDataPage={this.loadOrders}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

CampaignComponent.propTypes = {
    isLoadingMessage: PropTypes.bool.isRequired,
    limitMessage: PropTypes.number.isRequired,
    currentPageMessage: PropTypes.number.isRequired,
    totalPagesMessage: PropTypes.number.isRequired,
    totalCountMessage: PropTypes.number.isRequired,
    campaignAction: PropTypes.object.isRequired,
    allMessage: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    campaignName: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        allMessage: state.smsCampaign.allMessage,
        totalPagesMessage: state.smsCampaign.totalPagesMessage,
        totalCountMessage: state.smsCampaign.totalCountMessage,
        currentPageMessage: state.smsCampaign.currentPageMessage,
        limitMessage: state.smsCampaign.limitMessage,
        isLoadingMessage: state.smsCampaign.isLoadingMessage,
        campaignName:state.smsCampaign.campaignName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        campaignAction: bindActionCreators(campaignAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignComponent);