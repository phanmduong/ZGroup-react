import React from 'react';
import {Modal} from 'react-bootstrap';
import FormInputText from "../../components/common/FormInputText";
import PropTypes from 'prop-types';
import * as helper from "../../helpers/helper";
import Select from "react-select";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";


const proName = ["material", "color", "packing", "size"];

class AddPropertyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                materials: [],
                colors: [],
                sizes: [],
                packings: [],
            },
            inputText: "",
            currentTab: 1,
        };
        this.modified = false;
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getCurrentArray = this.getCurrentArray.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    close() {
        if (this.modified) {
            helper.confirm("warning", "Thoát", "Thay đổi chưa được lưu, bạn có muốn thoát không? ",
                () => {
                    return this.props.onHide();
                }
            );
        } else this.props.onHide();
    }

    onChangeInput(e) {

        let value = e.target.value;
        this.setState({inputText: value});
    }

    add() {
        let name = proName[this.state.currentTab - 1];
        if (!name || helper.isEmptyInput(this.state.inputText)) return;
        this.modified = true;
        let newdata = this.state.data[name + "s"];
        newdata = [...newdata, {name: this.state.inputText}];
        this.setState({data: {...this.state.data, [name + "s"]: newdata}, inputText: ""});
    }

    remove(index) {
        let name = proName[this.state.currentTab - 1];
        this.modified = true;
        let data = this.state.data[name + "s"];
        let newdata = [...data.slice(0, index), ...data.slice(index + 1, data.length)];
        this.setState({data: {...this.state.data, [name + "s"]: newdata}});
    }

    save() {
        this.modified = false;
        let {data} = this.state;
        let {materials, colors, packings, sizes} = data;
        this.props.editProperty(1, materials);
        this.props.editProperty(2, colors);
        this.props.editProperty(3, packings);
        this.props.editProperty(4, sizes);
        helper.showNotification("Đã lưu");
    }

    getCurrentArray() {
        let {data} = this.state;
        let {materials, colors, packings, sizes} = data;
        switch (this.state.currentTab) {
            case 1:
                return materials;
            case 2:
                return colors;
            case 3:
                return packings;
            case 4:
                return sizes;
        }
    }

    onChangeTab(e) {
        this.setState({currentTab: e.value, inputText: ""});
    }

    render() {

        let {isCommitting} = this.props;
        let {currentTab, inputText} = this.state;
        return (
            <Modal

                show={this.props.show}
                onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thuộc tính</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Select
                        value={currentTab}
                        options={[
                            {value: 1, label: "Chất liệu"},
                            {value: 2, label: "Màu sắc"},
                            {value: 3, label: "Đóng gói"},
                            {value: 4, label: "Kích cỡ"},
                        ]}
                        onChange={this.onChangeTab}
                        name="tabSelect"
                    />
                    <div className="row">
                        <div className="col-md-9">
                            <FormInputText
                                label="Nhập tên"
                                name=""
                                className="col-md-12"
                                value={inputText}
                                updateFormData={this.onChangeInput}
                            /></div>
                        <div className="col-md-3">
                            <button
                                style={{width: "100%", marginTop: 15}}
                                className="btn btn-fill btn-rose" type="button"
                                onClick={this.add}
                            >Thêm
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th style={{width: "10%"}}>STT</th>
                                <th>Tên</th>
                                <th style={{width: "10%"}}/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.getCurrentArray().map(
                                (obj, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{obj.name}</td>
                                            <td><ButtonGroupAction
                                                delete={() => {
                                                    return this.remove(index);
                                                }}
                                                disabledEdit
                                            /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    {this.props.isCommitting ?
                        <button className="btn btn-rose disabled" type="button" style={{width: "25%", float: "right"}}>
                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                        </button>
                        :
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <div className="col-md-3"><button style={{width: "100%"}}
                                disabled={isCommitting}
                                className="btn btn-fill btn-rose" type="button"
                                onClick={this.save}
                            ><i className="material-icons">check</i> Lưu
                            </button></div>
                            <div className="col-md-3"><button style={{width: "100%"}}
                                disabled={isCommitting}
                                className="btn btn-fill" type="button"
                                onClick={this.close}
                            ><i className="material-icons">cancel</i> Hủy
                            </button></div>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AddPropertyModal.propTypes = {
    isCommitting: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    editProperty: PropTypes.func.isRequired,
    data: PropTypes.object,

};

export default (AddPropertyModal);