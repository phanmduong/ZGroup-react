import BookingRegisterSessionContainer from "../modules/ZgroupFilm/bookingRegisterSession/BookingRegisterSessionContainer";
import FilmContainer from "../modules/ZgroupFilm/film/FilmContainer";
import AllFilmContainer from "../modules/ZgroupFilm/film/AllFilmContainer";
import ComingFilmContainer from "../modules/ZgroupFilm/film/ComingFilmContainer";
import ShowingFilmContainer from "../modules/ZgroupFilm/film/ShowingFilmContainer";
import ShownFilmContainer from "../modules/ZgroupFilm/film/ShownFilmContainer";
import SessionContainer from "../modules/ZgroupFilm/session/SessionContainer";
import AllSessionContainer from "../modules/ZgroupFilm/session/AllSessionContainer";
import ShowingSessionContainer from "../modules/ZgroupFilm/session/ShowingSessionContainer";
import ShownSessionContainer from "../modules/ZgroupFilm/session/ShownSessionContainer";
import BookingHistoryContainer from "../modules/ZgroupFilm/bookingHistory/BookingHistoryContainer";
import FIlmCustomerContainer from "../modules/ZgroupFilm/filmCustomer/FIlmCustomerContainer";


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
            },
            {
                path: "shown",
                component: ShownFilmContainer
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
            },
            {
                path: "shown",
                component: ShownSessionContainer
            }
        ]
    },
    {
        path: "/film/customer",
        component: FIlmCustomerContainer,
    },
    {
        path: "film/booking-history",
        component: BookingHistoryContainer
    }
];
