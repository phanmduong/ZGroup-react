import ProfileContainer from "../modules/profile/ProfileContainer";
import EditProfileContainer from "../modules/profile/EditProfileContainer";

/**
 * Tab Profile
 */
export default [
    {
        path: "/profile/my-profile",
        component: ProfileContainer
    },
    {
        path: "/profile/edit-profile",
        component: EditProfileContainer
    }
];
