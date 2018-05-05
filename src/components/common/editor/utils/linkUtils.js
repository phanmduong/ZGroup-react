/**
 * A change helper to standardize wrapping links.
 *
 * @param {Change} change
 * @param {String} href
 */
export const wrapLink = (change, href) => {
    change.wrapInline({
        type: "link",
        data: { href },
    });
    change.collapseToEnd();
};

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Change} change
 */
export const unwrapLink = change => {
    change.unwrapInline("link");
};
