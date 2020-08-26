import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {isEmptyInput} from "../../../helpers/helper";
import Search from "../../../components/common/Search";
import * as studentActions from "../studentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class BasesOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            search: '',
        };
        this.state = this.initState;
    }

    componentWillMount() {

    }

    close = () => {
        this.setState({show: false});
    };


    baseName = () => {
        let bases = this.props.bases || [];
        let s = bases && bases.filter(i => i.id == this.props.selected)[0];
        let defaultText = this.props.defaultText || "No base";
        return (s && !isEmptyInput(s.name)) ? s.name : defaultText;
    };

    render() {
        let {data, show} = this.state;
        let {className, styleWrapper, styleOverlay, styleButton} = this.props;
        let bases = this.props.bases;


        return (
            <div style={{
                position: "relative",
                borderRadius: 3,
                cursor: 'pointer',
                ...styleWrapper
            }} className={className} ref="StatusesOverlay">
                <div
                    data-toggle="tooltip"
                    rel="tooltip"
                    data-original-title="Trạng thái"
                    onClick={() => this.setState({show: true})} style={styleButton}>
                    {this.baseName()}
                </div>
                <Overlay
                    rootClose={true}
                    show={show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.StatusesOverlay)}>
                    <div className="kt-overlay" style={{width: "300px", marginTop: 35, ...styleOverlay}}>
                        <Search
                            placeholder="Tìm theo tên" className="margin-bottom-10"
                            value={this.state.search}
                            onChange={search => this.setState({search})}
                        />

                        <button
                            onClick={() => {
                                this.assignStatuses({id: null});
                            }}
                            className="btn"
                            style={{
                                textAlign: "left",
                                width: "100%",
                                marginBottom: 10,
                                display: "flex",
                                backgroundColor: 'transparent',
                                border: '1.5px dashed #e6e6e6',
                                color: '#a9a9a9',
                                justifyContent: "space-between"
                            }}>
                            Không có trạng thái
                            <div>
                                {(!data || (data && !data.id)) ?
                                    <i className="material-icons">done</i> : ""}
                            </div>
                        </button>

                        <div className="kt-scroll">
                            {
                                bases && bases
                                    .filter(item => {
                                        const s1 = item.name.trim().toLowerCase();
                                        const s2 = this.state.search.trim().toLowerCase();
                                        return s1.includes(s2) || s2.includes(s1);
                                    })
                                    .map((item) => {
                                            const selected = this.props.selected && this.props.selected == item.id;
                                            return (
                                                <div key={item.id} style={{
                                                    marginBottom: 10,
                                                    display: "flex",
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <button
                                                        onClick={() => {
                                                            this.props.onChange(item.id);
                                                            this.close();
                                                        }}
                                                        className="btn"
                                                        style={{
                                                            textAlign: "left",
                                                            backgroundColor: item.color,
                                                            width: "100%",
                                                            margin: "0",
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            height: 35,
                                                            padding: '8px 15px',
                                                        }}>
                                                        {item.name}
                                                        <div>
                                                            {selected ?
                                                                <i className="material-icons">done</i> : ""}

                                                        </div>
                                                    </button>

                                                </div>
                                            )
                                        }
                                    )
                            }
                        </div>
                    </div>
                </Overlay>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bases: state.global.bases,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasesOverlay);
