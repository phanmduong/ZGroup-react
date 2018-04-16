import React from 'react';
import Pagination from "../../components/common/Pagination";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddMessageModal from "./AddMessageModal";
import AddReceiverModal from "./AddReceiverModal";
import {bindActionCreators} from 'redux';
import TooltipButton from "../../components/common/TooltipButton";
import OverlappedCircles from "../../components/common/OverlappedCircles";
import * as campaignAction from "./campaignAction";
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";


class ReceiversComponent extends React.Component {
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

    showAddMessageModal2(message) {
        this.props.campaignAction.showAddMessageModal();
        this.props.campaignAction.upMessage(message);
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
            this.props.campaignAction.loadAllReceiver(
                this.campaignId,
                1,
                value
            );
        }.bind(this), 500);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.campaignAction.loadAllReceiver(this.campaignId, page, this.state.query);
    }

    render() {
        let first = this.props.totalCountReceiver ? (this.props.currentPageReceiver - 1) * this.props.limitReceiver + 1 : 0;
        let end = this.props.currentPageReceiver < this.props.totalPagesReceiver ? this.props.currentPageReceiver * this.props.limitReceiver : this.props.totalCountReceiver;

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
                                    <a onClick={() => this.showAddMessageModal2({sms_template_type_id: 1})}>Thêm tin</a>
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
                    this.props.isLoadingReceiver ? <Loading/> :
                        (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-rose">
                                    <tr className="text-rose">
                                        <th/>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Số tin đã gửi</th>
                                        <th>Đã đóng tiền</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.allReceiver && this.props.allReceiver.map((receiver, index) => {
                                            let paid_img = receiver.paid_money.map((paid)=>{
                                                return paid.image_url;
                                            });
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            <img className="circle-avatar"
                                                                 src={receiver.avatar_url}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <b>{receiver.name}</b>
                                                    </td>
                                                    <td>
                                                        {receiver.email}
                                                    </td>
                                                    <td>
                                                        <span style={{width: "120px"}}>{receiver.phone}</span>
                                                        &ensp;
                                                        <span>
                                                            <img style={{height: "20px"}}
                                                            src="data:image/png;base64,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"/>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <TooltipButton placement="top"
                                                                       text={`${receiver.sent_quantity} tin nhắn đã gửi`}>
                                                            <div>
                                                                <h6>{receiver.sent_quantity}/{receiver.sent_quantity + this.props.campaign_needed_quantity}</h6>
                                                                <div className="progress progress-line-danger">
                                                                    <div className="progress-bar progress-bar-success"
                                                                         style={{
                                                                             width:
                                                                                 (receiver.sent_quantity === 0) ? 0 :
                                                                                     receiver.sent_quantity * 100 / (receiver.sent_quantity + this.props.campaign_needed_quantity)
                                                                                     // 12 * 100 / 22
                                                                                     + '%'
                                                                         }}/>
                                                                </div>
                                                            </div>
                                                        </TooltipButton>
                                                    </td>
                                                    <td>
                                                        <OverlappedCircles
                                                            circles={paid_img}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="btn-group-action">
                                                            <div style={{display: "inline-block"}}>
                                                                <TooltipButton placement="top"
                                                                               text="Xem chi tiết">
                                                                    <a><i className="material-icons">add_circle</i>
                                                                    </a>
                                                                </TooltipButton>
                                                            </div>
                                                            <TooltipButton placement="top"
                                                                           text="Sửa">
                                                                <a><i className="material-icons">edit</i></a>
                                                            </TooltipButton>
                                                            <TooltipButton placement="top"
                                                                           text="Xóa">
                                                                <a><i className="material-icons">delete</i>
                                                                </a>
                                                            </TooltipButton>
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
                <AddReceiverModal/>
                <AddMessageModal
                    campaignId={this.props.params.campaignId}/>
                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCountReceiver}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPagesReceiver}
                            currentPage={this.props.currentPageReceiver}
                            loadDataPage={this.loadOrders}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReceiversComponent.propTypes = {
    isLoadingReceiver: PropTypes.bool.isRequired,
    limitReceiver: PropTypes.number.isRequired,
    currentPageReceiver: PropTypes.number.isRequired,
    totalPagesReceiver: PropTypes.number.isRequired,
    totalCountReceiver: PropTypes.number.isRequired,
    campaignAction: PropTypes.object.isRequired,
    allReceiver: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    campaignName: PropTypes.string.isRequired,
    campaign_needed_quantity: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        allReceiver: state.smsCampaign.allReceiver,
        totalPagesReceiver: state.smsCampaign.totalPagesReceiver,
        totalCountReceiver: state.smsCampaign.totalCountReceiver,
        currentPageReceiver: state.smsCampaign.currentPageReceiver,
        limitReceiver: state.smsCampaign.limitReceiver,
        isLoadingReceiver: state.smsCampaign.isLoadingReceiver,
        campaignName: state.smsCampaign.campaignName,
        campaign_needed_quantity:state.smsCampaign.campaign_needed_quantity,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        campaignAction: bindActionCreators(campaignAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiversComponent);