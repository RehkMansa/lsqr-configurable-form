import { Select, CheckBox, Radio } from "./inputs";

const InputWithDropDown = (props: InputProps<InputWithDropDown>) => {
    const renderDropDown = () => {
        let component = <Select {...props} type="drop_down" />;

        switch (props.type) {
            case "checkbox":
                component = <CheckBox {...props} type="checkbox" />;
                break;
            case "drop_down":
                component = <Select {...props} type="drop_down" />;
                break;
            case "radio":
                component = <Radio {...props} type="radio" />;
                break;

            default:
                break;
        }

        return component;
    };

    return renderDropDown();
};

export default InputWithDropDown;
