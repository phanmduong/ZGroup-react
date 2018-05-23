import { observable, computed, action } from "mobx";
import * as blogApi from "../apis/blogApi";
import { htmlToValue, plainToValue } from "../../../components/common/editor/editorHelpers";
export default new class BlogEditorStore {
    @observable
    post = {
        kind: "",
        language_id: 0,
        status: 0,
        publish_status: "",
        content: htmlToValue("")
    };
    @observable languages = [];
    @observable categories = [];
    @observable showAddLanguageModal = false;
    @observable showAddCategoryModal = false;

    @action
    resetPostForm() {
        this.post = {
            kind: "",
            language_id: 0,
            status: 0,
            publish_status: "",
            content: htmlToValue("")
        };
    }

    @action
    loadPostDetail = async postId => {
        const res = await blogApi.getPostApi(postId);
        const { post } = res.data;
        this.post = {
            ...post,
            description: plainToValue(post.description),
            meta_title: plainToValue(post.meta_title),
            keyword: plainToValue(post.keyword),
            meta_description: plainToValue(post.meta_description),
            content: htmlToValue(post.content)
        };
    };

    @action
    toggleAddCategoryModal = showModal => {
        this.showAddCategoryModal = showModal;
    };

    @action
    toggleAddLanguageModal = showModal => {
        this.showAddLanguageModal = showModal;
    };

    @action
    loadCategories = async () => {
        const res = await blogApi.loadCategoriesApi();
        if (res.data.status) {
            this.categories = res.data.data.categories;
        }
    };

    @action
    async loadLanguages() {
        const res = await blogApi.loadLanguagesApi();
        if (res.data.status) {
            this.languages = res.data.data.languages;
        }
    }

    @computed
    get getCategories() {
        return this.categories.map(category => {
            return {
                label: category.name,
                value: category.id
            };
        });
    }

    @computed
    get getLanguages() {
        return this.languages.map(language => {
            return {
                label: language.name,
                value: language.id
            };
        });
    }
}();