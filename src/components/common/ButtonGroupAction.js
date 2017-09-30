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
                {this.props.disabledEdit ?
                    (
                        <a data-toggle="tooltip" title="Không thể sửa"
                           type="button"
                           rel="tooltip">
                            <i className="material-icons">border_color</i>
                        </a>
                    )
                    :
                    (
                        this.props.edit ?
                            (
                                <a data-toggle="tooltip" title="Sửa"
                                   onClick={() => this.props.edit(this.props.object)} type="button"
                                   rel="tooltip">
                                    <i className="material-icons">edit</i>
                                </a>
                            )
                            :
                            (
                                <Link data-toggle="tooltip" title="Sửa"
                                      to={this.props.editUrl}
                                      type="button" rel="tooltip">
                                    <i className="material-icons">edit</i>
                                </Link>
                            )
                    )
                }
                {
                }
                {
                    this.props.disabledDelete ?
                        (
                            <a data-toggle="tooltip" title="Không thể xoá"
                               type="button"
                               rel="tooltip">
                                <i className="material-icons">delete_forever</i>
                            </a>
                        )
                        :
                        (
                            <a data-toggle="tooltip" title="Xoá"
                               onClick={() => this.props.delete(this.props.object)} type="button"
                               rel="tooltip">
                                <i className="material-icons">delete</i>
                            </a>
                        )
                }
                {this.props.children}
            </div>
        );
    }
}

ButtonGroupAction.propTypes = {
    editUrl: PropTypes.string,
    delete: PropTypes.func,
    edit: PropTypes.func,
    object: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
    ]),
    disabledDelete: PropTypes.bool,
    disabledEdit: PropTypes.bool,
    children: PropTypes.element
};

export default ButtonGroupAction;