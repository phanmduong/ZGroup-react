import React from "react";
import {observer} from "mobx-react";
import {readExcel, showErrorMessage} from "../../../helpers/helper";
import {Modal} from "react-bootstrap";
import Loading from "../../../components/common/Loading";

@observer
class UploadFile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeUploadFile = this.onChangeUploadFile.bind(this);
        this.state = {
            isLoadingFile: false
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        $('#upload-file-excel').on('dragover', function () {
            $(this).parent().addClass('drag-over');
        }).on('dragleave', function () {
            $(this).parent().removeClass('drag-over');
        });
    }

    setDataFormatStep = (header) => {
        const formatStep = this.props.store.getStep(2);
        const {currentStep} = this.props.store;
        if (header) {
            const data = header.map((col) => {
                const data = currentStep.data.data_file.map((item) => item[col] ? item[col].trim() : '');
                return {
                    match_format: false,
                    col_name: col,
                    data,
                    typeData: {}
                }
            });

            formatStep.data.formatters = data;
        }
    }

    onChangeUploadFile = (e) => {
        this.setState({isLoadingFile: true});
        const {currentStep} = this.props.store;
        currentStep.data.file = e.target.files[0];
        if (currentStep.data.file) {
            currentStep.data.typeSelected = 'file';

            readExcel(currentStep.data.file, false, false).then(async (data) => {
                currentStep.data.data_file = data.rows;
                const header = data.header.filter((item) => !item.includes("UNKNOWN"));
                await this.setDataFormatStep(header);
            }).catch(() => {
                showErrorMessage("Kiểm tra lại file");
            }).finally(() => {
                this.setState({isLoadingFile: false});
            });
        }

        e.target.value = '';
    }


    render() {
        const {currentStep} = this.props.store;
        return (
            <div className="upload-data-container" id={"upload-import-file"}>
                {/*<div className="choose-type-upload">*/}
                {/*    <div className="radio-container" onClick={() => currentStep.data.typeSelected = 'google_sheet'}>*/}
                {/*        Từ Google Sheet*/}
                {/*        <input type="radio" checked={currentStep.data.typeSelected == 'google_sheet' ? "checked" : ''}*/}
                {/*               name="file"*/}
                {/*               defaultValue={currentStep.data.link_google}*/}
                {/*               onChange={(e) => {*/}
                {/*                   currentStep.data.link_google = e.target.value*/}
                {/*               }}*/}
                {/*        />*/}
                {/*        <span className="checkmark"></span>*/}
                {/*    </div>*/}
                {/*    <div className="input-link">*/}
                {/*        <input type="text" placeholder="Link Google Sheet"/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="choose-type-upload">
                    <div className="radio-container" onClick={() => currentStep.data.typeSelected = 'file'}>
                        Từ File Excel
                        <input type="radio" checked={currentStep.data.typeSelected == 'file' ? "checked" : ''}
                               name="file"/>
                        <span className="checkmark"></span>
                    </div>
                    <div className="form-upload-file">
                        <div className="button-upload">
                            <input type="file"
                                   id="upload-file-excel"
                                   onChange={this.onChangeUploadFile}
                                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                            <div className="text-upload">
                                {currentStep.data.file ? currentStep.data.file.name : "Upload File Excel (.csv, .xls hoặc .xslx)"}

                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.isLoadingFile}
                    bsStyle="primary"
                >
                    <Modal.Body>
                        <Loading text="Đang tải file..."/>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default UploadFile;
