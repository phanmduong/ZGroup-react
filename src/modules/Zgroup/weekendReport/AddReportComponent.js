import React from "react";
import {linkUploadImageEditor} from "../../../constants/constants";
import ReactEditor from "../../../components/common/ReactEditor";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AddReportComponent extends React.Component {
    constructor(props,context){
        super(props, context);
        this.updateEditorContent = this.updateEditorContent.bind(this);
    }
    updateEditorContent(){

    }
    tittle(){

    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-5 col-xs-5">
                        <h5>Nhân viên: <b>{this.props.user.name}</b></h5>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <h5>Date: {new Date().toLocaleDateString()}</h5>
                    </div>
                    <div className="col-md-4 col-xs-4">
                        <h5>Time: {new Date().toLocaleTimeString()} </h5>
                    </div>
                </div>
                <div className="form-group">
                    <h5>Tiêu đề</h5>
                    <input type="text"
                           name="ratio"
                           className="form-control"
                           value={""}
                           onChange={()=>this.tittle().bind(this)}/>
                    <span className="material-input"/>
                </div>
                <br/>
                <h5>Nội dung bài viết</h5>
                <div className="row">
                    <div className="col-md-12">
                        <ReactEditor
                            urlPost={linkUploadImageEditor()}
                            fileField="image"
                            updateEditor={this.updateEditorContent}
                            value={''}
                        />
                    </div>

                </div>

                <div>
                    <button rel="tooltip" data-placement="top" title=""
                            data-original-title="Accept" type="button"
                            className="btn btn-success btn-round" data-dismiss="modal"
                    >
                        <i className="material-icons">check</i> Gửi bài viết
                    </button>
                    <a href={'/administration/weekend-report'}>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Return" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                        >
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </a>
                </div>
            </div>


        );
    }
}
AddReportComponent.propTypes = {
    user: PropTypes.string.isRequired,
};
function mapStateToProps(state){
    return{
        user: state.login.user,
    };
}
export default connect(mapStateToProps)(AddReportComponent);
