import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class GoodPropertyItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelectUnitChange = this.handleSelectUnitChange.bind(this);
        this.handleSelectValueChange = this.handleSelectValueChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.state = {
            unit: {},
            value: {},
            isEdit: false
        };
    }

    handleSelectUnitChange(unitOption) {
        this.props.setUnit(unitOption.name, unitOption.value);
        // this.setState({
        //     unit: unitOption
        // });
    }

    handleSelectValueChange(valueOption) {
        this.props.setValue(valueOption.name, valueOption.value);
        // this.setState({
        //     value: valueOption
        // });
    }

    handleInputValueChange(event) {
        this.props.setValue(event.target.name, event.target.value);
    }

    toggleEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        });
        this.props.clearPropertyOutput(this.props.property.name);


    }


    render() {

        const {property} = this.props;
        return (
            <div className="form-group" style={{marginTop: 0}}>
                <label className="control-label" style={{marginBottom: 5}}>
                    {property.name}
                    {
                        property.value && (
                            <a style={{
                                marginLeft: 5,
                                color: "#858585"
                            }}
                               onClick={this.toggleEdit}>
                                <i style={{fontSize: "18px"}}
                                   className="material-icons">mode_edit</i>
                            </a>
                        )
                    }

                </label>
                {
                    property.value && (
                        <div style={{
                            paddingTop: 5,
                            paddingBottom: 10,
                            textDecoration: this.state.isEdit ? "line-through" : ""
                        }}>
                            {property.value}
                        </div>
                    )
                }
                {
                    (!property.value || this.state.isEdit) && (
                        <div style={{display: "flex"}}>
                            <div style={{flex: 1, paddingRight: 10}}>
                                {
                                    property.prevalue ? (
                                        <Select
                                            value={this.props.goodPropertyOutput ? this.props.goodPropertyOutput.value : ""}
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
                                            value={this.props.goodPropertyOutput ? this.props.goodPropertyOutput.value : ""}
                                            onChange={this.handleInputValueChange}
                                            type="text" autoComplete={false}/>
                                    )
                                }

                            </div>
                            {
                                property.preunit && (
                                    <div style={{flex: 1}}>
                                        <Select
                                            value={this.props.goodPropertyOutput ? this.props.goodPropertyOutput.unit : ""}
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
                    )
                }


            </div>
        );
    }
}

GoodPropertyItem.propTypes = {
    property: PropTypes.object.isRequired,
    setUnit: PropTypes.func.isRequired,
    clearPropertyOutput: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    goodPropertyOutput: PropTypes.object
};

export default GoodPropertyItem;