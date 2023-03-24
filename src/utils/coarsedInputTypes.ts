import {
    DateTimeFields,
    InputOnlyFields,
    InputWithDropDown,
    IsEmailInput,
    IsNumberInput,
    IsTextInput,
    TextFields,
} from "../schema/types";

export const IsTextInputArr: Array<IsTextInput> = ["short_text", "long_text", "phone"];

export const IsNumberInputArr: Array<IsNumberInput> = ["integer", "number"];

export const IsEmailInputArr: Array<IsEmailInput> = ["email"];

export const TextFieldsArr: Array<TextFields> = [
    "short_text",
    "long_text",
    "phone",
    "integer",
    "number",
    "email",
    "label",
];

export const DateTimeFieldsArr: Array<DateTimeFields> = ["date", "time", "date_time"];

export const InputOnlyFieldsArr: Array<InputOnlyFields> = [
    "short_text",
    "long_text",
    "phone",
    "integer",
    "number",
    "email",
    "label",
    "date",
    "time",
    "date_time",
];

export const InputWithDropDownArr: Array<InputWithDropDown> = ["checkbox", "drop_down", "radio"];
