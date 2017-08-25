import React from 'react';
import PropTypes from 'prop-types';
import ItemTemplate from './ItemTemplate';

class ListTemplate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.props.templates.map(template => {
                        return (
                            <ItemTemplate template={template} key={template.id}/>
                        );
                    })}
                </div>

            </div>
        );
    }
}

ListTemplate.propTypes = {
    templates: PropTypes.array.isRequired
};

export default ListTemplate;