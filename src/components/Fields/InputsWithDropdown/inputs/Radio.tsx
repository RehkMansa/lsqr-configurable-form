import Input from "../../Input";

const Radio = (props: InputProps<"radio">) => {
    const { options, description, id: inputID } = props;

    return (
        <div className="grid gap-2">
            <p>{description}</p>
            {options.map(({ id: optionID, label, value }) => (
                <div className="flex gap-2" key={optionID}>
                    <Input
                        type="radio"
                        name={inputID}
                        id={optionID}
                        placeholder={label}
                        value={value}
                    />
                    <label htmlFor={optionID}>{label}</label>
                </div>
            ))}
        </div>
    );
};

export default Radio;
