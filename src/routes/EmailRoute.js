import EmailSubscribersListContainer from "../modules/emailSubscribersList/EmailSubscribersListContainer";
import SubscribersContainer from "../modules/emailSubscribersList/SubscribersContainer";
import EmailCampaignsContainer from "../modules/emailCampaigns/EmailCampaignsContainer";
import EmailTemplatesContainer from "../modules/emailTemplates/EmailTemplatesContainer";
import CreateEmailTemplateContainer from "../modules/emailTemplates/CreateEmailTemplateContainer";
import EmailFormsContainer from "../modules/emailForms/EmailFormsContainer";
import CreateEmailFormContainer from "../modules/emailForms/CreateEmailFormContainer";
import EmailCommentFBContainer from "../modules/emailCommentsFB/EmailCommentFBContainer";

/**
 * Tab Email
 */
export default [
    {
        // path: "/manage/subscribers_list",
        path: "/email/subscribers_list",
        component: EmailSubscribersListContainer
    }, {
        path: "/email/subscribers(/:listId)",
        component: SubscribersContainer
    }, {
        // path: "/manage/campaigns(/:ownerId)",
        path: "/email/campaigns(/:ownerId)",
        component: EmailCampaignsContainer
    }, {
        // path: "/email-maketing/templates",
        path: "/email/email-maketing/templates",
        component: EmailTemplatesContainer
    }, {
        // path: "/email-template/create",
        path: "/email/email-template/create",
        component: CreateEmailTemplateContainer,
        type: "create"
    }, {
        // path: "/email-template/:emailTemplateId/edit",
        path: "/email/email-template/:emailTemplateId/edit",
        component: CreateEmailTemplateContainer,
        type: "edit"
    }, {
        // path: "/email-maketing/forms",
        path: "/email/email-maketing/forms",
        component: EmailFormsContainer
    }, {
        // path: "/email-form/create",
        path: "/email/email-form/create",
        component: CreateEmailFormContainer,
        type: "create"
    }, {
        // path: "/email-form/:emailFormId/edit",
        path: "/email/email-form/:emailFormId/edit",
        component: CreateEmailFormContainer,
        type: "edit"
    },
    {
        path: "/email/email-comment-post-fb",
        component: EmailCommentFBContainer,
    }
];
