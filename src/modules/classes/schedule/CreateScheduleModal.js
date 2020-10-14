/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import Store from "./store";
import {isEmptyInput, showWarningNotification} from "../../../helpers/helper";
import {observer} from "mobx-react";
import SelectTime from "./SelectTime";

@observer
class CreateScheduleModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store();
    }

    onSave = () => {
        if (isEmptyInput(this.store.name)) {
            showWarningNotification("Vui lòng nhập tên lịch học");
            return;
        }
        this.store.createSchedule(this.onSuccess);
    }

    onSuccess = (data) => {
        this.props.onCloseScheduleModal(data);
    }


    render() {
        const {days, isLoading} = this.store;
        console.log(days);
        return (
            <div>
                <Modal
                    show={this.props.showScheduleModal}
                    onHide={this.props.onCloseScheduleModal}
                    bsSize="lg"
                >
                    <Modal.Header closeButton>
                        <div className="title">Tạo lịch học</div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="create-schedule">
                            <div className="title-select-day">Chọn ngày trong tuần</div>
                            <div className="select-day flex flex-row flex-space-around flex-align-items-center">
                                {days.map((day) => {
                                    const isActive = !isEmptyInput(day.start_time) && !isEmptyInput(day.end_time);
                                    return (
                                        <SelectTime day={day} active={isActive}
                                                    onSave={() => {
                                                        this.store.name = this.store.name + `${this.store.name ? ' - ' : ''}${day.value} (${day.start_time}-${day.end_time})`;
                                                        console.log(this.store.name)
                                                    }}
                                        />
                                    );
                                })}
                            </div>
                            <div>
                                <div className="title-select-day">Tên lịch học</div>
                                <input className="custom-input" type="text"
                                       value={this.store.name}
                                       placeholder="Thứ 2 - Thứ 4 - Thứ 6 (19h-21h)" onChange={(e) => {
                                    this.store.name = e.target.value;
                                }}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="footer">
                            <div className={"button-default min-width-100-px" + (isLoading ? " disabled " : "")}
                                 onClick={() => !isLoading && this.props.onCloseScheduleModal()}>
                                Hủy
                            </div>
                            <div className={"button-green min-width-100-px" + (isLoading ? " disabled " : "")}
                                 onClick={() => !isLoading && this.onSave()}>
                                {isLoading &&
                                <i className="fa fa-spinner fa-spin" style={{fontSize: 16, marginRight: 5}}/>}
                                {isLoading ? "Đang lưu" : "Lưu"}
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

CreateScheduleModal.propTypes = {
    showScheduleModal: PropTypes.bool.isRequired,
    onCloseScheduleModal: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScheduleModal);
