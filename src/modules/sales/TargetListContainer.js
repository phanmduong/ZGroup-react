/**
 * Created by phanmduong on 11/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import * as targetSaleActions from './targetSaleActions';
import {numberWithCommas} from "../../helpers/helper";
import {Link} from "react-router";

class TargetListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.targetSaleActions.loadGensList();
    }

    onChangeGen = (genId) => {
        this.props.targetSaleActions.changeCurrentGen(genId);
    };

    convertGenToSelect = (gens) => {
        return gens.map(gen => {
            return {
                value: "Khóa " + gen.name, key: gen.id
            };
        });
    };

    render() {
        return (
            <div>
                {this.props.isLoadingGens ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={this.convertGenToSelect(this.props.gens)}
                                        // disableRound
                                        value={this.props.currentGenId | 0}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-content">
                                {
                                    this.props.isLoadingTargetSale ? <Loading/> : (
                                        <table className="table" style={{width: "100%"}}>
                                            <thead>
                                            <tr className="text-rose">
                                                <th>Tên</th>
                                                <th className="text-center">Khóa</th>
                                                <th className="text-center">Doanh số / chỉ tiêu</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.props.targetSale.map(({user_id, name, target, achieve, gen_order}) => (
                                                    <tr key={user_id}>
                                                        <td>
                                                            <Link to={"/sales/target/" + user_id}>
                                                                {name}
                                                            </Link>
                                                        </td>
                                                        <td>Khóa thứ {gen_order}</td>
                                                        <td>
                                                            <div>
                                                                {numberWithCommas(achieve / 1000)}k
                                                                / {numberWithCommas(target / 1000)}k
                                                                {
                                                                    target !== 0 &&
                                                                    <span> ({(achieve * 100 / target).toFixed(2) + "%"})</span>
                                                                }

                                                            </div>
                                                            <div className="progress progress-line-primary">
                                                                <div className="progress-bar progress-bar-rose"
                                                                     role="progressbar"
                                                                     aria-valuenow="60" aria-valuemin="0"
                                                                     aria-valuemax="100"
                                                                     style={{width: achieve * 100 / target + "%"}}>
                                                                    <span className="sr-only">60% Complete</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

TargetListContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    targetSale: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingTargetSale: PropTypes.bool.isRequired,
    currentGenId: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    targetSaleActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {
        gens, isLoadingTargetSale,
        currentGenId, isLoadingGens,
        targetSale
    } = state.targetSale;
    return {
        gens,
        currentGenId: currentGenId,
        isLoadingGens,
        targetSale,
        isLoadingTargetSale
    };
}

function mapDispatchToProps(dispatch) {
    return {
        targetSaleActions: bindActionCreators(targetSaleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetListContainer);
