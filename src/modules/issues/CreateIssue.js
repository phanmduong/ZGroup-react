import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import FormInputText from "../../components/common/FormInputText";
import ReactEditor from "../../components/common/ReactEditor";
import { linkUploadImageEditor } from "../../constants/constants";
import Button from "../../components/common/Button";
import { setFormValidation } from "../../helpers/helper";
import store from "./issueStore";

@observer
export default class CreateIssue extends Component {
    @observable title = "";
    @observable description = "";
    @observable content = "";
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.storeIssue = this.storeIssue.bind(this);
    }

    storeIssue() {
        setFormValidation("#form-create-issue");
        if ($("#form-create-issue").valid()) {
            store.createIssue(this.title, this.description, this.content);
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }

    render() {
        return (
            <form role="form" id="form-create-issue">
                <FormInputText
                    label="Tiêu đề"
                    name="title"
                    updateFormData={this.updateFormData}
                    value={this.title}
                    required
                />
                <FormInputText
                    label="Mô tả ngắn"
                    name="description"
                    updateFormData={this.updateFormData}
                    value={this.description}
                />
                <ReactEditor
                    urlPost={linkUploadImageEditor()}
                    fileField="image"
                    scrollerId="#create-issue-modal"
                    updateEditor={value => (this.content = value)}
                    value={this.content}
                />
                <Button
                    onClick={this.storeIssue}
                    label={"Tạo"}
                    labelLoading="Đang tạo"
                    className="btn-fill btn-success"
                    scrollerId="#create-issue-modal"
                    isLoading={store.isCreating}
                />
            </form>
        );
    }
}
