import { InputFieldsType, TextFields } from "../../../schema/types";
import { getTextInputType } from "../../../utils/getInputTypes";

type Props = Omit<InputFieldsType, "type"> & { type: TextFields };

const TextInput = (props: Props) => {
    const { description, id, label, type, ..._props } = props;

    return (
        <div>
            <label htmlFor={id}>{description}</label>
            {type !== "long text" && (
                <input placeholder={label} type={getTextInputType(type)} name={id} id={id} />
            )}
            {type === "long text" && <textarea placeholder={label} name={id} id={id} />}
        </div>
    );
};

export default TextInput;
