import BookingRegisterSessionContainer from "../modules/ZgroupFilm/bookingRegisterSession/BookingRegisterSessionContainer";
import FilmContainer from "../modules/ZgroupFilm/film/FilmContainer";
import AllFilmContainer from "../modules/ZgroupFilm/film/AllFilmContainer";
import ComingFilmContainer from "../modules/ZgroupFilm/film/ComingFilmContainer";
import ShowingFilmContainer from "../modules/ZgroupFilm/film/ShowingFilmContainer";
import SessionContainer from "../modules/ZgroupFilm/session/SessionContainer";
import AllSessionContainer from "../modules/ZgroupFilm/session/AllSessionContainer";
import ShowingSessionContainer from "../modules/ZgroupFilm/session/ShowingSessionContainer";
import SeatTypeContainer from "../modules/ZgroupFilm/seatType/SeatTypeContainer";
import CodeContainer from "../modules/ZgroupFilm/code/CodeContainer";
import BookingHistoryContainer from "../modules/ZgroupFilm/bookingHistory/BookingHistoryContainer";


/**
 * Tab Event
 */
export default [
    {
        path: "/film/booking",
        component: BookingRegisterSessionContainer,
    },
    {
        path: "/film",
        component: FilmContainer,
        children: [
            {
                path: "all",
                component: AllFilmContainer
            },
            {
                path: "showing",
                component: ShowingFilmContainer
            },
            {
                path: "coming",
                component: ComingFilmContainer
            }
        ]
    },
    {
        path: "/film/session",
        component: SessionContainer,
        children: [
            {
                path: "all",
                component: AllSessionContainer
            },
            {
                path: "showing",
                component: ShowingSessionContainer
            }
        ]
    },
    {
        path: "film/seat-type",
        component: SeatTypeContainer
    },
    {
        path: "film/code",
        component: CodeContainer
    },
    {
        path: "film/booking-history",
        component: BookingHistoryContainer
    }
];
