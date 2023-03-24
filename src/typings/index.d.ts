/* eslint-disable @typescript-eslint/ban-types */
declare type ProgressAction = {
    type: string;
    label: string;
    message: string;
};

declare type CancelAction = {
    type: "cancel";
    message: string;
    label: string;
    showModal?: boolean;
};

declare type ActionTypes = [ProgressAction, CancelAction];

declare type IsTextInput = "short_text" | "long_text" | "phone";

declare type IsNumberInput = "integer" | "number";

declare type IsEmailInput = "email";

declare type TextFields = IsTextInput | IsNumberInput | IsEmailInput | "label";

declare type DateTimeFields = "date" | "time" | "date_time";

declare type InputOnlyFields = TextFields | DateTimeFields;

declare type InputWithDropDown = "checkbox" | "dropdown" | "radio";

declare type UploadTypeInput = "upload" | "video" | "audio" | "image";

declare type Validation = Partial<{
    required?: boolean;
    minimum?: number;
    maximum?: number;
    rule?: string;
    minimum_select?: number;
    maximum_select?: number;
}>;

declare type OptionsType = {
    id: string;
    label: string;
    value: string;
};

declare type DropdownInputs = {
    type: InputWithDropDown;
    options: OptionsType[];
};

declare type NormalInputs = {
    type: InputOnlyFields | UploadTypeInput;
    // options?: never;
};

declare type DefaultFieldProperties = {
    id: string;
    name: string;
    label: string;
    description: string;
    validation?: Record<string, unknown>;
    style?: React.CSSProperties;
};

declare type InputFieldsType = DefaultFieldProperties & (DropdownInputs | NormalInputs);

declare type Section = {
    name: string;
    description: string;
    fields: InputFieldsType[];
};

declare type PagesType = {
    name: string;
    title: string;
    description: string;
    actions: ActionTypes;
    sections: Section[];
};

declare type PayloadResponse = {
    meta: {
        name: string;
        description: string;
        version: string;
        url: string;
        active: "active" | "inactive";
    };
    pages: PagesType[];
};

/**
 * For some weird reasons, the options property is missing in: `InputFieldsType`
 * This utility type helps map the dropdown input to options and vice-versa
 */
declare type InputProps<T extends InputFieldsType["type"]> = T extends NormalInputs["type"]
    ? Omit<InputFieldsType, "type"> & { type: T }
    : Omit<DefaultFieldProperties & DropdownInputs, "type"> & { type: T };
