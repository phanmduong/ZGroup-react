import React from "react";
import {connect} from "react-redux";
import * as codeAction from "./codeAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import TooltipButton from '../../../components/common/TooltipButton';
import {confirm} from "../../../helpers/helper";

class CodeComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delCode = this.delCode.bind(this);
    }
    delCode(code) {
        confirm("error", "Xóa mã giảm giá", "Bạn có chắc muốn xóa mã giảm giá này", () => {
            this.props.codeAction.deleteCode(code);
        });
    }
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Ý nghĩa</th>
                        <th>Giảm giá</th>
                        <th>Số lượng</th>
                        <th>Ngày áp dụng</th>
                        <th>Ngày kết thúc</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.code && this.props.code.map((code, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td className="film-name">
                                        {code.description}
                                    </td>
                                    <td><b>{code.value}đ</b></td>
                                    <td>
                                        {code.number}
                                    </td>
                                    <td>
                                        {code.start_date}
                                    </td>
                                    <td>
                                        {code.end_date}
                                    </td>


                                    <td>

                                        <div className="btn-group-action">
                                            <TooltipButton text="Chi tiết" placement="top"
                                                           style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.props.codeAction.openShowCodeModal();
                                                       this.props.codeAction.handlShowCodesModal(code.codes);
                                                   }}>
                                                    <i className="material-icons">add_circle</i>
                                                </a>
                                            </TooltipButton>
                                            <TooltipButton text="Sửa" placement="top" style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.props.codeAction.openModal();
                                                       this.props.codeAction.handleCodeModal(code);
                                                   }}>
                                                    <i className="material-icons">edit</i>
                                                </a>
                                            </TooltipButton>

                                            <TooltipButton text="Xóa" placement="top" style={{display: "inline-block"}}>
                                                <a style={{color: "#878787"}}
                                                   onClick={() => {
                                                       this.delCode(code);
                                                   }}>
                                                    <i className="material-icons">delete</i>
                                                </a>
                                            </TooltipButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}


                    </tbody>
                </table>
            </div>
        );
    }


}

CodeComponent.propTypes = {
    addEditCodeModal: PropTypes.bool.isRequired,
    codeAction: PropTypes.object.isRequired,
    code: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        addEditCodeModal: state.code.addEditCodeModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeComponent);