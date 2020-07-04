import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import Search from "../../components/common/Search";
import Select from "../registerStudents/SelectGen";
import CreateRegisterOverlay from "../infoStudent/overlays/CreateRegisterOverlay";
import RegisterList from "./RegisterList";
import {store} from "./RegisterListStore";
import Pagination from "../../components/common/Pagination";
import DateRangePicker from "../../components/common/DateTimePicker";
import {showWarningNotification} from "../../helpers/helper";
import {Panel} from 'react-bootstrap';
import ItemReactSelect from "../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import FormInputDate from "../../components/common/FormInputDate";


@observer
class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openFilterPanel: false
        };
        this.tabViews = [
            {
                text: 'TẤT CẢ',
                value: '',
                label: "TẤT CẢ"
            },
            {
                value: this.props.user.id,
                label: "CỦA BẠN",
                text: 'CỦA BẠN',
            },
        ];
    }

    componentDidMount() {
        store.loadFilterData();
        store.loadRegisters();

    }

    registersSearchChange = (e) => {
        store.filter.search = e;
    };

    onSearchRegisters = () => {
        if (!store.isLoading) {
            store.loadRegisters();
        }

    };

    changeGens = () => {

    };

    openFilterPanel = () => {
        this.setState({openFilterPanel: !this.state.openFilterPanel});
    };

    changeTabView = (tab) => {
        if (!store.isLoading) {
            store.filter.saler_id = tab.value;
            store.loadRegisters();
        }
    };

    changeDateRangePicker = (start_time, end_time) => {
        store.filter = {...store.filter, start_time, end_time, gen_id: 0};
    };

    applyFilter = () => {
        if (store.isLoading) {
            showWarningNotification('Dữ liệu đang tải, vui lòng chờ.');
        } else {
            store.loadRegisters();
        }
    };

    render() {
        let {filter, filter_data, isLoading, paginator} = store;

        return (
            <div className="container-fluid">
                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="flex-row flex">
                                    <h2 className="card-title">
                                        <strong>Danh sách đăng kí</strong>
                                    </h2>
                                </div>
                                <div>
                                    <a
                                        onClick={this.showLoadingModal}
                                        className="text-white"
                                        disabled={false}
                                    >Tải xuống</a>
                                </div>
                                <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                    <Search
                                        onChange={this.registersSearchChange}
                                        value={filter.search}
                                        placeholder="Tìm kiếm học viên"
                                        className="round-white-seacrh"
                                        onSearch={this.onSearchRegisters}
                                    />
                                    <button
                                        onClick={this.openFilterPanel}
                                        className="btn btn-white btn-round btn-icon"
                                        disabled={false}
                                    >Lọc
                                    </button>
                                    <Select
                                        options={filter_data.gens}
                                        onChange={(e) => {
                                            store.onChangeFilter('gen_id', e);
                                            store.loadRegisters();
                                        }}
                                        value={filter.gen_id}
                                        defaultMessage="Chọn khóa học"
                                        name="gen_id"
                                    />
                                    <CreateRegisterOverlay
                                        className="btn btn-white btn-round btn-icon"
                                        onSuccess={() => {
                                        }}
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <Panel collapsible expanded={
                    this.state.openFilterPanel
                    &&
                    !(isLoading)
                }>
                    <div className="card-filter">

                        <div className="row">

                            <div className="col-md-3">
                                <label>Thời gian</label>
                                <DateRangePicker
                                    className="cursor-pointer Select-control"
                                    start={filter.start_time} end={filter.end_time}
                                    style={{padding: '5px 10px 5px 10px', lineHeight: '26px'}}
                                    onChange={this.changeDateRangePicker}
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="form-group none-padding">
                                    <label>Saler</label>
                                    <ReactSelect.Async
                                        loadOptions={(p1, p2) => store.loadStaffs(p1, p2, 'salers')}
                                        loadingPlaceholder="Đang tải..."
                                        className="cursor-pointer margin-bottom-20"
                                        placeholder="Chọn nhân viên"
                                        searchPromptText="Không có dữ liệu"
                                        onChange={(e) => store.onChangeFilter('saler_id', e)}
                                        value={filter.saler}
                                        id="select-async-importer"
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label>Môn học</label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.courses}
                                    onChange={(e) => store.onChangeFilter('course_id', e)}
                                    value={filter.course_id}
                                    defaultMessage="Chọn môn"
                                    name="course_id"
                                />
                            </div>

                            <div className="col-md-3">
                                <div className="form-group none-padding">
                                    <label>Lớp học</label>
                                    <ReactSelect.Async
                                        loadOptions={(p1, p2) => store.searchClasses(p1, p2)}
                                        loadingPlaceholder="Đang tải..."
                                        className="cursor-pointer margin-bottom-20"
                                        placeholder="Chọn lớp học"
                                        searchPromptText="Không có dữ liệu"
                                        onChange={(e) => store.onChangeFilter('class_id', e)}
                                        value={filter.class_id}
                                        id="select-async-class"
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-3">
                                <label className="">
                                    Học phí
                                </label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.pay_statuses}
                                    onChange={(e) => store.onChangeFilter('pay_status', e)}
                                    value={filter.pay_status}
                                    defaultMessage="Tuỳ chọn"
                                    name="pay_status"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="">
                                    Trạng thái lớp
                                </label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.class_statuses}
                                    onChange={(e) => store.onChangeFilter('class_status', e)}
                                    value={filter.class_status}
                                    defaultMessage="Tuỳ chọn"
                                    name="class_status"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="">
                                    Trạng thái gọi
                                </label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.tele_call_statuses}
                                    onChange={(e) => store.onChangeFilter('tele_call_status', e)}
                                    value={filter.tele_call_status}
                                    defaultMessage="Tuỳ chọn"
                                    name="tele_call_status"
                                />
                            </div>
                            <div className="col-md-3">
                                <FormInputDate
                                    label="Ngày hẹn nộp tiền"
                                    name="appointment_payment"
                                    updateFormData={(e) => store.onChangeFilter('appointment_payment', e)}
                                    id="form-appointment-payment"
                                    value={filter.appointment_payment}
                                    clearable
                                />
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-3">
                                <FormInputDate
                                    label="Hẹn ngày test"
                                    name="date_test"
                                    updateFormData={(e) => store.onChangeFilter('date_test', e)}
                                    id="form-date-test"
                                    value={filter.date_test}
                                    clearable
                                />
                            </div>
                            <div className="col-md-3">
                                <FormInputDate
                                    label="Hẹn gọi lại"
                                    name="call_back_time"
                                    updateFormData={(e) => store.onChangeFilter('call_back_time', e)}
                                    id="form-call_back_time"
                                    value={filter.call_back_time}
                                    clearable
                                />
                            </div>
                            <div className="col-md-3">
                                <Search
                                    onChange={(e) => store.onChangeFilter('search_coupon', e)}
                                    value={filter.search_coupon}
                                    label="Tìm kiếm theo coupon"
                                    placeholder="Nhập coupon"
                                />
                            </div>
                            <div className="col-md-3">
                                <Search
                                    onChange={(e) => store.onChangeFilter('search_note', e)}
                                    value={filter.search_note}
                                    label="Tìm kiếm theo note"
                                    placeholder="Nhập note"
                                />
                            </div>

                        </div>
                        <div className="row">

                            <div className="col-md-3">
                                <label className="">
                                    Đánh dấu
                                </label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.bookmarks}
                                    onChange={(e) => store.onChangeFilter('bookmark', e)}
                                    value={filter.bookmark}
                                    defaultMessage="Tuỳ chọn"
                                    name="bookmark"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="">
                                    Theo trạng thái
                                </label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.register_statuses}
                                    onChange={(e) => store.onChangeFilter('register_status_id', e)}
                                    value={filter.register_status_id}
                                    defaultMessage="Tuỳ chọn"
                                    name="register_status_id"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="">
                                    Theo nguồn
                                </label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.sources}
                                    onChange={(e) => store.onChangeFilter('source_id', e)}
                                    value={filter.source_id}
                                    defaultMessage="Tuỳ chọn"
                                    name="source_id"
                                />
                            </div>

                            <div className="col-md-3">
                                <label>Chiến dịch</label>
                                <ReactSelect
                                    disabled={isLoading}
                                    options={filter_data.marketing_campaigns}
                                    onChange={(e) => store.onChangeFilter('campaign_id', e.id)}
                                    value={filter.campaign_id}
                                    defaultMessage="Chọn chiến dịch"
                                    name="campaign"
                                />
                            </div>

                            <div className="col-md-12">
                                <div className="flex flex-end">
                                    <div className="btn button-green btn-warning" onClick={store.resetFilters}
                                         style={{"margin-rigth": "5px",}}
                                    >
                                        Xóa bộ lọc
                                    </div>
                                    {/*<div className="btn button-green"*/}
                                    {/*     onClick={this.copyShareUrl}>Sao chép đường dẫn*/}
                                    {/*</div>*/}
                                    <div className="btn button-green"
                                         onClick={this.applyFilter}>Áp dụng
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </Panel>
                <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                    {this.tabViews.map((tab, key) => {
                        let className = tab.value == store.filter.saler_id ? 'active' : '';
                        return (<li className={className} key={key}
                                    onClick={() => this.changeTabView(tab)}
                        >
                            <a>{tab.text}</a>
                        </li>);
                    })}
                </ul>

                <div>
                    {isLoading && <Loading/>}
                    {!isLoading && <RegisterList/>}
                </div>
                <div>
                    {!isLoading &&
                    <Pagination currentPage={paginator.current_page} totalPages={paginator.total_pages}
                                loadDataPage={(page) => {
                                    store.filter.page = page;
                                    store.loadRegisters();
                                }}/>}
                </div>
            </div>

        );
    }
}

RegisterListContainer.propTypes = {
    params: PropTypes.object,

};

function mapStateToProps(state) {
    return {
        user: state.login.user,

    };
}

export default connect(mapStateToProps)(RegisterListContainer);
