import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { ImageTag } from './image-tag';
import { ImageClickAction } from './interfaces/ImageClickAction';
import { ImageDisplayMode } from './interfaces/ImageDisplayMode';
import { WidgetContext, htmlAttributes, classNames, generateAnchorAttrsFromLink, LinkModel } from '../../editor';
import { RestService, RestSdkTypes, ThumbnailItem, SdkItem, ImageItem } from '../../rest-sdk';

const imageWrapperClass = 'd-inline-block';

export async function Image(props: WidgetContext<ImageEntity>) {
    const entity = {
        ImageSize: ImageDisplayMode.Responsive,
        ...props.model.Properties
    };
    const dataAttributes = htmlAttributes(props);
    const defaultClass = classNames(imageWrapperClass, entity.CssClass);
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const anchorAttributes = generateAnchorAttrsFromLink(entity.ActionLink);
    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );

    dataAttributes['data-sfhasquickeditoperation'] = true;
    let imageItem = null;
    if (entity.Item && entity.Item.Id) {
        imageItem =  await RestService.getItemWithFallback(RestSdkTypes.Image, entity.Item.Id.toString(), entity.Item.Provider);
    }

    if (!imageItem) {
        return (<div {...dataAttributes} />);
    }

    const isSvg = imageItem.MimeType === 'image/svg+xml';
    const hasZeroDimensions = imageItem.Width === 0 && imageItem.Height === 0;
    let width = isSvg && hasZeroDimensions ? null : imageItem.Width;
    let height = isSvg && hasZeroDimensions ? null : imageItem.Height;
    let thumbnails;
    let selectedImageUrl =  imageItem.Url;

    if (imageItem.Thumbnails) {
        thumbnails = imageItem.Thumbnails.sort((a: ThumbnailItem,b: ThumbnailItem) => a.Width - b.Width);
        if (entity.ImageSize === ImageDisplayMode.Thumbnail && imageItem.Thumnail) {
            let selectedThumbnail = thumbnails.find((t: ThumbnailItem) => t.Title === entity.Thumnail!.Name);
            selectedImageUrl = imageItem.Thumnail.Url;

            if (selectedThumbnail) {
                selectedImageUrl = selectedThumbnail.Url;
                width = selectedThumbnail.Width;
                height = selectedThumbnail.Height;
            }
        }
    }

    // Thumbnails for images imported from DAM providers are not stored in Sitefinity and we do not know their width and height.
    // We have to set width and heigth to null otherwise the image is zoomed and selected thumbnail not applied correctly.
    if (entity.ImageSize === ImageDisplayMode.Thumbnail && imageItem.IsDamMedia) {
        width = null;
        height = null;
    }

    if (entity.CustomSize && entity.ImageSize === ImageDisplayMode.CustomSize) {
        width = entity.CustomSize.Width;
        height = entity.CustomSize.Height;
    }

    const imageModel = {
        Title: imageItem.Title,
        AlternativeText: imageItem.AlternativeText,
        ...entity,
        Width: width,
        Height: height,
        Thumbnails: thumbnails,
        SelectedImageUrl: selectedImageUrl
    };

    return  entity.ClickAction === ImageClickAction.OpenOriginalSize
                ? <a href={entity.Item!.Url}
                    {...dataAttributes}>
                  {<ImageTag imageModel={imageModel} />}
                </a>
                : entity.ClickAction === ImageClickAction.OpenLink && entity.ActionLink!.href
                    ?  <a {...anchorAttributes} {...dataAttributes}>
                      {<ImageTag imageModel={imageModel}  />}
                    </a>
                    :  <ImageTag imageModel={imageModel} className={entity.CssClass}
                        {...dataAttributes} />
             ;
}

export interface ImageEntity {
    Item?: ImageItem;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    Margins?: OffsetStyle;
    Title?: string;
    AlternativeText?: string;
    CssClass?: string;
    ClickAction?: ImageClickAction;
    ActionLink?: LinkModel;
    ImageSize?: ImageDisplayMode;
    FitToContainer: boolean;
    CustomSize?: { Width: number, Height: number};
    Thumnail?: ThumbnailItem;
    ViewName?: string;
}
