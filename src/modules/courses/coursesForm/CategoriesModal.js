import React from 'react';
import {Modal} from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import TooltipButton from "../../../components/common/TooltipButton";
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import * as coursesActions from "../coursesActions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

const defaultData = {
    id: null,
    name: ""
};

class CategoriesModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            oldName: "",
            data: defaultData,
            showEditModal: false
        };
    }

    updateFormData = (e) => {
        let {name, value} = e.target;
        let {data} = this.state;
        data[name] = value;
        this.setState({data});
    };

    submit = () => {
        let callback = ()=>{
            this.setState({data:defaultData, showEditModal: false});
            this.props.coursesActions.loadAllCategories();
        };
        if (this.state.data.id)
            this.props.coursesActions.editCategory(this.state.data, callback);
        else
            this.props.coursesActions.createCategory(this.state.data,callback);
    };

    openEdit = (data) => {
        this.setState({
            data,
            oldName: data.name,
            showEditModal: true
        });
    };

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Categories
                        <TooltipButton text="Thêm category" placement="top">
                            <button onClick={() => this.setState({showEditModal: true, data: defaultData})}
                                    className="btn btn-rose btn-round btn-xs button-add none-margin">
                                <strong>+</strong>
                            </button>
                        </TooltipButton></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal show={this.state.showEditModal} onHide={() => this.setState({showEditModal: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Categories
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                {this.state.data.id != null && <div>Tên cũ: {this.state.oldName}</div>}
                                <FormInputText name="name" value={this.state.data.name}
                                               placeholder="Nhập tên"
                                               updateFormData={this.updateFormData}/>

                                {this.props.isSavingCategory ?
                                    <button className="btn btn-rose btn-fill disabled" type="button">
                                        <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                    </button>
                                    :
                                    <button className="btn btn-rose" onClick={this.submit}>Lưu</button>
                                }
                            </div>
                        </Modal.Body>
                    </Modal>

                    <table className="table table-striped table-no-bordered table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.categories.map((obj, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{obj.name}</td>
                                    <td><ButtonGroupAction
                                        disabledDelete
                                        object={{...obj}}
                                        edit={this.openEdit}
                                    /></td>
                                </tr>
                            );

                        })}
                        </tbody>
                    </table>

                </Modal.Body>
            </Modal>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        isSavingCategory: state.courses.isSavingCategory,
        categories: state.courses.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal);

