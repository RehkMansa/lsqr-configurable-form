import Input from "../../Input";

const CheckBox = (props: InputProps<"checkbox">) => {
    const { options, description, id: inputID } = props;

    return (
        <div className="grid gap-2">
            <p>{description}</p>
            {props.mode !== "preview" &&
                options.map(({ id: optionID, label, value }) => (
                    <div className="flex gap-2" key={optionID}>
                        <Input
                            {...props}
                            type="checkbox"
                            name={inputID}
                            id={optionID}
                            placeholder={label}
                            value={value}
                        />
                        <label htmlFor={optionID}>{label}</label>
                    </div>
                ))}

            {props.mode === "preview" && (
                <div className={`bg-black/30 rounded-md p-3`} style={props.style}>
                    Available options: {options.map(({ label }) => label).join(", ")}
                </div>
            )}
        </div>
    );
};

export default CheckBox;
