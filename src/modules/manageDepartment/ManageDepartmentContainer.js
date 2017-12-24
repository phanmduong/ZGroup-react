import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as departmentActions from './departmentActions';
import {Link} from 'react-router';
import Search from '../../components/common/Search';
//import Loading from '../../components/common/Loading';
import ListDepartments from '../../modules/manageDepartment/ListDepartments';
import AddDepartmentModal from '../../modules/manageDepartment/AddDepartmentModal';
import EditDepartmentModal from '../../modules/manageDepartment/EditDepartmentModal';
import _ from 'lodash';
import * as helper      from '../../helpers/helper';

class ManageDepartmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openModalAddDepartment = this.openModalAddDepartment.bind(this);
        this.closeModalAddDepartment = this.closeModalAddDepartment.bind(this);
        this.openModalEditDepartment = this.openModalEditDepartment.bind(this);
        this.closeModalEditDepartment = this.closeModalEditDepartment.bind(this);
        this.addDepartment = this.addDepartment.bind(this);
        this.editDepartment = this.editDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
        this.state = {
            page: 1,
            query: "",
            departments: [],
            openModalAddDepartment: false,
            openModalEditDepartment: false,
            editdata:{},
        };
    }

    componentWillMount() {
        //console.log(this.props);
        this.props.departmentActions.loadDepartment();
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps);
        if(this.props.isLoading && !nextProps.isLoading){
            this.setState({departments: nextProps.data.departments});
        }
    }
    //add
    openModalAddDepartment(){
        this.setState({openModalAddDepartment : true});
    }
    closeModalAddDepartment(){
        this.setState({openModalAddDepartment : false});
    }
    //edit
    openModalEditDepartment(obj){
        this.setState({openModalEditDepartment : true, editdata:obj});
    }
    closeModalEditDepartment(){
        this.setState({openModalEditDepartment : false});
    }
    //actions
    addDepartment(data){
        this.props.departmentActions.addDepartment(data, ()=>{
            this.closeModalAddDepartment();
            this.props.departmentActions.loadDepartment();
        });
    }

    editDepartment(data){
        this.props.departmentActions.editDepartment(data, ()=>{
            this.closeModalEditDepartment();
            this.props.departmentActions.loadDepartment();
        });
    }

    deleteDepartment(obj){
        console.log(obj);
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa bộ phận này không?", () => {
            this.props.departmentActions.deleteDepartment(obj,this.props.departmentActions.loadDepartment);
        });
    }

    render() {
        return (
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header card-header-tabs" data-background-color="rose">
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                                <ul className="nav nav-tabs" data-tabs="tabs">
                                    <li className="">
                                        <Link to="hr/manage/quan-li-nhan-su">
                                            Nhân viên
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/hr/manage-role">
                                            Chức vụ
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link to="/hr/manage-department">
                                            Bộ phận
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <Search
                                        onChange={()=>{}}
                                        value={''}
                                        placeholder="Tìm kiếm bộ phận"
                                        className="col-md-8"
                                    />
                                    <button className="col-md-3 btn-rose btn"
                                        onClick={this.openModalAddDepartment}
                                    >Thêm bộ phận</button>
                                </div>
                            </div>
                            <div className="row">
                                <ListDepartments
                                    isLoading={this.props.isLoading}
                                    data={this.props.data.departments}
                                    edit={this.openModalEditDepartment}
                                    delete={this.deleteDepartment}
                                />
                            </div>
                            <ul className="pagination pagination-primary">
                                {_.range(1, this.props.data.paginator.total_pages + 1).map(page => {
                                    if (Number(this.props.data.paginator.page) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => {}}>{page}</a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => {}}>{page}</a>
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <AddDepartmentModal
                    show={this.state.openModalAddDepartment}
                    onHide={this.closeModalAddDepartment}
                    addDepartment={this.addDepartment}
                    isAddingDepartment={this.props.isLoading}
                />
                <EditDepartmentModal
                    show={this.state.openModalEditDepartment}
                    onHide={this.closeModalEditDepartment}
                    editDepartment={this.editDepartment}
                    isEditingDepartment={this.props.isLoading}
                    data={this.state.editdata}
                />
            </div>
        );
    }
}

ManageDepartmentContainer.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object,

};


function mapStateToProps(state) {
    return {
        isLoading: state.department.isLoading,
        data: state.department.data,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        departmentActions: bindActionCreators(departmentActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDepartmentContainer);
