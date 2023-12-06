import { SdkItem } from 'sitefinity-react-framework/sdk/dto/sdk-item';

export const getFileSize = (item: SdkItem) => {
    const size = item['TotalSize'];
    if (size < 1024) {
        return `${size} B`;
    }

    const sizeKB = Math.ceil(size / 1024);
    return `${sizeKB} KB`;
};

export const getExtension = (item: SdkItem) => {
    const extension = item['Extension'];

    if (extension) {
        return extension.replace('.', '');
    }

    return extension;
};

export const getFileExtensionCssClass = (extension: string) => {
    let color;

    switch (extension) {
        case 'xlsx':
        case 'xls':
            color = '--bs-green';
            break;
        case 'doc':
        case 'docx':
            color = '--bs-blue';
            break;
        case 'ppt':
        case 'pptx':
            color = '--bs-orange';
            break;
        case 'pdf':
            color = '--bs-red';
            break;
        case 'zip':
        case 'rar':
            color = '--bs-purple';
            break;
        default:
            color = '--bs-gray';
            break;
    }

    return color;
};
