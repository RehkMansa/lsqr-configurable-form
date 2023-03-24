import axios from "axios";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import Button from "./components/Button";
import {
    dateTimePredicate,
    inputWithDropDownPredicate,
    textFieldPredicate,
    uploadTypePredicate,
} from "./utils/coarsedInputTypes";
import TextInput from "./components/Fields/NormalInputs/TextInput";
import Input from "./components/Fields/Input";
import DateTimeInput from "./components/Fields/NormalInputs/DateTimeInput";
import { handleAxiosError } from "./utils/helpers";
import InputWithDropDown from "./components/Fields/InputsWithDropdown";
import UploadInputs from "./components/Fields/UploadInputs";
import { AddIcon, EditIcon, EyeIcon } from "./components/Icons";

const options: { name: AppActions; icon: () => JSX.Element }[] = [
    { name: "edit", icon: EditIcon },
    { name: "input", icon: AddIcon },
    { name: "preview", icon: EyeIcon },
];

const App = () => {
    /* delete this */
    const [endpoint, setEndpoint] = useState("http://localhost:5050/configurable-form");
    const [loading, setLoading] = useState(false);
    const [responseObject, setResponseObject] = useState<PayloadResponse>();
    const [currentPage, setCurrentPage] = useState(0);
    const [appMode, setAppMode] = useState<AppActions>("preview");

    const handleModeChange = (mode: AppActions) => {
        toast.success("You selected " + mode + " mode");

        setAppMode(mode);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.get(endpoint);
            setResponseObject(data);
        } catch (error) {
            const errorMessage = handleAxiosError(error);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const renderInputField = (field: InputFieldsType) => {
        const { type } = field;

        if (textFieldPredicate(type)) return <TextInput {...field} type={type} mode={appMode} />;

        if (dateTimePredicate(type)) return <DateTimeInput {...field} type={type} mode={appMode} />;

        if (inputWithDropDownPredicate(type))
            return (
                <InputWithDropDown
                    {...(field as InputProps<InputWithDropDown>)}
                    type={type}
                    mode={appMode}
                />
            );

        if (uploadTypePredicate(type))
            return <UploadInputs {...field} type={type} mode={appMode} />;

        return (
            <div className="grid gap-2 text-red-500">
                <label htmlFor={field.id}>{field.description}</label>
                <Input mode={appMode} placeholder={field.label} className="border" {...field} />
            </div>
        );
    };

    return (
        <main className="p-3">
            <div className="fixed sm:w-[100px] w-[300px] h-[60px] sm:h-[300px] sm:top-1/2 top-0 sm:-translate-y-1/2 sm:rounded-l-xl sm:right-0 right-1/2 translate-x-1/2 rounded-b-md sm:rounded-b-none sm:translate-x-0 bg-black">
                <div className="flex sm:flex-col items-center h-full justify-center gap-4">
                    {options.map((opt) => (
                        <button
                            className="w-9 h-9 bg-white rounded-full grid place-items-center"
                            key={opt.name}
                            onClick={() => handleModeChange(opt.name)}
                        >
                            {<opt.icon />}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-white/50 grid place-content-center text-black/70">
                    Loading...
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto py-6 gap-4 grid border p-3 my-5"
            >
                <Input
                    type="text"
                    placeholder="Enter url"
                    onChange={(e) => setEndpoint(e.target.value)}
                    value={endpoint}
                    className="py-5"
                    mode="edit"
                />
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>

            {responseObject && (
                <div className="max-w-lg mx-auto space-y-7">
                    {responseObject.pages[currentPage].sections.map((section) => (
                        <section className="grid gap-5" key={section.name}>
                            <div>
                                <h2 className="text-xl mb-2 font-bold">{section.name}</h2>
                                <p>{section.description}</p>
                            </div>
                            {section.fields.map((field) => (
                                <div className="grid gap-3" key={field.id}>
                                    {field.type} {/* delete this  */}
                                    {renderInputField(field)}
                                </div>
                            ))}
                        </section>
                    ))}

                    <div className="flex justify-between my-5">
                        {currentPage > 0 && (
                            <div>
                                <Button onClick={() => setCurrentPage(currentPage - 1)}>
                                    Prev
                                </Button>
                            </div>
                        )}
                        {currentPage < responseObject.pages.length - 1 && (
                            <div>
                                <Button onClick={() => setCurrentPage(currentPage + 1)}>
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                    <div>
                        Viewing Page: {currentPage + 1} of {responseObject.pages.length}
                    </div>
                </div>
            )}
        </main>
    );
};

export default App;
