type ProgressAction = {
	type: string;
	label: string;
	message: string;
};

type CancelAction = {
	type: 'cancel';
	message: string;
	label: string;
	showModal?: boolean;
};

type ActionTypes = [ProgressAction, CancelAction];

type InputOnlyFields =
	| 'short text'
	| 'long text'
	| 'date'
	| 'time'
	| 'date time'
	| 'integer'
	| 'number'
	| 'phone'
	| 'email'
	| 'label';

type InputWithDropDown = 'checkbox' | 'drop down' | 'radio';

type UploadTypeInput = 'upload' | 'video' | 'audio' | 'image';

/* type Validation = Partial<{
	required?: boolean;
	minimum?: number;
	maximum?: number;
	rule?: string;
	minimumSelect?: number;
	maximumSelect?: number;
}>; */

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

type Fields = {
	id: string;
	name: string;
	label: string;
	description: string;
	validation?: Record<string, unknown>;
} & (DropdownInputs | NormalInputs);

type Section = {
	name: string;
	description: string;
	fields: Fields[];
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
		active: 'active' | 'inactive';
	};
	pages: PagesType[];
};
