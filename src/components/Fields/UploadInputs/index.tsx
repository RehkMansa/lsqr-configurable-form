import { AudioRecorder, ImageUploader, VideoInput } from "./inputs";

const UploadInputs = (props: InputProps<UploadTypeInput>) => {
    const renderUploadComponent = () => {
        let component = <ImageUploader {...props} type="upload" />;

        const { type } = props;

        switch (type) {
            case "image":
            case "upload":
                component = <ImageUploader {...props} type={type} />;
                break;
            case "audio":
                component = <AudioRecorder {...props} type={type} />;
                break;
            case "video":
                component = <VideoInput {...props} type={type} />;
                break;

            default:
                break;
        }

        return component;
    };

    return renderUploadComponent();
};

export default UploadInputs;
