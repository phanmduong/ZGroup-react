import React                            from 'react';
import PropTypes                        from 'prop-types';
import {Link}                           from 'react-router';
import {bindActionCreators}             from 'redux';
import {connect}                        from 'react-redux';
import  * as coursesActions             from '../coursesActions';
import ButtonGroupAction                from "../../../components/common/ButtonGroupAction";


const contentStyle = {
    wordWrap: 'break-word'
};

class coursesCreateEditDocuments extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {}
    }


    render(){
        return (
            <div className="card-content">

                <Link className="btn btn-rose" to="/manage/courses">
                    Thêm Tài Liệu
                </Link>


                <div className="table-responsive">

                    <table id="datatables"
                           className="table table-striped table-no-bordered table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <thead className="text-rose">
                        <tr>
                            <th></th>
                            <th>Tên Link</th>
                            <th>Link</th>
                            <th>Mô tả</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.data.links.map((link)=>{
                            return (
                                <tr key={link.id}>
                                    <td>
                                        <button className   ="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-toggle ="tooltip"
                                                title       =""
                                                type        ="button"
                                                rel         ="tooltip"
                                                data-placement      ="right"
                                                data-original-title ={link.link_name}>
                                            <img src={link.link_icon_url} alt=""/>
                                        </button>
                                    </td>
                                    <td >{link.link_name}</td>
                                    <td>
<a>
    <p style={{maxWidth: "100px", wordWrap: 'break-word', whiteSpace: 'initial'}}>{link.link_url}</p></a>
                                    </td>
                                    <td>{link.link_description}</td>
                                    <td>
                                    <ButtonGroupAction
                                        editUrl={""}
                                        delete={()=>{}}
                                        object={link}
                                    />
                                    </td>
                                </tr>
                            );

                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

coursesCreateEditDocuments.propTypes = {
    isLoading           : PropTypes.bool.isRequired,
    data                : PropTypes.object,
    coursesActions      : PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading           : state.courses.isLoading,
        data                : state.courses.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditDocuments);

