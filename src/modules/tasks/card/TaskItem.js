import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from "react-bootstrap";

class TaskItem extends React.Component {

    componentDidMount() {
        $.material.init();
    }

    render() {
        const {task} = this.props;

        return (
            <ListGroupItem
                key={task.id}
                style={{display: "flex", justifyContent: "space-between"}}>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" name="optionsCheckboxes"/>
                        {task.title}
                    </label>
                </div>
                <button
                    onClick={() => this.props.deleteTask(task)}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
            </ListGroupItem>
        );

    }

}

TaskItem.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};

TaskItem.defaultProps = {};

export default TaskItem;