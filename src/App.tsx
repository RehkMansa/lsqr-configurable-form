import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { PayloadResponse } from "./schema/types";
import Button from "./components/Button";
import { TextFieldsArr } from "./utils/coarsedInputTypes";
import TextInput from "./components/Fields/NormalInputs/TextInput";

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

    const renderInputField = (type: unknown): type is (typeof TextFieldsArr)[number] => {
        // @ts-expect-error :remove error ==> allow unknown type to be used as index value
        if (TextFieldsArr.includes(type)) {
            return true;

            // type as (typeof TextFieldsArr)[number];
        }

        return false;
    };

    return (
        <main>
            {loading && (
                <div className="fixed inset-0 bg-white/50 grid place-content-center text-black/70">
                    Loading...
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-3 gap-2 grid">
                <input
                    type="text"
                    placeholder="Enter url"
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="px-8 py-2 w-full border rounded-md"
                />
                <div>
                    <button
                        className="rounded-full px-10 py-2 border-4 border-spacing-2 border-double"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {responseObject && (
                <div className="max-w-md mx-auto p-3">
                    {responseObject.pages[0].sections.map((section) => (
                        <div className="grid gap-5" key={section.name}>
                            {section.fields.map((field) => (
                                <div className="grid gap-3" key={field.id}>
                                    {renderInputField(field.type) ? (
                                        <TextInput {...field} type={field.type} />
                                    ) : (
                                        <input className="border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    {currentPage > 0 && currentPage < responseObject?.pages.length && (
                        <div>
                            <Button onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default App;
