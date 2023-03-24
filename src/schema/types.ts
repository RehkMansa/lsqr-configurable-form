export type ProgressAction = {
    type: string;
    label: string;
    message: string;
};

export type CancelAction = {
    type: "cancel";
    message: string;
    label: string;
    showModal?: boolean;
};

export type ActionTypes = [ProgressAction, CancelAction];

export type IsTextInput = "short_text" | "long_text" | "phone";

export type IsNumberInput = "integer" | "number";

export type IsEmailInput = "email";

export type TextFields = IsTextInput | IsNumberInput | IsEmailInput | "label";

export type DateTimeFields = "date" | "time" | "date_time";

export type InputOnlyFields = TextFields | DateTimeFields;

export type InputWithDropDown = "checkbox" | "drop_down" | "radio";

export type UploadTypeInput = "upload" | "video" | "audio" | "image";

export type Validation = Partial<{
    required?: boolean;
    minimum?: number;
    maximum?: number;
    rule?: string;
    minimum_select?: number;
    maximum_select?: number;
}>;

export type Options = {
    id: string;
    label: string;
    value: string;
};

export type DropdownInputs = {
    type: InputWithDropDown;
    options: Options[];
};

export type NormalInputs = {
    type: InputOnlyFields | UploadTypeInput;
};

export type InputFieldsType = {
    id: string;
    name: string;
    label: string;
    description: string;
    validation?: Record<string, unknown>;
    style?: React.CSSProperties;
} & (DropdownInputs | NormalInputs);

export type Section = {
    name: string;
    description: string;
    fields: InputFieldsType[];
};

export type PagesType = {
    name: string;
    title: string;
    description: string;
    actions: ActionTypes;
    sections: Section[];
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
