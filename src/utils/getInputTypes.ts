import { assertCannotReach } from "./helpers";

export const getTextInputType = (type: TextFields): "number" | "text" | "email" | "tel" => {
    let output: "number" | "text" | "email" | "tel" = "text";

    switch (type) {
        case "long_text":
        case "short_text":
            output = "text";
            break;
        case "integer":
        case "number":
            output = "number";
            break;
        case "email":
            output = "email";
            break;
        case "phone":
            output = "tel";
            break;
        case "label":
            output = "text";
            break;
        default:
            assertCannotReach(type);
            break;
    }

    return output;
};

export const getDateTimeInput = (type: DateTimeFields): "date" | "time" | "datetime-local" => {
    let output: "date" | "time" | "datetime-local" = "date";

    console.log(type);

    switch (type) {
        case "date":
            output = "date";
            break;
        case "date_time":
            output = "datetime-local";
            break;
        case "time":
            output = "time";
            break;
        default:
            assertCannotReach(type);
    }

    return output;
};
