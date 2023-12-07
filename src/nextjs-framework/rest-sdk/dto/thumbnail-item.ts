import { DataType, Model } from '@progress/sitefinity-widget-designers';

@Model()
export class ThumbnailItem {
    @DataType('string')
    Name?: string;

    @DataType('string')
    Title?: string;

    @DataType('string')
    Url?: string;

    @DataType('string')
    OriginalUrl?: string;

    Width?: number = 0;

    Height?: number = 0;

    @DataType('string')
    MimeType?: string;
}
