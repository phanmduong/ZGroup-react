import React                    from 'react';
import Loading                  from '../../components/common/Loading';
import PropTypes                from 'prop-types';
import ButtonGroupAction        from "../../components/common/ButtonGroupAction";

class ListDepartments extends React.Component {
    constructor(props, context) {
        super(props, context);

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
                                        <table className="table">
                                            <thead className="text-rose">
                                            <tr>
                                                <th>Tên</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.data.map((obj) => {
                                                return (
                                                    <tr key={obj.id}>
                                                        <td>{obj.name}</td>
                                                        <td style={{width: '5%'}}>
                                                            <ButtonGroupAction
                                                                edit={this.props.edit}
                                                                delete={this.props.delete}
                                                                object={obj}
                                                            />
                                                        </td>
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
