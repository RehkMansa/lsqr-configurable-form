/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useRef } from "react";
import { ErrorToast } from "../../../Toast";

const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoInput = (props: InputProps<"video">) => {
    const mediaRecorder = useRef<MediaRecorder>();

    const liveVideoFeed = useRef<HTMLVideoElement>(null);

    const [isRecording, setIsRecording] = useState(false);

    const [recordedVideo, setRecordedVideo] = useState<string>();

    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);

    const startRecording = async () => {
        setRecordedVideo(undefined);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };

                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
                const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
                //combine both audio and video streams

                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);

                //set videostream to live feed player
                if (liveVideoFeed.current) {
                    liveVideoFeed.current.srcObject = videoStream;
                }

                const media = new MediaRecorder(combinedStream, { mimeType });

                mediaRecorder.current = media;

                mediaRecorder.current.start();

                const localVideoChunks: Blob[] = [];

                mediaRecorder.current.ondataavailable = (event) => {
                    if (typeof event.data === "undefined") return;
                    if (event.data.size === 0) return;
                    localVideoChunks.push(event.data);
                };

                setVideoChunks(localVideoChunks);
                setIsRecording(true);
            } catch (err) {
                if (err instanceof Error && "message" in err && typeof err.message === "string") {
                    ErrorToast(err.message);
                }
            }
        } else {
            ErrorToast("The MediaRecorder API is not supported in your browser.");
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();

            mediaRecorder.current.onstop = () => {
                const videoBlob = new Blob(videoChunks, { type: mimeType });
                const videoUrl = URL.createObjectURL(videoBlob);

                setRecordedVideo(videoUrl);

                setVideoChunks([]);
            };
        }
    };

    return (
        <div className="space-y-2">
            <div>
                <p>
                    <b>{props.label}</b>
                </p>
                <p>{props.description}</p>
            </div>
            <div id={props.id} className="video-controls">
                {!isRecording && (
                    <button
                        className="flex gap-4 items-center"
                        onClick={startRecording}
                        type="button"
                    >
                        Start Recording
                        <span className="bg-black w-[35px] h-[35px] rounded-full text-white flex items-center justify-center">
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
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                        </span>
                    </button>
                )}
                {isRecording && (
                    <button
                        className="flex items-center gap-4"
                        onClick={stopRecording}
                        type="button"
                    >
                        Stop Recording
                        <span className="bg-red-500 w-[35px] h-[35px] rounded-full text-white flex items-center justify-center">
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
                                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                                />
                            </svg>
                        </span>
                    </button>
                )}
            </div>

            <div className="video-player grid my-3">
                {!recordedVideo && (
                    <video
                        ref={liveVideoFeed}
                        autoPlay
                        className="h-[300px] object-cover w-full"
                    ></video>
                )}
                {recordedVideo && (
                    <div className="recorded-player">
                        <video
                            className="w-full object-cover h-[300px]"
                            src={recordedVideo}
                            controls
                        ></video>
                        <a download href={recordedVideo}>
                            Download Recording
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoInput;
