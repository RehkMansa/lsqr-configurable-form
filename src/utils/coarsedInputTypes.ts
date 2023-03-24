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

export const textFieldPredicate = (type: string): type is TextFields =>
    TextFieldsArr.includes(type);

export const DateTimeFieldsArr = ["date", "time", "date_time"] satisfies Array<DateTimeFields>;

export const dateTimePredicate = (type: string): type is DateTimeFields =>
    DateTimeFieldsArr.includes(type);

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

export const inputWithDropDownPredicate = (type: string): type is InputWithDropDown =>
    InputWithDropDownArr.includes(type);
export const UploadTypeInput: UploadTypeInput[] = ["upload", "video", "audio", "image"];

export const uploadTypePredicate = (type: string): type is UploadTypeInput =>
    UploadTypeInput.includes(type);
