import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({url, size}) => {
    console.log(url);
    return (
        <div style={{
            width: size,
            marginRight: 5,
            height: size,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "50%",
            border: "1px solid #d9d9d9",
            backgroundImage: `url(${url})`
        }}/>
    );
};

Avatar.propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
};

export default Avatar;