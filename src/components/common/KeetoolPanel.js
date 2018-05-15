import React from 'react';
import PropTypes from 'prop-types';
import {Panel} from "react-bootstrap";

class KeetoolPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const PropertyItemsHeader = (
            <div className="good-detail-header"
                 style={{
                     width: "100%",
                     height: "100%"
                 }}>
                {this.props.title}
            </div>
        );
        return (
            <Panel collapsible
                   header={PropertyItemsHeader}>
                <div>
                    {this.props.children}
                </div>
            </Panel>
        );
    }
}

KeetoolPanel.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
};

export default KeetoolPanel;