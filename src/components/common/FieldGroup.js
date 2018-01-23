import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

const FieldGroup = ({id, label, help, ...props}) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

FieldGroup.propTypes = {
    label: PropTypes.string.isRequired,
    help: PropTypes.string,
    id: PropTypes.string.isRequired
};

export default FieldGroup;