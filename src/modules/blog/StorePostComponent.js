import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from '../../components/common/Loading';
import {linkUploadImageEditor} from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import * as helper from '../../helpers/helper';
import {NO_IMAGE} from '../../constants/env';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';
import AddCategoryModal from "./AddCategoryModal";
import {Modal} from 'react-bootstrap';


// import ReactSelect from "react-select";

// let tmpCategories;
//
// function addSelect(categories) {
//     tmpCategories = categories.map((item) => {
//         return {"value": item.value, "label": item.text};
//         // subscriptionKinds = [...tmpSubscriptionKinds , ...{value : item.id,label : item.name}];
//     });
//     return tmpCategories;
// }

class StorePostComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isOpenModal: false};
        this.openAddCategoryModal = this.openAddCategoryModal.bind(this);
        this.closeAddCategoryModal = this.closeAddCategoryModal.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-post');
        helper.setFormValidation('#form-category');
        // $("#mini-editor").mini_editor();
    }

    componentDidUpdate() {
        $("#tags").tagsinput();
    }

    openAddCategoryModal() {
        this.setState({isOpenModal: true});
    }

    closeAddCategoryModal() {
        this.setState({isOpenModal: false});
    }

    render() {
        let {title, description, content, imageUrl, tags, category, isUpdatingImage, isSaving, isPreSaving} = this.props.post;
        return (

            <div>
                <form role="form" id="form-post">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                                {this.props.isLoadingPost ? <Loading/>
                                    :
                                    <div className="row">
                                        <label className="label-control">Ảnh đại diện</label>
                                        {isUpdatingImage ?
                                            <Loading/>
                                            :

                                            <TooltipButton text="Chọn ảnh đại diện" placement="top">
                                                <a type="button" style={{
                                                    width: "100%",
                                                    marginBottom: "10px",
                                                    textAlign: "center",
                                                    verticalAlign: "middle",
                                                    border: "0 none",
                                                    display: "inline-block"
                                                }}>
                                                    <img
                                                        src={helper.isEmptyInput(imageUrl) ?
                                                            NO_IMAGE : imageUrl
                                                        }
                                                        style={{
                                                            lineHeight: "164px",
                                                            height: "auto",
                                                            width: "100%",
                                                            display: "block",
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                            borderRadius: "10px",
                                                        }}
                                                    />
                                                    <input type="file"
                                                           accept=".jpg,.png,.gif"
                                                           onChange={this.props.handleFileUpload}
                                                           style={{
                                                               cursor: 'pointer',
                                                               opacity: "0.0",
                                                               position: "absolute",
                                                               top: 0,
                                                               left: 0,
                                                               bottom: 0,
                                                               right: 0,
                                                               width: "100%",
                                                               height: "10%"
                                                           }}
                                                    />
                                                </a>
                                            </TooltipButton>

                                        }


                                        <FormInputText
                                            label="Tên bài viết"
                                            required
                                            name="title"
                                            updateFormData={this.props.updateFormPostData}
                                            value={title}
                                        />
                                        <FormInputText
                                            height="100%"
                                            label="Mô tả ngắn"
                                            required
                                            name="description"
                                            updateFormData={this.props.updateFormPostData}
                                            value={description}
                                        />





                                        {/*<label className="label-control">Chọn gói đăng kí</label>*/}
                                        {/*<div style={{marginTop: 40}}>*/}
                                            {/*<div className="row">*/}
                                                {/*<div className="col-md-12" style={{display: "flex"}}>*/}
                                                    {/*<div style={{width: "-webkit-fill-available", marginRight: 10}}>*/}
                                                        {/*<ReactSelect*/}
                                                            {/*value={category}*/}
                                                            {/*options={addSelect(this.props.categories)}*/}
                                                            {/*onChange={this.props.updateFormPostData}*/}
                                                            {/*placeholder="Chọn gói đăng kí"*/}
                                                            {/**/}
                                                        {/*/>*/}
                                                    {/*</div>*/}
                                                    {/*<div style={{marginTop: -6}}>*/}
                                                        {/*<TooltipButton placement="top" text="Thêm loại gói đăng kí">*/}
                                                            {/*<a className="btn btn-rose btn-sm"*/}
                                                               {/*onClick={() => {*/}
                                                                   {/*this.openModal({});*/}
                                                               {/*}}>*/}
                                                                {/*<i className="material-icons">control_point</i>*/}
                                                            {/*</a>*/}
                                                        {/*</TooltipButton>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}





                                        <label>Nhóm bài viết</label>
                                        <div className="row">
                                            <div className="col-md-12" style={{display: "flex"}}>
                                                <div style={{width: "-webkit-fill-available", marginRight: 10}}>
                                                    <select
                                                        className="form-control"
                                                        value={category}
                                                        onChange={this.props.updateFormPostData}
                                                        name="category">
                                                        {this.props.categories !== null && this.props.categories !== undefined &&
                                                        this.props.categories.map((item, key) => {
                                                            return (
                                                                <option key={key}
                                                                        value={item.value}>
                                                                    {item.text}
                                                                </option>);
                                                        })}
                                                    </select>
                                                </div>
                                                <div style={{marginTop: 17}}>
                                                    <TooltipButton placement="top" text="Thêm nhóm bài viết">
                                                        <a className="btn btn-rose btn-sm"
                                                           onClick={() => {
                                                               this.props.openModal();
                                                               this.openAddCategoryModal();
                                                           }}>
                                                            <i className="material-icons">control_point</i>
                                                        </a>
                                                    </TooltipButton>

                                                </div>

                                            </div>
                                        </div>
                                        <input type="text" className="tagsinput" data-role="tagsinput"
                                               data-color="rose" value={tags}
                                               name="tags" placeholder="Tags" id="tags"/>
                                    </div>
                                }






                                <div className="row">
                                    <label className="control-label">Nội dung</label>
                                    <star style={{color: "red"}}>*</star>
                                    {this.props.isLoadingPost ? <Loading/>
                                        :
                                        <div>
                                            <ReactEditor
                                                urlPost={linkUploadImageEditor()}
                                                fileField="image"
                                                updateEditor={this.props.updateEditor}
                                                value={content}
                                            />

                                            {/*<div id = "mini-editor"/>*/}
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginTop: 40
                                            }}>
                                                {isPreSaving ?
                                                    (
                                                        <button className="btn btn-fill btn-default" type="button">
                                                            <i className="fa fa-spinner fa-spin disabled"/> Đang tạo
                                                            bài
                                                            viết
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        <button className="btn btn-fill btn-default"
                                                                type="button" onClick={this.props.preSavePost}>Xem
                                                            thử
                                                        </button>
                                                    )

                                                }
                                                {isSaving ?
                                                    (
                                                        <button className="btn btn-fill btn-rose" type="button">
                                                            <i className="fa fa-spinner fa-spin disabled"/> Đang
                                                            đăng bài
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        <button className="btn btn-fill btn-rose" type="button"
                                                                onClick={() => {
                                                                    this.props.savePost();
                                                                }}>Đăng bài
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </form>


                <Modal show={this.state.isOpenModal} bsSize="sm" bsStyle="primary" onHide={this.closeAddCategoryModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 className="card-title">Thêm nhóm bài viết</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddCategoryModal
                            category={this.props.category}
                            updateFormCategory={this.props.updateFormCategory}
                            createCategory={this.props.createCategory}
                            closeAddCategoryModal={this.closeAddCategoryModal}
                        />
                    </Modal.Body>
                </Modal>


            </div>
        );
    }
}

StorePostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    updateFormPostData: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    preSavePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    updateFormCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    category: PropTypes.object.isRequired,
    createCategory: PropTypes.func.isRequired,
    isLoadingPost: PropTypes.bool.isRequired,
};


export default StorePostComponent;
