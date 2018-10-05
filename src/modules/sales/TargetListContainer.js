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
            </div>
        );
    }
}

TargetListContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    currentGenId: PropTypes.string.isRequired,
    targetSaleActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {gens, currentGenId, isLoadingGens} = state.targetSale;
    return {
        gens,
        currentGenId: currentGenId,
        isLoadingGens
    };
}

function mapDispatchToProps(dispatch) {
    return {
        targetSaleActions: bindActionCreators(targetSaleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetListContainer);
