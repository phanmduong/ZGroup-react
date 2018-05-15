import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Calendar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initFullCalendar = this.initFullCalendar.bind(this);
    }

    componentDidMount() {
        this.initFullCalendar(this.props.calendarEvents);
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props.calendarEvents, nextProps.calendarEvents);
    }

    componentDidUpdate() {
        $("#" + this.props.id).fullCalendar("removeEvents");
        $("#" + this.props.id).fullCalendar("addEventSource", this.props.calendarEvents);
        $("#" + this.props.id).fullCalendar("rerenderEvents");
    }

    initFullCalendar(calendarEvents) {
        let $calendar = $("#" + this.props.id);

        let today = new Date();

        $calendar.fullCalendar({
            viewRender: function (view, element) {
                if (view.name != "month") {
                    $(element)
                        .find(".fc-scroller")
                        .perfectScrollbar();
                }
            },
            header: {
                left: "prev,next today",
                center: "title",
                right: "month,agendaWeek,agendaDay,listWeek"
            },
            locale: "vn",
            defaultDate: today,
            selectable: true,
            selectHelper: true,
            views: {
                month: {
                    // name of view
                    titleFormat: "MMMM YYYY"
                    // other view-specific options here
                },
                week: {
                    titleFormat: " MMMM D YYYY"
                },
                day: {
                    titleFormat: "D MMM, YYYY"
                }
            },
            eventDrop: event => {
                this.props.onDropTime(event);
            },
            eventClick: event => {
                this.props.onClick(event);
            },
            // dayClick: date =>{
            //     this.props.onClickDay(date);
            // },
            dayClick: (date) => {
                if (this.props.onClickDay) {
                    this.props.onClickDay(date);
                }
            },

            select: ()=> {
            },
            editable: true,
            droppable: true,
            eventLimit: true,
            events: calendarEvents,
            navLinks: true,
            resourceText: "title"
        });
    }

    render() {
        return <div id={this.props.id} style={{padding: "20px"}}/>;
    }
}

Calendar.propTypes = {
    id: PropTypes.string.isRequired,
    calendarEvents: PropTypes.func,
    onDropTime: PropTypes.func,
    onClick: PropTypes.func,
    onClickDay: PropTypes.func,
};

export default Calendar;
