import React from 'react';
import {observer} from 'mobx-react';
import filterStore from "./filterStore";
import {Modal, Panel} from "react-bootstrap";
import setKpiStore from "./setKpiStore";
import {getValueFromKey} from "../../../helpers/entity/object";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import moment from "moment";
import DateRangePicker from "../../../components/common/DateTimePicker";
import {dotNumber} from "../../../helpers/helper";
import BarChartFilterDate from "../BarChartFilterDate";
import {DATE_FORMAT, DATE_FORMAT_SQL} from "../../../constants/constants";

const optionsBar = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(tooltipItem.value)}đ`;
                return label;
            }
        }
    }
};

@observer
class SetKpiModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    toggleModal = () => {
        setKpiStore.showModal = !setKpiStore.showModal;
    }

    onChangeGen = (value) => {
        const gen_id = value ? value.value : 0;

        if (value) {
            setKpiStore.setKpi.start_time = moment(value.start_time);
            setKpiStore.setKpi.end_time = moment(value.end_time);
        }

        setKpiStore.setKpi = {...setKpiStore.setKpi, gen_id};
    }

    changeDateRangePicker = (start_time, end_time) => {
        setKpiStore.setKpi = {...setKpiStore.setKpi, start_time, end_time, gen_id: 0};
        this.loadHistoryKpi({...setKpiStore.setKpi, base_id: filterStore.base_id});
    }

    submitKpi = () => {
        if (setKpiStore.setKpi.money > 0) {
            setKpiStore.storeKpi(() => {
                this.toggleModal();
                this.props.reload();
            });
        } else {
            this.toggleModal();
        }

    }

    loadHistoryKpi = (filter) => {
        setKpiStore.historyKpi(filter);
    }
    formatDates = (dates) => {
        return dates && dates.map((date) => {
            return moment(date, DATE_FORMAT_SQL).format(DATE_FORMAT);
        })
    }

    render() {
        let {isStoring, setKpi, selectedSaler, showModal, isLoading, data, openHistoryPanel} = setKpiStore;
        return (

            <Modal show={showModal} bsSize="large" onHide={this.toggleModal}>
                <Modal.Header closeButton>
                    <div className="title">Set KPI</div>
                </Modal.Header>
                <Modal.Body>
                    {
                        selectedSaler &&
                        <div className="flex flex-row flex-align-items-center">
                            <div>
                                <img className="circle"
                                     src={selectedSaler.avatar_url} alt="" style={{height: 80, width: 80}}/>
                            </div>
                            <div className="flex flex-col margin-left-15">
                                <strong>{selectedSaler.name}</strong>
                                {selectedSaler.base &&
                                <div>{getValueFromKey(selectedSaler, "base.name")} - Thành
                                    phố {getValueFromKey(selectedSaler, "base.district.province.name")}</div>}

                            </div>
                        </div>
                    }
                    <div className="margin-top-20" className="set-kpi-form">
                        <div className="form-modal">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Thời gian</label>
                                    <DateRangePicker
                                        className="padding-vertical-10px cursor-pointer margin-bottom-20"
                                        start={setKpi.start_time} end={setKpi.end_time}
                                        style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}
                                        onChange={this.changeDateRangePicker}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>Khóa</label>
                                    <ReactSelect
                                        value={setKpi.gen_id}
                                        options={filterStore.gensData}
                                        onChange={this.onChangeGen}
                                        className="cursor-pointer margin-bottom-20"
                                        placeholder="Chọn khóa"
                                        clearable={false}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>KPI</label>
                                    <FormInputText
                                        placeholder="KPI"
                                        name="number"
                                        required
                                        value={setKpiStore.setKpi.money}
                                        updateFormData={(e) => {
                                            setKpiStore.setKpi = {...setKpiStore.setKpi, money: e.target.value};
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading"
                                 style={{width: 110, border: "none"}}
                                 onClick={() => {
                                     setKpiStore.openHistoryPanel = !openHistoryPanel
                                 }}
                            >
                                <a aria-expanded={openHistoryPanel}
                                   style={{
                                       color: "black"
                                   }}
                                >
                                    <h4 className="panel-title" style={{fontWeight: "bold"}}>
                                        Lịch sử kpi
                                        <i className="material-icons">arrow_drop_down</i>
                                    </h4>
                                </a>
                            </div>
                        </div>
                        <Panel collapsible className="none-margin"
                               expanded={openHistoryPanel}>
                            <BarChartFilterDate
                                isLoading={isLoading}
                                dates={this.formatDates(data.dates)}
                                dateFormat={DATE_FORMAT}
                                data={[data.kpi, data.revenue]}
                                optionsBar={optionsBar}
                                labels={[
                                    {
                                        label: "KPI",
                                        backgroundColor: '#ffaa00',
                                        borderColor: '#ffaa00',
                                    },
                                    {
                                        label: "Doanh thu",
                                        backgroundColor: '#4caa00',
                                        borderColor: '#4caa00',
                                    }]}
                            />
                        </Panel>
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


export default SetKpiModal;
