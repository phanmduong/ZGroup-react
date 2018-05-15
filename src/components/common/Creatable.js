import React from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";

class Creatable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            multi: true,
            options: []
        };
    }


    render() {
        const {multi, options} = this.state;
        const {handleOnChange, value, placeholder} = this.props;
        return (
            <div>
                <div className="form-group">
                    <label className="control-label">
                        {this.props.label} {(this.props.required && <star>*</star>)}
                    </label>
                    <div className="form-control">
                        <Select.Creatable
                            multi={multi}
                            placeholder={placeholder}
                            options={options}
                            onChange={handleOnChange}
                            value={value}
                        />
                    </div>
                </div>
                <div className="help-block">Nhập giá trị sau đó bấm Enter để thêm</div>
            </div>
        );
    }
}

Creatable.defaultProps = {
    required: false,
    multi: true,
    value: undefined
};

Creatable.propTypes = {
    multi: PropTypes.bool,
    handleOnChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    label: PropTypes.string.isRequired
};

export default Creatable;