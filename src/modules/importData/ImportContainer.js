import React from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import Store from './store';
import TypeData from "./steps/TypeData";
import UploadFile from "./steps/UploadFile";
import FormatData from "./steps/Format";
import Detail from "./steps/Detail";
import {showWarningNotification} from "../../helpers/helper";

const STEPS = [
    {
        order: 0,
        name: "Kiểu dữ liệu",
        component: TypeData,
        data: {
            types: []
        },
        isNext: (data) => {
            console.log(data);
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
            formatters: []
        },
        isNext: (data) => {
            return true;
        }
    },
    {
        order: 3,
        name: "Chi tiết",
        component: Detail,
        data: {},
        isNext: (data) => {
            return true;
        }
    },
]

@observer
class ImportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
        this.store = new Store(STEPS);
        this.nextStep = this.nextStep.bind(this);
        this.backStep = this.backStep.bind(this);
    }

    componentWillMount() {
    }

    nextStep() {
        const {steps, currentStep} = this.store;

        if (!currentStep.isNext(currentStep.data)) return;
        if (currentStep.order < steps[STEPS.length - 1].order) {
            this.store.currentOrder = currentStep.order + 1
        }
    }

    backStep() {
        const {steps, currentStep} = this.store;
        if (currentStep.order > steps[0].order) {
            this.store.currentOrder = currentStep.order - 1;
        }
    }


    render() {
        const {steps, currentStep} = this.store;
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
                            <div onClick={this.nextStep} className="button-green">
                                Tiếp theo &nbsp;
                                <i className="material-icons">
                                    arrow_forward_ios
                                </i>
                            </div>
                        </div>

                    </div>
                </div>

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
