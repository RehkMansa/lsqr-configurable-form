/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from "react";
import { ErrorToast } from "../../../Toast";
import Button from "../../../Button";

/**
 * For detailed guide on HTML5 audio recording
 *	@see https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
 *  @see https://blog.logrocket.com/how-to-create-video-audio-recorder-react/
 */
const AudioRecorder = (props: InputProps<"audio">) => {
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef<MediaRecorder>();
    const [audio, setAudio] = useState<string>();

    const handleStartRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const media = new MediaRecorder(stream);

                    mediaRecorder.current = media;

                    mediaRecorder.current.start();
                    setIsRecording(true);

                    const localAudioChunks: Blob[] = [];

                    mediaRecorder.current.ondataavailable = (event) => {
                        if (typeof event.data === "undefined") return;
                        if (event.data.size === 0) return;
                        localAudioChunks.push(event.data);
                    };

                    setAudioChunks(localAudioChunks);
                })
                .catch((error) => {
                    ErrorToast(
                        error.message ?? "Something went wrong while trying to record audio"
                    );
                    throw new Error(error);
                });
        } else {
            ErrorToast("Browser does not support audio recording");
        }
    };

    const handleStopRecording = async () => {
        setIsRecording(false);

        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, {
                    type: "audio/webm;codecs=opus",
                });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
                setAudioChunks([]);
            };
        }
    };

    return (
        <div className="grid gap-3 my-2 spacey-2">
            <div className="">
                <p>
                    <b>{props.label}</b>
                </p>
                <p>{props.description}</p>
            </div>
            {props.mode !== "preview" ? (
                <button
                    className="flex items-center gap-2"
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                >
                    <span
                        className={`w-[32px] h-[32px] rounded-full flex items-center justify-center px-2 text-white ${
                            isRecording ? "bg-[#FF0000]/80" : "bg-black"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                            />
                        </svg>
                    </span>
                    <span className="text-lg">{isRecording ? "Stop" : "Start"} Recording</span>
                </button>
            ) : (
                <div className="bg-black/30 rounded-md p-3">
                    Click the edit button to enable voice record options
                </div>
            )}
            {audio && (
                <div className="flex gap-4">
                    <div>
                        <audio src={audio} controls></audio>
                        <a download href={audio}>
                            Download Recording
                        </a>
                    </div>
                    {!isRecording && (
                        <Button
                            onClick={() => setAudio(undefined)}
                            className="w-[35px] h-[35px] rounded-full flex items-center justify-center px-2 text-white hover:bg-[#FF0000]/80"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
