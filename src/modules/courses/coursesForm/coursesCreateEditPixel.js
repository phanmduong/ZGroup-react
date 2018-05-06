import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import {Modal} from 'react-bootstrap';
import FormInputText from '../../../components/common/FormInputText';
import * as helper from '../../../helpers/helper';

class coursesCreateEditPixel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openModal: false,
            currentLink: 0,
            link: {
                id: "",
                name: "",
                code: "",
            },
        };
        this.isCreate = true;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updatePixelData = this.updatePixelData.bind(this);
        this.uploadLinkIcon = this.uploadLinkIcon.bind(this);
        this.openModalEditPixel = this.openModalEditPixel.bind(this);
        this.commitPixel = this.commitPixel.bind(this);
        this.deletePixel = this.deletePixel.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-edit-pixel');
    }

    componentWillReceiveProps() {
        helper.setFormValidation('#form-edit-pixel');
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-edit-pixel');
    }

    openModal() {
        this.isCreate = true;
        this.setState({openModal: true});
        let pixel = {
            name: "",
            code: "",
        };
        this.props.coursesActions.editPixel(pixel);
    }

    closeModal() {
        this.setState({openModal: false});
    }

    uploadLinkIcon(event) {
        let file = event.target.files[0];
        if (helper.checkFileSize(file, 2))
            this.props.coursesActions.uploadLinkIcon(this.props.link, file);
    }

    openModalEditPixel(pixel) {
        this.isCreate = false;
        this.setState({openModal: true});
        this.props.coursesActions.editPixel(pixel);
    }

    deletePixel(id) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa pixel này không?", () => {
            this.props.coursesActions.deletePixel(id, () => {
                return this.props.coursesActions.loadOneCourse(this.props.data.id);
            });
        });
    }


    updatePixelData(e) {
        const feild = e.target.name;
        const value = e.target.value;
        let pixel = {...this.props.pixel};
        pixel[feild] = value;
        this.props.coursesActions.updatePixelData(pixel);
    }

    commitPixel() {
        if (this.checkValidate())
            if (this.isCreate) {
                this.props.coursesActions.createPixel(this.props.data.id, this.props.pixel, () => {
                    this.setState({openModal: false});
                    this.props.coursesActions.loadOneCourse(this.props.data.id);
                });
            } else {
                this.props.coursesActions.commitEditPixel(this.props.pixel.id, this.props.pixel, () => {
                    this.setState({openModal: false});
                    this.props.coursesActions.loadOneCourse(this.props.data.id);
                });
            }


    }

    checkValidate() {

        if ($('#form-edit-pixel').valid()) {
            return true;
        }
        return false;
    }

    render() {

        return (
            <div>
               <div className="col-md-12">
                <div className="card">
                    <div className="card-content">

                        <div className="flex-row flex">
                            <h5 className="card-title">
                                <strong>Pixel</strong>
                            </h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                    type="button"
                                    data-toggle="tooltip"
                                    data-original-title="Thêm pixel"
                                    onClick={this.openModal}
                                >
                                    <strong>+</strong>
                                </button>
                            </div>

                        </div>
                        {/*<Link className="btn btn-rose" onClick={this.openModal}>*/}
                            {/*Thêm Pixel*/}
                        {/*</Link>*/}


                        <div className="table-responsive">

                            <table id="datatables"
                                   className="table table-striped table-no-bordered table-hover"
                                   cellSpacing="0" width="100%" style={{width: "100%"}}>
                                <thead className="text-rose">
                                <tr>
                                    <th>Tên pixel</th>
                                    <th>Code</th>
                                    <th>Người tạo</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {(this.props.data.pixels && this.props.data.pixels.length > 0) &&
                                this.props.data.pixels.map((pixel) => {
                                    return (
                                        <tr key={pixel.id}>
                                            <td>{pixel.name}</td>
                                            <td>{pixel.code}</td>
                                            <td>{pixel.staff.name}</td>
                                            <td>
                                                <ButtonGroupAction
                                                    edit={() => {
                                                        return this.openModalEditPixel(pixel);
                                                    }}
                                                    delete={() => {
                                                        return this.deletePixel(pixel.id);
                                                    }}
                                                    object={pixel}
                                                />
                                            </td>
                                        </tr>
                                    );

                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
               </div>
                <Modal show={this.state.openModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.isCreate ? "Thêm" : "Chỉnh sửa"} pixel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-pixel" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Tên pixel"
                                        name="name"
                                        required
                                        updateFormData={this.updatePixelData}
                                        value={this.props.pixel.name}
                                        type="text"
                                        disabled={this.props.isUploadingPixelIcon}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <FormInputText
                                        label="Code"
                                        name="code"
                                        required
                                        updateFormData={this.updatePixelData}
                                        value={this.props.pixel.code}
                                        type="text"
                                        disabled={this.props.isUploadingPixelIcon}
                                    />
                                </div>
                            </div>
                            {this.props.isUploadingPixel ?
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
                                            onClick={this.commitPixel}
                                            disabled={this.props.isUploadingPixel}
                                    > Cập nhật
                                    </button>
                                    <button className="btn btn-rose"
                                            onClick={this.closeModal}
                                            disabled={this.props.isUploadingPixel}
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

coursesCreateEditPixel.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isUploadingPixel: PropTypes.bool.isRequired,
    data: PropTypes.object,
    pixel: PropTypes.object,
    coursesActions: PropTypes.object.isRequired,
    loadOneCourse: PropTypes.func,
    createLink: PropTypes.func,
    commitEditLink: PropTypes.func,
    editLink: PropTypes.func,
    link: PropTypes.string,
    isUploadingPixelIcon: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        isUploadingPixel: state.courses.isUploadingPixel,
        data: state.courses.data,
        pixel: state.courses.pixel,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditPixel);

