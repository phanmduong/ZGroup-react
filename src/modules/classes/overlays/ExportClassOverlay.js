import React from 'react';
import * as ReactDOM from "react-dom";
import {Overlay} from 'react-bootstrap';

class ExportClassOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            isLoading: false,
        };
        this.state = this.initState;
    }

    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        this.setState(this.initState);
    };


    render() {
        let {exportAttendanceExcel,exportExcel, isLoading} = this.props;
        return (

            <div style={{position: "relative"}} className="">
                <button className="btn btn-actions"
                        ref="target" onClick={this.toggle}
                        disabled={isLoading}>
                    <span className="material-icons">get_app</span>&nbsp;&nbsp;&nbsp;Tải xuống
                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" mask="extra" style={{
                        width: 175,
                        marginTop: 10,
                        left: 0,
                    }}>

                        {exportExcel && <button type="button"
                                className="btn btn-white width-100"
                                onClick={exportExcel}>
                            Xuất danh sách
                        </button>}
                        {exportAttendanceExcel && <button type="button"
                                className="btn btn-white width-100"
                                onClick={exportAttendanceExcel}>
                            Xuất danh sách điểm danh
                        </button>}


                    </div>
                </Overlay>

            </div>


        );
    }
}


export default ExportClassOverlay;
