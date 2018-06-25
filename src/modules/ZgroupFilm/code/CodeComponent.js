import React from "react";
import {connect} from "react-redux";
import * as codeAction from "./codeAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import TooltipButton from '../../../components/common/TooltipButton';
import {confirm} from "../../../helpers/helper";
import moment from "moment/moment";


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
                        <th>Số Lượng</th>
                        <th>Sử Dụng</th>
                        <th>Còn Lại</th>
                        <th>Ký tự</th>
                        <th>Áp dụng</th>
                        <th>Kết thúc</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.code && this.props.code.map((code, index) => {
                            let a = code.codes.filter((code) => code.status === 1);
                            let b = code.codes.filter((code) => code.status === 0);
                            let description = code.description.slice(0, 30);
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="film-name">
                                        <TooltipButton placement="top" text={code.description}>
                                            <div>{description.length < 30 ? description : description.concat('...')}</div>
                                        </TooltipButton>
                                    </td>
                                    <td><b>{code.value / 1000}.000 VNĐ</b></td>
                                    <td>
                                        &emsp;&emsp;{code.number}
                                    </td>
                                    <td>
                                        &emsp;{a.length}
                                    </td>
                                    <td>
                                        {b.length}
                                    </td>
                                    <td>
                                        {code.length}
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
                                            {
                                                moment(code.start_date, "YYYY-MM-DD").fromNow()[0] !== "i" ? "" :
                                                    <div>
                                                        <TooltipButton text="Sửa" placement="top"
                                                                       style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {
                                                                   this.props.codeAction.openModal();
                                                                   this.props.codeAction.handleCodeModal(code);
                                                               }}>
                                                                <i className="material-icons">edit</i>
                                                            </a>
                                                        </TooltipButton>

                                                        <TooltipButton text="Xóa" placement="top"
                                                                       style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {
                                                                   this.delCode(code);
                                                               }}>
                                                                <i className="material-icons">delete</i>
                                                            </a>
                                                        </TooltipButton>
                                                    </div>
                                            }

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