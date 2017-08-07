import React from 'react';
import PropTypes from 'prop-types';

class ListBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div></div>
        );
    }
}

ListBase.propTypes = {
    bases: PropTypes.array.isRequired
};

export default ListBase;