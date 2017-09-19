import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({url, size, className, distance}) => {
    let marginRight = 5;
    if (distance || distance ===0) {
        marginRight = distance;
    }
    return (
        <div className={className || ""} style={{
            width: size,
            marginRight,
            height: size,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 4,
            backgroundImage: `url(${url})`
        }}/>
    );
};

Avatar.propTypes = {
    distance: PropTypes.number,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number.isRequired
};

export default Avatar;