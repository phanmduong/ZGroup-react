import React from "react";
import {observer} from "mobx-react";

const types = [
    {
        key: "leads",
        name: "Leads",
        description: "Đây là mô tả",
        icon: "https://d1j8r0kxyu9tj8.cloudfront.net/files/1574699900idmduO8uhmBJyHV.png",
        selected: false,
    },
    {
        key: "deals",
        name: "Deals",
        description: "Đây là mô tả",
        icon: "https://d1j8r0kxyu9tj8.cloudfront.net/files/1574699900KQ2v8YCptdCyuCV.png",
        selected: false,
    },
    {
        key: "classes",
        name: "Lớp học",
        description: "Đây là mô tả",
        icon: "https://d1j8r0kxyu9tj8.cloudfront.net/files/1574699900d7B1pYZVBH0YtOJ.png",
        selected: false,
    },
    {
        key: "learning",
        name: "Học tập",
        description: "Đây là mô tả",
        icon: "https://d1j8r0kxyu9tj8.cloudfront.net/files/1574699900oUaNuMRVitwULgQ.png",
        selected: false,
    },

];

@observer
class TypeData extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        if (this.props.store.currentStep.data.types.length <= 0) {
            this.props.store.currentStep.data.types = [...types];
        }
    }

    onSelectType(typeSelected) {
        typeSelected.selected = !typeSelected.selected;
    }

    render() {
        const {currentStep} = this.props.store;
        return (
            <div className="type-data-container">
                <div className="row">
                    {currentStep.data.types.map((type) => {
                        return (
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <div className="type-item">
                                    <div className={"type-content " + (type.selected ? " type-active " : "")}
                                         onClick={() => this.onSelectType(type)}>
                                        <img src={type.icon} className="type-icon"/>
                                        <div className="type-title">
                                            {type.name}
                                        </div>
                                        <div className="type-description">
                                            {type.description}
                                        </div>
                                        <div className="checkbox-container type-checkbox">
                                            <input type="checkbox" checked={type.selected}/>
                                            <span className="checkmark"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        );
    }
}

export default TypeData;
