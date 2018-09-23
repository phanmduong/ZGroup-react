import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import {Modal} from 'react-bootstrap';
import FormInputText from '../../../components/common/FormInputText';
import * as helper from '../../../helpers/helper';
import {NO_IMAGE} from "../../../constants/env";


class coursesCreateEditTerm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openModal: false,
            currentTerm: 0,
            term: {
                id: null,
                name: "",
                description: "",
                short_description: "",
                course_id: "",
                image_url: "",
                audio_url: "",
                video_url: "",
            },
        };
        this.isCreate = true;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateTermData = this.updateTermData.bind(this);
        this.uploadTermIcon = this.uploadTermIcon.bind(this);
        this.openModalEditTerm = this.openModalEditTerm.bind(this);
        this.commitTerm = this.commitTerm.bind(this);
        this.deleteTerm = this.deleteTerm.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.duplicateTerm = this.duplicateTerm.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-edit-term');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isUploadingTermIcon && !nextProps.isUploadingTermIcon) {
            let term = this.state.term;
            term.image_url = nextProps.term.image_url;
            this.setState({term: term});
        }
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-edit-term');
    }

    openModal() {
        this.isCreate = true;
        let term = {
            id: null,
            name: "",
            description: "",
            short_description: "",
            course_id: "",
            image_url: "",
            audio_url: "",
        };
        this.setState({openModal: true, term: term});
    }

    closeModal() {
        this.setState({openModal: false});
    }

    uploadTermIcon(event) {
        let file = event.target.files[0];
        if (helper.checkFileSize(file, 2))
            this.props.coursesActions.uploadTermIcon({...this.state.term, course_id: this.props.data.id}, file);
    }

    openModalEditTerm(term) {
        this.isCreate = false;
        this.setState({openModal: true, term: term});
    }

    deleteTerm(id) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa học phần này không?", () => {
            this.props.coursesActions.deleteTerm(id, () => {
                return this.props.coursesActions.loadOneCourse(this.props.data.id);
            });
        });
    }


    updateTermData(e) {
        const feild = e.target.name;
        const value = e.target.value;
        let term = {...this.state.term};
        term[feild] = value;
        this.setState({term: term});
    }

    commitTerm() {
        if (this.checkValidate())
            if (this.isCreate) {
                this.props.coursesActions.createTerm({...this.state.term, course_id: this.props.data.id}, () => {
                    this.setState({openModal: false});
                    this.props.coursesActions.loadOneCourse(this.props.data.id);
                });
            } else {
                this.props.coursesActions.commitEditTerm({...this.state.term, course_id: this.props.data.id}, () => {
                    this.setState({openModal: false});
                    this.props.coursesActions.loadOneCourse(this.props.data.id);
                });
            }


    }

    checkValidate() {

        if ($('#form-edit-term').valid()) {
            return true;
        }
        return false;
    }

    duplicateTerm(term) {
        helper.confirm('warning', 'Duplicate', "Bạn có muốn duplicate học phần này không?", () => {
            this.props.coursesActions.duplicateTerm(term, () => {
                return this.props.coursesActions.loadOneCourse(this.props.params.courseId);
            });
        });
    }

    render() {

        return (
            <div>
                <div className="card-content">

                    <Link className="btn btn-rose" onClick={this.openModal}>
                        Thêm Học Phần
                    </Link>


                    <div className="table-responsive">

                        <table id="datatables"
                               className="table table-striped table-no-bordered table-hover"
                               cellSpacing="0" width="100%" style={{width: "100%"}}>
                            <thead className="text-rose">
                            <tr>
                                <th/>
                                <th>Tên học phần</th>
                                <th>Mô tả ngắn</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(this.props.data.terms && this.props.data.terms.length > 0) &&
                            this.props.data.terms.map((term) => {
                                return (
                                    <tr key={term.id}>
                                        <td>
                                            <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                    data-toggle="tooltip"
                                                    title=""
                                                    type="button"
                                                    rel="tooltip"
                                                    data-placement="right"
                                                    data-original-title={term.name}>
                                                <img src={helper.validateLinkImage(term.image_url)} alt=""/>
                                            </button>
                                        </td>
                                        <td>{term.name}</td>
                                        <td>{term.short_description}</td>
                                        <td>
                                            <ButtonGroupAction
                                                edit={() => {
                                                    return this.openModalEditTerm(term);
                                                }}
                                                delete={() => {
                                                    return this.deleteTerm(term.id);
                                                }}
                                                object={term}
                                            >
                                                {
                                                    !this.props.isDuplicating &&
                                                    <a data-toggle="tooltip" title="Duplicate"
                                                       type="button"
                                                       onClick={() => {
                                                           return this.duplicateTerm(term);
                                                       }}
                                                       rel="tooltip"
                                                    >
                                                        <i className="material-icons">control_point_duplicate</i>
                                                    </a>
                                                }

                                            </ButtonGroupAction>
                                        </td>
                                    </tr>
                                );

                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal show={this.state.openModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.isCreate ? "Thêm" : "Chỉnh sửa"} học phần</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-term" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <img
                                        width={"100%"}
                                        src={
                                            helper.isEmptyInput(this.state.term.image_url)
                                                ?
                                                NO_IMAGE
                                                :
                                                this.state.term.image_url}
                                    />
                                </div>
                                <div className="col-md-12">
                                    {this.props.isUploadingTermIcon ?
                                        (
                                            <button className="btn btn-rose btn-round disabled" type="button">
                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                            </button>
                                        )
                                        :
                                        (
                                            <button className="btn btn-fill btn-rose" type="button">
                                                Chọn ảnh icon
                                                <input type="file"
                                                       accept=".jpg,.png,.gif"
                                                       onChange={this.uploadTermIcon}
                                                       style={{
                                                           cursor: 'pointer',
                                                           opacity: "0.0",
                                                           position: "absolute",
                                                           top: 0,
                                                           left: 0,
                                                           bottom: 0,
                                                           right: 0,
                                                           width: "100%",
                                                           height: "100%"
                                                       }}
                                                />
                                            </button>
                                        )
                                    }
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Tên học phần"
                                        name="name"
                                        required
                                        updateFormData={this.updateTermData}
                                        value={this.state.term.name}
                                        type="text"
                                        disabled={this.props.isUploadingTermIcon}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Mô tả ngắn"
                                        name="short_description"
                                        required
                                        updateFormData={this.updateTermData}
                                        value={this.state.term.short_description}
                                        type="text"
                                        disabled={this.props.isUploadingTermIcon}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Thứ tự"
                                        name="order"
                                        required
                                        updateFormData={this.updateTermData}
                                        value={this.state.term.order}
                                        type="number"
                                        disabled={this.props.isUploadingTermIcon}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Link audio"
                                        name="audio_url"
                                        required
                                        updateFormData={this.updateTermData}
                                        value={this.state.term.audio_url}
                                        type="text"
                                        disabled={this.props.isUploadingTermIcon}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Link video"
                                        name="video_url"
                                        required
                                        updateFormData={this.updateTermData}
                                        value={this.state.term.video_url}
                                        type="text"
                                        disabled={this.props.isUploadingTermIcon}
                                    />
                                </div>

                            </div>
                            {this.props.isUploadingTerm ?
                                (
                                    <button
                                        className="btn btn-fill btn-rose disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang lưu
                                    </button>
                                )
                                :
                                <div>
                                    <button className="btn btn-rose"
                                            onClick={this.commitTerm}
                                            disabled={this.props.isUploadingTerm}
                                    > Lưu
                                    </button>
                                    <button className="btn btn-rose"
                                            onClick={this.closeModal}
                                            disabled={this.props.isUploadingTerm}
                                    > Huỷ
                                    </button>
                                </div>
                            }

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

}

coursesCreateEditTerm.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isUploadingTerm: PropTypes.bool.isRequired,
    isUploadingTermIcon: PropTypes.bool.isRequired,
    data: PropTypes.object,
    term: PropTypes.object,
    coursesActions: PropTypes.object.isRequired,
    params: PropTypes.object,
    loadOneCourse: PropTypes.func,
    createTerm: PropTypes.func,
    commitEditTerm: PropTypes.func,
    editTerm: PropTypes.func,
    duplicateTerm: PropTypes.func,
    isDuplicating: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        isUploadingTerm: state.courses.isUploadingTerm,
        isUploadingTermIcon: state.courses.isUploadingTermIcon,
        data: state.courses.data,
        term: state.courses.term,
        isDuplicating: state.courses.isDuplicating,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditTerm);

