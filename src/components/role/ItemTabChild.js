import React from 'react';


class ItemTabChild extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {tabChild, tabParent} = this.props;
        return (
            <tr>
                <td>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={tabChild.checked}
                                   onChange={(event) => this.props.changeCheckTabChild(event.target.checked, tabChild, tabParent)}
                            />
                            {tabChild.name}
                        </label>
                    </div>
                </td>
                <td>{tabChild.url}</td>
            </tr>
        );
    }
}

export default ItemTabChild;
