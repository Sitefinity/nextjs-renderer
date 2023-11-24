import { SdkItem } from '@/framework/rest-sdk/dto/sdk-item';
import { ImagePosition } from './image-position';

export interface BackgroundStyle {
    BackgroundType: 'None' | 'Color' | 'Image' | 'Video';
    Color: string,
    ImageItem: SdkItem;
    VideoItem: SdkItem;
    Position: ImagePosition;
}
