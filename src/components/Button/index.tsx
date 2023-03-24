const Button = (props: React.ComponentProps<"button">) => (
    <button
        className="rounded-full px-10 py-2 border-4 border-spacing-2 border-double"
        type={props.type ?? "button"}
        {...props}
    >
        {props.children}
    </button>
);

export default Button;
