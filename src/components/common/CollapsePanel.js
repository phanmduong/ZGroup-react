import React from 'react';
import PropTypes from 'prop-types';

// import * as helper from '../../helpers/helper';


class CollapsePanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        // console.log(this.props.content);
    }

    render() {
        if (!this.props.isMultiSelect)
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">

                        <a href={"#" + this.props.id}
                            role="button" data-toggle="collapse" data-parent="#accordion"
                            aria-expanded="false" aria-controls="collapseOne" className="collapsed"
                        >
                            <h4 className="panel-title">
                                {this.props.title}
                                <i className="material-icons">keyboard_arrow_down</i>
                            </h4>
                        </a>
                    </div>
                    <div id={this.props.id} className="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingOne" aria-expanded="false"
                        style={this.props.style}
                    >
                        {this.props.children}
                    </div>
                </div>
            );
        else return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">

                        <a href={"#" + this.props.id}
                            role="button" data-toggle="collapse" data-parent="#accordion"
                            aria-expanded="false" aria-controls="collapseOne" className="collapsed"
                        >
                            <h4 className="panel-title">
                                {this.props.title}
                                <i className="material-icons">keyboard_arrow_down</i>
                            </h4>
                        </a>
                    </div>
                    <div id={this.props.id} className="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingOne" aria-expanded="false"
                        style={this.props.style}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

CollapsePanel.propTypes = {
    isMultiSelect: PropTypes.bool.isRequired,
    content: PropTypes.object,
    children: PropTypes.element,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default CollapsePanel;


// ---------- NOTE : Thêm
// <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
// Vào trước list các collapsePanel
