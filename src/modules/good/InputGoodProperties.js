import React from 'react';
import PropTypes from 'prop-types';
import GoodPropertyItem from "./GoodPropertyItem";

class InputGoodProperties extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setValue = this.setValue.bind(this);
        this.setUnit = this.setUnit.bind(this);
        this.clearPropertyOutput = this.clearPropertyOutput.bind(this);
    }

    setUnit(name, unit) {
        let goodPropertiesOutput = {...this.props.goodPropertiesOutput};
        if (!goodPropertiesOutput[name]) {
            goodPropertiesOutput[name] = {};
        }
        goodPropertiesOutput[name] = {
            ...goodPropertiesOutput[name],
            unit
        };
        this.props.updateGoodPropertiesOutput(goodPropertiesOutput);
    }

    setValue(name, value) {
        let goodPropertiesOutput = {...this.props.goodPropertiesOutput};
        if (!goodPropertiesOutput[name]) {
            goodPropertiesOutput[name] = {};
        }
        goodPropertiesOutput[name] = {
            ...goodPropertiesOutput[name],
            value
        };
        this.props.updateGoodPropertiesOutput(goodPropertiesOutput);
    }

    clearPropertyOutput(name) {
        let goodPropertiesOutput = {...this.props.goodPropertiesOutput};
        goodPropertiesOutput[name] = {};
        this.props.updateGoodPropertiesOutput(goodPropertiesOutput);
    }

    render() {
        if (this.props.goodProperties && this.props.goodProperties.length > 0) {
            return (
                <div>
                    {
                        this.props.goodProperties.map((property) => {
                            return (
                                <GoodPropertyItem
                                    clearPropertyOutput={this.clearPropertyOutput}
                                    setValue={this.setValue}
                                    setUnit={this.setUnit}
                                    key={property.id}
                                    goodPropertyOutput={this.props.goodPropertiesOutput[property.name]}
                                    property={property}/>
                            );
                        })
                    }
                </div>
            );
        } else {
            return (
                <div>
                    Quy trình này không có thuộc tính nào
                </div>
            );
        }

    }
}

InputGoodProperties.propTypes = {
    goodPropertiesOutput: PropTypes.object.isRequired,
    goodProperties: PropTypes.array.isRequired,
    updateGoodPropertiesOutput: PropTypes.func.isRequired
};

export default InputGoodProperties;