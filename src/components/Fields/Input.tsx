import { ComponentProps } from "react";

/**
 * For some weird reasons, the options property is missing in: `InputFieldsType`
 * This utility type helps map the dropdown input to options and vice-versa
 */
export type InputProps<T extends InputFieldsType["type"]> = T extends NormalInputs["type"]
    ? Omit<InputFieldsType, "type"> & { type: T }
    : Omit<DefaultFieldProperties & DropdownInputs, "type"> & { type: T };

const Input = ({
    className,
    placeholder,
    type,
    name,
    id,
    style,
    ...props
}: ComponentProps<"input">) => (
    <input
        className={`border p-3${className ? ` ${className}` : ""}`}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        style={style}
        {...props}
    />
);

export default Input;
