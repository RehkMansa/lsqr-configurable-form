const Select = (props: InputProps<"dropdown">) => {
    const { options, description, id: inputID } = props;

    return (
        <div className="grid gap-2">
            <label htmlFor={inputID}>{description}</label>
            {props.mode !== "preview" && (
                <select className="p-3 px-5" name={inputID} id={inputID}>
                    {options.map(({ id: optionID, label, value }) => (
                        <option key={optionID} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            )}
            {props.mode === "preview" && (
                <div className={`bg-black/30 rounded-md p-3`} style={props.style}>
                    Available options: {options.map(({ label }) => label).join(", ")}
                </div>
            )}
        </div>
    );
};

export default Select;
