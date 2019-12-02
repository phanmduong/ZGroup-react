import React from "react";
import {observer} from "mobx-react";
import * as ReactDOM from "react-dom";
import {Overlay} from "react-bootstrap";
import {isEmpty} from "../../../helpers/entity/mobx";

@observer
class SelectTypeFormat extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: false,
        }
    }

    onSelect = (data = '') => {
        const {word} = this.props;
        word.replace_by = data;
        this.setState({selected: false});
    };


    render() {
        const {selected} = this.state;
        const {word, wordsReplace} = this.props;
        return (
            <div className="select-multi-level"
                 style={{width: '100%'}}
            >
                <div className="flex flex-row flex-align-items-center flex-space-between"
                     onClick={() => {
                         const reverseSelected = !this.state.selected;
                         this.setState({selected: reverseSelected});
                     }}
                     ref="target"
                >
                    <div>{!isEmpty(word.replace_by) ? word.replace_by : "Tự động tạo"} </div>
                    <i className="material-icons">
                        arrow_drop_down
                    </i>
                </div>
                <Overlay
                    rootClose={true}
                    show={selected}
                    onHide={() => this.setState({selected: false})}
                    placement={"bottom"}
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}
                >
                    <div className={"first-level-menu " + (selected ? "active" : "")}
                         style={{width: '100%'}}
                    >
                        {wordsReplace && wordsReplace.map((wordReplace, index) => {
                            return (
                                <div key={index}
                                     onClick={() => {
                                         this.setState({selected: true});
                                         this.onSelect(wordReplace);
                                     }}>
                                    <div className="flex flex-row flex-align-items-center flex-space-between"

                                    >
                                        <div>{wordReplace}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{color: "#b2b2b2"}}>
                            <div className="flex flex-row flex-align-items-center flex-space-between"
                                 onClick={() => {
                                     this.onSelect('');
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
