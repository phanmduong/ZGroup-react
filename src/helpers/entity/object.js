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

/**
 * get value of object with string key
 * @param object example: {post: {creator: 'A'}}
 * @param strKey example: "post.creator"
 * @returns {*} example: A
 */
export function getValueFromKey(object, strKey) {
    let arrKey = strKey.split('.');
    let objectData = {...object};
    arrKey.forEach((key) => {
        if (isEmpty(objectData)) return;

        objectData = objectData[key];
    });
    return objectData;
}

/**
 * get value of object with string key
 * @param object example: {post: {creator: 'A'}, id: 10}
 * @param arrayKey example: ["post.creator", "id"]
 * @returns {*} example: {"post.creator": 'A', "id": 10} if empty value then return empty value
 */
export function getValuesFromKeys(object, arrayKey) {

    if (isEmpty(arrayKey)) return undefined;

    if (!Array.isArray(arrayKey)) {
        return {[arrayKey]: getValueFromKey(object, arrayKey)};
    }

    let data = {};

    arrayKey.forEach((key) => {
        data[key] = getValueFromKey(object, key);
    });

    return data;
}

/**
 * get second value if primary Value is empty
 * @param primaryValue
 * @param secondValue
 * @returns {*}
 */
export function getValuePrimary(primaryValue, secondValue) {
    return !isEmpty(primaryValue) ? primaryValue : secondValue;
}

/**
 * check data with key is empty
 * @param data
 * @param strKey
 * @returns {*}
 */
export function isEmptyWithKey(data, strKey) {
    return isEmpty(getValueFromKey(data, strKey));
}

export function removePropertyObjectWithKey(data, strKey) {
    if (isEmpty(data) || isEmpty(strKey)) return;

    const arrKey = strKey.split('.');

    const key = arrKey[0];

    const stringKey = arrKey.length <= 1 ? "" : (arrKey.length === 2 ? arrKey[1] : arrKey.join('.'));

    const dataByKey = getValueFromKey(data, key);

    if (!isEmpty(stringKey)) {
        return {
            ...data,
            [key]: removePropertyObjectWithKey(dataByKey, stringKey)
        };
    }

    return Object.entries(data).reduce((acc, [keyItem, value]) => {
        return keyItem === key ? acc : {...acc, [keyItem]: value};
    }, {});
}

export function removePropertyObjectWithKeys(data, arrayKey) {

    let result = {...data};
    arrayKey.forEach((key) => {
        result = removePropertyObjectWithKey(result, key);
    });

    return result;
}