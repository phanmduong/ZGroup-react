import { observable } from "mobx";
export default new class BlogEditorStore {
    @observable post = { title: "" };
}();
