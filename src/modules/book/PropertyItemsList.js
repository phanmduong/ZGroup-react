import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';

class PropertyItemsList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.isInited = false;
        this.updatePropertyItemsOrder = this.updatePropertyItemsOrder.bind(this);
    }

    componentDidUpdate() {
        const containers = Array.prototype.slice.call(document.querySelectorAll(`.property-items-container-${this.props.task.id}`));

        if (!this.isInited) {
            this.isInited = true;

            this.boardDrake = Dragula(containers);
            this.boardDrake.on('drop', function (el, target, source, sibling) {
                // this.boardDrake.cancel();

                let siblingOrder = -1;
                if (sibling) {
                    siblingOrder = Number(sibling.dataset.order);
                }
                let elOrder = -1;
                if (el) {
                    elOrder = Number(el.dataset.order);
                }
                console.log(sibling);
                console.log(el);
                this.updatePropertyItemsOrder(siblingOrder, elOrder);
                return true;
            }.bind(this));
        }

    }

    updatePropertyItemsOrder(siblingOrder, elOrder) {
        // let goodPropertyItems = this.props.task.good_property_items;
        console.log(siblingOrder);
        console.log(elOrder);
        // goodPropertyItems = goodPropertyItems.filter((item) => {
        //     return item.order !== siblingOrder;
        // });
        // console.log(goodPropertyItems);


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
                                            data-order={item.order}
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