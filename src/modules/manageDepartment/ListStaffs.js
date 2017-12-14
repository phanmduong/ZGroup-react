import React                    from 'react';
import Loading                  from '../../components/common/Loading';
import PropTypes                from 'prop-types';

class ListStaffs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {
        };
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="card">
                    <div className="card-content">
                        <div className="table-responsive">

                            {!this.props.isLoading && this.props.data ?
                                <div>
                                    { (this.props.data && this.props.data.length === 0) ?
                                        <h3>Chưa có nhân viên nào</h3>
                                        :
                                        <div>
                                            {this.props.data.map((obj,index) => {
                                                return (

                                                    <div key={index} className="panel panel-default">
                                                        <div className="panel-heading" role="tab">
                                                            <div>{obj.name}</div>
                                                        </div>
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

ListStaffs.propTypes = {
    data : PropTypes.array,
    isLoading : PropTypes.bool,
    edit : PropTypes.func,
    delete : PropTypes.func,
};



export default (ListStaffs);
