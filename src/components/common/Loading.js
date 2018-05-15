import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <h3 style={{width: '100%', textAlign: 'center'}}>
                <i className="fa fa-refresh fa-spin"/> {this.props.text || "Loading"}</h3>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string
};

export default Loading;
