import React from 'react';
import PropTypes from 'prop-types';
import {isEmptyInput} from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";

const Avatar = ({url, size, className, distance, style}) => {
    let marginRight = 5;
    if (distance || distance ===0) {
        marginRight = distance;
    }
    if(isEmptyInput(url)){
        url = NO_AVATAR;
    }
    return (
        <div className={className || ""} style={{
            width: size,
            marginRight,
            height: size,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 4,
            backgroundImage: `url(${url})`,
            ...style
        }}/>
    );
};

Avatar.propTypes = {
    distance: PropTypes.number,
    style: PropTypes.object,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number.isRequired
};

export default Avatar;