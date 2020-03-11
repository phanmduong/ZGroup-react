// import ProfileContainer from "../modules/profile/ProfileContainer";
import ProfileEmployee from "../modules/profile2/ProfileEmployee";

/**
 * Tab Profile
 */
export default [
    {
        path: "/",
        component: ProfileEmployee
    },
    {
        path: "/profile/my-profile",
        component: ProfileEmployee
    },
    // {
    //     path: "/profile/edit-profile",
    //     component: EditProfileContainer
    // }
];
