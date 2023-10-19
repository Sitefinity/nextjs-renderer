import React from "react";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { Alignment } from "../styling/alignment";
import { ButtonType } from "../styling/button-types";
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { classNames } from "sitefinity-react-framework/utils/classNames";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { LinkModel } from "sitefinity-react-framework/interfaces/LinkModel";
import { RestService, RestSdkTypes } from "sitefinity-react-framework/sdk/rest-service";

const imageWrapperClass = "d-inline-block";

function ImageTag(props: {imageModel: ImageViewModel, className?: string }) {
    const { imageModel, className = '', ...others } = props;
    const selectedImageUrl = imageModel.SelectedImageUrl;
    const imageCustomAttributes = getCustomAttributes(imageModel.Attributes, 'Image');
    const altAttr = imageModel.AlternativeText;
    const sortedList = (imageModel.Thumbnails || []).sort(t => t.Width);
    const wrapperClass = classNames(imageWrapperClass, className)
    const imageClass = classNames(className, {
            [className]: className && imageModel.ImageSize === ImageDisplayMode.Responsive,
            'img-fluid': imageModel.FitToContainer || true
        });
    return (
        imageModel.ImageSize === ImageDisplayMode.Responsive
        ? <picture
          {...others}
        className={wrapperClass}>
            {
            sortedList.map((thumbnail: any, idx: number) =>
            {
                const sourceWidth = imageModel.Width && thumbnail.Width !== imageModel.Width ? thumbnail.Width : undefined;
                const sourceHeight = imageModel.Height && thumbnail.Height !== imageModel.Height ? thumbnail.Height : undefined;
                if (sourceWidth && sourceHeight)
                {
                    return <source key={idx} media={`(max-width: ${thumbnail.Width}px)`}
                        srcSet={thumbnail.Url} type={thumbnail.MimeType}
                        width={sourceWidth}
                        height={sourceHeight}
                        />
                }
            })
            }
            {
                  /* eslint-disable-next-line @next/next/no-img-element */
                <img
                 {...imageCustomAttributes}
                loading="lazy" className={imageClass}
            src={selectedImageUrl} title={imageModel.Title} alt={altAttr} />}
        </picture>
        : <span {...others}>{
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                    {...imageCustomAttributes}
                    width={ imageModel.ImageSize === ImageDisplayMode.CustomSize && imageModel.Width ? imageModel.Width : undefined }
                    height={ imageModel.ImageSize === ImageDisplayMode.CustomSize && imageModel.Height ? imageModel.Height : undefined}
                    loading="lazy"
                    className={imageClass}
                     src={selectedImageUrl}
                    title={imageModel.Title}
                    alt={altAttr}/>
                }
            </span>);
    }

export async function Image(props: WidgetContext<ImageEntity>) {
    const entity = {
        ImageSize: ImageDisplayMode.Responsive,
        ...props.model.Properties
    };
    const dataAttributes = htmlAttributes(props);
    const defaultClass = classNames(imageWrapperClass, entity.CssClass);
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const anchorAttributes = generateAnchorAttrsFromLink(entity.ActionLink);
    dataAttributes["className"] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes["data-sfemptyicon"] = "picture-o";
    dataAttributes["data-sfemptyiconaction"] = "Edit";
    dataAttributes["data-sfemptyicontext"] = "Select image";
    dataAttributes["data-sfhasquickeditoperation"] = true;
    let imageItem = null;
    if (entity.Item && entity.Item.Id){
        imageItem =  await RestService.getItemWithFallback(RestSdkTypes.Image, entity.Item.Id.toString(), entity.Item.Provider);
    }

    if (!imageItem) {
        return null;
    }

    const isSvg = imageItem.MimeType === "image/svg+xml";
    const hasZeroDimensions = imageItem.Width == 0 && imageItem.Height == 0;
    let width = isSvg && hasZeroDimensions ? null : imageItem.Width;
    let height = isSvg && hasZeroDimensions ? null : imageItem.Height;
    let thumbnails;
    let selectedImageUrl =  imageItem.Url;

    if (imageItem.Thumbnails)
    {
        thumbnails = imageItem.Thumbnails.sort((a: any,b: any) => a.Width - b.Width);
        if (entity.ImageSize == ImageDisplayMode.Thumbnail && imageItem.Thumnail)
        {
            var selectedThumbnail = thumbnails.find((t: any) => t.Title === entity.Thumnail.Name);
            selectedImageUrl = imageItem.Thumnail.Url;

            if (selectedThumbnail)
            {
                selectedImageUrl = selectedThumbnail.Url;
                width = selectedThumbnail.Width;
                height = selectedThumbnail.Height;
            }
        }
    }

    // Thumbnails for images imported from DAM providers are not stored in Sitefinity and we do not know their width and height.
    // We have to set width and heigth to null otherwise the image is zoomed and selected thumbnail not applied correctly.
    if (entity.ImageSize === ImageDisplayMode.Thumbnail && imageItem.IsDamMedia)
    {
        width = null;
        height = null;
    }

    if (entity.CustomSize && entity.ImageSize === ImageDisplayMode.CustomSize)
    {
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
    }
    console.log('entity',entity)
    return  entity.ClickAction === ImageClickAction.OpenOriginalSize
                ? <a href={entity.Item.Url}
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

export enum ImageDisplayMode {
    Responsive = 'Responsive',
    OriginalSize = 'OriginalSize',
    Thumbnail = 'Thumbnail',
    CustomSize = 'CustomSize',
}

export interface CustomSizeModel {
    Width?: number;
    Height?: number;
    OriginalWidth?: number;
    OriginalHeight?: number;
    ConstrainToProportions: boolean;
}

export enum ImageClickAction{
    DoNothing = 'DoNothing',
    OpenLink = 'OpenLink',
    OpenOriginalSize = 'OpenOriginalSize'
}

export interface ImageViewModel
    {
        ClickAction?: ImageClickAction;
        SelectedImageUrl: string;
        Title?: string;
        AlternativeText?: string;
        ActionLink?: LinkModel;
        ImageSize?: ImageDisplayMode;
        FitToContainer: boolean;
        Thumbnails: any[];
        ViewName?: string;
        Width: number;
        Height: number;
        Attributes?: any[];
    }

export interface ImageEntity {
    Item?: any;
    Attributes?: any[];
    Margins?: OffsetStyle;
    Title?: string;
    AlternativeText?: string;
    CssClass?: string;
    ClickAction?: ImageClickAction;
    ActionLink?: LinkModel;
    ImageSize?: ImageDisplayMode;
    FitToContainer: boolean;
    CustomSize?: any;
    Thumnail?: any;
    ViewName?: string;
}
