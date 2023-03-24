const Button = ({ className, type, ...props }: React.ComponentProps<"button">) => (
    <button
        {...props}
        className={`rounded-full px-10  bg-black text-white py-1.5${
            className ? ` ${className}` : ""
        }`}
        type={type ?? "button"}
    >
        {props.children}
    </button>
);

export default Button;
