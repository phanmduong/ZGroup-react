import {observable, action, computed} from "mobx";
import * as pageManageApis from "./pageManageApis";
import * as helper from "../../helpers/helper";


export default new class pageManageStore {
    @observable isLoadingPages = false;
    @observable pages = [];
    @observable page_id = 0;
    @observable page = {}; // name,name_en

    @observable item_id = 0;
    @observable isLoadingPageItems = false;
    @observable pageItem = {}; //
    @observable pageItems = [];

    @observable isEditPageItem = false;

    @observable isCreatingPage = false;
    @observable isCreatingPageItem = false;
    @observable isOpenAddPageModal = false;
    @observable isOpenAddPageItemModal = false;

    @observable isEdittingPageItem = false;


    @action
    loadPages() {
        this.isLoadingPages = true;
        pageManageApis
            .loadPagesApi()
            .then(res => {
                this.pages = res.data.data;
                this.isLoadingPages = false;
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
                        return {...item, is_actived: 1- is_actived};
                    }
                    return item;
                });
                if (is_actived) {
                    helper.showNotification("Đã ẩn" + name);
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
