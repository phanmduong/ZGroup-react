/**
 * Created by phanmduong on 11/25/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import PropTypes from 'prop-types';
import Barchart from "../dashboard/Barchart";

class StatisticSalesUp extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {this.props.summary.map((item, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">timeline</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">{item.name}
                                            <small/>
                                        </h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="description">
                                                    Thưởng cá nhân:
                                                    <strong> {helper.dotNumber(item.bonus)}đ</strong><br/>
                                                    Tỉ lệ chốt
                                                    đơn: <strong>
                                                    {`${item.total_paid_registers}/${item.total_registers}`}
                                                    ({helper.round2(item.total_paid_registers, item.total_registers) * 100}%)
                                                </strong>
                                                </p>
                                                <div style={{width: "50%"}}>
                                                    <TooltipButton placement="top"
                                                                   text={`${item.total_paid_registers}/${item.total_registers}`}>
                                                        <div className="progress progress-line-rose">
                                                            <div className="progress-bar progress-bar-rose"
                                                                 role="progressbar"
                                                                 style={{width: `${item.total_paid_registers * 100 / item.total_registers}%`}}/>
                                                        </div>
                                                    </TooltipButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div>
                                                <Barchart
                                                    label={item.date_array}
                                                    data={[item.registers_by_date, item.paid_by_date]}
                                                    id={"barchar_register_by_date" + index}
                                                />
                                            </div>
                                        </div>

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

StatisticSalesUp.propTypes = {
    summary: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        summary: state.summarySales.summary
    };
}

export default connect(mapStateToProps)(StatisticSalesUp);
