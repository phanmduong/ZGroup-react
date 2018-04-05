/**
 * Created by phanmduong on 8/31/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import ListGen from './ListGen';
import _ from 'lodash';
import * as genActions from './genActions';
import FormInputText from '../../components/common/FormInputText';
import FormInputDate from '../../components/common/FormInputDate';
import {Modal} from 'react-bootstrap';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class GensContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            gen: {},
            showModal: false
        };
        this.loadGens = this.loadGens.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.updateFormDataState = this.updateFormDataState.bind(this);
        this.addGen = this.addGen.bind(this);
        this.editGen = this.editGen.bind(this);
        this.deleteGen = this.deleteGen.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeTeachStatus = this.changeTeachStatus.bind(this);
    }

    componentWillMount() {
        this.loadGens();
    }

    componentDidMount() {
        helper.setFormValidation('#form-add-gen');
    }

    loadGens(page = 1) {
        this.setState({page});
        this.props.genActions.loadGensData(page);
    }

    updateFormData(event) {
        const field = event.target.name;
        let gen = {...this.props.gen};
        gen[field] = event.target.value;
        this.props.genActions.updateGenFormData(gen);
    }

    updateFormDataState(event) {
        const field = event.target.name;
        let gen = {...this.state.gen};
        gen[field] = event.target.value;
        this.setState({gen: gen});
    }

    addGen() {
        this.props.genActions.addGen(this.props.gen);
    }

    editGen() {
        this.props.genActions.editGen(this.state.gen, this.closeModal);
    }

    onClickEdit(gen) {
        helper.setFormValidation('#form-edit-gen');
        this.setState({
            gen: gen
        });
        this.openModal();
    }

    deleteGen(gen) {
        this.props.genActions.deleteGen(gen.id);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({showModal: true});
    }

    changeStatus(gen) {
        if (gen.status === 1) {
            helper.showTypeNotification('Bạn phải có ít nhất 1 khóa tuyển sinh');
        } else {
            this.props.genActions.changeStatus(gen.id);
        }

    }

    changeTeachStatus(gen) {
        if (gen.teach_status === 1) {
            helper.showTypeNotification('Bạn phải có ít nhất 1 khóa hiện tại');
        } else {
            this.props.genActions.changeTeachStatus(gen.id);
        }

    }

    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong style={{marginLeft: 6}}>Danh sách khóa học</strong>
                                        </h4>
                                        <br/><br/>
                                        {this.props.isLoading ? <Loading/> :
                                            <ListGen
                                                gens={this.props.gens}
                                                onClickEdit={this.onClickEdit}
                                                deleteGen={this.deleteGen}
                                                changeStatus={this.changeStatus}
                                                changeTeachStatus={this.changeTeachStatus}
                                            />
                                        }
                                        <ul className="pagination pagination-primary">
                                            {_.range(1, this.props.totalPages + 1).map(page => {
                                                if (Number(this.state.page) === page) {
                                                    return (
                                                        <li key={page} className="active">
                                                            <a onClick={() => this.loadGens(page)}>{page}</a>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li key={page}>
                                                            <a onClick={() => this.loadGens(page)}>{page}</a>
                                                        </li>
                                                    );
                                                }

                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Tạo khóa học</strong>
                                        </h4>
                                        <form id="form-add-gen" onSubmit={(e) => {
                                            e.preventDefault();
                                        }}>
                                            <FormInputText
                                                label="Tên khóa"
                                                name="name"
                                                updateFormData={this.updateFormData}
                                                value={this.props.gen.name}
                                                required={true}
                                                type="text"
                                            />
                                            <FormInputText
                                                label="Mô tả"
                                                name="description"
                                                updateFormData={this.updateFormData}
                                                value={this.props.gen.description}
                                                required={true}
                                                type="text"
                                            />
                                            <FormInputDate
                                                label="Thời gian bắt đầu"
                                                name="start_time"
                                                updateFormData={this.updateFormData}
                                                value={this.props.gen.start_time ? this.props.gen.start_time.slice(0, 10) : ''}
                                                id="form-start-time"
                                            />
                                            <FormInputDate
                                                label="Thời gian kết thúc"
                                                name="end_time"
                                                updateFormData={this.updateFormData}
                                                value={this.props.gen.end_time ? this.props.gen.end_time.slice(0, 10) : ''}
                                                id="form-end-time"
                                            />
                                        </form>
                                        {
                                            this.props.isSaving ?
                                                (
                                                    <button
                                                        className="btn btn-fill btn-rose disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/> Đang tạo
                                                    </button>
                                                )
                                                :
                                                <button
                                                    className="btn btn-fill btn-rose"
                                                    onClick={this.addGen}
                                                >
                                                    Tạo
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa khóa học</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-gen" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText
                                label="Tên khóa"
                                name="name"
                                updateFormData={this.updateFormDataState}
                                value={this.state.gen.name}
                                required={true}
                                type="text"
                            />
                            <FormInputText
                                label="Mô tả"
                                name="description"
                                updateFormData={this.updateFormDataState}
                                value={this.state.gen.description}
                                required={true}
                                type="text"
                            />
                            <FormInputDate
                                label="Thời gian bắt đầu"
                                name="start_time"
                                updateFormData={this.updateFormDataState}
                                value={this.state.gen.start_time ? this.state.gen.start_time.slice(0, 10) : ''}
                                id="form-start-time-state"
                            />
                            <FormInputDate
                                label="Thời gian kết thúc"
                                name="end_time"
                                updateFormData={this.updateFormDataState}
                                value={this.state.gen.end_time ? this.state.gen.end_time.slice(0, 10) : ''}
                                id="form-end-time-state"
                            />
                            {
                                this.props.isEditing ?
                                    (
                                        <button
                                            className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                        </button>
                                    )
                                    :
                                    <button
                                        className="btn btn-fill btn-rose"
                                        onClick={this.editGen}
                                    >
                                        Cập nhật
                                    </button>
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

GensContainer.propTypes = {
    genActions: PropTypes.object.isRequired,
    gens: PropTypes.array.isRequired,
    gen: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.gens.gens,
        isLoading: state.gens.isLoading,
        isSaving: state.gens.isSaving,
        isEditing: state.gens.isEditing,
        totalPages: state.gens.totalPages,
        currentPage: state.gens.currentPage,
        gen: state.gens.gen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        genActions: bindActionCreators(genActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GensContainer);
