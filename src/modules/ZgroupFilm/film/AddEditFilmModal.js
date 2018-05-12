import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as filmAction from "../filmAction";
import ImageUploader from "../../../components/common/ImageUploader";
import FormInputText from "../../../components/common/FormInputText";
import FormInputDate from "../../../components/common/FormInputDate";
import * as helper from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
import UploadManyImages from "../../../components/common/UploadManyImages";
import Star from '../../../components/common/Star';
import TooltipButton from "../../../components/common/TooltipButton";

class AddEditFilmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.handleUpload2 = this.handleUpload2.bind(this);
        this.changeRate = this.changeRate.bind(this);
    }

    handleUpload(image) {
        this.props.filmAction.handleAvatarWebsiteTab(image);
    }

    handleUpload2(image) {
        this.props.filmAction.handleAvatarWebsiteTab2(image);
    }

    handleImages(images_url) {
        this.props.filmAction.handleImagesWebsiteTab(JSON.stringify(images_url));
    }

    updateFormData(event) {
        const field = event.target.name;
        let film = {
            ...this.props.filmModal,
            [field]: event.target.value
        };
        this.props.filmAction.handleFilmModal(film);
    }

    changeRate(value) {
        let film = {
            ...this.props.filmModal,
            rate: value
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
            || helper.isEmptyInput(film.images_url)

        ) {
            if (helper.isEmptyInput(film.name)) helper.showErrorNotification("Bạn cần nhập tên film");
            if (helper.isEmptyInput(film.avatar_url)) helper.showErrorNotification("Bạn cần chọn ảnh đại diện");
            if (helper.isEmptyInput(film.trailer_url)) helper.showErrorNotification("Bạn cần nhập link trailer");
            if (helper.isEmptyInput(film.director)) helper.showErrorNotification("Bạn cần nhập tên đạo diễn");
            if (helper.isEmptyInput(film.cast)) helper.showErrorNotification("Bạn cần nhập tên diễn viên");
            if (helper.isEmptyInput(film.running_time)) helper.showErrorNotification("Bạn cần nhập thời lượng");
            if (helper.isEmptyInput(film.country)) helper.showErrorNotification("Bạn cần nhập quốc gia");
            if (helper.isEmptyInput(film.language)) helper.showErrorNotification("Bạn cần nhập ngôn ngữ");
            if (helper.isEmptyInput(film.rate)) helper.showErrorNotification("Bạn cần đánh giá film");
            if (helper.isEmptyInput(film.summary)) helper.showErrorNotification("Bạn cần nhập mô tả");
            if (helper.isEmptyInput(film.film_genre)) helper.showErrorNotification("Bạn cần nhập thể loại film");
            if (helper.isEmptyInput(film.cover_url)) helper.showErrorNotification("Bạn cần chọn ảnh bìa");
            if (helper.isEmptyInput(film.images_url)) helper.showErrorNotification("Bạn cần chọn ít nhất một ảnh");
        }
        else {
            if (film.id) {
                this.props.filmAction.editFilm(film);
            } else {
                this.props.filmAction.saveFilm(film);
            }
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
                                <div className="col-md-8">
                                    <FormInputText
                                        style={{width: "82%"}}
                                        label="Tên phim"
                                        name="name"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.name || ''}
                                        required
                                    />
                                    <TooltipButton text="Đánh giá phim" placement="top">
                                        <div style={{float: "right", marginTop: "-38px"}}>
                                            <Star
                                                value={this.props.filmModal.rate || 0}
                                                maxStar={5}
                                                onChange={(value) => {
                                                    this.changeRate(value);
                                                }}
                                            />
                                        </div>
                                    </TooltipButton>
                                        <FormInputText
                                            style={{width: "94%"}}
                                            label="Trailer (Nhập link youtube)"
                                            name="trailer_url"
                                            updateFormData={this.updateFormData}
                                            value={this.props.filmModal.trailer_url || ''}
                                            required
                                        />
                                        <div style={{float: "right", marginTop: "-38px"}}>
                                            <a href={this.props.filmModal.trailer_url} target="_blank">
                                        <i className="material-icons text-paly">
                                            flight_takeoff
                                        </i>
                                            </a>
                                        </div>




                                    <FormInputText
                                        label="Đạo diễn"
                                        name="director"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.director || ''}
                                        required
                                    />
                                    <FormInputText
                                        label="Diễn viên"
                                        name="cast"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.cast || ''}
                                        required
                                    />


                                    <FormInputText
                                        label="Thời lượng"
                                        name="running_time"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.running_time || ''}
                                        required
                                    />
                                    <FormInputText
                                        label="Thể loại film"
                                        name="film_genre"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.film_genre || ''}
                                        required
                                    />


                                    <FormInputText
                                        label="Quốc gia"
                                        name="country"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.country || ''}
                                        required
                                    />
                                    <FormInputText
                                        label="Ngôn ngữ"
                                        name="language"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.language || ''}
                                        required
                                    />

                                    <FormInputText
                                        label="Giới hạn độ tuổi"
                                        name="film_rated" type="number"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.film_rated || ''}
                                        minValue="1"
                                    />
                                    <FormInputDate
                                        label="Ngày phát hành"
                                        name="release_date"
                                        updateFormData={this.updateFormData}
                                        value={this.props.filmModal.release_date || ''}
                                        id="form-start-hour"
                                        required
                                    />


                                    <div className="form-group">
                                        <label className="label-control">Mô tả</label>
                                        <textarea type="text" className="form-control"
                                                  value={this.props.filmModal.summary || ''}
                                                  name="summary"
                                                  onChange={this.updateFormData}/>
                                        <span className="material-input"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-content">
                                        <h4 className="card-title">Ảnh đại diện</h4>
                                        <ImageUploader handleFileUpload={this.handleUpload}
                                                       tooltipText="Chọn ảnh đại diện"
                                                       image_url={this.props.filmModal.avatar_url || ''}/>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Ảnh bìa</h4>
                                        <ImageUploader handleFileUpload={this.handleUpload2}
                                                       tooltipText="Chọn ảnh bìa"
                                                       image_url={this.props.filmModal.cover_url || ''}/>
                                    </div>
                                    <div className="card-content">
                                        <div className="form-group">
                                            <h4 className="card-title">Thêm ảnh mô tả</h4>
                                            <UploadManyImages
                                                images_url={(this.props.filmModal.images_url ? JSON.parse(this.props.filmModal.images_url) : [] ) || []}
                                                handleFileUpload={this.handleImages}
                                                box="box-images-website-create"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{textAlign: "right"}}>
                                {
                                    this.props.isSavingFilm ? <Loading/> :
                                        (
                                            this.props.openFilmModal ?
                                                <div>
                                                    <button
                                                    type="button"
                                                    className="btn"
                                                    onClick={() => {
                                                        this.props.filmAction.showAddEditFilmModal();
                                                    }}
                                                >
                                                    Trở lại
                                                </button>
                                                </div>
                                                :
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
    openFilmModal: PropTypes.bool.isRequired,
    filmModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        addEditFilmModal: state.film.addEditFilmModal,
        isUploadingAvatar: state.film.isUploadingAvatar,
        isUploadingImage: state.film.isUploadingImage,
        percent: state.film.percent,
        isSavingFilm: state.film.isSavingFilm,
        openFilmModal: state.film.openFilmModal,
        filmModal: state.film.filmModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditFilmModal);