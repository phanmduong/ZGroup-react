import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";

class ProcessTaskItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
    }

    componentDidMount() {
        $.material.init();
    }

    toggleTaskStatus() {
        this.props.toggleTaskStatus(this.props.task);
    }

    render() {
        const {task} = this.props;
        return (
            <div className="checkbox" id={"task" + task.id}>
                <label style={{fontWeight: 700, color: "#858585"}}>
                    <input
                        disabled={task.status}
                        checked={task.status || false}
                        onChange={this.toggleTaskStatus}
                        type="checkbox" name="optionsCheckboxes"/>
                    <div style={{
                        display: "inline-block",
                        position: "relative",
                        top: 4
                    }}>
                        {
                            task.member && (
                                <Avatar url={task.member.avatar_url} size={20}/>
                            )
                        }
                    </div>
                    {task.title}
                    {
                        task.deadline_str && (
                            <small className="keetool-card"
                                   style={{fontWeight: 400}}>
                                - {task.deadline_str}</small>
                        )
                    }
                </label>
            </div>
        );
    }
}

ProcessTaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    toggleTaskStatus: PropTypes.func.isRequired
};

export default ProcessTaskItem;