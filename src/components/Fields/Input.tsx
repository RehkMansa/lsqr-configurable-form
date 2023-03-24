import { ComponentProps } from "react";

export type InputProps<T extends InputFieldsType["type"]> = Omit<InputFieldsType, "type"> & {
    type: T;
};

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
