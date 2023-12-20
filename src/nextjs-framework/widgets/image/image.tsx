/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { OffsetStyle } from '../styling/offset-style';
import { ImageClickAction } from './interfaces/ImageClickAction';
import { ImageDisplayMode } from './interfaces/ImageDisplayMode';
import { WidgetContext, htmlAttributes, generateAnchorAttrsFromLink, LinkModel, getCustomAttributes } from '../../editor';
import { RestService, RestSdkTypes, ThumbnailItem, ImageItem, SdkItem } from '../../rest-sdk';
import { ImageViewModel } from './interfaces/ImageViewModel';
import { Dictionary } from '../../typings/dictionary';
import { StyleGenerator } from '../styling/style-generator.service';

const imageWrapperClass = 'd-inline-block';

export async function Image(props: WidgetContext<ImageEntity>) {
    const dataAttributes = htmlAttributes(props);

    const entity: ImageEntity = props.model.Properties;
    if (!entity.Item) {
        return (<div {...dataAttributes} />);
    }

    let imageItem: ImageItem | undefined = undefined;
    if (entity.Item && entity.Item.Id) {
        imageItem = await RestService.getItemWithFallback<ImageItem>(RestSdkTypes.Image, entity.Item.Id.toString(), entity.Item.Provider);
    }

    if (!imageItem) {
        return (<div {...dataAttributes} />);
    }

    const isSvg = imageItem.MimeType === 'image/svg+xml';
    const hasZeroDimensions = imageItem.Width === 0 && imageItem.Height === 0;

    let imageViewModel: ImageViewModel = {
        Item: imageItem,
        Title: entity.Title || imageItem.Title,
        AlternativeText: entity.AlternativeText || imageItem.AlternativeText,
        ClickAction: entity.ClickAction || ImageClickAction.DoNothing,
        ImageSize: entity.ImageSize || ImageDisplayMode.Responsive,
        FitToContainer: entity.FitToContainer === undefined ? true : entity.FitToContainer,
        Attributes: entity.Attributes || {},
        Thumbnails: [],
        ActionLink: '',
        SelectedImageUrl: imageItem.Url,
        Width: isSvg && hasZeroDimensions ? undefined : imageItem.Width,
        Height: isSvg && hasZeroDimensions ? undefined : imageItem.Height
    };

    if (imageItem.Thumbnails) {
        imageViewModel.Thumbnails = imageItem.Thumbnails.sort((a: ThumbnailItem, b: ThumbnailItem) => a.Width - b.Width);
        if (entity.ImageSize === ImageDisplayMode.Thumbnail && imageItem.Thumnail) {
            let selectedThumbnail = imageItem.Thumbnails.find((t: ThumbnailItem) => t.Title === entity.Thumnail!.Name);
            imageViewModel.SelectedImageUrl = imageItem.Thumnail.Url;

            if (selectedThumbnail) {
                imageViewModel.SelectedImageUrl = selectedThumbnail.Url as string;
                imageViewModel.Width = selectedThumbnail.Width;
                imageViewModel.Height = selectedThumbnail.Height;
            }
        }
    }

    // Thumbnails for images imported from DAM providers are not stored in Sitefinity and we do not know their width and height.
    // We have to set width and heigth to null otherwise the image is zoomed and selected thumbnail not applied correctly.
    if (entity.ImageSize === ImageDisplayMode.Thumbnail && imageItem.IsDamMedia) {
        imageViewModel.Width = undefined;
        imageViewModel.Height = undefined;
    }

    if (entity.CustomSize && entity.ImageSize === ImageDisplayMode.CustomSize) {
        imageViewModel.Width = entity.CustomSize.Width;
        imageViewModel.Height = entity.CustomSize.Height;
    }

    let anchorClass = imageWrapperClass;
    if (entity.CssClass) {
        anchorClass = `${imageWrapperClass} ${entity.CssClass}`;
    }

    let viewModelCssClass = entity.CssClass;
    if (entity.Margins) {
        let margins = StyleGenerator.getMarginClasses(entity.Margins);
        if (viewModelCssClass) {
            viewModelCssClass = `${viewModelCssClass} ${margins}`;
        } else {
            viewModelCssClass = margins;
        }
    }

    if (entity.ClickAction === ImageClickAction.OpenOriginalSize) {
        return (
          <a href={imageItem.Url} className={anchorClass}>
            {renderImageTag(imageViewModel)}
          </a>
        );
    } else if (entity.ClickAction === ImageClickAction.OpenLink && !!entity.ActionLink?.href) {
        const anchorAttributes = generateAnchorAttrsFromLink(entity.ActionLink, anchorClass);
        return (
          <a {...anchorAttributes}>
            {renderImageTag(imageViewModel)}
          </a>
        );
    } else {
        return renderImageTag(imageViewModel, viewModelCssClass);
    }
}

function renderImageTag(imageModel: ImageViewModel, classAttributeValue?: string) {
    let imageClassName: string | undefined = imageModel.FitToContainer ? 'img-fluid' : undefined;
    let imageCustomAttributes = getCustomAttributes(imageModel.Attributes, 'Image');
    const imageAltAttribute = imageModel.AlternativeText || undefined;

    if (imageModel.ImageSize === ImageDisplayMode.Responsive) {
        let pictureWrapperClass = imageWrapperClass;
        if (classAttributeValue) {
            pictureWrapperClass = `${pictureWrapperClass} ${classAttributeValue}`;
        }

        return (
          <picture className={pictureWrapperClass}>
            {
                    imageModel.Thumbnails.map((thumbnail, idx) => {
                        const sourceWidth = imageModel.Width && thumbnail.Width !== imageModel.Width ? thumbnail.Width : undefined;
                        const sourceHeight = imageModel.Height && thumbnail.Height !== imageModel.Height ? thumbnail.Height : undefined;
                        if (sourceWidth && sourceHeight) {
                            return (<source key={idx} media={`(max-width: ${thumbnail.Width}px)`}
                              srcSet={thumbnail.Url} type={thumbnail.MimeType}
                              width={sourceWidth}
                              height={sourceHeight}
                            />);
                        }
                    })
                }
            {renderImage(imageCustomAttributes, imageClassName, imageModel.SelectedImageUrl, imageModel.Title, imageAltAttribute)}
          </picture>
        );
    }

    if (classAttributeValue) {
        if (imageClassName) {
            imageClassName = `${imageClassName} ${classAttributeValue}`;
        } else {
            imageClassName = classAttributeValue;
        }
    }

    if (imageModel.ImageSize === ImageDisplayMode.CustomSize) {
        if (imageModel.Width) {
            imageCustomAttributes['width'] = imageModel.Width.toString();
        }

        if (imageModel.Height) {
            imageCustomAttributes['height'] = imageModel.Height.toString();
        }
    }

    return (
      <span>
        {renderImage(imageCustomAttributes, imageClassName, imageModel.SelectedImageUrl, imageModel.Title, imageAltAttribute)}
      </span>
    );
}

function renderImage(attributes: Dictionary, className: string | undefined, src: string, title: string, alt: string | undefined) {
    return (
      <img {...attributes}
        loading="lazy" className={className}
        src={src} title={title} alt={alt} />
    );
}

export interface ImageEntity {
    Item?: SdkItem;
    CssClass?: string;
    Title?: string;
    AlternativeText?: string;
    ClickAction?: ImageClickAction;
    ActionLink?: LinkModel;
    ImageSize?: ImageDisplayMode;
    FitToContainer?: boolean;
    CustomSize?: { Width?: number, Height?: number };
    Thumnail?: ThumbnailItem;
    ViewName?: string;
    Margins?: OffsetStyle;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string }> };
}
