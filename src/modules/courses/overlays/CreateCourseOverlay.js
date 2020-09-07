import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";
import * as coursesActions from '../coursesActions';

// import TooltipButton from "../../../components/common/TooltipButton";


class CreateBaseOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false
        };
        this.state = this.initState;
    }

    componentWillMount() {
        this.urlType = "/teaching/courses/create";
        this.props.coursesActions.deleteData();
    }

    updateFormData = (event) => {
        let {name, value} = event.target;
        let res = {...this.props.course};
        res[name] = value;
        this.props.coursesActions.updateData(res);
    };
    
    checkValidate = () => {
        let errors = [];
        const {course} = this.props;
        if (helper.isEmptyInput(course.name)) {
            errors.push('Bạn cần nhập tên!');
        }
        if (helper.isEmptyInput(course.description)) {
            errors.push('Bạn cần nhập mô tả ngắn!');
        }
        if (helper.isEmptyInput(course.price)) {
            errors.push('Bạn cần nhập giá!');
        }
        if (helper.isEmptyInput(course.duration)) {
            errors.push('Bạn cần nhập số buổi!');
        }

        errors.forEach((e)=>helper.showErrorNotification(e));

        return !errors.length;
    };
    
    submit = (e) => {
        e.stopPropagation();
        if (this.checkValidate()) {
            this.props.coursesActions.commitCourseData(this.props.course,()=>{
                this.close();
                this.props.coursesActions.loadCourses();

            });
        }
    };


    toggle = () => {
        this.setState({show: !this.state.show});
        this.props.coursesActions.deleteData();
    };


    close = () => {
        this.setState(this.initState);
    };

    render() {
        let {
             className,course,
            isLoading, isCommitting,
            btnStyle, btnText
        } = this.props;

        return (

            <div style={{position: "relative"}}>
                <div className={className} style={{...btnStyle}}
                     ref="target" onClick={this.toggle}>
                    <i className="material-icons">add_circle</i>
                    &nbsp;&nbsp;{btnText || 'Tạo'}
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 10}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Tạo mới</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {isLoading && <Loading/>}
                        {!isCommitting && !isLoading &&
                        <form role="form" id="form-info-student">

                            <div>
                                <label>Tên môn học</label>
                                <FormInputText
                                    name="name"
                                    placeholder="Tên môn học"
                                    required
                                    value={course.name}
                                    updateFormData={this.updateFormData}
                                />
                            </div>
                            <div>
                                <label>Mô tả ngắn</label>
                                <FormInputText
                                    placeholder="Mô tả ngắn"
                                    required
                                    name="description"
                                    updateFormData={this.updateFormData}
                                    value={course.description}
                                />
                            </div>
                            <div>
                                <label>Số buổi</label>
                                <FormInputText
                                    placeholder="Số buổi"
                                    required
                                    name="duration"
                                    updateFormData={this.updateFormData}
                                    value={course.duration}
                                />
                            </div>
                            <div>
                                <label>Học phí</label>
                                <FormInputText
                                    placeholder="Học phí"
                                    required
                                    name="price"
                                    updateFormData={this.updateFormData}
                                    value={course.price}
                                />
                            </div>


                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab"
                                     id="headingTwo">
                                    <a className="collapsed" role="button"
                                       data-toggle="collapse"
                                       data-parent="#accordion"
                                       href="#collapseTwo" aria-expanded="false"
                                       aria-controls="collapseTwo">
                                        <h4 className="panel-title">
                                            Mở rộng
                                            <i className="material-icons">arrow_drop_down</i>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseTwo"
                                     className="panel-collapse collapse"
                                     role="tabpanel"
                                     aria-labelledby="headingTwo"
                                     aria-expanded="false"
                                     style={{height: '0px'}}>
                                    <div className="panel-body">

                                        <div>
                                            <label>Ảnh icon</label>
                                            <FormInputText
                                                placeholder="Nhập link"
                                                name="icon_url"
                                                updateFormData={this.updateFormData}
                                                value={course.icon_url}
                                            />
                                        </div>
                                        <div>
                                            <label>Ảnh đại điện</label>
                                            <FormInputText
                                                placeholder="Nhập link"
                                                name="image_url"
                                                updateFormData={this.updateFormData}
                                                value={course.image_url}
                                            />
                                        </div>
                                        <div>
                                            <label>Ảnh cover</label>
                                            <FormInputText
                                                placeholder="Nhập link"
                                                name="cover_url"
                                                updateFormData={this.updateFormData}
                                                value={course.cover_url}
                                            />
                                        </div>
                                        <div>
                                            <label>Landing Page URL</label>
                                            <FormInputText
                                                placeholder="Landing Page URL"
                                                name="landingpage_url"
                                                updateFormData={this.updateFormData}
                                                value={course.landingpage_url}
                                            />
                                        </div>
                                        <div>
                                            <label>Front Image</label>
                                            <FormInputText
                                                placeholder="Front Image"
                                                name="front_image"
                                                updateFormData={this.updateFormData}
                                                value={course.front_image}
                                            />
                                        </div>
                                        <div>
                                            <label>Back Image</label>
                                            <FormInputText
                                                placeholder="Back Image"
                                                name="back_image"
                                                updateFormData={this.updateFormData}
                                                value={course.back_image}
                                            />
                                        </div>
                                        <div>
                                            <label>Link phần mềm Windows</label>
                                            <FormInputText
                                                placeholder="Link phần mềm Windows"
                                                name="linkwindow"
                                                updateFormData={this.updateFormData}
                                                value={course.linkwindow}
                                            />
                                        </div>
                                        <div>
                                            <label>Link hướng dẫn Windows</label>
                                            <FormInputText
                                                placeholder="Link hướng dẫn Windows"
                                                name="window_how_install"
                                                updateFormData={this.updateFormData}
                                                value={course.window_how_install}
                                            />
                                        </div>
                                        <div>
                                            <label>Link phần mềm Mac</label>
                                            <FormInputText
                                                placeholder="Link phần mềm Mac"
                                                name="linkmac"
                                                updateFormData={this.updateFormData}
                                                value={course.linkmac}
                                            />
                                        </div>
                                        <div>
                                            <label>Link hướng dẫn Mac</label>
                                            <FormInputText
                                                placeholder="Link hướng dẫn Mac"
                                                name="mac_how_install"
                                                updateFormData={this.updateFormData}
                                                value={course.mac_how_install}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        }
                        {isCommitting && <Loading/> }
                        {!(isCommitting || isLoading) &&
                        <div className="flex">
                                <button type="button"
                                        disabled={isCommitting || isLoading}
                                        className="btn btn-white width-50-percent text-center"
                                        data-dismiss="modal"
                                        onClick={this.close}>Hủy</button>
                                <button type="button"
                                        className="btn btn-success width-50-percent text-center"
                                        disabled={isCommitting || isLoading}
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={(e) => this.submit(e)}>
                                    Hoàn tất
                                </button>
                            </div>}

                    </div>
                </Overlay>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        course: state.courses.data,
        isUpdatingAvatar: state.courses.isUpdatingAvatar,
        updateAvatarError: state.courses.updateAvatarError,
        isUpdatingLogo: state.courses.isUpdatingLogo,
        updateLogoError: state.courses.updateLogoError,
        isUpdatingCover: state.courses.isUpdatingCover,
        updateCoverError: state.courses.updateCoverError,
        isCommitting: state.courses.isCommitting,
        commitSuccess: state.courses.commitSuccess,
        link: state.courses.link,
        types: state.courses.types,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBaseOverlay);
