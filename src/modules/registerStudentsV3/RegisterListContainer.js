import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import Search from "../../components/common/Search";
import Select from "../registerStudents/SelectGen";
import CreateRegisterOverlay from "../infoStudent/overlays/CreateRegisterOverlay";
import RegisterList from "./RegisterList";
import {store} from "./store/RegisterListStore";
import Pagination from "../../components/common/Pagination";
import DateRangePicker from "../../components/common/DateTimePicker";
import moment from "moment";
import {
    appendJsonToWorkBook,
    isEmptyInput,
    newWorkBook,
    objectEntries,
    saveWorkBookToExcel,
    showErrorNotification,
    showWarningNotification
} from "../../helpers/helper";
import {Modal, Panel} from 'react-bootstrap';
import ItemReactSelect from "../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import FormInputDate from "../../components/common/FormInputDate";
import {loadRegisters} from "./registerListApi";
import {
    DATETIME_FILE_NAME_FORMAT,
    DATETIME_FORMAT_SQL,
    REGISTER_EXPORT_FIELDS_OBJECT,
    TYPE_CLASSES_OBJECT
} from "../../constants/constants";
import {getValueFromKey} from "../../helpers/entity/object";

// const register_statuses = [
//     {
//         text: 'Chưa đóng tiền',
//         id: 0,
//         color: '#ffffff',
//     },
//     {
//         text: 'Đã nộp tiền',
//         id: 1,
//         color: '#dff0d8',
//     },
//     {
//         text: 'Danh sách chờ',
//         id: 2,
//         color: '#fcf8e3',
//     },
//     {
//         text: 'Đã học xong',
//         id: 5,
//         color: '#8c8c8c',
//     },
//     {
//         text: 'Đã hoàn tiền',
//         id: 6,
//         color: '#c5e2ec',
//     },
// ];

@observer
class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openFilterPanel: false,
            showLoadingModal: false,
            selectedExportFields: REGISTER_EXPORT_FIELDS_OBJECT,
        };
        this.tabViews = [
            {
                text: 'Tất cả đăng kí',
                value: '',
                label: "Tất cả đăng kí"
            },
            {
                value: this.props.user.id,
                label: "Đăng kí của bạn",
                text: 'Đăng kí của bạn',
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
            if(!isEmptyInput(store.filter.search)){
                store.filter.gen_id = '';
                store.filter.start_time = moment().subtract(10,'years');
                store.filter.end_time = moment();
            }
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
        if (store.isLoading) return;
        store.filter = {...store.filter, start_time, end_time, gen_id: 0};
    };

    applyFilter = () => {
        if (store.isLoading) {
            showWarningNotification('Dữ liệu đang tải, vui lòng chờ.');
        } else {
            store.loadRegisters();
        }
    };
    showExportFieldsModal = () => {
        this.setState({
            showExportFieldsModal: true,
            selectedExportFields: REGISTER_EXPORT_FIELDS_OBJECT,
        });
        setTimeout(() => {
            $.material.init();
        }, 800);

    };

    showLoadingModal = () => {
        this.setState({showLoadingModal: true, showExportFieldsModal: false});
        let filter = store.solveFilter();
        filter.limit = -1;
        loadRegisters(filter).then(res => {
            this.setState({showLoadingModal: false});
            this.exportData(res.data.items);
        });
    };

    renderFieldExport = (field, father) => {
        let hasChildrens = field.children ? true : false;

        return (
            <div style={{marginLeft: father ? 30 : ''}}>
                <div className="panel panel-default">
                    <div className="panel-heading flex flex-space-between" role="tab"
                         id={'heading-tab' + field.id}>
                        <div className="checkbox none-margin" color="success">
                            <label type="normal">
                                <input type="checkbox" color="primary" checked={field.checked ? true : false}
                                       onChange={() => this.onChangeFieldExport(father ? father.id : null, field.id)}/>
                                <span>&nbsp;&nbsp;&nbsp;{field.name}</span>
                            </label>
                        </div>
                        {hasChildrens &&
                        <a role="button" data-toggle="collapse" data-parent="#accordion"
                           aria-expanded="false"
                           aria-controls={'tab-role' + field.id}
                           href={'#tab-role' + field.id}
                           style={{marginTop: 12}}
                        >
                            <div className="panel-title" style={{width: '100%'}}>
                                <i className="material-icons">keyboard_arrow_down</i>
                            </div>
                        </a>}
                    </div>
                    {hasChildrens &&
                    <div id={"tab-role" + field.id} className="panel-collapse collapse"
                         role="tabpanel"
                         aria-labelledby={'heading-tab' + field.id}>
                        <div className="panel-body">
                            {field.children.map(field2 => this.renderFieldExport(field2, field))}
                        </div>
                    </div>}
                </div>
            </div>);
    };

    onChangeFieldExport = (father_id, field_id) => {
        let {selectedExportFields} = this.state;
        if (father_id) {
            selectedExportFields[father_id].children = selectedExportFields[father_id].children.map(c => {
                if (c.id == field_id) c.checked = !c.checked;
                return c;
            });
            let anyChildChecked = selectedExportFields[father_id].children.filter(c => c.checked).length > 0;
            selectedExportFields[father_id].checked = anyChildChecked;
        } else {
            let checked = !selectedExportFields[field_id].checked;
            selectedExportFields[field_id].checked = checked;
            if (selectedExportFields[field_id].children) {
                selectedExportFields[field_id].children = selectedExportFields[field_id].children.map(c => {
                    c.checked = checked;
                    return c;
                });
            }
        }
        this.setState({selectedExportFields});
    };
    exportData = (registers) => {
        console.log(registers);

        if (!registers || registers.length == 0) {
            showErrorNotification("Không có dữ liệu");
            return;
        }

        let {selectedExportFields} = this.state;

        let json = registers.map((item, index) => {
            if (item) {
                /* eslint-disable */
                let mock_exams_text = '';
                if (item.mock_exams) {
                    item.mock_exams.forEach((ex, ex_index) => {
                        if (ex_index > 0) mock_exams_text += '\n';
                        if (ex.type) mock_exams_text += 'Loại: ' + ex.type;
                        if (ex.score) mock_exams_text += ' - Điểm: ' + ex.score;
                        if (ex.time) mock_exams_text += ' - Giờ: ' + ex.time;
                        if (ex.date) mock_exams_text += ' - Ngày: ' + ex.date;
                        if (ex.note) mock_exams_text += ' - Ghi chú: ' + ex.note;
                        if (ex.course) mock_exams_text += ' - Môn: ' + ex.course.name;

                    });
                }

                item = {
                    ...item,
                    stt: index + 1,
                    tele_call: item.tele_call ? item.tele_call : {call_status_text: 'Chưa gọi'},
                    studyClass: item.studyClass ? {
                        ...item.studyClass,
                        type: TYPE_CLASSES_OBJECT[item.studyClass.type]
                    } : {name: 'Không có', type: 'null'},
                    how_know: item.how_know ? item.how_know : 'Không có',
                    dob: item.dob ? item.dob : 'Không có',
                    district: item.district ? item.district : 'Không có',
                    course: item.course ? item.course : {name: 'Không có'},
                    base: item.base ? {name: `${item.base.name} ${item.base.address}`} : {name: 'Không có'},
                    province: (item.base && item.base.district && item.base.district.province) ? item.base.district.province.name : 'Không có',
                    source: item.source ? item.source : {name: 'Không có'},
                    saler: item.saler ? item.saler : {name: 'Không có'},
                    marketing_campaign: item.marketing_campaign ? item.marketing_campaign : {name: 'Không có'},
                    student: item.student ? item.student : {name: 'Không có', email: 'Không có', phone: 'Không có'},
                    mock_exams_text,
                };

                let res = {
                    // 'STT': index + 1,
                    // 'Lớp': item.studyClass.name,
                    // 'Loại lớp': TYPE_CLASSES_OBJECT[item.studyClass.type],
                    // 'Môn học': item.course.name,
                    // 'Gọi': item.tele_call.call_status_text,
                    // 'Họ tên': item.student.name,
                    // 'Email': item.student.email,
                    // 'Phone': item.student.phone,
                    // 'Thành phố': item.province,
                    // 'Mã thẻ': item.code,
                    // 'Học phí': item.money,
                    // 'Saler': item.saler.name,
                    // 'Chiến dịch': item.marketing_campaign.name,
                    // 'Cơ sở': `${item.base.name} ${item.base.address}`,
                    // 'Nguồn': item.source.name,
                    // 'Cách tiếp cận': item.how_know,
                    // 'Ngày đăng kí': item.created_at,
                    // 'Thi thử': mock_exams_text,
                };
                objectEntries(selectedExportFields).map(key => {
                    let field = selectedExportFields[key];
                    if (field.checked) {
                        res[field.name] = getValueFromKey(item, field.id);
                    }

                });
                /* eslint-enable */
                return res;
            }
        });
        let wb = newWorkBook();
        appendJsonToWorkBook(json, wb, 'Danh sách');

        let startTime = moment(store.filter.start_time, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(store.filter.end_time, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);

        saveWorkBookToExcel(wb,
            'Danh sách đăng kí' +
            `${isEmptyInput(store.filter.start_time) ? '' : (' - ' + startTime)}` +
            `${isEmptyInput(store.filter.end_time) ? '' : (' - ' + endTime)}`
        );
    };

    render() {
        let {filter, filter_data, isLoading, paginator} = store;
        console.log(filter);
        return (
            <div className="margin-top-10">
                <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                    {this.tabViews.map((tab, key) => {
                        let className = tab.value == store.filter.saler_id ? 'active' : '';
                        return (<li className={className} key={key}
                                    onClick={() => this.changeTabView(tab)}
                        >
                            <a style={{
                                borderRadius: 5,
                                textTransform: 'none',
                                margin: 0,
                                padding: '10px 20px'
                            }}>{tab.text}</a>
                        </li>);
                    })}
                </ul>
                <div className="flex flex-space-between">
                    <div className="flex flex-wrap tool-bar-actions">
                        <CreateRegisterOverlay
                            onSuccess={() => {
                                store.loadRegisters();
                            }}
                            children={
                                <button
                                    className="btn btn-icon button-green"
                                    style={{padding: "12px 15px", height: 42, margin: '10px 10px 0 0', borderRadius: 5}}
                                ><span className="material-icons">add_circle</span>&nbsp;&nbsp;&nbsp;&nbsp;Tạo đăng kí
                                    mới
                                </button>
                            }
                        />
                        <Search
                            onChange={this.registersSearchChange}
                            value={filter.search}
                            placeholder="Tìm kiếm học viên"
                            className="white-seacrh margin-right-10 min-width-200-px form-group-none-padding"
                            onSearch={this.onSearchRegisters}
                            disabled={isLoading}
                        />
                        <button
                            onClick={this.openFilterPanel}
                            className="btn btn-white btn-icon"
                            style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                        ><span className="material-icons">filter_alt</span>&nbsp;&nbsp;&nbsp;&nbsp;Lọc
                        </button>
                        <Select
                            options={filter_data.gens}
                            onChange={(e) => {
                                store.onChangeFilter('gen_id', e);
                                store.loadRegisters();
                            }}
                            value={filter.gen_id}
                            defaultMessage="Chọn giai đoạn"
                            name="gen_id"
                            disabled={isLoading}
                            wrapClassName="margin-right-10 react-select-white-light-round"
                            className="btn btn-white"
                            id="select-gen-register-list"
                        />
                        <a
                            onClick={this.showExportFieldsModal}
                            className="btn btn-white btn-icon"
                            style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                            disabled={isLoading}
                        ><span className="material-icons">get_app</span>&nbsp;&nbsp;&nbsp;&nbsp;Tải xuống
                        </a>
                    </div>
                    <div></div>
                </div>

                <Panel collapsible className="none-margin" expanded={
                    this.state.openFilterPanel
                    &&
                    !(isLoading)
                }>
                    <div className="card-filter" style={{borderRadius: 5}}>

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
                                    <ReactSelect.Async menuContainerStyle={{zIndex: 11}}
                                                       loadOptions={(p1, p2) => store.loadStaffs(p1, p2, 'salers')}
                                                       loadingPlaceholder="Đang tải..."
                                                       className="cursor-pointer margin-bottom-20"
                                                       placeholder="Chọn nhân viên"
                                                       searchPromptText="Không có dữ liệu"
                                                       onChange={(e) => store.onChangeFilter('saler_id', e)}
                                                       value={filter.saler}
                                                       id="select-async-importer"
                                                       disabled={isLoading}
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
                                <label>Môn học/Chương trình học</label>
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                    <ReactSelect.Async menuContainerStyle={{zIndex: 11}}
                                                       loadOptions={(p1, p2) => store.searchClasses(p1, p2)}
                                                       loadingPlaceholder="Đang tải..."
                                                       className="cursor-pointer margin-bottom-20"
                                                       placeholder="Chọn lớp học"
                                                       searchPromptText="Không có dữ liệu"
                                                       onChange={(e) => store.onChangeFilter('class_id', e)}
                                                       value={filter.class}
                                                       id="select-async-class"
                                                       disabled={isLoading}
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
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="col-md-3">
                                {/*<Search*/}
                                {/*    onChange={(e) => store.onChangeFilter('search_coupon', e)}*/}
                                {/*    value={filter.search_coupon}*/}
                                {/*    label="Tìm kiếm theo coupon"*/}
                                {/*    placeholder="Nhập coupon"*/}
                                {/*    disabled={isLoading}*/}
                                {/*/>*/}
                                <label>Tìm kiếm theo coupon</label>
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
                                             disabled={isLoading}
                                             options={filter_data.coupons}
                                             onChange={(e) => store.onChangeFilter('coupon_id', e)}
                                             value={filter.coupon_id}
                                             defaultMessage="Chọn coupon"
                                             name="coupon_id"
                                />
                            </div>
                            <div className="col-md-3">
                                <Search
                                    onChange={(e) => store.onChangeFilter('search_note', e)}
                                    value={filter.search_note}
                                    label="Tìm kiếm theo note"
                                    placeholder="Nhập note"
                                    disabled={isLoading}
                                />
                            </div>

                        </div>
                        <div className="row">

                            <div className="col-md-3">
                                <label className="">
                                    Đánh dấu
                                </label>
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
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
                                <ReactSelect menuContainerStyle={{zIndex: 11}}
                                             disabled={isLoading}
                                             options={filter_data.marketing_campaigns}
                                             onChange={(e) => store.onChangeFilter('campaign_id', e.id)}
                                             value={filter.campaign_id}
                                             defaultMessage="Chọn chiến dịch"
                                             name="campaign"
                                />
                            </div>

                            <div className="col-xs-12">
                                <div className="flex flex-end">
                                    <div className="btn btn-white"
                                         onClick={store.resetFilters}
                                         style={{"margin-rigth": "5px",}} disabled={isLoading}
                                    >
                                        Xóa bộ lọc
                                    </div>
                                    {/*<div className="btn button-green"*/}
                                    {/*     onClick={this.copyShareUrl}>Sao chép đường dẫn*/}
                                    {/*</div>*/}
                                    <div className="btn button-green" disabled={isLoading}
                                         onClick={this.applyFilter}>Áp dụng
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className="row">*/}
                        {/*    {register_statuses.map((register_status, key) => {*/}
                        {/*        return (*/}
                        {/*            <div className="col-sm-4" key={key}>*/}
                        {/*                <div className="flex">*/}
                        {/*                    <div*/}
                        {/*                        style={{*/}
                        {/*                            background: register_status.color,*/}
                        {/*                            border: 'solid 1px',*/}
                        {/*                            height: '15px',*/}
                        {/*                            width: '30px',*/}
                        {/*                            margin: '3px 10px'*/}
                        {/*                        }}/>*/}
                        {/*                    <p>{register_status.text}</p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</div>*/}
                    </div>
                </Panel>


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
                <Modal
                    show={this.state.showLoadingModal}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showExportFieldsModal}
                    onHide={() => this.setState({showExportFieldsModal: false})}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="card-title">
                            Xuất dữ liệu (Export)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-grey">
                            {objectEntries(this.state.selectedExportFields).map(key => {
                                // console.log(field);
                                let field = this.state.selectedExportFields[key];
                                return this.renderFieldExport(this.state.selectedExportFields[field.id]);
                            })}
                            <div className="flex flex-end">
                                <button type="button"
                                        disabled={this.props.isLoading}
                                        className="btn btn-white text-center"
                                        data-dismiss="modal"
                                        onClick={() => this.setState({showExportFieldsModal: false})}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success text-center btn-icon"
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={() => this.showLoadingModal()}>
                                    <span className="material-icons margin-right-5">vertical_align_bottom</span> Tải
                                    xuống

                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
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
