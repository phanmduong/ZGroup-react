import React from 'react';
import PropTypes from 'prop-types';
import Plain from 'slate-plain-serializer';
import {Editor} from 'slate-react';



const propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
class PlainTextEditor extends React.Component {
    state = {
        value: Plain.deserialize(
            this.props.value
        )
    }

    onChange = ({value}) => {
        this.setState({value});
        this.props.onChange(Plain.serialize(value));
    }
    
    render() {
        return (
            <div className="editor-wrapper">
                <Editor
                    placeholder="Enter text"
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}
PlainTextEditor.propTypes = propTypes;

export default PlainTextEditor;
