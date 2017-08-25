import React from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';

class ReactEditor extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    }

    componentWillMount(){
        this.setState({
            editorState: this.htmlToDraft(this.props.value)
        });
    }

    draftToHtml(content){
        return draftToHtml(convertToRaw(content));
    }

    htmlToDraft(html){
        const blocksFromHtml = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
        return EditorState.createWithContent(contentState);
    }

    onEditorStateChange(editorState) {
        let content = this.draftToHtml(editorState.getCurrentContent());
        this.props.updateEditor(content);
        this.setState({
            editorState: editorState
        });
    }

    uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                let formdata = new FormData();
                formdata.append(this.props.fileField, file);
                let ajax = new XMLHttpRequest();
                ajax.addEventListener("load", (event) => {
                    let data = JSON.parse(event.currentTarget.response);
                    let data1 = {
                        data: {
                            height: 250,
                            type: "image/jpeg",
                            width: 250
                        },
                        status: 200,
                        success: true
                    };
                    data1.data.link = data.link;
                    resolve(data1);
                }, false);
                ajax.open("POST", this.props.urlPost);
                ajax.send(formdata);
                ajax.addEventListener('error', (event) => {
                    const error = JSON.parse(event.currentTarget.response);
                    reject(error);
                });
            }
        );
    }

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbar={{
                    image: {
                        uploadCallback: this.uploadImageCallBack,
                        defaultSize: {
                            height: '100%',
                            width: '100%',
                        },
                        alt: { present: true, mandatory: true },
                    }
                }}
                onEditorStateChange={this.onEditorStateChange}
            />
        );
    }
}


ReactEditor.propTypes = {
    urlPost: PropTypes.string.isRequired,
    fileField: PropTypes.string.isRequired,
    updateEditor: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default ReactEditor;
