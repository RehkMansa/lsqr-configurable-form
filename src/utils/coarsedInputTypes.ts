/* export const IsTextInputArr = ["short_text", "long_text", "phone"] satisfies Array<IsTextInput>;

export const IsNumberInputArr = ["integer", "number"] satisfies Array<IsNumberInput>;

export const IsEmailInputArr = ["email"] satisfies Array<IsEmailInput>; */

export const TextFieldsArr: TextFields[] = [
    "short_text",
    "long_text",
    "phone",
    "integer",
    "number",
    "email",
    "label",
];

export const textFieldPredicate = (x: string): x is TextFields => TextFieldsArr.includes(x);

export const DateTimeFieldsArr = ["date", "time", "date_time"] satisfies Array<DateTimeFields>;

export const dateTimePredicate = (x: string): x is DateTimeFields => DateTimeFieldsArr.includes(x);

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
    "dropdown",
    "radio",
] satisfies Array<InputWithDropDown>;

export const inputWithDropDownPredicate = (x: string): x is InputWithDropDown =>
    InputWithDropDownArr.includes(x);
