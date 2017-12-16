import React                    from 'react';
import Loading                  from '../../components/common/Loading';
import PropTypes                from 'prop-types';
import ButtonGroupAction        from "../../components/common/ButtonGroupAction";
import {Panel} from 'react-bootstrap';
import ListStaffs from "../manageDepartment/ListStaffs";
import TooltipButton from "../../components/common/TooltipButton";

class ListDepartments extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {
            openPanel:[],
        };
        this.openPanel = this.openPanel.bind(this);
    }

    openPanel(id){
        let newstate = {...this.state.openPanel};
        newstate[id] = !newstate[id];
        this.setState({openPanel: newstate});
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Danh sách bộ phận</h4>
                        <div className="table-responsive">

                            {!this.props.isLoading && this.props.departments ?
                                <div>
                                    { (this.props.departments && this.props.departments.length === 0) ?
                                        <h3>Chưa có bộ phận nào</h3>
                                        :
                                        <div>
                                            {this.props.departments.map((obj,index) => {
                                                console.log(obj);
                                                return (

                                                        <div key={obj.id} className="panel panel-default">
                                                                <div className="panel-heading" role="tab">
                                                                    <TooltipButton text={"Click để xem danh sách nhân viên " + obj.name}
                                                                                   placement="top">
                                                                        <button className="btn btn-xs btn-main"
                                                                                style={{backgroundColor:  obj.color, width: "90%"}}
                                                                                onClick={()=>{return this.openPanel(index);}}
                                                                        >
                                                                            {obj.name}
                                                                            <div className="ripple-container"/>
                                                                        </button>
                                                                    </TooltipButton>
                                                                    <div style={{width: '5%', float: "right", marginTop: "10px"}}>
                                                                        <ButtonGroupAction
                                                                            edit={this.props.edit}
                                                                            delete={this.props.delete}
                                                                            object={obj}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <Panel collapsible expanded={this.state.openPanel[index]}>
                                                                    <ListStaffs
                                                                        isLoading={this.props.isLoading}
                                                                        staffs={this.props.departments[index].employees}
                                                                    />
                                                                </Panel>


                                                        </div>
                                                );
                                            })}
                                        </div>
                                    }
                                </div>
                                :
                                <Loading/>
                            }

                        </div>
                    </div>
                </div>
            </div>


        );
    }

}

ListDepartments.propTypes = {
    departments: PropTypes.array,
    staffs : PropTypes.array,
    isLoading : PropTypes.bool,
    edit : PropTypes.func,
    delete : PropTypes.func,
};



export default (ListDepartments);
