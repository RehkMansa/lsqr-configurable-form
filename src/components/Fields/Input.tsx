import { ComponentProps } from "react";

const Input = ({
    className,
    placeholder,
    type,
    name,
    id,
    style,
    mode,
    ...props
}: ComponentProps<"input"> & { mode: AppActions }) => (
    <>
        {(mode === "edit" || mode === "input") && (
            <input
                className={`border p-3${className ? ` ${className}` : ""}`}
                placeholder={placeholder}
                type={type}
                name={name}
                id={id}
                style={style}
                {...props}
            />
        )}
        {mode === "preview" && (
            <div
                className={`bg-black/30 rounded-md p-3${className ? ` ${className}` : ""}`}
                style={style}
                id={id}
            >
                {placeholder}
            </div>
        )}
    </>
);

export default Input;
