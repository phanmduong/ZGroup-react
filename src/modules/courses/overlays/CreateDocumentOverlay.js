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


class CreateDocumentOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            document: {}
        };
        this.state = {...this.initState};
    }

    updateFormData = (event) => {
        let {name, value} = event.target;
        let res = {...this.state.document};
        res[name] = value;
        this.setState({document: res});
    };

    uploadIcon(url) {
        let document = {...this.state.document};
        document["link_icon_url"] = url;
        this.setState({document});
    }

    componentDidMount() {
        helper.setFormValidation('#form-document');
    }

    submit = (e) => {
        e.stopPropagation();
        if ($('#form-document').valid()) {
            this.props.coursesActions.createLink({...this.state.document, course_id: this.props.course.id}, () => {
                this.close();
            });
        }
    };


    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        this.setState(this.initState);
    };

    render() {
        const {
            className,
            isLoading, isUploadingLink
        } = this.props;
        const {
            document
        } = this.state;

        return (

            <div style={{position: "relative"}}>
                {!this.props.children && <div className={className}
                                              ref="target" onClick={this.toggle}>
                    Thêm tài liệu
                </div>}
                {this.props.children && <div
                    ref="target" onClick={this.toggle}>
                    {this.props.children}
                </div>}
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
                        {!isUploadingLink && !isLoading &&
                        <form role="form" id="form-document">

                            <div>
                                <label>Tên tài liệu</label>
                                <FormInputText
                                    name="link_name"
                                    placeholder="Tên tài liệu"
                                    required
                                    value={document.link_name}
                                    updateFormData={this.updateFormData}
                                />
                            </div>
                            <div>
                                <label>Đường dẫn</label>
                                <FormInputText
                                    placeholder="Đường dẫn"
                                    required
                                    name="link_url"
                                    updateFormData={this.updateFormData}
                                    value={document.link_url}
                                />
                            </div>
                            <div>
                                <label>Mô tả ngắn</label>
                                <FormInputText
                                    placeholder="Mô tả ngắn"
                                    required
                                    name="link_description"
                                    updateFormData={this.updateFormData}
                                    value={document.link_description}
                                />
                            </div>
                            {/*<div className="panel panel-default">*/}
                            {/*    <div className="panel-heading" role="tab"*/}
                            {/*         id="headingTwo">*/}
                            {/*        <a className="collapsed" role="button"*/}
                            {/*           data-toggle="collapse"*/}
                            {/*           data-parent="#accordion"*/}
                            {/*           href="#collapseTwo" aria-expanded="false"*/}
                            {/*           aria-controls="collapseTwo">*/}
                            {/*            <h4 className="panel-title">*/}
                            {/*                Mở rộng*/}
                            {/*                <i className="material-icons">arrow_drop_down</i>*/}
                            {/*            </h4>*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*    <div id="collapseTwo"*/}
                            {/*         className="panel-collapse collapse"*/}
                            {/*         role="tabpanel"*/}
                            {/*         aria-labelledby="headingTwo"*/}
                            {/*         aria-expanded="false"*/}
                            {/*         style={{height: '0px'}}>*/}
                            {/*        <div className="panel-body">*/}

                            {/*            <div>*/}
                            {/*                <label>Ảnh icon</label>*/}
                            {/*                <ImageUploader*/}
                            {/*                    handleFileUpload={this.uploadIcon}*/}
                            {/*                    tooltipText="Chọn ảnh icon"*/}
                            {/*                    image_url={document.link_icon_url}*/}
                            {/*                    image_size={2}*/}
                            {/*                />*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>

                        }
                        {isUploadingLink && <Loading/>}
                        {!(isUploadingLink || isLoading) &&
                        <div className="flex">
                            <button type="button"
                                    disabled={isUploadingLink || isLoading}
                                    className="btn btn-white width-50-percent text-center"
                                    data-dismiss="modal"
                                    onClick={this.close}>Hủy
                            </button>
                            <button type="button"
                                    className="btn btn-success width-50-percent text-center"
                                    disabled={isUploadingLink || isLoading}
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
        isUploadingLink: state.courses.isUploadingLink,
        course: state.courses.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocumentOverlay);
