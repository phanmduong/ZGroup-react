import React from 'react';

export default class Sort extends React.Component {
    render() {
        return (
            <div className="flex flex-row flex-align-items-center">
                <div>{this.props.title}</div>
                <div className="asc-icon">
                    <i className="material-icons">
                        arrow_downward
                    </i>
                </div>
                <div className="desc-icon">
                    <i className="material-icons">
                        arrow_upward
                    </i>
                </div>
            </div>
        );
    }
}
