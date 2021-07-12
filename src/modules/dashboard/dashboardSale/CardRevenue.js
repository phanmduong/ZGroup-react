import React from 'react';
import {observer} from 'mobx-react';
import cardRevenueStore from "./cardRevenueStore";
import Loading from "../../../components/common/Loading";
import filterStore from "./filterStore";
import {convertDotMoneyToK, dotNumber} from "../../../helpers/helper";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import {isEmpty, removeObservable} from "../../../helpers/entity/mobx";

@observer
class CardRevenue extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        if (isEmpty(removeObservable(cardRevenueStore.data)))
            cardRevenueStore.analyticsRevenue(filter);
    }


    render() {
        const {isLoading, data} = cardRevenueStore;
        return (
            <div className="row gutter-20">
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Doanh thu</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{convertDotMoneyToK(dotNumber(data.revenue))}</h3>
                                </div>
                            }
                            <div
                                onClick={() => filterStore.openLinkRegister({money_filter: 1},'payment')}
                                className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Doanh thu hôm nay</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{convertDotMoneyToK(dotNumber(data.revenue_today))}</h3>
                                    <div className="card-tag margin-left-5">
                                        {data.total_paid_register_today} đơn
                                    </div>
                                </div>
                            }
                            <div
                                onClick={() => filterStore.openLinkRegister({money_filter: 1}, 'payment')}
                                className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Số đơn đã hoàn thành</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{dotNumber(data.total_paid_register)}/{dotNumber(data.total_register)}</h3>
                                    <div className="card-tag margin-left-5">
                                        {Math.round(data.total_paid_register * 100 / data.total_register)}%
                                    </div>
                                </div>
                            }
                            <div
                                onClick={() => filterStore.openLinkRegister({money_filter: 1})}
                                className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>
                {/*<div className="col-md-3 col-sm-6">*/}
                {/*    <div className="card margin-bottom-20 margin-top-0">*/}
                {/*        <div className="card-content text-align-left">*/}
                {/*            <p className="category">Đơn chưa đóng tiền</p>*/}
                {/*            {isLoading ? <Loading style={{marginTop: 0}}/> :*/}
                {/*                <div className="flex flex-row flex-align-items-center">*/}
                {/*                    <h3 className="card-title">{convertDotMoneyToK(dotNumber(data.revenue_waiting))}</h3>*/}
                {/*                    <div className="card-tag margin-left-5">*/}
                {/*                        {data.total_register_revenue_waiting} đơn*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*            <div*/}
                {/*                onClick={() => filterStore.openLinkRegister({money_filter: '0'})}*/}
                {/*                className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">*/}
                {/*                Xem chi tiết*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Số đơn 0đ</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{data.total_zero_money_register}</h3>
                                </div>
                            }
                            <div
                                onClick={() => filterStore.openLinkRegister({money_filter: '0'})}
                                className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CardRevenue;
