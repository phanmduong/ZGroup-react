import React from 'react';
import TooltipButton from "../../components/common/TooltipButton";
import PropTypes from 'prop-types';

class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount(){

    }
    render(){
        return (
            <div className="material-datatables">
            <table id="datatables"
                   className="table table-striped table-no-bordered table-hover"
                   cellSpacing="0" width="100%" style={{width: "100%"}}>
                <thead className="text-rose">
                <tr>
                    <th>Course Name</th>
                    <th>Desciption</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Icon</th>
                    <th/>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td className="btn-group-action">
                        <TooltipButton text="Edit" placement="top">
                            <a >
                                <i className="material-icons">edit</i>
                            </a>
                        </TooltipButton>
                        <TooltipButton text="Delete" placement="top">
                            <a>
                                <i className="material-icons">delete</i>
                            </a>
                        </TooltipButton>

                    </td>
                </tr>

                </tbody>

                <tfoot>
                <tr>
                    <th>Course Name</th>
                    <th>Desciption</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Icon</th>
                    <th/>
                </tr>
                </tfoot>
            </table>
        </div>
        );
    }
}


ListCourse.propTypes = {
    courses: PropTypes.array.isRequired
};

export default ListCourse;