import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import {avatarEmpty, shortString} from "../../helpers/helper";
//import {Link} from "react-router";


class ListBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="row" id="list-base">
                {this.props.bases && this.props.bases.map((base) => {
                    let address_description = base.address + base.district;
                    address_description = address_description.substring(0, 50) + "...";
                    var imageUrl = !avatarEmpty(base.avatar_url) ? base.avatar_url : 'https://d3pxppq3195xue.cloudfront.net/media/images/15/12/09/SAM_0561_966x668.jpg';
                    return (
                        <div className="col-sm-4" key={base.id} id="card-email-template">
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>
                                    <a onClick={() => this.props.openEditBaseModal(base)}>
                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 width: '100%',
                                                 background: 'url(' + imageUrl + ')',
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                                 height: '200px',
                                                 borderRadius: '10px'
                                             }}
                                        />
                                    </a>

                                </div>
                                <div className="card-content" style={{minHeight: '140px'}}>
                                    <div className="card-action" style={{height: 50}}>
                                        <h4 className="card-title">
                                            <a onClick={() => this.props.openEditBaseModal(base)}>{shortString(base.name, 6)}</a>
                                        </h4>
                                        <ButtonGroupAction
                                            disabledDelete
                                            object={base}
                                            edit={() => this.props.openEditBaseModal(base)}
                                        />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", height: 60}}>
                                        <p className="category">{address_description}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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