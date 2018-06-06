import React from "react";
import {connect} from "react-redux";
import * as codeAction from "./codeAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import TooltipButton from '../../../components/common/TooltipButton';

class CodeComponent extends React.Component {
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


                    <tr>
                        <td>1</td>
                        <td className="film-name">
                            Thế chắc tui thuộc 1% còn lại chắc
                        </td>
                        <td><b>10.000 đ</b></td>
                        <td>
                            23
                        </td>
                        <td>
                            2917-23-12
                        </td>
                        <td>
                            2917-23-12
                        </td>


                        <td>

                            <div className="btn-group-action">
                                <TooltipButton text="Chi tiết" placement="top" style={{display: "inline-block"}}>
                                    <a style={{color: "#878787"}}
                                       onClick={() => {
                                           this.props.codeAction.openShowCodeModal();
                                       }}>
                                        <i className="material-icons">add_circle</i>
                                    </a>
                                </TooltipButton>
                                <TooltipButton text="Sửa" placement="top" style={{display: "inline-block"}}>
                                    <a style={{color: "#878787"}}
                                       onClick={() => {
                                           this.props.codeAction.openModal();
                                       }}>
                                        <i className="material-icons">edit</i>
                                    </a>
                                </TooltipButton>

                                <TooltipButton text="Xóa" placement="top" style={{display: "inline-block"}}>
                                    <a style={{color: "#878787"}}
                                       onClick={() => {
                                       }}>
                                        <i className="material-icons">delete</i>
                                    </a>
                                </TooltipButton>
                            </div>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        );
    }


}

CodeComponent.propTypes = {
    addEditCodeModal: PropTypes.bool.require,
    codeAction: PropTypes.object.require,
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