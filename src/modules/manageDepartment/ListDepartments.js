import React from 'react';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import TooltipButton from "../../components/common/TooltipButton";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";

class ListDepartments extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showOverlay: [],
        };
    }

    toggleOverlay = (key) => {
        let showOverlay = [...this.props.departments].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };
    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        return (

            <div className="table-sticky-head table-split" radius="five">
                {!this.props.isLoading && this.props.departments ?
                    <div>
                        {(this.props.departments && this.props.departments.length === 0) ?
                            <h3>Chưa có phòng ban nào</h3>
                            :

                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>Phòng ban</th>
                                    <th>Số nhân viên</th>
                                    {!this.props.disableActions && <th style={{width: 20}}/>}
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.departments.map((obj, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>
                                                <TooltipButton text={obj.name}
                                                               placement="top">
                                                    <div
                                                        className="bold cursor-pointer"
                                                            onClick={() => this.props.edit(obj)}
                                                    >
                                                        {obj.name}
                                                        <div className="ripple-container"/>
                                                    </div>
                                                </TooltipButton>
                                            </td>
                                            <td>{obj.employees ? obj.employees.length : 0}</td>
                                            {!this.props.disableActions && <td>
                                                <div style={{position: "relative"}}
                                                     className="cursor-pointer" mask="table-btn-action">
                                                    <div ref={'target' + obj.id}
                                                         onClick={() => this.toggleOverlay(obj.id)}
                                                         className="flex flex-justify-content-center cursor-pointer">
                                                        <i className="material-icons">more_horiz</i>
                                                    </div>
                                                    <Overlay
                                                        rootClose={true}
                                                        show={this.state.showOverlay[obj.id]}
                                                        onHide={() => this.closeOverlay(obj.id)}
                                                        placement="bottom"
                                                        container={() => ReactDOM.findDOMNode(this.refs['target' + obj.id]).parentElement}
                                                        target={() => ReactDOM.findDOMNode(this.refs['target' + obj.id])}>
                                                        <div className="kt-overlay overlay-container"
                                                             mask="table-btn-action" style={{
                                                            width: 150,
                                                            marginTop: 10,
                                                            left: -115,
                                                        }} onClick={() => this.closeOverlay(obj.id)}>
                                                            <button type="button"
                                                                    className="btn btn-white width-100"
                                                                    onClick={() => this.props.edit(obj)}>
                                                                Sửa thông tin
                                                            </button>
                                                            <button type="button"
                                                                    className="btn btn-white width-100"
                                                                    onClick={() => this.props.delete(obj)}>
                                                                Xóa
                                                            </button>

                                                        </div>
                                                    </Overlay>
                                                </div>
                                                {/* <div style={{float:"right"}}>*/}
                                                {/*        <ButtonGroupAction*/}

                                                {/*            edit={this.props.edit}*/}
                                                {/*            delete={this.props.delete}*/}
                                                {/*            object={obj}*/}
                                                {/*        />*/}
                                                {/*</div>*/}
                                            </td>}

                                        </tr>

                                    );
                                })}
                                </tbody>
                            </table>

                        }
                    </div>
                    :
                    <Loading/>
                }
            </div>


        );
    }

}

ListDepartments.propTypes = {
    departments: PropTypes.array,
    staffs: PropTypes.array,
    isLoading: PropTypes.bool,
    disableActions: PropTypes.bool,
    edit: PropTypes.func,
    delete: PropTypes.func,
};


export default (ListDepartments);
