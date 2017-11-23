import React                            from 'react';
import PropTypes                        from 'prop-types';
import {Link}                           from 'react-router';
import {bindActionCreators}             from 'redux';
import {connect}                        from 'react-redux';
import  * as coursesActions             from '../coursesActions';
import ButtonGroupAction                from "../../../components/common/ButtonGroupAction";
import {Modal}                          from 'react-bootstrap';
import FormInputText                    from '../../../components/common/FormInputText';
import {NO_IMAGE}                       from '../../../constants/env';
import * as helper                      from '../../../helpers/helper';


class coursesCreateEditDocuments extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openModal: false,
            currentLink: 0,
            link :{
                link_icon_url: NO_IMAGE,
                link_name: "",
                link_description: "",
                link_url: NO_IMAGE,
            },
        };
        this.openModal      = this.openModal.bind(this);
        this.closeModal     = this.closeModal.bind(this);
        this.updateLinkData = this.updateLinkData.bind(this);
        this.uploadLinkIcon = this.uploadLinkIcon.bind(this);
    }

    componentWillMount(){
        //this.props.coursesActions.beginLoadLink();
    }

    componentWillReceiveProps(nextProps){
        console.log('coursesCreateEditDocuments', nextProps);

    }

    openModal(){
        this.setState({openModal: true});
    }
    closeModal(){
        this.setState({openModal: false});
    }

    uploadLinkIcon(event){
        let file = event.target.files[0];
        this.props.coursesActions.uploadLinkIcon(this.state.currentLink,file);
    }

    editLink(link){
        //this.setState({            currentLink: link.index,            openModal: true,            link: link,        });

    }

    updateLinkData(){

    }

    render(){

        return (
            <div>
                <div className="card-content">

                    <Link className="btn btn-rose" onClick={this.openModal}>
                        Thêm Tài Liệu
                    </Link>


                    <div className="table-responsive">

                        <table id="datatables"
                               className="table table-striped table-no-bordered table-hover"
                               cellSpacing="0" width="100%" style={{width: "100%"}}>
                            <thead className="text-rose">
                            <tr>
                                <th/>
                                <th>Tên Link</th>
                                <th>Link</th>
                                <th>Mô tả</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.data.links.map((link)=>{
                                return (
                                    <tr key={link.id}>
                                        <td>
                                            <button className   ="btn btn-round btn-fab btn-fab-mini text-white"
                                                    data-toggle ="tooltip"
                                                    title       =""
                                                    type        ="button"
                                                    rel         ="tooltip"
                                                    data-placement      ="right"
                                                    data-original-title ={link.link_name}>
                                                <img src={link.link_icon_url} alt=""/>
                                            </button>
                                        </td>
                                        <td >{link.link_name}</td>
                                        <td>
                                                <a href={link.link_url} target="_blank">
                                                    <p style={{
                                                        maxWidth: "100px",
                                                        wordWrap: 'break-word',
                                                        whiteSpace: 'initial'}}>
                                                        {link.link_url}
                                                    </p>
                                                </a>
                                        </td>
                                        <td>{link.link_description}</td>
                                        <td>
                                        <ButtonGroupAction
                                            edit={this.editLink(link)}
                                            delete={()=>{}}
                                            object={link}
                                        />
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
                        <Modal.Title>Chỉnh sửa link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-link" onSubmit={(e) => {e.preventDefault();}}>
                            <div className="row">
                                <div className="col-md-12">
                                    <img width={"100%"}  src = {helper.isEmptyInput(this.props.link.link_icon_url) ? NO_IMAGE : this.state.link.link_icon_url} />
                                </div>
                                <div className="col-md-12">
                                    { this.props.isUploadingLinkIcon ?
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
                                                       onChange={this.uploadLinkIcon}
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
                                        label="Tên link"
                                        name="name"
                                        updateFormData={this.updateLinkData}
                                        value={this.state.link.link_name}
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Mô tả"
                                        name="name"
                                        updateFormData={this.updateLinkData}
                                        value={this.state.link.link_description}
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Đường dẫn url"
                                        name="name"
                                        updateFormData={this.updateLinkData}
                                        value={this.state.link.link_url}
                                        type="text"
                                    />
                                </div>
                            </div>
                            {this.props.isEditingStudent ?
                                (
                                    <button
                                        className="btn btn-fill btn-rose disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                )
                                :
                                <div>
                                    <button className="btn btn-rose"
                                            onClick={this.editInfoStudent}
                                    > Cập nhật
                                    </button>
                                    <button className="btn btn-rose"
                                            onClick={this.closeModal}
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

coursesCreateEditDocuments.propTypes = {
    isLoading           : PropTypes.bool.isRequired,
    isUploadingLinkIcon           : PropTypes.bool.isRequired,
    data                : PropTypes.object,
    coursesActions      : PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading           : state.courses.isLoading,
        isUploadingLinkIcon : state.courses.isUploadingLinkIcon,
        data                : state.courses.data,
        link                : state.courses.link,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditDocuments);

