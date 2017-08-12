import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";

class ButtonGroupAction extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return (
            <div className="btn-group-action">
                <Link data-toggle="tooltip" title="Sửa"
                      to={this.props.editUrl}
                      type="button" rel="tooltip">
                    <i className="material-icons">edit</i>
                </Link>
                <a data-toggle="tooltip" title="Xoá"
                   onClick={() => this.props.delete(this.props.object)} type="button"
                   rel="tooltip">
                    <i className="material-icons">delete</i>
                </a>
            </div>
        );
    }
}

ButtonGroupAction.propTypes = {
    editUrl: PropTypes.string.isRequired,
    delete: PropTypes.func.isRequired,
    object: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
    ])
};

export default ButtonGroupAction;