import {observable, action, computed} from "mobx";
import * as pageManageApis from "./pageManageApis";
import * as helper from "../../helpers/helper";


export default new class pageManageStore {
    @observable isLoadingPages = false;
    @observable pages = [];
    @observable language_id = 0;
    @observable page_id = 1;
    @observable page = {}; // name,name_en

    @observable item_id = 0;
    @observable isLoadingPageItems = false;
    @observable pageItem = {}; //
    @observable pageItems = [];

    @observable productPage = 0;
    @observable totalProductPages = 0;
    @observable isLoadingProducts = false;
    @observable products = [];
    @observable product = {};
    @observable product_id = 0;


    @observable isCreatingPage = false;
    @observable isOpenAddPageModal = false;

    @observable isOpenAddPageItemModal = false;
    @observable isEditPageItem = false;
    @observable isEdittingPageItem = false;
    @observable isCreatingPageItem = false;

    @observable isOpenAddProductModal = false;
    @observable isEditProduct = false;
    @observable isCreatingProduct = false;
    @observable isEdittingProduct = false;


    //              PAGE
    @action
    loadPages() {
        this.isLoadingPages = true;
        pageManageApis
            .loadPagesApi()
            .then(res => {
                this.pages = res.data.data;
                this.isLoadingPages = false;
                this.loadPageItems(this.pages[0].id);
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingPages = false;
            });
    }
    @action
    createPage() {
        this.isCreatingPage = true;
        pageManageApis
            .createPageApi(this.page)
            .then((res) => {
                this.pages = [...this.pages, res.data];
                this.isCreatingPage = false;
                this.isOpenAddPageModal = false;
                this.page = {};
                helper.showNotification("Thêm trang thành công");
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isCreatingPage = false;
            });
    }




    //                  PAGE_ITEM




    @action
    loadPageItems(page_id) {
        this.isLoadingPageItems = true;
        pageManageApis
            .loadPageItemsApi(page_id)
            .then(res => {
                this.pageItems = res.data.data.page_items;
                this.isLoadingPageItems = false;
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingPageItems = false;
            });
    }
    @action
    editPageItem() {
        this.isEdittingPageItem = true;
        pageManageApis
            .editPageItemApi(this.pageItem)
            .then(() => {
                this.isEdittingPageItem = false;
                this.pageItems = this.pageItems.map((item) => {
                    if (item.id === this.pageItem.id) {
                        return this.pageItem;
                    }
                    return item;
                });
                this.isOpenAddPageItemModal = false;
                helper.showNotification("Sửa " + this.pageItem.name + " thành công");
                this.pageItem = {};
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isEdittingPageItem = false;
            });
    }
    @action
    changeIsActived(id, is_actived, name) {
        pageManageApis
            .changeIsActivedApi(id)
            .then(() => {
                this.pageItems = this.pageItems.map((item) => {

                    if (item.id === id) {
                        return {...item, is_actived: 1 - is_actived};
                    }
                    return item;
                });
                if (is_actived) {
                    helper.showNotification("Đã ẩn " + name);
                } else {
                    helper.showNotification("Đã hiện " + name);
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
            });
    }

    @action
    createPageItem() {
        this.isCreatingPageItem = true;
        pageManageApis
            .createPageItemApi(this.pageItem, this.page_id)
            .then((res) => {
                this.isCreatingPageItem = false;
                this.pageItems = [res.data.data.page_item, ...this.pageItems];
                this.isOpenAddPageItemModal = false;
                helper.showNotification("Thêm " + this.pageItem.name + " thành công");
                this.pageItem = {};
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isCreatingPageItem = false;
            });
    }




    //                          PRODUCT




    @action
    loadProducts(page_id, productPage,language_id) {
        this.productPage = productPage;
        this.isLoadingProducts = true;
        pageManageApis
            .loadProductsApi(page_id, this.productPage,language_id)
            .then(res => {
                this.products = res.data.products;
                this.isLoadingProducts = false;
                this.totalProductPages = res.data.paginator.total_pages;
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingProducts = false;
            });
    }
    @action
    createProduct() {
        this.isCreatingProduct = true;
        pageManageApis
            .createProductApi(this.product, this.page_id,this.language_id)
            .then((res) => {
                this.isCreatingProduct = false;
                this.products = [res.data.product, ...this.products];
                this.isOpenAddProductModal = false;
                helper.showNotification("Thêm " + this.product.title + " thành công");
                this.product = {};
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isCreatingProduct = false;
            });
    }
    @action
    editProduct() {
        this.isEdittingProduct = true;
        pageManageApis
            .editProductApi(this.product,this.language_id)
            .then(() => {
                this.isEdittingProduct = false;
                this.products = this.products.map((product) => {
                    if (product.id === this.product.id) {
                        return this.product;
                    } else return product;
                });
                this.isOpenAddProductModal = false;
                helper.showNotification("Sửa " + this.product.title + " thành công");
                this.product = {};
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isEdittingProduct = false;
            });
    }
    @action
    changeStatus(product_id, status, title) {
        pageManageApis
            .changeStatusApi(product_id)
            .then(() => {
                this.products = this.products.map((item) => {

                    if (item.id === product_id) {
                        return {...item, status: 1 - status};
                    }
                    return item;
                });
                if (status) {
                    helper.showNotification("Đã ẩn " + title);
                } else {
                    helper.showNotification("Đã hiện " + title);
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
            });
    }
    @action
    deleteProduct(product_id) {
        pageManageApis
            .deleteProductApi(product_id)
            .then(() => {
                this.products = this.products.filter((product) =>
                    product.id !== product_id);
                this.isOpenAddProductModal = false;
                helper.showNotification("Xóa thành công");
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
            });
    }



    @computed
    get pagesData() {
        return this.pages.map(function (page) {
            return {
                key: page.id,
                value: page.name
            };
        });
    }
}();
