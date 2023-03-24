import { getDateTimeInput } from "../../../utils/getInputTypes";
import Input from "../Input";

const DateTimeInput = (props: InputProps<DateTimeFields>) => {
    const { description, label, type, id, ...rest } = props;

    return (
        <div className="grid gap-2">
            <label htmlFor={id}>{description}</label>
            <Input id={id} placeholder={label} type={getDateTimeInput(type)} {...rest} name={id} />
        </div>
    );
};

export default DateTimeInput;
