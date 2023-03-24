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

declare type InputWithDropDown = "checkbox" | "drop_down" | "radio";

declare type UploadTypeInput = "upload" | "video" | "audio" | "image";

declare type Validation = Partial<{
    required?: boolean;
    minimum?: number;
    maximum?: number;
    rule?: string;
    minimum_select?: number;
    maximum_select?: number;
}>;

declare type Options = {
    id: string;
    label: string;
    value: string;
};

declare type DropdownInputs = {
    type: InputWithDropDown;
    options: Options[];
};

declare type NormalInputs = {
    type: InputOnlyFields | UploadTypeInput;
};

declare type InputFieldsType = {
    id: string;
    name: string;
    label: string;
    description: string;
    validation?: Record<string, unknown>;
    style?: React.CSSProperties;
} & (DropdownInputs | NormalInputs);

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
