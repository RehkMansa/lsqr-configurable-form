import { Select, CheckBox, Radio } from "./inputs";

const InputWithDropDown = (props: InputProps<InputWithDropDown>) => {
    const renderDropDown = () => {
        let component = <Select {...props} type="dropdown" />;

        switch (props.type) {
            case "checkbox":
                component = <CheckBox {...props} type="checkbox" />;
                break;
            case "dropdown":
                component = <Select {...props} type="dropdown" />;
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
