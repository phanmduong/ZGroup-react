import React from 'react';
import PropTypes from 'prop-types';


class ItemTabChild extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        $.material.init();
    }

    render() {
        let {tabChild, tabParent} = this.props;
        return (
            <tr>
                <td>
                    <div className="checkbox">
                        <label>
                            <input
                                   type="checkbox" checked={tabChild.checked}
                                   onChange={(event) => this.props.changeCheckTabChild(event.target.checked, tabChild, tabParent)}
                            />{tabChild.name}
                        </label>
                    </div>
                </td>
                <td>{tabChild.url}</td>
            </tr>
        );
    }
}

ItemTabChild.propTypes = {
    tabChild: PropTypes.object.isRequired,
    tabParent: PropTypes.object.isRequired,
    changeCheckTabChild: PropTypes.func.isRequired,

};

export default ItemTabChild;
