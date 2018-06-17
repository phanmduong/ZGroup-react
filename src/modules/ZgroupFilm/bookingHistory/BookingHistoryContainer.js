import React from "react";
import BookingHistoryComponent from "./BookingHistoryComponent";
import TooltipButton from "../../../components/common/TooltipButton";
import Search from "../../../components/common/Search";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import {connect} from "react-redux";
import * as bookingHistoryAction from "./bookingHistoryAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

class BookingHistoryContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.bookingHistoryAction.getBookingHistory();
    }
    render(){
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Lịch sử đặt vé</strong>
                            </h4>
                            <div>
                                <TooltipButton
                                    placement="top"
                                    text="Lọc">
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                        }}>
                                        <i className="material-icons" style={{margin: "0px -4px", top: 0}}>
                                            filter_list
                                        </i>
                                    </button>
                                </TooltipButton>
                            </div>
                        </div>


                        <Search
                            onChange={() => {
                            }}
                            value={""}
                            placeholder="Nhập tên, email, số điện thoại để tìm kiếm"
                        />
                        <br/>

                    </div>
                    <div>
                        {
                            this.props.isLoadingBookingHistory ? <Loading/> :
                                <BookingHistoryComponent/>
                        }

                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {1}
                                    - {3}/{7}</b><br/>
                                <Pagination
                                    totalPages={7}
                                    currentPage={5}
                                    loadDataPage={() => {
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BookingHistoryContainer.propTypes = {
    isLoadingBookingHistory: PropTypes.bool.require,
    bookingHistoryAction: PropTypes.object.require,
};

function mapStateToProps(state) {
    return {
        isLoadingBookingHistory: state.bookingHistory.isLoadingBookingHistory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookingHistoryAction: bindActionCreators(bookingHistoryAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingHistoryContainer);