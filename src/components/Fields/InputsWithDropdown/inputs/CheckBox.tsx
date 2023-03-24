import Input, { InputProps } from "../../Input";

const CheckBox = (props: InputProps<"checkbox">) => {
    const { options, description, id: inputID } = props;

    return (
        <div className="grid gap-2">
            <p>{description}</p>
            {options.map(({ id: optionID, label, value }) => (
                <div key={optionID}>
                    <label htmlFor={optionID}>{label}</label>
                    <Input
                        type="checkbox"
                        name={inputID}
                        id={optionID}
                        placeholder={label}
                        value={value}
                    />
                </div>
            ))}
        </div>
    );
};

export default CheckBox;
