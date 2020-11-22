import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import * as helper from '../../../helpers/helper';
import {NO_IMAGE} from "../../../constants/env";
import {Modal, Overlay} from 'react-bootstrap';
import FormInputText from '../../../components/common/FormInputText';
import CreateCurriculumOverlay from "../overlays/CreateLessonOverlay";
import CreateMultiLessonOverlay from "../overlays/CreateMultiLessonOverlay";
import TermOverlay from "../overlays/TermOverlay";
import EmptyData from "../../../components/common/EmptyData";
import {LESSON_EVENT_TYPES_OBJECT} from "../../../constants/constants";
import TooltipButton from "../../../components/common/TooltipButton";
import * as ReactDOM from "react-dom";


let id;

class coursesCreateEditCurriculum extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openModal: false,
            currentTerm: 0,
            showOverlay: [],
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
        this.deleteLesson = this.deleteLesson.bind(this);
        this.duplicateLesson = this.duplicateLesson.bind(this);
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
        id = this.props.params.courseId;
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

    deleteLesson(id) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa buổi học này không?", () => {
            this.props.coursesActions.deleteLesson(id);
        });
    }

    duplicateLesson(lesson) {
        helper.confirm('warning', 'Duplicate', "Bạn có muốn duplicate buổi học này không?", () => {
            this.props.coursesActions.duplicateLesson(lesson, () => {
                return this.props.coursesActions.loadOneCourse(id);
            });
        });
    }

    getSelectTerm = (course) => {
        return course.terms.map((item) => {
            return {
                value: item.id,
                label: item.name,
            };
        });
    };

    selectedTerm = (lesson, term) => {
        this.props.coursesActions.changeTermLesson(lesson.id, term ? term.id : null);
    };

    updateTerms = (term, isCreate) => {
        if (isCreate) {
            this.props.coursesActions.addTermSuccess(term);
        } else {
            this.props.coursesActions.editTermSuccess(term);
        }

    };

    createLessonEvent = (lesson_id, type) => {
        if (!this.props.isChangingLessonEvent)
            this.props.coursesActions.createLessonEvent(lesson_id, type);

    };

    toggleOverlay = (key) => {
        let showOverlay = [...this.props.data.lessons].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };
    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        return (
            <div>
                <div className="flex flex-wrap" style={{marginTop: 10}}>

                    <CreateCurriculumOverlay
                        children={<div className="margin-right-10 button-green" style={{padding: '12px 15px'}}>
                            <span className="material-icons">add_circle</span>&nbsp;&nbsp;&nbsp;&nbsp;Thêm buổi học
                        </div>}/>
                    <CreateMultiLessonOverlay children={<div className="none-margin button-green btn btn-white radius-5"
                                                             style={{padding: '12px 15px'}}>
                        <span className="material-icons">layers</span>&nbsp;&nbsp;&nbsp;&nbsp;Thêm nhiều buổi học
                    </div>} className="btn btn-silver"/>
                    {/*<CreateTermOverlay className="btn btn-silver"/>*/}
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

                {/*<Link className="btn btn-rose" to={`/teaching/courses/lessons/create/` + id}>*/}
                {/*Thêm Buổi Học*/}
                {/*</Link>*/}
                {/*<div className="flex-row flex">*/}
                {/*    <h5 className="card-title">*/}
                {/*        <strong>Giáo trình</strong>*/}
                {/*    </h5>*/}
                {/*    <div className="dropdown">*/}
                {/*        <button*/}
                {/*            className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"*/}
                {/*            type="button"*/}
                {/*            data-toggle="dropdown">*/}
                {/*            <strong>+</strong>*/}
                {/*        </button>*/}
                {/*        <ul className="dropdown-menu dropdown-primary">*/}
                {/*            <li>*/}
                {/*                <Link to={`/teaching/courses/lessons/create/` + id}>Thêm buổi học</Link>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <Link onClick={this.openModal}>Thêm học phần</Link>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="table-sticky-head table-split" radius="five">

                    <table className="table" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sự kiện</th>
                            <th>Tên buổi học và mô tả</th>
                            <th>Học phần</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.data.lessons && this.props.data.lessons.length > 0 ?
                            this.props.data.lessons.map((lesson, index) => {
                                let urlEditLesson = "/teaching/courses/lessons/edit/" + this.props.data.id + "/" + lesson.id;
                                return (
                                    <tr key={lesson.id}>
                                        <td><strong className="cursor-pointer"
                                                    onClick={() => window.open(urlEditLesson)}>{lesson.order}</strong>
                                        </td>
                                        <td>
                                            <div className="flex flex-align-items-center">
                                                {Object.entries(LESSON_EVENT_TYPES_OBJECT).map(entry => {
                                                    let default_event = LESSON_EVENT_TYPES_OBJECT[entry[0]];
                                                    let lesson_event = lesson.events ? lesson.events.filter(e => e.event_type == default_event.type)[0] : null;

                                                    return (<TooltipButton text={default_event.name} placement="top">
                                                        <div className="icon8 icon8-wrap cursor-pointer margin-right-5"
                                                             mask={lesson_event ? 'on' : 'off'}
                                                             icon={default_event.type}
                                                             onClick={() => {
                                                                 if (this.props.user.role == 2) this.createLessonEvent(lesson.id, default_event.type);
                                                             }}>
                                                            <div className="icon"/>
                                                        </div>
                                                    </TooltipButton>);
                                                })}

                                            </div>
                                        </td>

                                        {/*<td data-toggle="tooltip"*/}
                                        {/*data-original-title={lesson.description}*/}
                                        {/*>{helper.shortenStr(lesson.description,25)}</td>*/}
                                        <td style={{
                                            wordWrap: "break-word",
                                            whiteSpace: "initial",
                                        }}>
                                            <b className="cursor-pointer"
                                               onClick={() => window.open(urlEditLesson)}>{lesson.name}</b>
                                            <div>{lesson.description}</div>
                                        </td>
                                        <td>
                                            <TermOverlay
                                                className="btn status-overlay btn-xs"
                                                terms={this.props.data.terms}
                                                selectedTermId={lesson.term_id}
                                                updateTerm={this.updateTerms}
                                                courseId={this.props.data.id}
                                                onChange={(term) => this.selectedTerm(lesson, term)}
                                                style={{minWidth: '100%'}}
                                                styleOverlay={{marginLeft: -130}}
                                                disabled={this.props.user.role < 2}
                                            />
                                            {/*<ReactSelect*/}
                                            {/*    options={this.getSelectTerm(this.props.data)}*/}
                                            {/*    onChange={(e) => this.selectedTerm(lesson, e)}*/}
                                            {/*    value={lesson.term_id}*/}
                                            {/*    placeholder="Chọn học phần"*/}
                                            {/*/>*/}
                                            {/*{(*/}
                                            {/*    (<select className="form-control" value={lesson.term_id}*/}
                                            {/*             onChange={(event) => {*/}
                                            {/*                 this.props.coursesActions.changeTermLesson(lesson.id, event.target.value);*/}
                                            {/*             }}*/}
                                            {/*    >*/}
                                            {/*        <option*/}
                                            {/*            value={null}*/}
                                            {/*        />*/}


                                            {/*        {this.props.data.terms.map((term, key) => {*/}
                                            {/*            return (*/}
                                            {/*                <option*/}
                                            {/*                    key={key}*/}
                                            {/*                    value={term.id}*/}
                                            {/*                >*/}
                                            {/*                    {term.name}*/}
                                            {/*                </option>);*/}
                                            {/*        })}*/}
                                            {/*    </select>))*/}
                                            {/*}*/}
                                        </td>
                                        <td>
                                            <div style={{position: "relative"}}
                                                 className="cursor-pointer" mask="table-btn-action">
                                                <div ref={'target' + index} onClick={() => this.toggleOverlay(index)}
                                                     className="flex flex-justify-content-center cursor-pointer">
                                                    <i className="material-icons">more_horiz</i>
                                                </div>
                                                <Overlay
                                                    rootClose={true}
                                                    show={this.state.showOverlay[index]}
                                                    onHide={() => this.closeOverlay(index)}
                                                    placement="bottom"
                                                    container={() => ReactDOM.findDOMNode(this.refs['target' + index]).parentElement}
                                                    target={() => ReactDOM.findDOMNode(this.refs['target' + index])}>
                                                    <div className="kt-overlay overlay-container"
                                                         mask="table-btn-action" style={{
                                                        width: 150,
                                                        marginTop: 10,
                                                        left: -115,
                                                    }} onClick={() => this.closeOverlay(index)}>
                                                        {this.props.user.role == 2 && <button type="button"
                                                                                              className="btn btn-white width-100"
                                                                                              onClick={() => {
                                                                                                  window.open(urlEditLesson);
                                                                                              }}>
                                                            Sửa thông tin
                                                        </button>}
                                                        {!this.props.isDuplicating && <button type="button"
                                                                                              className="btn btn-white width-100"
                                                                                              onClick={() => this.duplicateLesson(lesson)}>
                                                            Nhân đôi
                                                        </button>}

                                                        {this.props.user.role == 2 && <button type="button"
                                                                                              className="btn btn-white width-100"
                                                                                              onClick={() => this.deleteLesson(lesson.id)}>
                                                            Xóa
                                                        </button>}
                                                    </div>
                                                </Overlay>
                                            </div>
                                            {/*<ButtonGroupAction*/}
                                            {/*    editUrl={urlEditLesson}*/}
                                            {/*    delete={() => {*/}
                                            {/*        return this.deleteLesson(lesson.id);*/}
                                            {/*    }}*/}
                                            {/*    object={lesson}*/}
                                            {/*>*/}
                                            {/*    {*/}
                                            {/*        !this.props.isDuplicating &&*/}
                                            {/*        <a data-toggle="tooltip" title="Duplicate"*/}
                                            {/*           type="button"*/}
                                            {/*           onClick={() => {*/}
                                            {/*               return this.duplicateLesson(lesson);*/}
                                            {/*           }}*/}
                                            {/*           rel="tooltip"*/}
                                            {/*        >*/}
                                            {/*            <i className="material-icons">control_point_duplicate</i>*/}
                                            {/*        </a>*/}
                                            {/*    }*/}

                                            {/*</ButtonGroupAction>*/}
                                        </td>
                                    </tr>
                                );

                            }) : <EmptyData/>

                        }
                        </tbody>
                    </table>
                </div>
                {/*<div className="col-md-4">*/}
                {/*    <div className="card">*/}
                {/*        <div className="card-content">*/}


                {/*            <div className="table-responsive">*/}

                {/*                <table id="datatables"*/}
                {/*                       className="table table-striped table-no-bordered table-hover"*/}
                {/*                       cellSpacing="0" width="100%" style={{width: "100%"}}>*/}
                {/*                    <thead className="text-rose">*/}
                {/*                    <tr style={{fontSize: '12px'}}>*/}

                {/*                        <th colSpan={2}>Tên học phần</th>*/}
                {/*                        <th>Mô tả</th>*/}
                {/*                        <th/>*/}
                {/*                    </tr>*/}
                {/*                    </thead>*/}
                {/*                    <tbody>*/}
                {/*                    {(this.props.data.terms && this.props.data.terms.length > 0) &&*/}
                {/*                    this.props.data.terms.map((term) => {*/}
                {/*                        return (*/}
                {/*                            <tr key={term.id}>*/}
                {/*                                <td>*/}
                {/*                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"*/}
                {/*                                            data-toggle="tooltip"*/}
                {/*                                            title=""*/}
                {/*                                            type="button"*/}
                {/*                                            rel="tooltip"*/}
                {/*                                            data-placement="right"*/}
                {/*                                            data-original-title={term.name}>*/}
                {/*                                        <img src={helper.validateLinkImage(term.image_url)} alt=""/>*/}
                {/*                                    </button>*/}
                {/*                                </td>*/}
                {/*                                <td>{term.name}</td>*/}
                {/*                                <td>{term.short_description}</td>*/}
                {/*                                <td>*/}
                {/*                                    <ButtonGroupAction*/}
                {/*                                        edit={() => {*/}
                {/*                                            return this.openModalEditTerm(term);*/}
                {/*                                        }}*/}
                {/*                                        delete={() => {*/}
                {/*                                            return this.deleteTerm(term.id);*/}
                {/*                                        }}*/}
                {/*                                        object={term}*/}
                {/*                                    >*/}
                {/*                                        {*/}
                {/*                                            !this.props.isDuplicating &&*/}
                {/*                                            <a data-toggle="tooltip" title="Duplicate"*/}
                {/*                                               type="button"*/}
                {/*                                               onClick={() => {*/}
                {/*                                                   return this.duplicateTerm(term);*/}
                {/*                                               }}*/}
                {/*                                               rel="tooltip"*/}
                {/*                                            >*/}
                {/*                                                <i className="material-icons">control_point_duplicate</i>*/}
                {/*                                            </a>*/}
                {/*                                        }*/}

                {/*                                    </ButtonGroupAction>*/}
                {/*                                </td>*/}
                {/*                            </tr>*/}
                {/*                        );*/}

                {/*                    })}*/}
                {/*                    </tbody>*/}
                {/*                </table>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }

}


coursesCreateEditCurriculum.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    params: PropTypes.object,
    coursesActions: PropTypes.object.isRequired,
    duplicateLesson: PropTypes.func,
    isDuplicating: PropTypes.bool,
    isUploadingTerm: PropTypes.bool.isRequired,
    isUploadingTermIcon: PropTypes.bool.isRequired,
    isChangingLessonEvent: PropTypes.bool.isRequired,
    term: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        data: state.courses.data,
        isDuplicating: state.courses.isDuplicating,
        isUploadingTerm: state.courses.isUploadingTerm,
        isUploadingTermIcon: state.courses.isUploadingTermIcon,
        isChangingLessonEvent: state.courses.isChangingLessonEvent,
        term: state.courses.term,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditCurriculum);

