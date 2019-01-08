function isUndefined(data) {
    return data === undefined;
}

function isNull(data) {
    return data == null;
}

function isNotValue(data) {
    return data == "";
}

function isEmpty(data) {
    return isUndefined(data) || isNull(data) || isNotValue(data);
}

export function isEmptyArr(arr) {
    return arr && arr.length > 0;
}

export function addFirstArray(array, data) {
    if (!Array.isArray(array)) return null;
    return [data, ...array];
}

export function addLastArray(array, data) {
    if (!Array.isArray(array)) return null;
    return [data, ...array];
}

export function concat2Array(arr1, arr2) {

    if (!Array.isArray(arr1)) return null;

    if (!Array.isArray(arr2)) return null;

    return [...arr1, ...arr2];
}

function getValueFromKey(object, strKey) {
    let arrKey = strKey.split('.');
    let objectData = {...object};
    arrKey.forEach((key) => {
        if (isEmpty(objectData)) return;

        objectData = objectData[key];
    });
    return objectData;
}

export function removeItemArray(arr, key, value) {
    if (!Array.isArray(arr)) return null;
    return arr.filter((item) => getValueFromKey(item, key) == value);
}

export function removeLastArray(arr) {

    if (!Array.isArray(arr)) return null;

    return arr.filter((_, index, arr) => index != arr.length - 1);
}

export function removeFirstArray(arr) {

    if (!Array.isArray(arr)) return null;

    return arr.filter((_, index, arr) => index != arr.length - 1);
}

export function removeIndexArray(arr, index) {

    if (!Array.isArray(arr)) return null;

    return arr.filter((_, indexItem) => indexItem != index);
}