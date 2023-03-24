import { useState } from "react";

const ImageUploader = (props: InputProps<"upload" | "image">) => {
    const [files, setFiles] = useState<FileList | null>();

    return (
        <div className="spacey-2">
            <p>
                <b>{props.label}</b>
            </p>
            <p>{props.description}</p>
            {props.mode !== "preview" ? (
                <div className="relative min-h-[200px] border-4 border-dashed flex items-center justify-center">
                    <p className="max-w-sm text-center mx-auto">
                        Click Here to Upload Image or Drop Image In box
                    </p>
                    <input
                        onChange={(e) => setFiles(e.target.files)}
                        type="file"
                        className="absolute inset-0 w-full z-[1] cursor-pointer opacity-0"
                    />
                </div>
            ) : (
                <div className="bg-black/30 rounded-md p-3">
                    Click the edit button to enable upload option
                </div>
            )}
            {files &&
                Array.from(files).map((file) => (
                    <div
                        className="flex items-center gap-4 justify-between px-3 py-4 bg-slate-400/30 rounded-md"
                        key={file.name}
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-[40px] h-[40px] object-cover rounded-lg"
                        />
                        <p>{file.name}</p>
                    </div>
                ))}
        </div>
    );
};

export default ImageUploader;
