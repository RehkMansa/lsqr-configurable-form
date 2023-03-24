import axios from "axios";
import { SyntheticEvent, useState } from "react";
import Button from "./components/Button";
import { TextFieldsArr } from "./utils/coarsedInputTypes";
import TextInput from "./components/Fields/NormalInputs/TextInput";
import Input from "./components/Fields/Input";

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
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderInputField = (field: InputFieldsType) => {
        if (TextFieldsArr.includes(field.type)) {
            return <TextInput {...field} type={field.type as TextFields} />;
        }

        return <Input placeholder={field.label} className="border" {...field} />;
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
                    <Button
                        className="rounded-full px-10 py-2 border-4 border-spacing-2 border-double"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>

            {responseObject && (
                <div className="max-w-lg mx-auto">
                    {responseObject.pages[currentPage].sections.map((section) => (
                        <div className="grid gap-5" key={section.name}>
                            {section.fields.map((field) => (
                                <div className="grid gap-3" key={field.id}>
                                    {renderInputField(field)}
                                </div>
                            ))}
                        </div>
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
