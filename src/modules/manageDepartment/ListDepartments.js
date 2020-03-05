import React                    from 'react';
import Loading                  from '../../components/common/Loading';
import PropTypes                from 'prop-types';
import ButtonGroupAction        from "../../components/common/ButtonGroupAction";
import TooltipButton from "../../components/common/TooltipButton";

class ListDepartments extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {};
    }

    render(){
        return(

                <div className="table-responsive table-split">
                    {!this.props.isLoading && this.props.departments ?
                        <div>
                            { (this.props.departments && this.props.departments.length === 0) ?
                                <h3>Chưa có bộ phận nào</h3>
                                :

                                    <table className="table">
                                        <thead className="text-rose">
                                        <tr>
                                            <th>Bộ phận</th>
                                            <th>Số nhân viên</th>
                                            {!this.props.disableActions && <th style={{textAlign:"right"}}>Sửa</th>}
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.departments.map((obj,index) => {
                                                return (

                                                        <tr key={index} >
                                                                <td>
                                                                    <TooltipButton text={obj.name}
                                                                                   placement="top">
                                                                        <button className="btn btn-xs btn-main"
                                                                                style={{backgroundColor:  obj.color, width: "50%", minWidth: "fit-content"}}
                                                                                onClick={()=>{}}
                                                                        >
                                                                            {obj.name}
                                                                            <div className="ripple-container"/>
                                                                        </button>
                                                                    </TooltipButton>
                                                                </td>
                                                                <td>{obj.employees ? obj.employees.length : 0}</td>
                                                                {!this.props.disableActions &&<td>
                                                                 <div style={{float:"right"}}>
                                                                        <ButtonGroupAction

                                                                            edit={this.props.edit}
                                                                            delete={this.props.delete}
                                                                            object={obj}
                                                                        />
                                                                </div>
                                                                </td>}

                                                        </tr>

                                                );
                                            })}
                                        </tbody>
                                    </table>

                            }
                        </div>
                        :
                        <Loading/>
                    }
                </div>

            


        );
    }

}

ListDepartments.propTypes = {
    departments: PropTypes.array,
    staffs : PropTypes.array,
    isLoading : PropTypes.bool,
    disableActions : PropTypes.bool,
    edit : PropTypes.func,
    delete : PropTypes.func,
};



export default (ListDepartments);
