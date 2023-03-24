const Select = (props: InputProps<"dropdown">) => {
    const { options, description, id: inputID } = props;

    return (
        <div className="grid gap-2">
            <label htmlFor={inputID}>{description}</label>
            <select className="p-3 px-5" name={inputID} id={inputID}>
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
