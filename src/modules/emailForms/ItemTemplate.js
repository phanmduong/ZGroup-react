import React from 'react';
import PropTypes from 'prop-types';

const ItemTemplate = ({template, onClick}) => {

    return (
        <div className="col-md-4" onClick={() => onClick(template)} id="card-email-template">
            <div className="card card-chart">
                <div className="card-header" data-background-color="white" style={{
                    borderRadius: '10px'
                }}>
                    <div id="simpleBarChart" className="ct-chart"
                         style={{
                             width: '100%',
                             background: 'url(' + template.thumbnail_url + ')',
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             height: '200px',
                             borderRadius: '10px'
                         }}
                    >
                        {/*<div style={template.thumbnail_url}/>*/}
                    </div>
                </div>
                <div className="card-content">
                    <h4 className="card-title">{template.name}</h4>
                    <p className="category">{template.owner.name}</p>
                </div>
            </div>
        </div>
    );

};

ItemTemplate.propTypes = {
    onClick: PropTypes.func.isRequired,
    template: PropTypes.object.isRequired,
};


export default ItemTemplate;
