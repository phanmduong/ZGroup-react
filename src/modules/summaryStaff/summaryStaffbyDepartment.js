import React from "react";
import BarChartDepartment from "./BarChartDepartment";
import PropTypes from 'prop-types';
class SummaryStaffbyDepartment extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.name = this.name.bind(this);
        this.count = this.count.bind(this);
    }

    name() {
        let data = [];
        data = this.props.staff_department.map((pop) => {
            return pop.department_name;
        });
        return data;
    }

    count() {
        let data = [];
        data = this.props.staff_department.map((pop) => {
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
                            <h4 className="card-title">Số lượng nhân viên trong bộ phận
                                <small/>
                            </h4>
                            <BarChartDepartment
                                label={this.name()}
                                data={[this.count()]}
                                id="barchart_staff_by_department"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SummaryStaffbyDepartment.propTypes = {
  staff_department: PropTypes.array,
};
export default SummaryStaffbyDepartment;