import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({url, size}) => {
    return (
        <div style={{
            width: size,
            marginRight: 5,
            height: size,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 4,
            backgroundImage: `url(${url})`
        }}/>
    );
};

Avatar.propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
};

export default Avatar;