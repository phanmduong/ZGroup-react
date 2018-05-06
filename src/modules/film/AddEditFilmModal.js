import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as filmAction from "./filmAction";
import ImageUploader from "../../components/common/ImageUploader";
import FormInputText from "../../components/common/FormInputText";
import FormInputDate from "../../components/common/FormInputDate";
import * as helper from "../../helpers/helper";
import Loading from "../../components/common/Loading";

class AddEditFilmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);

    }

    handleUpload(image) {
        this.props.filmAction.handleAvatarWebsiteTab(image);
    }

    handleImages() {

    }

    updateFormData(event) {
        const field = event.target.name;
        let film = {
            ...this.props.filmModal,
            [field]: event.target.value
        };
        this.props.filmAction.handleFilmModal(film);
    }

    submit() {
        const film = this.props.filmModal;
        if (
            helper.isEmptyInput(film.name)
            || helper.isEmptyInput(film.avatar_url)
            || helper.isEmptyInput(film.trailer_url)
            || helper.isEmptyInput(film.director)
            || helper.isEmptyInput(film.cast)
            || helper.isEmptyInput(film.running_time)
            || helper.isEmptyInput(film.country)
            || helper.isEmptyInput(film.language)
            || helper.isEmptyInput(film.rate)
            || helper.isEmptyInput(film.summary)
            || helper.isEmptyInput(film.film_genre)

        ) {
            if (helper.isEmptyInput(film.name)) helper.showErrorNotification("Bạn cần nhập tên film");
            if (helper.isEmptyInput(film.avatar_url)) helper.showErrorNotification("Bạn cần chọn ảnh đại diện");
            if (helper.isEmptyInput(film.trailer_url)) helper.showErrorNotification("Bạn cần nhập link trailer");
            if (helper.isEmptyInput(film.director)) helper.showErrorNotification("Bạn cần nhập tên đạo diễn");
            if (helper.isEmptyInput(film.cast)) helper.showErrorNotification("Bạn cần nhập tên diễn viên");
            if (helper.isEmptyInput(film.running_time)) helper.showErrorNotification("Bạn cần nhập thời lượng");
            if (helper.isEmptyInput(film.country)) helper.showErrorNotification("Bạn cần nhập quốc gia");
            if (helper.isEmptyInput(film.language)) helper.showErrorNotification("Bạn cần nhập ngôn ngữ");
            if (helper.isEmptyInput(film.rate)) helper.showErrorNotification("Bạn cần nhập đánh giá");
            if (helper.isEmptyInput(film.summary)) helper.showErrorNotification("Bạn cần nhập mô tả");
            if (helper.isEmptyInput(film.film_genre)) helper.showErrorNotification("Bạn cần nhập thể loại film");
        }
        else {
            if (film.id) {
                this.props.filmAction.editFilm(film);
            } else this.props.filmAction.saveFilm(film);
        }
    }


    render() {
        return (
            <Modal
                bsSize="large"
                show={this.props.addEditFilmModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật", () => {
                        this.props.filmAction.showAddEditFilmModal();
                    });

                }}>
                <a onClick={() => {
                    this.props.filmAction.showAddEditFilmModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý film</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                    <div className="card-content">
                                        <label style={{marginBottom: 15}}>Ảnh đại diện</label>
                                        <ImageUploader handleFileUpload={this.handleUpload}
                                                       tooltipText="Chọn ảnh đại diện"
                                                       image_url={this.props.filmModal.avatar_url}/>
                                    </div>
                                </div>
                                <br/><br/>
                                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                    <iframe width="480px" height="270px"
                                        //https://www.youtube.com/watch?v=
                                            src={helper.isEmptyInput(this.props.filmModal.trailer_url) ? "" : "https://www.youtube.com/embed/" + this.props.filmModal.trailer_url.slice(32, 44)}
                                            frameBorder="0"
                                            allowFullScreen/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Tên phim"
                                        name="name"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.name || ''}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Trailer (Nhập link youtube)"
                                        name="trailer_url"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.trailer_url || ''}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Đạo diễn"
                                        name="director"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.director || ''}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Diễn viên"
                                        name="cast"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.cast || ''}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Thời lượng"
                                        name="running_time"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.running_time || ''}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Thể loại film"
                                        name="film_genre"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.film_genre || ''}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Quốc gia"
                                        name="country"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.country || ''}
                                        required
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Ngôn ngữ"
                                        name="language"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.language || ''}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Giới hạn độ tuổi"
                                        name="film_rated" type="number"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.film_rated || ''}
                                        minValue="1"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputText
                                        label="Đánh giá (Nhập điểm 1 -> 10)"
                                        name="rate" type="number"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.rate || ''}
                                        required
                                        minValue="1"
                                        maxValue="10"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{marginLeft: 0}}>
                                    <FormInputDate
                                        label="Ngày phát hành"
                                        name="release_date"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.release_date || ''}
                                        id="form-start-hour"
                                        required
                                    />
                                </div>

                            </div>

                            <div className="form-group">
                                <label className="label-control">Mô tả</label>
                                <textarea type="text" className="form-control"
                                          value={this.props.filmModal.summary || ''}
                                          name="summary"
                                          onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>

                            <div style={{textAlign: "right"}}>
                                {
                                    this.props.isSavingFilm ? <Loading/> :
                                        (
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-rose"
                                                    onClick={this.submit}
                                                >
                                                    Lưu
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn"
                                                    onClick={() => {
                                                        this.props.filmAction.showAddEditFilmModal();
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                            </div>
                                        )
                                }
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddEditFilmModal.propTypes = {
    addEditFilmModal: PropTypes.bool.isRequired,
    filmAction: PropTypes.object.isRequired,
    isUploadingAvatar: PropTypes.bool.isRequired,
    isUploadingImage: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    isSavingFilm: PropTypes.bool.isRequired,
    filmModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        addEditFilmModal: state.film.addEditFilmModal,
        isUploadingAvatar: state.film.isUploadingAvatar,
        isUploadingImage: state.film.isUploadingImage,
        percent: state.film.percent,
        isSavingFilm: state.film.isSavingFilm,
        filmModal: state.film.filmModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditFilmModal);