import * as types from '../../constants/actionTypes';
import * as emailTemplateApi from './emailTemplateApi';

/*eslint no-console: 0 */
export function loadTemplates(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_TEMPLATES,
        });
        emailTemplateApi.loadTemplates(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_SUCCESS,
                    templates: res.data.email_templates,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() =>{
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_ERROR,
                });
        });
    };
}