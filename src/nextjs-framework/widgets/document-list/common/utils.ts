import { PageItem, SdkItem } from '../../../rest-sdk';


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

export const splitAt = (index: number, xs: string) => [xs.slice(0, index), xs.slice(index)];

export const getPageQueryString = (page: PageItem) => {
    const indexOf = page.ViewUrl.indexOf(page.RelativeUrlPath);
    const dividedUrls = splitAt(indexOf + page.RelativeUrlPath.length, page.ViewUrl);

    return dividedUrls[1];
};

export const getWhiteListSearchParams = (
    searchParams:  {
        [key: string]: string;
    },
    whitelistedQueryParams: string[]) => {
    const filteredQueryCollection: { [key: string]: string } = {};
    whitelistedQueryParams.forEach(param => {
        const searchParamValue = (searchParams || {})[param];
        if (searchParamValue) {
            filteredQueryCollection[param] = searchParamValue;
        }
    });
    return filteredQueryCollection;
};
