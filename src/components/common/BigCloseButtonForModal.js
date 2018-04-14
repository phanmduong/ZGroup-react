
import React from 'react';
import PropTypes from 'prop-types';

class BigCloseButtonForModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <a data-toggle="tooltip" title="Đóng" type="button" rel="tooltip"
            style={{float: "right", color: "gray"}}
            onClick={this.props.onClick}>
             <i className="material-icons">highlight_off</i></a>             
        );
    }
}

BigCloseButtonForModal.propTypes = {
    onClick: PropTypes.func,
};

export default BigCloseButtonForModal;