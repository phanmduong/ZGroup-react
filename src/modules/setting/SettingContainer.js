import React from "react";
import {observer} from "mobx-react";
import SettingStore from "./SettingStore";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import FormInputText from "../../components/common/FormInputText";
import ReactSelect from "react-select";

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
                name: "Cài đặt hóa đơn",
                key: "invoice"
            }
        ];

        this.state = {
            currentTab: "info"
        }
    }

    componentWillMount() {
        this.store.loadSettings();
    }

    getValue = (key) => {
        const setting = this.store.settings.filter((item) => item.key == key)[0];
        return setting ? setting.value : null;
    }

    getSettingsByGroup = (group) => {
        return this.store.settings.filter((item) => item.group == group);
    }

    updateFormData = (setting, e) => {
        setting.value = e.target.value;
    }

    updateSelect = (setting, e) => {
        setting.value = e ? e.value : "";
    }

    saveSettings = () => {
        this.store.saveSettings();
    }

    render() {
        const {isLoading, isSaving} = this.store;
        const {currentTab} = this.state;
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
                                                    )
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
                                                        <a onClick={() => this.setState({currentTab: tab.key})}>
                                                            {tab.name} &#160;
                                                            <div className="ripple-container"/>
                                                        </a>
                                                    </li>
                                                )
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
                                                        )
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
                                                        )
                                                    })
                                                }
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

