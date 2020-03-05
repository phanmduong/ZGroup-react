import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import Switch from 'react-bootstrap-switch';
import PropTypes from 'prop-types';
import TooltipButton from "../../components/common/TooltipButton";
// import {browserHistory} from "react-router";

class ListGen extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive table-split">
                <table id="datatables-score" className="table table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                {/*<table className="table">*/}
                    <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Tuyển sinh</th>
                        <th>Hiện tại</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.gens.map(gen => {
                        return (
                            <tr key={gen.id}>
                                <td>{gen.name}</td>
                                <td>{gen.start_time}</td>
                                <td>{gen.end_time}</td>
                                <td>
                                    <Switch
                                        genId={gen.id}
                                        onChange={() => this.props.changeStatus(gen)}
                                        bsSize="mini"
                                        onText="Bật" offText="Tắt"
                                        value={(gen.status === 1)}/>
                                </td>
                                <td>
                                    <Switch
                                        genId={gen.id}
                                        onChange={() => this.props.changeTeachStatus(gen)}
                                        bsSize="mini"
                                        onText="Bật" offText="Tắt"
                                        value={(gen.teach_status === 1)}/>
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        delete={this.props.deleteGen}
                                        object={gen}
                                        editUrl=""
                                        edit={this.props.onClickEdit}
                                        children={
                                            <div className="flex-row flex">
                                                {this.props.user.role == 2 &&
                                                <div className="dropdown">
                                                    <TooltipButton text="Overview" placement="top">
                                                        <button className="btn btn-rose btn-round btn-xs button-add none-margin" type="button" data-toggle="dropdown">
                                                            <i className="material-icons" style={{
                                                                width: 14,
                                                                marginLeft: -4,
                                                                paddingTop: 2,
                                                            }}>pie_chart</i>
                                                        </button>
                                                    </TooltipButton>
                                                    <ul className="dropdown-menu dropdown-primary dropdown-menu-left">
                                                        <li>
                                                            <a onClick={() => this.props.loadOverview(gen,'')}>Tất cả</a>
                                                        </li>
                                                        {this.props.bases.map((obj, key)=>{
                                                            return (
                                                                <li key={key}>
                                                                    <a onClick={() => this.props.loadOverview(gen,obj.id)}>{obj.name}</a>
                                                                </li>
                                                            );
                                                        })}

                                                    </ul>
                                                </div>}
                                                {this.props.user.role == 2 &&
                                                <div className="dropdown">
                                                    <TooltipButton text="Lương" placement="top">
                                                        <button className="btn btn-rose btn-round btn-xs button-add none-margin" type="button" data-toggle="dropdown">
                                                            <i className="material-icons" style={{
                                                                width: 14,
                                                                marginLeft: -4,
                                                                paddingTop: 2,
                                                            }}>file_download</i>
                                                        </button>
                                                    </TooltipButton>
                                                    <ul className="dropdown-menu dropdown-primary">
                                                        {/*<li>*/}
                                                            {/*<a onClick={() => {}}>Giảng viên</a>*/}
                                                        {/*</li>*/}
                                                        <li>
                                                            <a onClick={() => this.props.getSalarySales(gen.id)}>Sales</a>
                                                        </li>
                                                    </ul>
                                                </div>}
                                            </div>
                                        }
                                    />
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

ListGen.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    changeTeachStatus: PropTypes.func.isRequired,
    deleteGen: PropTypes.func.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    getSalarySales: PropTypes.func.isRequired,
    gens: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,

};

export default ListGen;
