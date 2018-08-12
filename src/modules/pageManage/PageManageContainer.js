import React, {Component} from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import store from "./pageManageStore";
import Loading from "../../components/common/Loading";
// import {observable} from "mobx";
import PropTypes from 'prop-types';
import Select from "../../components/common/Select";
import AddPageModal from "./AddPageModal";
import AddPageItemModal from "./AddPageItemModal";
import ListPageItems from "./ListPageItems";
import ListProducts from "./ListProducts";
import Pagination from "../../components/common/Pagination";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import AddProductModal from "./AddProductModal";
import browserHistory from "react-router/es/browserHistory";


@observer
class PageManageContainer extends Component {
    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.openAddPageModal = this.openAddPageModal.bind(this);
        this.openAddPageItemModal = this.openAddPageItemModal.bind(this);
        this.openAddProduct = this.openAddProduct.bind(this);
    }

    componentWillMount() {
        // console.log(this.props.params.pageId,"xxxxxxxxxxx");
        store.loadPages();
        store.page_id = this.props.params.pageId || 1;                       // route
        this.props.params.pageId ? store.loadProducts(store.page_id, 1, store.language_id) : store.loadProducts(1, 1, store.language_id) ;        // route
    }

    onChangePage(value) {
        store.page_id = value;
        browserHistory.push('/page-manage/page/' + value);              // route
        if (value === '4' || value === '5') {
            store.loadProducts(value, 1, store.language_id);
        }
        store.loadPageItems(value);
    }

    onChangeLanguage(value) {
        store.language_id = value;
        store.loadProducts(store.page_id, 1, value);
    }

    openAddPageModal() {
        store.isOpenAddPageModal = true;
    }

    openAddProduct() {
        store.isOpenAddProductModal = true;
        store.isEditProduct = false;
    }

    openAddPageItemModal() {
        store.isOpenAddPageItemModal = true;
        store.isEditPageItem = false;
    }

    render() {
        const Add = <Tooltip id="tooltip">Thêm</Tooltip>;

        return (
            <div>
                {
                    store.isLoadingPages
                        // || store.isLoadingRoomTypes
                        // || store.isLoadingBases
                        ? (
                            <Loading/>) : (
                            <div>
                                <div className="row">
                                    <div className="col-sm-4 col-xs-6">
                                        <Select
                                            defaultMessage={"Chọn trang"}
                                            options={store.pagesData}
                                            value={store.page_id}
                                            onChange={this.onChangePage}
                                        />
                                    </div>
                                </div>

                                <div className="wrapper">

                                    <div className="card">
                                        <div className="card-content">
                                            <div className="tab-content">

                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <div style={{display: "flex"}}>
                                                        <h4 className="card-title">
                                                            <strong>Danh sách từ khóa</strong>
                                                        </h4>
                                                        {/*<div className="dropdown">*/}
                                                            {/*<button*/}
                                                                {/*className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"*/}
                                                                {/*type="button"*/}
                                                                {/*data-toggle="dropdown">*/}
                                                                {/*<strong>+</strong>*/}
                                                            {/*</button>*/}
                                                            {/*<ul className="dropdown-menu dropdown-primary">*/}
                                                                {/*<li>*/}
                                                                    {/*<a*/}
                                                                        {/*onClick={() => this.openAddPageModal()}*/}
                                                                    {/*>*/}
                                                                        {/*Thêm trang*/}
                                                                    {/*</a>*/}
                                                                {/*</li>*/}
                                                                {/*<li>*/}
                                                                {/*<a*/}
                                                                {/*onClick={() => this.openAddPageItemModal()}*/}
                                                                {/*>*/}
                                                                {/*Thêm từ khóa*/}
                                                                {/*</a>*/}
                                                                {/*</li>*/}
                                                            {/*</ul>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                                <ListPageItems/>
                                            </div>
                                        </div>
                                    </div>


                                    {
                                        store.page_id === '4' || store.page_id === '5' ?
                                            <div>
                                                <div className="row">
                                                    <div className="col-sm-10 col-xs-10"/>
                                                    <div className="col-sm-2 col-xs-2">
                                                        <Select
                                                            defaultMessage={"Chọn ngôn ngữ"}
                                                            options={[{key: 0, value: "Việt Nam"}, {
                                                                key: 1,
                                                                value: "English"
                                                            }]}
                                                            value={store.language_id}
                                                            onChange={this.onChangeLanguage}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="tab-content">

                                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                                <div style={{display: "flex"}}>
                                                                    <h4 className="card-title">
                                                                        <strong>{store.page_id === "4" ? "Ưu đãi " : "Thực đơn"}</strong>
                                                                    </h4>
                                                                    <br/>
                                                                    <div>
                                                                        <OverlayTrigger
                                                                            placement="top"
                                                                            overlay={Add}
                                                                        >
                                                                            <a
                                                                                className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                                                onClick={() => this.openAddProduct()}
                                                                            >
                                                                                <strong>+</strong>
                                                                            </a>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                    {/*<div>*/}
                                                                    {/*<button*/}
                                                                    {/*className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"*/}
                                                                    {/*type="button"*/}
                                                                    {/*data-toggle="dropdown">*/}
                                                                    {/*<strong>+</strong>*/}
                                                                    {/*</button>*/}
                                                                    {/*<ul className="dropdown-menu dropdown-primary">*/}
                                                                    {/*<li>*/}
                                                                    {/*<a*/}
                                                                    {/*onClick={() => this.onChangeLanguage(0)}*/}
                                                                    {/*>*/}
                                                                    {/*vi*/}
                                                                    {/*</a>*/}
                                                                    {/*</li>*/}
                                                                    {/*<li>*/}
                                                                    {/*<a*/}
                                                                    {/*onClick={() => this.onChangeLanguage(1)}*/}
                                                                    {/*>*/}
                                                                    {/*en*/}
                                                                    {/*</a>*/}
                                                                    {/*</li>*/}
                                                                    {/*</ul>*/}
                                                                    {/*</div>*/}

                                                                </div>
                                                                {/*<Select*/}
                                                                    {/*defaultMessage={"Chọn ngôn ngữ"}*/}
                                                                    {/*options={[{key: 0, value: "vi"}, {*/}
                                                                        {/*key: 1,*/}
                                                                        {/*value: "en"*/}
                                                                    {/*}]}*/}
                                                                    {/*value={store.language_id}*/}
                                                                    {/*onChange={this.onChangeLanguage}*/}
                                                                {/*/>*/}
                                                            </div>
                                                            <ListProducts/>
                                                            <Pagination
                                                                totalPages={store.totalProductPages}
                                                                currentPage={store.productPage}
                                                                loadDataPage={(productPage) => store.loadProducts(store.page_id, productPage)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                    }
                                </div>
                            </div>

                        )
                }
                <AddPageModal/>
                <AddPageItemModal/>
                <AddProductModal/>
            </div>
        );
    }
}

PageManageContainer.propTypes = {
    user: PropTypes.object.isRequired,
    params: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(PageManageContainer);
