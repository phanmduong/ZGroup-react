export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function isEmptyInput(input) {
    return input === null || input === undefined || input.trim().length <= 0;
}