import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { PayloadResponse } from "./schema/types";

const App = () => {
    const [endpoint, setEndpoint] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseObject, setResponseObject] = useState<PayloadResponse>();

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

            {responseObject && <div className="max-w-md">{JSON.stringify(responseObject)}</div>}
        </main>
    );
};

export default App;
