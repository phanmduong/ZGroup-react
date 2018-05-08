/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import React from "react";
import FormInputText from "../../../components/common/FormInputText";
import { Modal } from "react-bootstrap";
import store from "../editor/BlogEditorStore";
import { createLanguageApi } from "../apis/blogApi";
import { observer } from "mobx-react";

@observer
class AddLanguageModal extends React.Component {
    // @observable language = {};
    state = {
        language: {},
        isLoading: false,
    };

    closeAddLanguageModal = () => {
        store.toggleAddLanguageModal(false);
    };
    updateFormLanguage = event => {
        const field = event.target.name;
        let language = { ...this.state.language };
        language[field] = event.target.value;
        this.setState({
            language,
        });
    };
    createLanguage = async e => {
        e.preventDefault();

        if ($("#form-language").valid()) {
            this.setState({
                isLoading: true,
            });
            console.log("language", this.state.language);
            
            store.languages.push(this.state.language);
            await createLanguageApi(this.state.language);

            this.setState({
                language: {},
                isLoading: false,
            });
            store.toggleAddLanguageModal(false);
        }
    };
    render() {
        const { language } = this.state;
        return (
            <Modal
                show={store.showAddLanguageModal}
                bsSize="sm"
                bsStyle="primary"
                onHide={this.closeAddLanguageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">Thêm ngôn ngữ</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-language">
                        <FormInputText
                            label="Ngôn ngữ"
                            required
                            name="name"
                            updateFormData={this.updateFormLanguage}
                            value={language.name || ""}
                        />
                        <FormInputText
                            label="Encode"
                            required
                            name="encoding"
                            updateFormData={this.updateFormLanguage}
                            value={language.encoding || ""}
                        />
                        <div className="modal-footer">
                            {this.state.isLoading ? (
                                <button type="button" className="btn btn-rose disabled">
                                    <i className="fa fa-spinner fa-spin " /> Thêm
                                </button>
                            ) : (
                                <button type="button" className="btn btn-rose" onClick={this.createLanguage}>
                                    Thêm
                                </button>
                            )}
                            <button type="button" className="btn" onClick={this.closeAddLanguageModal}>
                                Huỷ
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddLanguageModal;
