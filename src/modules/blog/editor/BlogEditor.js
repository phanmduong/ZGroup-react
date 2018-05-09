import React from "react";
import KeetoolEditor from "../../../components/common/editor/KeetoolEditor";
import ImageUploader from "../../../components/common/ImageUploader";
import store from "./BlogEditorStore";
import { NO_IMAGE } from "../../../constants/env";
import { observer } from "mobx-react";
import FormInputText from "../../../components/common/FormInputText";

@observer
class BlogEditor extends React.Component {
    state = {
        value: "test",
    };

    onChange = value => {
        console.log(value);
        this.setState({
            value,
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-content">
                            <FormInputText
                                label="Tên bài viết"
                                required
                                name="title"
                                updateFormData={e => {
                                    store.post = {
                                        title: e.target.value,
                                    };
                                }}
                                value={store.post.title}
                            />
                            <KeetoolEditor value={this.state.value} onChange={this.onChange} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-content">
                            <label>Ảnh đại diện</label>
                            <ImageUploader
                                tooltipText="Ảnh đại diện"
                                image_url={store.post.imageUrl ? store.post.imageUrl : NO_IMAGE}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogEditor;
