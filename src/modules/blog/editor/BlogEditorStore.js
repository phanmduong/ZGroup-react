import { observable, computed, action } from "mobx";
import * as blogApi from "../apis/blogApi";

export default new class BlogEditorStore {
    @observable post = {};
    @observable languages = [];
    @observable showAddLanguageModal = false;

    @action
    toggleAddLanguageModal = showModal => {
        this.showAddLanguageModal = showModal;
    };

    @action
    async loadLanguages() {
        const res = await blogApi.loadLanguagesApi();
        this.languages = res.data.data.languages;
    }

    @computed
    get getLanguages() {
        return this.languages.map(language => {
            return {
                label: language.name,
                value: language.encoding,
            };
        });
    }
}();
