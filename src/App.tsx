import axios from "axios";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import Button from "./components/Button";
import {
    dateTimePredicate,
    inputWithDropDownPredicate,
    textFieldPredicate,
} from "./utils/coarsedInputTypes";
import TextInput from "./components/Fields/NormalInputs/TextInput";
import Input from "./components/Fields/Input";
import DateTimeInput from "./components/Fields/NormalInputs/DateTimeInput";
import { handleAxiosError } from "./utils/helpers";
import InputWithDropDown from "./components/Fields/InputsWithDropdown";

const App = () => {
    const [endpoint, setEndpoint] = useState("http://localhost:5050/configurable-form");
    const [loading, setLoading] = useState(false);
    const [responseObject, setResponseObject] = useState<PayloadResponse>();
    const [currentPage, setCurrentPage] = useState(0);

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

        if (textFieldPredicate(type)) return <TextInput {...field} type={type} />;

        if (dateTimePredicate(type)) return <DateTimeInput {...field} type={type} />;

        if (inputWithDropDownPredicate(type))
            return <InputWithDropDown {...(field as InputProps<InputWithDropDown>)} type={type} />;

        return (
            <div className="grid gap-2">
                <label htmlFor={field.id}>{field.description}</label>
                <Input placeholder={field.label} className="border" {...field} />
            </div>
        );
    };

    return (
        <main className="p-3">
            {loading && (
                <div className="fixed inset-0 bg-white/50 grid place-content-center text-black/70">
                    Loading...
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto py-6 gap-2 grid">
                <Input
                    type="text"
                    placeholder="Enter url"
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="px-8 py-2 w-full border rounded-md"
                    value={endpoint}
                />
                <div>
                    <Button className="my-5" type="submit">
                        Submit
                    </Button>
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
