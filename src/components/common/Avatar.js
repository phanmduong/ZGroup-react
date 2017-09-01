import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({url, size, className}) => {
    return (
        <div className={className || ""} style={{
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
    className: PropTypes.string,
    size: PropTypes.number.isRequired
};

export default Avatar;