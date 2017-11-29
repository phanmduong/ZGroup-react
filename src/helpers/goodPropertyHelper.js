import {showErrorNotification} from "./helper";

export function isNotEmptyGoodProperty(goodProperties, goodPropertiesOutput) {
    let errorValue = "";
    let errorUnit = "";


    goodProperties.forEach((t) => {
        let output = goodPropertiesOutput;

        if (!t.value || (output[t.name] && (output[t.name].value || output[t.name].unit))) {
            if (!output[t.name] || output[t.name].value == null || output[t.name].value == "") {
                if (errorValue == "") {
                    errorValue += t.name;
                } else {
                    errorValue += ", " + t.name;
                }
            }

            if (t.preunit && (!output[t.name] || output[t.name].unit == null || output[t.name].unit == "")) {
                if (errorUnit == "") {
                    errorUnit += t.name;
                } else {
                    errorUnit += ", " + t.name;
                }
            }
        }
    });
    if (errorValue !== "") {
        showErrorNotification("Bạn nhập thiếu giá trị thuộc tính: " + errorValue);
    }
    if (errorUnit !== "") {
        showErrorNotification("Bạn nhập thiếu đơn vị thuộc tính: " + errorUnit);
    }

    return errorUnit === "" && errorValue === "";
}