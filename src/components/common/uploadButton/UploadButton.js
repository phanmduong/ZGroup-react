import React from 'react';
import PropTypes from 'prop-types';
import './uploadButton.scss';

class UploadButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="upload-button">
                <label style={{...this.props.style}} className={this.props.className}>
                    <input
                        multiple
                        className="upload-button-file"
                        ref={(ref) => {
                            this.input = ref;
                        }}
                        onChange={this.props.onChange}
                        type="file"
                    />
                    {this.props.children}
                </label>
            </div>
        );
    }
}

UploadButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.string.isRequired
    ]),
    style: PropTypes.object,
};

export default UploadButton;