import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import BaseRoomOverlay from "./overlays/BaseRoomsOverlay";
// import {avatarEmpty, shortString} from "../../helpers/helper";

//import {Link} from "react-router";


class ListBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        console.log(this.props.bases);
        return (
            <div className="table-responsive table-split">
                <table id="datatables"
                       className="table table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Thành phố</th>
                        <th style={{width:'20%'}}>Địa chỉ</th>
                        <th style={{width:'40%'}}>Phòng</th>
                        <th style={{width:'5%'}}/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.bases && this.props.bases.map((base, key) => {
                        let address_description = base.address + " " + (base.district && base.district.name) + " " + (base.province && base.province.name);
                        // address_description = address_description < 51 ? address_description : (address_description.substring(0, 50) + " ...");
                        // let imageUrl = !avatarEmpty(base.avatar_url) ? base.avatar_url : 'https://d3pxppq3195xue.cloudfront.net/media/images/15/12/09/SAM_0561_966x668.jpg';
                        return (
                            <tr key={key}>
                                <td><b className="cursor-pointer" onClick={() => this.props.openEditBaseModal(base)}>{base.name}</b></td>
                                <td>{base.province ?  base.province.name : 'Không có'}</td>
                                <td>
                                    <div >{address_description}
                                </div></td>
                                <td>

                                <BaseRoomOverlay
                                        base={base}
                                        bases={this.props.bases}
                                    />
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        disabledDelete
                                        object={base}
                                        edit={() => this.props.openEditBaseModal(base)}
                                    />
                                </td>
                                {/*<div className="col-sm-4" key={base.id} id="card-email-template">*/}
                                {/*    <div className="card card-chart">*/}
                                {/*        <div className="card-header" data-background-color="white" style={{*/}
                                {/*            borderRadius: '10px'*/}
                                {/*        }}>*/}
                                {/*            <a onClick={() => this.props.openEditBaseModal(base)}>*/}
                                {/*                <div id="simpleBarChart" className="ct-chart"*/}
                                {/*                     style={{*/}
                                {/*                         width: '100%',*/}
                                {/*                         background: 'url(' + imageUrl + ')',*/}
                                {/*                         backgroundSize: 'cover',*/}
                                {/*                         backgroundPosition: 'center',*/}
                                {/*                         height: '200px',*/}
                                {/*                         borderRadius: '10px'*/}
                                {/*                     }}*/}
                                {/*                />*/}
                                {/*            </a>*/}

                                {/*        </div>*/}
                                {/*        <div className="card-content" style={{minHeight: '140px'}}>*/}
                                {/*            <div className="card-action" style={{height: 50}}>*/}
                                {/*                <h4 className="card-title">*/}
                                {/*                    <a onClick={() => this.props.openEditBaseModal(base)}>{shortString(base.name, 6)}</a>*/}
                                {/*                </h4>*/}
                                {/*                <ButtonGroupAction*/}
                                {/*                    disabledDelete*/}
                                {/*                    object={base}*/}
                                {/*                    edit={() => this.props.openEditBaseModal(base)}*/}
                                {/*                />*/}
                                {/*            </div>*/}
                                {/*            <div style={{display: "flex", justifyContent: "space-between", height: 60}}>*/}
                                {/*                <p className="category">{address_description}</p>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListBase.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
    deleteBase: PropTypes.func.isRequired,
    bases: PropTypes.array.isRequired,
    openEditBaseModal: PropTypes.func.isRequired
};

export default ListBase;