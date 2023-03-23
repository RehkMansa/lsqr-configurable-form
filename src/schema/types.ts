type ProgressAction = {
    type: string;
    label: string;
    message: string;
};

type CancelAction = {
    type: "cancel";
    message: string;
    label: string;
    showModal?: boolean;
};

type ActionTypes = [ProgressAction, CancelAction];

type IsTextInput = "short text" | "long text" | "phone";

type IsNumberInput = "integer" | "number";

type IsEmailInput = "email";

type TextFields = IsTextInput | IsNumberInput | IsEmailInput | "label";

type DateTimeFields = "date" | "time" | "date time";

type InputOnlyFields = TextFields | DateTimeFields;

type InputWithDropDown = "checkbox" | "drop down" | "radio";

type UploadTypeInput = "upload" | "video" | "audio" | "image";

type Validation = Partial<{
    required?: boolean;
    minimum?: number;
    maximum?: number;
    rule?: string;
    minimum_select?: number;
    maximum_select?: number;
}>;

type Options = {
    id: string;
    label: string;
    value: string;
};

type DropdownInputs = {
    type: InputWithDropDown;
    options: Options[];
};

type NormalInputs = {
    type: InputOnlyFields | UploadTypeInput;
};

type InputFieldsType = {
    id: string;
    name: string;
    label: string;
    description: string;
    validation?: Record<string, unknown>;
    style?: any;
} & (DropdownInputs | NormalInputs);

type Section = {
    name: string;
    description: string;
    fields: InputFieldsType[];
};

type PagesType = {
    name: string;
    title: string;
    description: string;
    actions: ActionTypes;
    sections: Section;
};

export type PayloadResponse = {
    meta: {
        name: string;
        description: string;
        version: string;
        url: string;
        active: "active" | "inactive";
    };
    pages: PagesType[];
};

export type {
    InputFieldsType,
    DropdownInputs,
    NormalInputs,
    Validation,
    TextFields,
    DateTimeFields,
};
