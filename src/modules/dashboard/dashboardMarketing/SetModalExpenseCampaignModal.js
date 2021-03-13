import React from 'react';
import {observer} from 'mobx-react';
import {Modal} from "react-bootstrap";
import setExpenseCampaignStore from "./setExpenseCampaignStore";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import moment from "moment";
import DateRangePicker from "../../../components/common/DateTimePicker";
import {dotNumber, showTypeNotification} from "../../../helpers/helper";
// import BarChartFilterDate from "../BarChartFilterDate";
import {DATE_FORMAT, DATE_FORMAT_SQL} from "../../../constants/constants";
import {store} from "./DashBoardMarketingStore";

// const optionsBar = {
//     tooltips: {
//         callbacks: {
//             label: function (tooltipItem, data) {
//                 let label = data.datasets[tooltipItem.datasetIndex].label || '';
//
//                 if (label) {
//                     label += ': ';
//                 }
//                 label += `${dotNumber(Math.round(tooltipItem.value))}đ`;
//                 return label;
//             }
//         }
//     },
//     legend: {
//         display: true,
//         position: "bottom"
//     }
// };

@observer
class SetModalExpenseCampaignModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    toggleModal = () => {
        setExpenseCampaignStore.showModal = !setExpenseCampaignStore.showModal;
    }

    onChangeGen = (value) => {
        const gen_id = value ? value.value : 0;

        if (value) {
            setExpenseCampaignStore.formData.start_time = moment(value.start_time);
            setExpenseCampaignStore.formData.end_time = moment(value.end_time);
        }

        setExpenseCampaignStore.formData = {...setExpenseCampaignStore.formData, gen_id};
    }

    changeDateRangePicker = (start_time, end_time) => {
        setExpenseCampaignStore.formData = {...setExpenseCampaignStore.formData, start_time, end_time, gen_id: 0};
    }

    // changeDateRangePickerHistory = (start_time, end_time) => {
    //     setExpenseCampaignStore.historyFilter = {...setExpenseCampaignStore.historyFilter, start_time, end_time, gen_id: 0};
    //     this.loadHistoryKpi({...setExpenseCampaignStore.historyFilter});
    // }

    submitKpi = () => {
        if (setExpenseCampaignStore.formData.money > 0) {
            setExpenseCampaignStore.storeKpi(() => {
                this.toggleModal();
                this.props.reload();
            });
        } else {
            showTypeNotification("Tiền phải lớn hơn 0");
            // this.toggleModal();
        }

    }

    // loadHistoryKpi = (filter) => {
    //     setExpenseCampaignStore.historyKpi(filter);
    // }
    formatDates = (dates) => {
        return dates && dates.map((date) => {
            return moment(date, DATE_FORMAT_SQL).format(DATE_FORMAT);
        });
    }

    render() {
        // let {isStoring, formData, selectedCourse, showModal, isLoading, data, openHistoryPanel, historyFilter} = setExpenseCampaignStore;
        let {isStoring, formData, showModal, selectedCampaign} = setExpenseCampaignStore;
        return (

            <Modal show={showModal} bsSize="large" onHide={this.toggleModal}>
                <Modal.Header closeButton>
                    <div className="title">Set chi phí</div>
                    <div className="text-center">{selectedCampaign ? selectedCampaign.name : ""}</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="margin-top-20 set-kpi-form">
                        <div className="form-modal">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Thời gian</label>
                                    <DateRangePicker
                                        className="padding-vertical-10px cursor-pointer margin-bottom-20"
                                        start={formData.start_time} end={formData.end_time}
                                        style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}
                                        onChange={this.changeDateRangePicker}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>Khóa</label>
                                    <ReactSelect
                                        value={formData.gen_id}
                                        options={store.getFilterOptions.gens}
                                        onChange={this.onChangeGen}
                                        className="cursor-pointer margin-bottom-20"
                                        placeholder="Chọn khóa"
                                        clearable={false}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>Chi phí</label>
                                    <FormInputText
                                        placeholder="Chi phí"
                                        name="number"
                                        required
                                        value={dotNumber(setExpenseCampaignStore.formData.money)}
                                        updateFormData={(event) => {
                                            if (!isNaN(Number(event.target.value.toString().replace(/\./g, "")))) {
                                                const money = Number(event.target.value.toString().replace(/\./g, ""));
                                                setExpenseCampaignStore.formData = {
                                                    ...setExpenseCampaignStore.formData,
                                                    money
                                                };

                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/*<div className="panel panel-default">*/}
                        {/*    <div className="panel-heading"*/}
                        {/*         style={{width: 110, border: "none"}}*/}
                        {/*         onClick={() => {*/}
                        {/*             setExpenseCampaignStore.openHistoryPanel = !openHistoryPanel;*/}
                        {/*         }}*/}
                        {/*    >*/}
                        {/*        <a aria-expanded={openHistoryPanel}*/}
                        {/*           style={{*/}
                        {/*               color: "black"*/}
                        {/*           }}*/}
                        {/*        >*/}
                        {/*            <h4 className="panel-title" style={{fontWeight: "bold"}}>*/}
                        {/*                Lịch sử kpi*/}
                        {/*                <i className="material-icons">arrow_drop_down</i>*/}
                        {/*            </h4>*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<Panel collapsible className="none-margin"*/}
                        {/*       expanded={openHistoryPanel}>*/}
                        {/*    <BarChartFilterDate*/}
                        {/*        isLoading={isLoading}*/}
                        {/*        dates={this.formatDates(data.dates)}*/}
                        {/*        dateFormat={DATE_FORMAT}*/}
                        {/*        data={[data.kpi, data.revenue]}*/}
                        {/*        optionsBar={optionsBar}*/}
                        {/*        fileNameDownload={"lịch sử KPI của " + selectedCourse.name}*/}
                        {/*        labels={[*/}
                        {/*            {*/}
                        {/*                label: "KPI",*/}
                        {/*                backgroundColor: '#ffaa00',*/}
                        {/*                borderColor: '#ffaa00',*/}
                        {/*            },*/}
                        {/*            {*/}
                        {/*                label: "Doanh thu",*/}
                        {/*                backgroundColor: '#4caa00',*/}
                        {/*                borderColor: '#4caa00',*/}
                        {/*            }]}*/}
                        {/*    >*/}
                        {/*        <DateRangePicker*/}
                        {/*            className="padding-vertical-10px cursor-pointer margin-vertical-15"*/}
                        {/*            start={historyFilter.start_time} end={historyFilter.end_time}*/}
                        {/*            style={{padding: '5px 10px 5px 20px', lineHeight: '34px', marginBottom: 18}}*/}
                        {/*            onChange={this.changeDateRangePickerHistory}*/}
                        {/*        />*/}
                        {/*    </BarChartFilterDate>*/}
                        {/*</Panel>*/}
                        {isStoring ?
                            <div className="flex flex-align-items-center flex-end">
                                <div className="btn btn-white">
                                    Hủy
                                </div>
                                <div className="btn btn-success">
                                    <i className="fa fa-spinner fa-spin"/> Đang lưu
                                </div>
                            </div>
                            :
                            <div className="flex flex-align-items-center flex-end">
                                <div className="btn btn-white" onClick={this.toggleModal}>
                                    Hủy
                                </div>
                                <div className="btn btn-success" onClick={this.submitKpi}>
                                    Lưu
                                </div>
                            </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}


export default SetModalExpenseCampaignModal;
