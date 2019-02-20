import plain from "slate-plain-serializer";
import html from "../editor/HtmlConverter";

export const plainToValue = plainText => {
    if (!plainText) {
        plainText = "";
    }
    return plain.deserialize(plainText);
};

export const valueToPlain = value => {
    if (!value) {
        return "";
    }
    return plain.serialize(value);
};

export const htmlToValue = htmlText => {
    if (!htmlText) {
        htmlText = "";
    }
    return html.deserialize(htmlText);
};
export const valueToHtml = value => {
    if (!value) {
        value = "";
    }
    return html.serialize(value);
};
