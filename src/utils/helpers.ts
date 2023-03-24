import { AxiosError } from "axios";

export const assertCannotReach = (x: never) => {
    throw Error("Unreachable Line of code detected" + x);
};

export const handleAxiosError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return "Request Failed with status code: " + error.response.status;
            // console.error("Error data:", error.response.data);
            // console.error("Error headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return "Request Error: " + error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            return "Something went wrong: " + error.message;
        }
    }

    if (isObject(error) && "message" in error && typeof error.message === "string") {
        return error.message;
    }

    if (typeof error === "string" || typeof error === "number") {
        return error.toString();
    }

    return "Something went wrong somewhere, please try again";
};

export const isObject = (obj: unknown): obj is object =>
    Object.prototype.toString.call(obj) === "[object Object]";
