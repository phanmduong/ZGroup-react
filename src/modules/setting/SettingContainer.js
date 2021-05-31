import React from "react";
import {observer} from "mobx-react";
import SettingStore from "./SettingStore";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import FormInputText from "../../components/common/FormInputText";
import ReactSelect from "react-select";
import {DAY_CREATE_SHIFT} from "../../constants/constants";

const TIME_SELECTS = Array(24 * 60).fill(0).map((_, i) => {
    const time = ('0' + ~~(i / 60) + ':0' + Math.round(60 * (i / 60 % 1))).replace(/\d(\d\d)/g, '$1');
    return {
        "label": time,
        "value": time,
    };
});

@observer
class SettingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new SettingStore();
        this.tabs = [
            {
                name: "Thông tin",
                key: "info"
            },
            {
                name: "Cài đặt Email",
                key: "email"
            },
            {
                name: "Cài đặt SMS",
                key: "sms"
            },
            {
                name: "Cài đặt App học viên",
                key: "mobile_app_student"
            },
            {
                name: "Cài đặt hóa đơn",
                key: "invoice"
            }
        ];

        this.state = {
            currentTab: "info"
        };
    }

    componentWillMount() {
        this.store.loadSettings();
    }

    getValue = (key) => {
        const setting = this.getSetting(key);
        return setting ? setting.value : null;
    };

    getSetting = (key) => {
        return this.store.settings.filter((item) => item.key == key)[0];
    };

    getSettingsByGroup = (group) => {
        return this.store.settings.filter((item) => item.group == group);
    };

    updateFormData = (setting, e) => {
        setting.value = e.target.value;
    };

    updateSelect = (setting, e) => {
        setting.value = e ? e.value : "";
    };

    updateCheckbox = (setting, key, value) => {
        let settingValue = JSON.parse(setting.value);
        if (value) {
            settingValue.push(key);
        } else {
            settingValue = settingValue.filter((item) => item != key);
        }
        setting.value = JSON.stringify(settingValue);
    };

    updateValueIndex = (setting, value, index) => {
        const settingValue = JSON.parse(setting.value);
        settingValue[index] = value;
        setting.value = JSON.stringify(settingValue);
    };

    saveSettings = () => {
        this.store.saveSettings();
    };

    render() {
        const {isLoading, isSaving} = this.store;
        const {currentTab} = this.state;
        let settingCreateShift, settingCreateShiftValue;
        if (this.store.settings.length > 0) {
            settingCreateShift = this.getSetting("time_auto_create_shift");
            // settingCreateWorkShift = this.getSetting("time_auto_create_work_shift");
            settingCreateShiftValue = JSON.parse(this.getSetting("time_auto_create_shift").value);
            // settingCreateWorkShiftValue = JSON.parse(this.getSetting("time_auto_create_work_shift").value);
        }
        return (
            <div className="margin-top-10">
                <div className={"card"}>
                    <div className={"card-content"}>
                        {isLoading ? <Loading/> :
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card" mask="blue">
                                        <div className="card-content flex flex-col">
                                            <div className="flex flex-justify-content-center">
                                                <div className="img father"
                                                     style={{
                                                         backgroundImage: `url(${helper.validateLinkImage(this.getValue("logo_company"))})`
                                                     }}/>
                                            </div>

                                            <h4 className="card-title  margin-top-10">{this.getValue("name_company")}</h4>

                                            <div
                                                className="text-white flex flex-col flex-justify-content-center text-center">
                                                <div>{this.getValue("slogan_company")}</div>
                                            </div>

                                            <h6 className="category text-gray text-email">
                                                <span>{this.getValue("tax_number_company")}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card detail-wrap">
                                        <div className="card-content">
                                            <div className="detail-wrap">
                                                {this.getSettingsByGroup("info").map((setting) => {
                                                    return (
                                                        <p>{setting.name} <strong>{setting.value}</strong></p>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="margin-top-10">
                                        <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                                            {this.tabs.map((tab) => {
                                                return (
                                                    <li className={currentTab === `${tab.key}` ? 'active' : ''}>
                                                        <a onClick={() => {
                                                            this.setState({currentTab: tab.key});
                                                            setTimeout(() => {
                                                                $.material.init();
                                                            }, 100);
                                                        }}>
                                                            {tab.name} &#160;
                                                            <div className="ripple-container"/>
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div>
                                            <form className="form-modal" id="form-setting">
                                                {
                                                    this.getSettingsByGroup(currentTab).filter(setting => setting.type == "text").map((setting) => {
                                                        return (
                                                            <div>
                                                                <label>{setting.name}</label>
                                                                <FormInputText
                                                                    name={setting.key}
                                                                    type={setting.type}
                                                                    updateFormData={(e) => this.updateFormData(setting, e)}
                                                                    value={setting.value}
                                                                />
                                                            </div>
                                                        );
                                                    })
                                                }
                                                {
                                                    this.getSettingsByGroup(currentTab).filter(setting => setting.type == "select").map((setting) => {
                                                        return (
                                                            <div>
                                                                <label>{setting.name}</label>
                                                                <ReactSelect
                                                                    options={JSON.parse(setting.data)}
                                                                    onChange={(e) => this.updateSelect(setting, e)}
                                                                    value={setting.value}
                                                                    placeholder={setting.name}
                                                                    name={setting.key}
                                                                    clearable={false}
                                                                />
                                                            </div>
                                                        );
                                                    })
                                                }
                                                {
                                                    this.getSettingsByGroup(currentTab).filter(setting => setting.type == "checkbox").map((setting) => {
                                                        return (
                                                            <div>
                                                                <label>{setting.name}</label>
                                                                {JSON.parse(setting.data).map((item) => {
                                                                    return (
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                {JSON.parse(setting.value).indexOf(item.value) >= 0 ?
                                                                                    <input type="checkbox" checked
                                                                                           onChange={() => this.updateCheckbox(setting, item.value, false)}
                                                                                    />
                                                                                    :
                                                                                    <input type="checkbox"
                                                                                           onChange={() => this.updateCheckbox(setting, item.value, true)}
                                                                                    />
                                                                                }
                                                                                {item.label}
                                                                            </label>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        );
                                                    })
                                                }
                                                {currentTab == 'info' && <div>
                                                    <label>Thời gian tự động tạo lịch trực: (Hàng tuần vào lúc)</label>
                                                    <div className="flex flex-row flex-wrap">
                                                        <ReactSelect
                                                            style={{width: '200px', marginRight: 10, marginTop: 5}}
                                                            options={DAY_CREATE_SHIFT}
                                                            onChange={(e) => this.updateValueIndex(settingCreateShift, e ? e.value : "", 0)}
                                                            value={settingCreateShiftValue[0]}
                                                            placeholder={"Chọn ngày"}
                                                            clearable={false}
                                                        />
                                                        <ReactSelect
                                                            style={{width: '200px', marginTop: 5}}
                                                            options={TIME_SELECTS}
                                                            onChange={(e) => this.updateValueIndex(settingCreateShift, e ? e.value : "", 1)}
                                                            value={settingCreateShiftValue[1]}
                                                            placeholder={"Chọn giờ"}
                                                            clearable={false}
                                                        />
                                                    </div>
                                                </div>}

                                                {/*{currentTab == 'info' && <div>*/}
                                                {/*    <label>Thời gian tự động tạo lịch làm việc: (Hàng tuần vào*/}
                                                {/*        lúc)</label>*/}
                                                {/*    <div className="flex flex-row flex-wrap">*/}
                                                {/*        <ReactSelect*/}
                                                {/*            style={{width: '200px', marginRight: 10, marginTop: 5}}*/}
                                                {/*            options={DAY_CREATE_SHIFT}*/}
                                                {/*            onChange={(e) => this.updateValueIndex(settingCreateWorkShift, e ? e.value : "", 0)}*/}
                                                {/*            value={settingCreateWorkShiftValue[0]}*/}
                                                {/*            placeholder={"Chọn ngày"}*/}
                                                {/*            clearable={false}*/}
                                                {/*        />*/}
                                                {/*        <ReactSelect*/}
                                                {/*            style={{width: '200px', marginTop: 5}}*/}
                                                {/*            options={TIME_SELECTS}*/}
                                                {/*            onChange={(e) => this.updateValueIndex(settingCreateWorkShift, e ? e.value : "", 1)}*/}
                                                {/*            value={settingCreateWorkShiftValue[1]}*/}
                                                {/*            placeholder={"Chọn giờ"}*/}
                                                {/*            clearable={false}*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*</div>}*/}

                                                <div className=" flex flex-end">
                                                    {isSaving ?
                                                        <button className=" btn btn-success btn-fill disabled"
                                                                type=" button">
                                                            <i className=" fa fa-spinner fa-spin"/> Đang tải lên
                                                        </button>
                                                        :
                                                        <div>
                                                            <button
                                                                className=" btn btn-fill btn-success"
                                                                type=" button"
                                                                onClick={this.saveSettings}
                                                                disabled={isSaving}
                                                            > Lưu
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>

        );
    }
}

SettingContainer.propTypes = {};

export default SettingContainer;

