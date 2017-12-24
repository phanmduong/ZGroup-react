import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';

const ItemTemplate = ({template, deleteEmailTemplate}) => {

    return (
        <div className="col-sm-4" id="card-email-template">
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
                    />
                </div>
                <div className="card-content">
                    <div className="card-action">
                        <h4 className="card-title">{template.name}</h4>
                        <ButtonGroupAction
                            delete={deleteEmailTemplate}
                            editUrl={"/email/email-template/" + template.id + "/edit"}
                            object={template}
                        />
                    </div>
                    <p className="category">{template.owner.name}</p>
                </div>
            </div>
        </div>
    );

};
ItemTemplate.propTypes = {
    template: PropTypes.object.isRequired,
    deleteEmailTemplate: PropTypes.func.isRequired,
};

export default ItemTemplate;
