import React from 'react';
import TooltipButton from "../../components/common/TooltipButton";
import PropTypes from 'prop-types';
import * as helper from  "../../helpers/helper";
class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            coursesList :[]
        };
    }

    componentWillMount(){
        this.setState({coursesList : this.props.courses});
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
                {this.state.coursesList.map((obj)=>{
                    return (
                        <tr>
                            <td>{obj.name}</td>
                            <td>{obj.description}</td>
                            <td>{helper.convertMoneyToK(obj.price)}</td>
                            <td><img src={obj.image_url} style={{width: '100'}}/></td>
                            <td><img src={obj.icon_url} style={{width: '50'}}/></td>
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
                    )
                })}
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