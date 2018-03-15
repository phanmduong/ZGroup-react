import React from "react";
import RoomGanttChartRow from "./RoomGanttChartRow";

class RoomGanttChartComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rooms: [
                {
                    name: "Phòng 101",
                    spans: [
                        {
                            color: "#00AA8D",
                            width: "30%",
                            start: "20%",
                        },
                        {
                            color: "#eabbf5fd",
                            width: "30%",
                            start: "60%",
                        },
                    ],
                },
                {
                    name: "Phòng 102",
                    spans: [
                        {
                            color: "#eabbf5fd",
                            width: "60%",
                            start: "0%",
                        },
                        {
                            color: "#00AA8D",
                            width: "40%",
                            start: "60%",
                        },
                    ],
                },
                {
                    name: "Phòng 103",
                    spans: [
                        {
                            color: "#eabbf5fd",
                            width: "30%",
                            start: "10%",
                        },
                        {
                            color: "#00AA8D",
                            width: "50%",
                            start: "45%",
                        },
                    ],
                },
                {
                    name: "Phòng 104",
                    spans: [
                        {
                            color: "#eabbf5fd",
                            width: "40%",
                            start: "0%",
                        },
                        {
                            color: "#eabbf5fd",
                            width: "30%",
                            start: "50%",
                        },
                        {
                            color: "#00AA8D",
                            width: "10%",
                            start: "80%",
                        },
                    ],
                },
            ],
        };
    }

    componentDidUpdate() {}

    render() {
        return (
            <div>
                {this.state.rooms.map(room => (
                    <RoomGanttChartRow room={room} />
                ))}
            </div>
        );
    }
}

RoomGanttChartComponent.propTypes = {};

// export default connect(mapStateToProps, mapDispatchToProps)(DashBoardUpContainer);
export default RoomGanttChartComponent;
