import { useState } from "react";

const ImageUploader = (props: InputProps<"upload">) => {
    const [files, setFiles] = useState<FileList | null>();

    return (
        <div>
            <div className="relative min-h-[200px] border border-dashed flex items-center justify-center">
                <p className="max-w-sm text-center mx-auto">
                    Click Here to Upload Image or Drop Image In box
                </p>
                <input
                    onChange={(e) => setFiles(e.target.files)}
                    type="file"
                    className="absolute inset-0 w-full z-[1] cursor-pointer opacity-0"
                />
            </div>
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
