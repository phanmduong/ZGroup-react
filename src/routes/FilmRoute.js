import RoomControlContainer from "../modules/ZgroupFilm/roomControl/RoomControlContainer";
import FilmContainer from "../modules/ZgroupFilm/film/FilmContainer";
import ShowFilmContainer from "../modules/ZgroupFilm/film/ShowFilmContainer";
import AllFilmContainer from "../modules/ZgroupFilm/film/AllFilmContainer";
import ComingFilmContainer from "../modules/ZgroupFilm/film/ComingFilmContainer";
import ShowingFilmContainer from "../modules/ZgroupFilm/film/ShowingFilmContainer";
import SessionContainer from "../modules/ZgroupFilm/session/SessionContainer";
import AllSessionContainer from "../modules/ZgroupFilm/session/AllSessionContainer";
import ShowingSessionContainer from "../modules/ZgroupFilm/session/ShowingSessionContainer";
import BlogFilmContainer from "../modules/ZgroupFilm/blogFilm/BlogFilmContainer";



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
            }
        ]
    },
    {
        path:"film/film/:filmId",
        component: ShowFilmContainer
    },
    {
        path:"film/blog",
        component: BlogFilmContainer
    }
];
