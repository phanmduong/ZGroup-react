import React from 'react';
import Avatar from './Avatar';
import PropTypes from 'prop-types';
import {isEmptyInput} from "../../helpers/helper";

const ItemReactSelect = ({url, label}) => {

    return (
        <div className="flex-row-center">
            {!isEmptyInput(url) && <Avatar size={30} url={url}/>}
            <div className="text-h6">{label}</div>
        </div>
    );

};

ItemReactSelect.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default ItemReactSelect;
