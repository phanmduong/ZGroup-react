import React from 'react';
import PropTypes from 'prop-types';

const ItemTemplate = ({name}) => {

    return (
        <div>{name}</div>
    );

};
ItemTemplate.propTypes = {
    name: PropTypes.string
};

export default ItemTemplate;
