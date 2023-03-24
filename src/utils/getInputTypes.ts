import { TextFields } from "../schema/types";

export const getTextInputType = (type: TextFields): "number" | "text" | "email" | "tel" => {
    switch (type) {
        case "long_text":
        case "short_text":
            return "text";

        case "integer":
        case "number":
            return "number";

        case "email":
            return "email";

        case "phone":
            return "tel";

        default:
            return "text";
    }
};

export const getDateTimeInput = (type: DateTimeFields) => {
    return "";
};
