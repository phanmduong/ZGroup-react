import { isKeyHotkey } from "is-hotkey";

/**
 * Define the default node type.
 *
 * @type {String}
 */

export const DEFAULT_NODE = "paragraph";

/**
 * Check if the current selection has a mark with `type` in it.
 *
 * @param {String} type
 * @return {Boolean}
 */
export const hasMark = (type, value) => {
    return value.activeMarks.some(mark => mark.type == type);
};

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {String} type
 * @return {Boolean}
 */

export const hasBlock = (type, value) => {
    return value.blocks.some(node => node.type == type);
};

export const hasInline = (type, value) => {
    return value.inlines.some(inline => inline.type == type);
};

export const isBoldHotkey = isKeyHotkey("mod+b");
export const isItalicHotkey = isKeyHotkey("mod+i");
export const isUnderlinedHotkey = isKeyHotkey("mod+u");
export const isCodeHotkey = isKeyHotkey("mod+`");
