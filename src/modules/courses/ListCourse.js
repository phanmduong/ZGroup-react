import React from 'react';
import PropTypes from 'prop-types';
import * as helper from  "../../helpers/helper";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";

class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            coursesList :[]
        };
    }

    componentWillMount(){
        console.log('list course will mount',this.props);
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
                    <th/>
                    <th>Tên Khóa</th>
                    <th>Số lớp đã mở</th>
                    <th>Số buổi</th>
                    <th>Giá</th>
                    <th/>
                </tr>
                </thead>

                <tbody>
                {this.state.coursesList.map((course)=>{
                    return (
                        <tr key={course.id}>
                            <td>
                                <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                        data-placement="right"
                                        data-original-title={course.name}>
                                    <img src={course.icon_url} alt=""/>
                                </button>
                            </td>
                            <td>{course.name}</td>
                            <td>{course.duration}</td>
                            <td>{course.duration}</td>

                            <td>
                                <div style={{width : 100}} className="btn btn-xs btn-main" data-toggle="tooltip" title="" type="button" rel="tooltip" data-original-title={helper.convertMoneyToK(course.price)}>
                                    {helper.convertMoneyToK(course.price)}
                                </div>
                            </td>
                            <ButtonGroupAction
                                editUrl={"unknow"}
                                delete={()=>{/*delete course*/}}
                                courseect={course}
                            />
                        </tr>
                    )
                })}
                </tbody>

                <tfoot>
                <tr>
                    <th/>
                    <th>Tên Khóa</th>
                    <th>Số lớp đã mở</th>
                    <th>Số buổi</th>
                    <th>Giá</th>
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