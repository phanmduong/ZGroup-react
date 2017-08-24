import React from 'react';
import PropTypes from 'prop-types';
const ItemTemplate = ({template, onClick}) => {

    return (
        <div
            onClick={() => onClick(template)}
        >
            {template.name}
        </div>
    );

};

ItemTemplate.propTypes = {
    onClick: PropTypes.func.isRequired,
    template: PropTypes.object.isRequired,
};


export default ItemTemplate;
