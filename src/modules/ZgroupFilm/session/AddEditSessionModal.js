import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import *as filmAction from "../filmAction";
import Select from "react-select";
import FormInputDate from '../../../components/common/FormInputDate';
import FormInputText from '../../../components/common/FormInputText';
import {TIME_FORMAT_H_M} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import * as helper from "../../../helpers/helper";

class AddEditSessionModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateSession = this.updateSession.bind(this);
        this.submit = this.submit.bind(this);
        this.changTemplateTypes = this.changTemplateTypes.bind(this);
        this.changTemplateTypes2 = this.changTemplateTypes2.bind(this);
        this.changeFilmQuality = this.changeFilmQuality.bind(this);
        this.changePrice = this.changePrice.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingSeat !== this.props.isLoadingSeat && !nextProps.isLoadingSeat) {
            this.props.filmAction.handleSessionModal({
                ...this.props.sessionModal,
                seats: nextProps.seatTypes
            });
        }
    }

    changeFilmQuality(option) {
        let session = {
            ...this.props.sessionModal,
            film_quality: option.value,
        };
        this.props.filmAction.handleSessionModal(session);
    }

    updateSession(e) {
        const field = e.target.name;
        let session = {
            ...this.props.sessionModal,
            [field]: e.target.value
        };
        this.props.filmAction.handleSessionModal(session);
    }

    changTemplateTypes(value) {
        let session = {
            ...this.props.sessionModal,
            film_id: value ? value.value : '',
        };
        this.props.filmAction.handleSessionModal(session);
    }

    changTemplateTypes2(value) {
        let session = {
            ...this.props.sessionModal,
            room_id: value ? value.value : '',
        };
        this.props.filmAction.handleSessionModal(session);
        this.props.filmAction.loadAllSeatTypes(value.value);
    }
    changePrice(e,index){
        const field = e.target.name;
        let seats = this.props.sessionModal.seats.map((seat, i)=>{
            if(i === index){
                return{
                    ...seat,
                    [field]: e.target.value
                };
            }
            return seat;
        });

        let session = {
            ...this.props.sessionModal,
            seats: seats
        };
        this.props.filmAction.handleSessionModal(session);
    }
    submit() {
        const seat = [...this.props.sessionModal.seats];
        const session = {
            ...this.props.sessionModal,
            seats: JSON.stringify(seat)
        };

        if (
            helper.isEmptyInput(session.film_id)
            || helper.isEmptyInput(session.film_quality)
            || helper.isEmptyInput(session.room_id)
            || helper.isEmptyInput(session.start_time)
            || helper.isEmptyInput(session.start_date)

        ) {
            if (helper.isEmptyInput(session.film_id)) helper.showErrorNotification("Bạn cần chọn tên phim");
            if (helper.isEmptyInput(session.film_quality)) helper.showErrorNotification("Bạn cần nhập chất lượng phim");
            if (helper.isEmptyInput(session.room_id)) helper.showErrorNotification("Bạn cần chọn phòng chiếu");
            if (helper.isEmptyInput(session.start_time)) helper.showErrorNotification("Bạn cần chọn ngày chiếu");
            if (helper.isEmptyInput(session.start_date)) helper.showErrorNotification("Bạn cần chọn giờ chiếu");
        }
        else {
            if (session.id) {
                this.props.filmAction.editSession(session);
            }
            else this.props.filmAction.saveSession(session);
        }
    }

    render() {
        let session = this.props.sessionModal;
        return (
            <Modal show={this.props.addEditSessionModal}
                   onHide={() => {
                       helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật", () => {
                           this.props.filmAction.toggleSessionModal();
                       });

                   }}
            >
                <a onClick={() => this.props.filmAction.toggleSessionModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Quản lý suất chiếu </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div>
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Tên phim</label>
                                    <Select
                                        disabled={this.props.addFilmSession}
                                        value={session.film_id || ''}
                                        options={this.props.allFilms.map((film) => {
                                            return {
                                                ...film,
                                                value: film.id,
                                                label: film.name
                                            };
                                        })}
                                        onChange={this.changTemplateTypes}

                                    />
                                </div>
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Phòng</label>
                                    <Select
                                        // disabled={false}
                                        value={session.room_id || ''}
                                        options={this.props.rooms.map((room) => {
                                            return {
                                                value: room.id,
                                                label: room.base_name + " - " + room.name,
                                            };
                                        })}
                                        onChange={this.changTemplateTypes2}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <FormInputDate
                                        label="Ngày chiếu"
                                        name="start_date"
                                        updateFormData={this.updateSession}
                                        value={session.start_date || ''}
                                        id="form-start-day"
                                    />
                                </div>
                                <div className="col-md-6"><br/>
                                    <FormInputDate
                                        label="Giờ chiếu"
                                        name="start_time"
                                        updateFormData={this.updateSession}
                                        value={session.start_time || ''}
                                        id="form-start-hour"
                                        format={TIME_FORMAT_H_M}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="label-control">
                                    Chất lượng phim
                                </label>
                                <Select
                                    name="film_quality"
                                    value={
                                        session.film_quality ? session.film_quality : ""
                                    }
                                    options={[
                                        {label: "2D", value: "2D"},
                                        {label: "3D", value: "2D"},
                                        {label: "4DX", value: "4DX"},
                                        {label: "IMAX", value: "IMAX"},
                                        {label: "STAR (Starium)", value: "STAR"},

                                    ]}
                                    onChange={this.changeFilmQuality}
                                    clearable={false}
                                />
                            </div>
                            <br/>
                            <label className="label-control">Giá vé</label>
                            {
                                this.props.isLoadingSeat ? <Loading/> :
                                    <div className="table-responsive">
                                        <table className="table table-hover">

                                            <tbody>
                                            {
                                                session.seats && session.seats.map((seatType, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                &emsp;
                                                                <button style={{
                                                                    backgroundColor: seatType.color, color: "white",
                                                                    padding: "10px 11px", border: "none", borderRadius: "20px"
                                                                }}>
                                                                    <b>A1</b>
                                                                </button>

                                                            </td>
                                                            <td>{seatType.type}</td>
                                                            <td>
                                                                <FormInputText
                                                                    label="Nhập giá vé (đ)"
                                                                    type="number"
                                                                    name="price"
                                                                    updateFormData={(e)=>this.changePrice(e,index)}
                                                                    value={seatType.price}/>
                                                            </td>

                                                        </tr>


                                                    );
                                                })
                                            }


                                            </tbody></table><br/>
                                    </div>
                            }


                            {
                                this.props.isSavingSession ? <Loading/> : (
                                    <div style={{textAlign: "right"}}>
                                        <button rel="tooltip" data-placement="top"
                                                title=""
                                                data-original-title="Remove item"
                                                type="button"
                                                className="btn btn-rose"
                                                data-dismiss="modal"
                                                onClick={this.submit}
                                        >
                                            <i className="material-icons">check</i> Xác Nhận
                                        </button>
                                        &ensp;
                                        <button rel="tooltip" data-placement="top"
                                                title=""
                                                data-original-title="Remove item"
                                                type="button"
                                                className="btn"
                                                data-dismiss="modal"
                                                onClick={() => this.props.filmAction.toggleSessionModal()}
                                        >
                                            <i className="material-icons">close</i> Huỷ
                                        </button>
                                        &emsp;
                                    </div>
                                )

                            }

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddEditSessionModal.propTypes = {
    addEditSessionModal: PropTypes.bool.isRequired,
    isSavingSession: PropTypes.bool.isRequired,
    addFilmSession: PropTypes.bool.isRequired,
    isLoadingSeat: PropTypes.bool.isRequired,
    filmAction: PropTypes.object.isRequired,
    seatTypes: PropTypes.array.isRequired,
    sessionModal: PropTypes.object.isRequired,
    allFilms: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        addEditSessionModal: state.film.addEditSessionModal,
        isSavingSession: state.film.isSavingSession,
        sessionModal: state.film.sessionModal,
        allFilms: state.film.allFilms,
        rooms: state.film.rooms,
        isLoadingSeat: state.film.isLoadingSeat,
        addFilmSession: state.film.addFilmSession,
        seatTypes: state.film.seatTypes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditSessionModal);