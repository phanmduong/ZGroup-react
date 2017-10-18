import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class GoodPropertyItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelectUnitChange = this.handleSelectUnitChange.bind(this);
        this.handleSelectValueChange = this.handleSelectValueChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.state = {
            unit: {},
            value: {}
        };
    }

    handleSelectUnitChange(unitOption) {
        this.props.setUnit(unitOption.name, unitOption.value);
        this.setState({
            unit: unitOption
        });
    }

    handleSelectValueChange(valueOption) {
        this.props.setValue(valueOption.name, valueOption.value);
        this.setState({
            value: valueOption
        });
    }

    handleInputValueChange(event) {
        this.props.setValue(event.target.name, event.target.value);
    }

    render() {
        const {property} = this.props;
        return (
            <div className="form-group">
                <label className="control-label" style={{marginBottom: 5}}>
                    {property.name}
                </label>
                <div style={{
                    display: "flex"
                }}>
                    <div style={{flex: 1, paddingRight: 10}}>
                        {
                            property.prevalue ? (
                                <Select
                                    value={this.state.value}
                                    options={property.prevalue.split(",").map((value) => {
                                        return {
                                            name: property.name,
                                            value: value,
                                            label: value
                                        };
                                    })}
                                    onChange={this.handleSelectValueChange}
                                />
                            ) : (
                                <input
                                    name={property.name}
                                    className="form-control"
                                    onChange={this.handleInputValueChange}
                                    type="text" autoComplete={false}/>
                            )
                        }

                    </div>
                    {
                        property.preunit && (
                            <div style={{flex: 1}}>
                                <Select
                                    value={this.state.unit}
                                    options={property.preunit.split(",").map((unit) => {
                                        return {
                                            name: property.name,
                                            value: unit,
                                            label: unit
                                        };
                                    })}
                                    onChange={this.handleSelectUnitChange}
                                />
                            </div>
                        )
                    }

                </div>

            </div>
        );
    }
}

GoodPropertyItem.propTypes = {
    property: PropTypes.object.isRequired,
    setUnit: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired
};

export default GoodPropertyItem;