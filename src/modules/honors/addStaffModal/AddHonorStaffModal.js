import React from 'react';
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import ItemReactSelect from "../../../components/common/ItemReactSelect";
import * as moneyTransferApi from "../../moneyTransfer/moneyTransferApi";
import {isEmptyInput, showErrorNotification} from "../../../helpers/helper";
import FormInputDate from "../../../components/common/FormInputDate";
import {DATETIME_FORMAT} from "../../../constants/constants";


@observer
class AddHonorStaffModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                user_id: 0,
                user: null,
                title: "",
                short_description: "",
                long_story: "",

            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isEdit && !this.props.showModal && nextProps.showModal) {
            let data = nextProps.honor;
            data = {
                ...data,
                user_id: data.user.id,
                user: {
                    ...data.user,

                    value: data.user.id,
                    label: data.user.name,
                }
            };
            this.setState({data});
        }
        if (!nextProps.isEdit && !this.props.showModal && nextProps.showModal) {
            this.reset();
        }
    }


    loadStaffs = (input, callback) => {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            moneyTransferApi.searchStaffs(input).then(res => {
                let staffs = res.data.staffs.map((staff) => {
                    return {
                        ...staff,
                        ...{
                            value: staff.id,
                            label: staff.name
                        }
                    };
                });
                callback(null, {options: staffs, complete: true});
            });
        }.bind(this), 500);
    };

    changeStaff = (staff) => {

        let {data} = this.state;

        if (staff)
            data = {...data, user_id: staff.id, user: staff};
        else
            data = {...data, user_id: 0};
        this.setState({data});
    };

    updateFormData = (e) => {
        let {name, value} = e.target;
        let {data} = this.state;
        data = {...data, [name]: value};
        this.setState({data});
    };

    checkField = (inp, message) => {
        if (!inp || isEmptyInput(inp)) {
            showErrorNotification(message);
            return false;
        }
        return true;
    };

    reset = () => this.setState({
        data: {
            user_id: 0,
            user: null,
            title: "",
            short_description: "",
            long_story: "",

        }
    });

    submitData = () => {
        let {data} = this.state;
        if (
            this.checkField(data.user_id, "Chưa chọn nhân viên") &&
            this.checkField(data.title, "Chưa nhập đóng góp") &&
            this.checkField(data.start_time, "Chưa nhập thời gian bắt đầu") &&
            this.checkField(data.short_description, "Chưa nhập mô tả")
        )
            this.props.submit(data, () => this.reset());

    };


    getTime = (time) => {
        if (time) {
            return time.slice(6, time.length);
        }
        return "";
    };

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{!this.props.isEdit ? "Thêm" : "Sửa"} nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form
                        id="card-form"
                        role="form" onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                        <div style={{zIndex: 1000}}>
                            <label className="label-control">Tìm nhân viên</label>
                            <ReactSelect.Async
                                loadOptions={this.loadStaffs}
                                loadingPlaceholder="Đang tải..."
                                placeholder="Chọn nhân viên"
                                searchPromptText="Không có dữ liệu nhân viên"
                                onChange={val => this.changeStaff(val)}
                                value={this.state.data.user}
                                disabled={this.props.isSaving}
                                required
                                optionRenderer={(option) => {
                                    return (
                                        <ItemReactSelect label={option.label}
                                                         url={option.avatar_url}/>
                                    );
                                }}
                                valueRenderer={(option) => {
                                    return (
                                        <ItemReactSelect label={option.label}
                                                         url={option.avatar_url}/>
                                    );
                                }}
                            />
                        </div>
                        <FormInputText
                            placeholder="Mô tả đóng góp"
                            label="Đóng góp"
                            name="title"
                            updateFormData={(e) => this.updateFormData(e)}
                            value={this.state.data.title}
                            disabled={this.props.isSaving}
                            required
                        />
                        <FormInputText
                            placeholder="Nhập mô tả"
                            label="Mô tả"
                            name="short_description"
                            updateFormData={(e) => this.updateFormData(e)}
                            value={this.state.data.short_description}
                            disabled={this.props.isSaving}
                            required
                        />
                        <FormInputText
                            placeholder="Nhập link"
                            label="Link mô tả"
                            name="long_story"
                            updateFormData={(e) => this.updateFormData(e)}
                            value={this.state.data.long_story}
                            disabled={this.props.isSaving}

                        />
                        {this.props.showModal &&
                        <FormInputDate
                            label="Thời gian bắt đầu"
                            name="start_time"
                            updateFormData={this.updateFormData}
                            value={this.getTime(this.state.data.start_time)}
                            id="form-start-time"
                            format={DATETIME_FORMAT}
                            disabled={this.props.isSaving}

                        />}
                        {this.props.showModal &&<FormInputDate
                            label="Thời gian kết thúc"
                            name="end_time"
                            updateFormData={this.updateFormData}
                            value={this.getTime(this.state.data.end_time)}
                            id="form-end-time"
                            format={DATETIME_FORMAT}
                            disabled={this.props.isSaving}
                        />}
                        <div className="flex flex-end">

                            {
                                this.props.isSaving ?
                                    <button className="btn btn-rose disabled" disabled
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        Đang lưu
                                    </button>
                                    :
                                    <button className="btn btn-rose"
                                            onClick={() => this.submitData()}>
                                        Lưu
                                    </button>
                            }

                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddHonorStaffModal;