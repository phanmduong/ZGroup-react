import React                    from 'react';
import Loading                  from '../../components/common/Loading';
import PropTypes                from 'prop-types';
import ButtonGroupAction        from "../../components/common/ButtonGroupAction";
import {Panel} from 'react-bootstrap';
import ListStaffs from "../manageDepartment/ListStaffs";

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

                            {!this.props.isLoading && this.props.data ?
                                <div>
                                    { (this.props.data && this.props.data.length === 0) ?
                                        <h3>Chưa có bộ phận nào</h3>
                                        :
                                        <div>
                                            {this.props.data.map((obj,index) => {
                                                return (

                                                        <div key={obj.id} className="panel panel-default">
                                                                <div className="panel-heading" role="tab">
                                                                    <a onClick={()=>{return this.openPanel(index);}}>
                                                                        {obj.name}</a>
                                                                    <div style={{width: '5%', float: "right"}}>
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
                                                                        data={this.props.data}
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
    data : PropTypes.array,
    isLoading : PropTypes.bool,
    edit : PropTypes.func,
    delete : PropTypes.func,
};



export default (ListDepartments);
