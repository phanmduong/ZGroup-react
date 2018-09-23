import React from "react";
import BarChart from './BarChart';
import PropTypes from 'prop-types';

class SummaryStaffbyWork extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.month = this.month.bind(this);
        this.count = this.count.bind(this);
    }

    month() {
        let data = [];
        data = this.props.staff_work.map((pop) => {
            return pop.month;
        });
        return data;
    }

    count() {
        let data = [];
        data = this.props.staff_work.map((pop) => {
            return pop.count;
        });
        return data;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">insert_chart</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Số lượng nhân viên theo tháng
                                <small/>
                            </h4>
                            <BarChart
                            label={this.month()}
                            data={[this.count()]}
                            id="barchart_staff_by_month"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SummaryStaffbyWork.propTypes={
  staff_work: PropTypes.array,
};
export default SummaryStaffbyWork;