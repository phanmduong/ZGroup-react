import {observable, action, computed} from "mobx";
import * as pageManageApis from "./pageManageApis";
import * as helper from "../../helpers/helper";


export default new class pageManageStore {
    @observable isLoadingPages = false;
    @observable pages = [];
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
    @observable product = {
        isUpdatingImage : false,
        imageUrl : '',

    };
    @observable product_id = 0;

    @observable isEditPageItem = false;

    @observable isCreatingPage = false;
    @observable isCreatingPageItem = false;
    @observable isOpenAddPageModal = false;
    @observable isOpenAddPageItemModal = false;

    @observable isOpenAddProductModal = false;

    @observable isEdittingPageItem = false;


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
    loadPageItems(page_id) {
        this.isLoadingPageItems = true;
        pageManageApis
            .loadPageItemsApi(page_id)
            .then(res => {
                // this.pageItems = _.map(_.toPairs(res.data.data.page_item), d => _.fromPairs([d]));
                this.pageItems = res.data.data.page_items;
                // console.log(this.pageItems,'aaaaaaa',_.map(_.toPairs(res.data.data.page_item), d => _.fromPairs([d])));
                this.isLoadingPageItems = false;
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingPageItems = false;
            });
    }

    @action
    loadProducts(page_id, productPage) {
        this.productPage = productPage;
        this.isLoadingProducts = true;
        pageManageApis
            .loadProductsApi(page_id, this.productPage)
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
                //     this.pageItems.map((item) => {
                //     if (item.id === this.pageItem.id) {
                //         return this.pageItem;
                //     }
                //     return item;
                // });
                this.isOpenAddPageItemModal = false;
                helper.showNotification("Thêm " + this.pageItem.name + " thành công");
                this.pageItem = {};
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                this.isCreatingPageItem = false;
            });
    }

    @action
    uploadImageSuccess(imageUrl) {
            this.product = {
            ...this.product,
            isUpdatingImage: false,
            updateImageError: false,
            imageUrl: imageUrl,
        };
    }

    @action
    uploadImageFailed() {
        this.product = {
            ...this.product,
            isUpdatingImage: false,
            updateImageError: true,
        };
    }

    @action
    uploadImage(file) {
        this.product = {
            ...this.product,
            isUpdatingImage: true,
            updateImageError: false,
        };
        pageManageApis.uploadImage(
            file,
            function (event) {
                let data = JSON.parse(event.currentTarget.response);
                this.uploadImageSuccess(data.link);
            },
            () => {
                helper.showErrorNotification("Đăng ảnh thất bại.");
                this.uploadImageFailed();
            },
        );
    }


    @computed
    get pagesData() {
        return this.pages.map(function (page) {
            return {
                key: page.id,
                value: page.name
            };
        });
        // return [
        //     {
        //         key: 0,
        //         value: "Tất cả"
        //     },
        //     ...pagesData
        // ];
    }
}();
