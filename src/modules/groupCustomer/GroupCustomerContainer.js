import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
// import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GroupCustomerItem from './GroupCustomerItem';
import {Modal} from 'react-bootstrap';
import GroupCustomerModal from './GroupCustomerModal';


class GroupCustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentWillMount() {
    }
    openModal() {
        //      set dữ liệu về rỗng trước khi mở modal add
        // let customer = {
        //     name: '',
        //     phone: '',
        //     email: '',
        //     address: '',
        //     gender: '',
        //     birthday: '',
        // };
        // this.props.customerActions.updateAddCustomerFormData(customer);
        this.setState({isShowModal: true});
    }

    closeModal() {

        // gán các giá trị trong biến tạm customer về rỗng khi đóng modal => để sử dụng mở add
        this.setState({isShowModal: false});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">


                    <div className="card-header card-header-tabs" data-background-color="rose">
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                                <ul className="nav nav-tabs" data-tabs="tabs">
                                    <li className="">
                                        <Link to="goods/customer">
                                            Khách hàng
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="goods/supplier">
                                            Nhà cung cấp
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link to="goods/group-customer">
                                            Nhóm khách hàng
                                            <div className="ripple-container"/>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="card-content">
                        <div style={{marginTop: 15}}>
                            <a className="btn btn-rose" onClick={() => {this.openModal();}}>Thêm dự án</a>
                        </div>


                        {/*<div>*/}
                        {/*<div className="form-group">*/}
                        {/*<input type="search" className="form-control"*/}
                        {/*placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"*/}
                        {/*defaultValue/>*/}
                        {/*</div>*/}
                        {/*</div>*/}


                        <div className="row">
                            <GroupCustomerItem
                            openModal = {this.openModal}
                            />
                            <GroupCustomerItem
                                openModal = {this.openModal}
                            />
                            <GroupCustomerItem/>
                        </div>


                    </div>
                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            <li className="active"><a>1</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Modal show={this.state.isShowModal} bsSize="large" bsStyle="primary" onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>
                            <strong>Thêm khách hàng</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card">
                            <form id="form-add-customer">
                                <GroupCustomerModal/>
                                {/*<AddCustomerModal*/}
                                    {/*updateFormData={this.updateFormData}*/}
                                    {/*customer={this.props.customer}*/}
                                {/*/>*/}
                                {/*{this.props.isSaving ?*/}
                                    {/*(*/}
                                        {/*<button*/}
                                            {/*className="btn btn-sm btn-success disabled"*/}
                                        {/*>*/}
                                            {/*<i className="fa fa-spinner fa-spin"/>*/}
                                            {/*Đang cập nhật*/}
                                        {/*</button>*/}
                                    {/*)*/}
                                    {/*:*/}
                                    {/*(*/}
                                        <button className="btn btn-success btn-sm">
                                            <i className="material-icons">save</i> Lưu
                                        </button>
                                {/*)*/}
                                {/*}*/}
                                <button className="btn btn-sm btn-danger">
                                    <i className="material-icons">cancel</i> Huỷ
                                </button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
            ;
    }
}


GroupCustomerContainer.propTypes = {
    // isSaving: PropTypes.bool,

};

function mapStateToProps(state) {
    return {
        // isSaving: state.groupCustomer.isSaving,
    };
}

function mapDispatchToProps() {
    return {
        // taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCustomerContainer);