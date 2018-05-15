import React from 'react';
import PropTypes from 'prop-types';
class ButtonGroupAction extends React.Component{
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }
    render(){
        return(
            <div className="btn-group-action">
                <a data-toggle="tooltip" title="Chấp nhận"
                   onClick={() => this.props.accept(this.props.object.id,this.props.userId)}
                   type="button"
                   rel="tooltip"

                >
                    <i className="material-icons" style={{color: 'green'}}>done</i>
                </a>
                <a data-toggle="tooltip" title="Không chấp nhận"
                    onClick={() => this.props.delete(this.props.object.id,this.props.userId)}
                   type="button"
                   rel="tooltip">
                    <i className="material-icons" style={{color: 'red'}}>clear</i>
                </a>
            </div>
        );
    }
}
ButtonGroupAction.propTypes= {
    accept: PropTypes.func,
    delete: PropTypes.func,
    object: PropTypes.object,
    userId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};
export default ButtonGroupAction;