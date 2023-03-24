import { InputProps } from "../../Input";

const Select = (props: InputProps<"drop_down">) => {
    const { options, description, id: inputID } = props;

    return (
        <div className="grid gap-2">
            <label htmlFor={inputID}>{description}</label>
            <select name={inputID} id={inputID}>
                {options.map(({ id: optionID, label, value }) => (
                    <option key={optionID} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
