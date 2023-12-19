import { Dictionary } from '../../../typings/dictionary';
import { CommonArgs } from './common-args';

export interface UploadMediaArgs extends CommonArgs {
    Title: string;
    UrlName?: string;
    FileName: string;
    ParentId: string;
    Fields?: Dictionary
    BinaryData: string;
    ContentType: string;
}
