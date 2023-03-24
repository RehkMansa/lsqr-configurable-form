import { getTextInputType } from "../../../utils/getInputTypes";
import Input from "../Input";

const TextInput = (props: InputProps<TextFields>) => {
    const { description, id, label, type, ...rest } = props;

    return (
        <div className="grid gap-2">
            <label htmlFor={id}>{description}</label>
            {type !== "long_text" && (
                <Input
                    {...rest}
                    className="border p-3"
                    placeholder={label}
                    type={getTextInputType(type)}
                    name={id}
                    id={id}
                    style={rest.style}
                />
            )}
            {type === "long_text" &&
                (props.mode !== "preview" ? (
                    <textarea
                        className="p-3 border"
                        rows={4}
                        placeholder={label}
                        name={id}
                        id={id}
                    />
                ) : (
                    <div className="bg-black/30 rounded-md p-3">
                        Click the edit button to edit {props.name}
                    </div>
                ))}
        </div>
    );
};

export default TextInput;
