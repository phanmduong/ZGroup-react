import React from 'react';
import {connect} from 'react-redux';



class CategoriesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

    }

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose"><i
                            className="material-icons">announcement</i></div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách nhóm</h4>
                            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                                <div className="panel panel-default">
                                    <div className="panel-heading" role="tab" id="headingFour">
                                        <a>
                                            <h4 className="panel-title">
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item"
                                                        className="btn btn-round btn-sm btn-success"
                                                        style={{width: "20px", height: "20px", padding: "0"}}>
                                                    <i style={{"float": "none!important"}} className="material-icons"/>
                                                </button>
                                                <a>Thêm nhóm cha</a>
                                            </h4>
                                        </a>
                                    </div>
                                </div>


                                <div className="panel panel-default">
                                    <div className="panel-heading" role="tab" id="headingOne">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion"
                                           href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"
                                           className="collapsed">
                                            <h4 className="panel-title">
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item"
                                                        className="btn btn-round btn-sm btn-info"
                                                        style={{"width": "20px", height: "20px", "padding": "0"}}>
                                                    <i style={{"float": "none!important"}} className="material-icons"/>mode_edit
                                                </button>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item"
                                                        className="btn btn-round btn-sm btn-danger"
                                                        style={{"width": "20px", "height": "20px", "padding": "0"}}>
                                                    <i style={{"float": "none!important"}} className="material-icons"/>close
                                                </button>
                                                Điện thoại (3)
                                                <i className="material-icons" />keyboard_arrow_down
                                            </h4>
                                        </a>
                                    </div>
                                    <div id="collapseOne" className="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="headingOne" aria-expanded="false" style={{"height": "0px"}}>
                                        <div className="panel-body">
                                            <p style={{"margin-left": "20px"}}>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item"
                                                        className="btn btn-round btn-sm btn-info"
                                                        style={{"width": "20px", height: "20px", padding: "0px"}}>
                                                    <i style={{"float": "none!important"}} className="material-icons"/>mode_edit
                                                </button>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Không xoá được"
                                                        className="btn btn-round btn-sm btn-default"
                                                        style={{"width": "20px", height: "20px", padding: "0px" }} >
                                                    <i style={{"float": "none!important"}} className="material-icons"/>close
                                                </button>
                                                <a style={{"cursor": "pointer"}}>iPhone (27)</a>
                                            </p>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);