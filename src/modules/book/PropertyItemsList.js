import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';

class PropertyItemsList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.isInited = false;
    }

    componentDidUpdate() {
        const containers = Array.prototype.slice.call(document.querySelectorAll(`.property-items-container-${this.props.task.id}`));

        if (!this.isInited) {
            this.isInited = true;

            this.boardDrake = Dragula(containers);
            this.boardDrake.on('drop', function (el, target, source, sibling) {
                // this.boardDrake.cancel();

                // let siblingOrder = -1;
                // if (sibling) {
                //     siblingOrder = Number(sibling.dataset.order);
                // }
                console.log(sibling);
                // this.props.movePropertyItem(Number(source.id), Number(target.id), Number(el.id), siblingOrder);
                return true;
            }.bind(this));
        }

    }

    render() {
        const {task} = this.props;
        return (
            <div>
                {
                    task.good_property_items && task.good_property_items.length > 0 && (
                        <div className={`property-items-container-${task.id}`}>
                            {
                                task.good_property_items.map((item) => {
                                    return (
                                        <div
                                            key={item.id}>{item.name}: {item.prevalue} {item.preunit}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

PropertyItemsList.propTypes = {
    task: PropTypes.object.isRequired
};

export default PropertyItemsList;