import React from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import Store from './store';
import TypeData from "./steps/TypeData";
import UploadFile from "./steps/UploadFile";
import FormatData from "./steps/Format";
import Detail from "./steps/Detail";
import {confirm, showWarningNotification} from "../../helpers/helper";
import {isEmpty, removeObservable} from "../../helpers/entity/mobx";
import {Modal} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import _ from 'lodash';

const STEPS = [
    {
        order: 0,
        name: "Kiểu dữ liệu",
        component: TypeData,
        data: {
            types: []
        },
        isNext: (data) => {
            const is_next = data.types.filter((type) => type.selected).length > 0;
            if (!is_next) {
                showWarningNotification("Bạn phải chọn ít nhất 1 kiểu dữ liệu");
            }
            return is_next;
        }
    },
    {
        order: 1,
        name: "Upload File",
        component: UploadFile,
        data: {
            link_google: '',
            file: '',
            typeSelected: 'file',
            data_file: []
        },
        isNext: (data) => {
            if (data.data_file.length <= 0) {
                showWarningNotification("Vui lòng chọn dữ liệu excel");
                return false;
            }
            return true;
        }
    },
    {
        order: 2,
        name: "Định dạng",
        component: FormatData,
        data: {
            formatters: [],
            formatErrors: [],
            indexNotMatch: [],
        },
        isNext: (data, store) => {
            data.formatErrors = [];
            const typeDataStep = store.getStep(0);
            const {currentStep} = store;

            const dataTypesSelected = currentStep.data.formatters.filter((formatter) => !isEmpty(formatter.typeData.name));

            const keyDataTypesSelected = dataTypesSelected.map((formatter) => formatter.typeData.key);

            //find type which selected at choose type data step
            let dataTypes = typeDataStep.data.types.filter((type) => type.selected);

            dataTypes.forEach((type) => {
                const propertiesRequire = type.properties.filter((property) =>
                    (keyDataTypesSelected.indexOf(property.key) < 0) && property.required);

                data.formatErrors = [...data.formatErrors, ...propertiesRequire];
            });
            const isError = data.formatErrors.length > 0;
            if (isError) {
                $(".main-panel").scrollTop(0);
                return false;
            }

            let indexNotMatch = [];

            dataTypesSelected.forEach((formatter) => {
                if (!formatter.match_format && formatter.typeData.required) {
                    indexNotMatch = [...indexNotMatch, ...formatter.indexNotMatch];
                }
            });

            indexNotMatch = _.union(indexNotMatch);

            if (indexNotMatch.length > 0) {
                confirm("warning", "Dữ liệu không hợp lệ", `Có <strong>${indexNotMatch.length}</strong> bản ghi không hợp lệ, dữ liệu này sẽ không được import vào hệ thống`, () => {
                    store.currentOrder = store.currentStep.order + 1;
                    data.indexNotMatch = indexNotMatch;
                });
            } else {
                return true;
            }


        }
    },
    {
        order: 3,
        name: "Chi tiết",
        component: Detail,
        data: {
            checkProperties: []
        },
        isNext: () => {
            return true;
        }
    },
];

@observer
class ImportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store(STEPS);
        this.nextStep = this.nextStep.bind(this);
        this.backStep = this.backStep.bind(this);
    }

    componentDidMount() {
        this.store.getData();
    }

    nextStep() {
        const {steps, currentStep} = this.store;

        if (!currentStep.isNext(currentStep.data, this.store)) return;
        if (currentStep.order < steps[STEPS.length - 1].order) {
            this.store.currentOrder = currentStep.order + 1;
        }
    }

    backStep() {
        const {steps, currentStep} = this.store;
        if (currentStep.order > steps[0].order) {
            this.store.currentOrder = currentStep.order - 1;
        }
    }

    isFinishStep = () => {
        const {steps, currentStep} = this.store;
        if (currentStep.order == steps[STEPS.length - 1].order) {
            return true;
        }
        return false;
    }

    reset = () => {
        this.store.steps = STEPS;
        this.store.currentOrder = 0;
    }

    submitData = () => {
        const formatDataStep = removeObservable(this.store.getStep(2));
        const detailDataStep = removeObservable(this.store.getStep(3));
        let formatters = formatDataStep.data.formatters.filter((formatter) => !isEmpty(formatter.typeData.name));
        let data = [];
        formatters.forEach((formater) => {
            formater.data.forEach((itemData, index) => {
                if (isEmpty(data[index])) {
                    data[index] = {};
                }

                if (formater.typeData.reformat) {
                    itemData = formater.typeData.reformat(itemData);
                }

                data[index][formater.typeData.key] = itemData;
                // console.log(formater.typeData);


                //replace data
                if (formater.typeData.check_new) {
                    const checkProperty = detailDataStep.data.checkProperties
                        .filter((checkProperty) => checkProperty.key == formater.typeData.key)[0];

                    const word = checkProperty.check_words.filter((word) => word.raw == itemData)[0];


                    if (!isEmpty(word) && !isEmpty(word.replace_by)) {
                        data[index][formater.typeData.key] = word.replace_by;
                    }
                }
            });
        });

        //convert data to upload server
        data = data.map((itemData) => {
            let newData = {};
            Object.keys(itemData).forEach((key) => {
                const keySplit = key.split(".");
                if (isEmpty(newData[keySplit[0]])) {
                    newData[keySplit[0]] = {};
                }
                newData[keySplit[0]][keySplit[1]] = itemData[key];
            });
            return newData;
        });
        //remove not match

        data = data.filter((data, index) => formatDataStep.data.indexNotMatch.indexOf(index) < 0);

        this.store.uploadData(data, this.reset);

    }


    render() {
        const {steps, currentStep, isUploading} = this.store;
        const Component = currentStep.component;
        return (
            <div className="container-fluid">
                <div className="import-data-container">
                    <div className="import-content">
                        <div className="import-title">
                            Nhập dữ liệu
                        </div>
                        <div className="import-steps">
                            <ol className="steps">
                                {steps.map((step) => {
                                    const classActive = currentStep.order == step.order ? " is-active " : "";
                                    const isComplete = currentStep.order > step.order ? " is-complete " : "";
                                    return (
                                        <li className={"step " + classActive + isComplete}
                                            data-step={step.order + 1}>
                                            {step.name}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                        <div>
                            <Component stepOrder={currentStep.order} store={this.store}/>
                        </div>
                    </div>
                    <div className="import-footer">
                        <div className="flex flex-row flex-space-between flex-justify-content-center">
                            <div onClick={this.backStep} className="button-default">
                                <i className="material-icons">
                                    arrow_back_ios
                                </i> Quay lại
                            </div>
                            {
                                this.isFinishStep() ?
                                    <div onClick={this.submitData} className="button-green">
                                        Hoàn tất
                                    </div>
                                    :
                                    <div onClick={this.nextStep} className="button-green">
                                        Tiếp theo &nbsp;
                                        <i className="material-icons">
                                            arrow_forward_ios
                                        </i>
                                    </div>
                            }

                        </div>

                    </div>
                </div>
                <Modal
                    show={isUploading}
                    bsStyle="primary"
                >
                    <Modal.Body>
                        <Loading text="Đang import..."/>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportContainer);
