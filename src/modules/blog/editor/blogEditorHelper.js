import {
    plainToValue,
    htmlToValue,
    valueToHtml,
    valueToPlain
} from "../../../components/common/editor/editorHelpers";

export const postTextToValue = post => {
    return {
        ...post,
        description: plainToValue(post.description),
        meta_title: plainToValue(post.meta_title),
        keyword: plainToValue(post.keyword),
        meta_description: plainToValue(post.meta_description),
        content: htmlToValue(post.content)
    };
};

export const postValueToText = post => {
    return {
        ...post,
        content: valueToHtml(post.content),
        description: valueToPlain(post.description),
        meta_title: valueToPlain(post.meta_title),
        keyword: valueToPlain(post.keyword),
        meta_description: valueToPlain(post.meta_description)
    };
};
