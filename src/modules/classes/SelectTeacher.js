import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ItemReactSelect from "../../components/common/ItemReactSelect";

class SelectTeacher extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="form-group">
                <label className="label-control">{this.props.label}</label>
                <Select
                    name="form-field-name"
                    value={this.props.value}
                    options={this.props.optionsSelectStaff}
                    onChange={this.props.onChange}
                    placeholder={"Chọn " + this.props.label}
                    optionRenderer={(option) => {
                        return (
                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                        );
                    }}
                    valueRenderer={(option) => {
                        return (
                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                        );
                    }}
                />
            </div>
        );
    }
}

SelectTeacher.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    optionsSelectStaff: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectTeacher;