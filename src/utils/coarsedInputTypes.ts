export const IsTextInputArr = ["short_text", "long_text", "phone"] satisfies Array<IsTextInput>;

export const IsNumberInputArr = ["integer", "number"] satisfies Array<IsNumberInput>;

export const IsEmailInputArr = ["email"] satisfies Array<IsEmailInput>;

export const TextFieldsArr = [
    "short_text",
    "long_text",
    "phone",
    "integer",
    "number",
    "email",
    "label",
] satisfies Array<TextFields>;

export const DateTimeFieldsArr = ["date", "time", "date_time"] satisfies Array<DateTimeFields>;

export const InputOnlyFieldsArr = [
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
] satisfies Array<InputOnlyFields>;

export const InputWithDropDownArr = [
    "checkbox",
    "drop_down",
    "radio",
] satisfies Array<InputWithDropDown>;
