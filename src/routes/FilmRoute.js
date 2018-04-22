import RoomControlContainer from "../modules/roomControl/RoomControlContainer";
import FilmContainer from "../modules/film/FilmContainer";
import ShowFilmContainer from "../modules/film/ShowFilmContainer";
import AllFilmContainer from "../modules/film/AllFilmContainer";
import ComingFilmContainer from "../modules/film/ComingFilmContainer";
import ShowingFilmContainer from "../modules/film/ShowingFilmContainer";
import SessionContainer from "../modules/session/SessionContainer";
import AllSessionContainer from "../modules/session/AllSessionContainer";
import ShowingSessionContainer from "../modules/session/ShowingSessionContainer";
import ComingSessionContainer from "../modules/session/ComingSessionContainer";
import DaySessionContainer from "../modules/session/DaySessionContainer";



/**
 * Tab Event
 */
export default [
    {
        path: "/film/room-control",
        component: RoomControlContainer,
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
        path:"/film/session",
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
                path: "coming",
                component: ComingSessionContainer
            },
            {
                path: "day",
                component: DaySessionContainer
            }
        ]
    },
    {
        path:"film/film/:filmId",
        component: ShowFilmContainer
    }
];
