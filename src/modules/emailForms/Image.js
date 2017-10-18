import React from 'react';
import PropTypes from 'prop-types';

const Image = ({template}) => {
    return (<div
        style={{
            width: '100%',
            background: 'url(' + template.thumbnail_url + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150px',
            borderRadius: '10px'
        }} />);
};

Image.propTypes = {
    template: PropTypes.object.isRequired
};

export default Image;