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

        let dateClickFun = this.props.onClickDay;

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
            locale: "vi",
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
            dayClick: function (date) {
                $('td.fc-day.fc-widget-content').css('background-color', 'white');
                $(this).css('background-color', '#bfbdbd');
                if (dateClickFun) {
                    dateClickFun(date);
                }

            },
            eventRender: function (event, element, view) {
                if (view.type == 'listWeek') {
                    let toInject = [];
                    toInject.push(event.phone);
                    toInject.push(event.number_person || "Chưa có số lượng khách");
                    toInject.push(event.note || "Chưa có ghi chú");
                    for (let i = 0; i < toInject.length; i++) {
                        element.append('<td>' + toInject[i] + '</td>');
                    }
                    let tableSubHeaders = jQuery("td.fc-widget-header");
                    // let maxCol = 0;
                    // for (let i = 0; i < toInject.length; i++) {
                    //     maxCol = Math.max(maxCol,toInject[i].children.length);
                    // }
                    // console.log("number of items : " + maxCol);
                    tableSubHeaders.attr("colspan",6);
                }
            },
            eventAfterAllRender : function( view ) {
                if (view.type == 'listWeek') {
                    let tableSubHeaders = jQuery("td.fc-widget-header");
                    tableSubHeaders.attr("colspan",6);
                }
            },


            editable: true,
            droppable:
                true,
            eventLimit:
                true,
            events:
            calendarEvents,
            navLinks:
                true,
            resourceText:
                "title"
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
