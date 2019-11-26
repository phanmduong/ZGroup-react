import React from "react";
import {observer} from "mobx-react";
import {readExcel, showErrorMessage} from "../../../helpers/helper";

@observer
class UploadFile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeUploadFile = this.onChangeUploadFile.bind(this);
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

    onChangeUploadFile(e) {
        const {currentStep} = this.props.store;
        currentStep.data.file = e.target.files[0];
        currentStep.data.typeSelected = 'file';
        readExcel(currentStep.data.file, false, false).then((data) => {
            currentStep.data.data_file = data;
            console.log(data);
        }).catch((e) => {
            console.log(e);
            showErrorMessage("Kiểm tra lại file");
        });

        // event.target.value = '';
    }


    render() {
        const {currentStep} = this.props.store;
        return (
            <div className="upload-data-container">
                <div className="choose-type-upload">
                    <div className="radio-container" onClick={() => currentStep.data.typeSelected = 'google_sheet'}>
                        Từ Google Sheet
                        <input type="radio" checked={currentStep.data.typeSelected == 'google_sheet' ? "checked" : ''}
                               name="file"
                               defaultValue={currentStep.data.link_google}
                               onChange={(e) => {
                                   currentStep.data.link_google = e.target.value
                               }}
                        />
                        <span className="checkmark"></span>
                    </div>
                    <div className="input-link">
                        <input type="text" placeholder="Link Google Sheet"/>
                    </div>
                </div>
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
                    {/*<input type="radio" name="file"/><br/>*/}
                </div>
            </div>

        );
    }
}

export default UploadFile;
