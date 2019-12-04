import React from "react";
import {observer} from "mobx-react";
import * as ReactDOM from "react-dom";
import {Overlay} from "react-bootstrap";
import {showWarningNotification} from "../../../helpers/helper";
import {isEmpty} from "../../../helpers/entity/mobx";

@observer
class SelectTypeFormat extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: false,
        };
    }

    checkFormatData = () => {
        let matchFormat = true;
        const typeData = this.props.formatter.typeData;
        let indexNotMatch = [];
        this.props.formatter.data.forEach((data, index) => {
            if (typeData.checkFormat && !typeData.checkFormat(data)) {
                matchFormat = false;
                indexNotMatch = [...indexNotMatch, index];
            }
        });
        this.props.formatter.match_format = matchFormat;
        this.props.formatter.indexNotMatch = indexNotMatch;
        if (!matchFormat) {
            showWarningNotification("Chưa khớp định dạng");
        }
    }

    onSelectProperty = (property) => {
        this.props.formatter.typeData = property;
        this.setState({selected: false});
        this.checkFormatData();
        if (isEmpty(property.name)) {
            this.props.formatter.match_format = false;
        }
    };


    render() {
        const {selected} = this.state;
        const {dataTypes, formatter, placement} = this.props;
        return (
            <div className="select-multi-level"

            >
                <div className="flex flex-row flex-align-items-center flex-space-between"
                     onClick={() => {
                         const reverseSelected = !this.state.selected;
                         this.setState({selected: reverseSelected});
                     }}
                     ref="target"
                >
                    <div>{formatter.typeData.name ? formatter.typeData.name : "Chọn loại dữ liệu"} </div>
                    <i className="material-icons">
                        arrow_drop_down
                    </i>
                </div>
                <Overlay
                    rootClose={true}
                    show={selected}
                    onHide={() => this.setState({selected: false})}
                    placement={placement ? placement : "bottom"}
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}
                >
                    <div className={"first-level-menu " + (selected ? "active" : "")}>
                        {dataTypes && dataTypes.map((typeData, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex flex-row flex-align-items-center flex-space-between"
                                         onClick={(e) => {
                                             this.setState({selected: true});
                                             e.stopPropagation();
                                         }}
                                    >
                                        <div>{typeData.name}</div>
                                        <i className="material-icons">
                                            arrow_right
                                        </i>

                                    </div>
                                    {
                                        typeData.properties && typeData.properties.length > 0 &&
                                        <div className="second-level-menu">
                                            {typeData.properties.map((property, index2) => {
                                                return (
                                                    <div key={index2}
                                                         onClick={() => this.onSelectProperty(property)}>{property.name + (property.required ? " (*)" : "")}</div>
                                                );
                                            })}
                                        </div>
                                    }

                                </div>
                            );
                        })}
                        <div style={{color: "#b2b2b2"}}>
                            <div className="flex flex-row flex-align-items-center flex-space-between"
                                 onClick={() => {
                                     this.onSelectProperty({});
                                 }}
                            >
                                <div>Bỏ chọn</div>
                            </div>
                        </div>
                    </div>
                </Overlay>
            </div>
        );
    }
}

export default SelectTypeFormat;
