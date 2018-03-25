import React from "react";
import { PropTypes } from "prop-types";

class RoomGanttChartRow extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate() {}

    render() {
        const { room } = this.props;
        return (
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        flex: 0,
                        flexBasis: "150px",
                    }}
                >
                    {room.name}
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                    {room.spans &&
                        room.spans.map((span, index) => (
                            <div
                                key={index}
                                className="bar"
                                style={{
                                    backgroundColor: span.color,
                                    width: span.width,
                                    left: span.start,
                                }}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

RoomGanttChartRow.propTypes = {
    room: PropTypes.object.isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps)(DashBoardUpContainer);
export default RoomGanttChartRow;
