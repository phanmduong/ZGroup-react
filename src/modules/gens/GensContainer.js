/**
 * Created by phanmduong on 8/31/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import ListGen from './ListGen';
// import _ from 'lodash';
import * as genActions from './genActions';
import FormInputText from '../../components/common/FormInputText';
import FormInputDate from '../../components/common/FormInputDate';
import {Modal} from 'react-bootstrap';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import Pagination from "../../components/common/Pagination";
import GenOverviewContainer from "./GenOverviewContainer";

class GensContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            gen: {},
            selectedGen: {},
            showModal: false,
            showModalOverview: false
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
        this.props.genActions.loadBasesData();
    }

    componentDidMount() {
        helper.setFormValidation('#form-add-gen');
    }

    loadOverview = (gen, base_id)=>{
        this.props.genActions.loadOverview(gen.id, base_id);
        this.setState({selectedGen: gen, showModalOverview: true});
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
    toggleOverviewModal = (showModalOverview) => {
        this.setState({showModalOverview});
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

    exportSalesSalary = (data)=>{
        let wb = helper.newWorkBook();
        let cols = [{ "wch": 5 }, { "wch": 22 }, { "wch": 10 }, { "wch": 10 }, { "wch": 10 }, { "wch": 10 },];//độ rộng cột
        //begin
        let salary = data.map((item, index) => {
            /* eslint-disable */
            let res = {
                'STT': index + 1,
                'Họ và tên': item.name,
                'Lương cơ bản': item.salary,
                'Tổng doanh thu': item.sum_paid_personal,
                'Tổng số đơn': item.total_registers,
                'Tổng số đơn đã nộp tiền': item.total_paid_registers,

            };
            item.courses.forEach((obj) => {
                if(obj.count) res = { ...res, [`${obj.name}`]: obj.count };
            });
            return res;
            /* eslint-enable */
        });
        helper.appendJsonToWorkBook(salary, wb, 'Sales', cols);
        //end
        //xuất file
        helper.saveWorkBookToExcel(wb, 'Sales');
    }

    render() {

        return (
            <div>
                <Modal
                    show={this.props.isLoadingExcel}
                    onHide={() => {}}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>
                <GenOverviewContainer
                    showModalOverview={this.state.showModalOverview}
                    toggleOverviewModal={this.toggleOverviewModal}
                    gen={this.state.selectedGen}
                    overview={this.props.overview}
                    isLoadingOverview={this.props.isLoadingOverview}
                />
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong style={{marginLeft: 6}}>Danh sách khóa học</strong>
                                        </h4>
                                        
                                        <br/>
                                        {this.props.isLoading ? <Loading/> :
                                            <ListGen
                                                user={this.props.user}
                                                gens={this.props.gens}
                                                bases={this.props.bases}
                                                onClickEdit={this.onClickEdit}
                                                loadOverview={this.loadOverview}
                                                deleteGen={this.deleteGen}
                                                changeStatus={this.changeStatus}
                                                changeTeachStatus={this.changeTeachStatus}
                                                getSalarySales={(id)=>this.props.genActions.getSalarySales(id, this.exportSalesSalary)}
                                            />
                                        }
                                        <br/>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right'}}>
                                                <b style={{marginRight: '15px'}}>
                                                        Hiển thị kêt quả từ {this.props.totalCount ? (this.props.currentPage - 1) * 7 + 1 : 0}
                                                        - {this.props.currentPage < this.props.totalPages ? this.props.currentPage * 7 : this.props.totalCount}/{this.props.totalCount}</b><br/>
                                                <Pagination
                                                    totalPages={this.props.totalPages}
                                                    currentPage={this.props.currentPage}
                                                    loadDataPage={this.loadGens || 0}
                                                />
                                            </div>
                                        </div>
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
    bases: PropTypes.array.isRequired,
    gen: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isLoadingExcel: PropTypes.bool.isRequired,
    isLoadingOverview: PropTypes.bool.isRequired,
    showModalOverview: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    overview: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.gens.gens,
        bases: state.gens.bases,
        isLoading: state.gens.isLoading,
        isSaving: state.gens.isSaving,
        isEditing: state.gens.isEditing,
        showModalOverview: state.gens.showModalOverview,
        totalPages: state.gens.totalPages,
        isLoadingExcel: state.gens.isLoadingExcel,
        isLoadingOverview: state.gens.isLoadingOverview,
        currentPage: state.gens.currentPage,
        totalCount: state.gens.totalCount,
        overview: state.gens.overview,
        user: state.login.user,
        gen: state.gens.gen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        genActions: bindActionCreators(genActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GensContainer);
