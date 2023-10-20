import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { Alignment } from '../styling/alignment';
import { ButtonType } from '../styling/button-types';
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { LinkModel } from 'sitefinity-react-framework/interfaces/LinkModel';
import { RestService, RestSdkTypes } from 'sitefinity-react-framework/sdk/rest-service';
import { ImageDisplayMode } from './interfaces/ImageDisplayMode';
import { ImageViewModel } from './interfaces/ImageViewModel';

const imageWrapperClass = 'd-inline-block';

export function ImageTag(props: {imageModel: ImageViewModel, className?: string }) {
    const { imageModel, className = '', ...others } = props;
    const selectedImageUrl = imageModel.SelectedImageUrl;
    const imageCustomAttributes = getCustomAttributes(imageModel.Attributes, 'Image');
    const altAttr = imageModel.AlternativeText;
    const sortedList = (imageModel.Thumbnails || []).sort(t => t.Width);
    const wrapperClass = classNames(imageWrapperClass, className);
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
            sortedList.map((thumbnail: any, idx: number) => {
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
            width={imageModel.ImageSize === ImageDisplayMode.CustomSize && imageModel.Width ? imageModel.Width : undefined}
            height={imageModel.ImageSize === ImageDisplayMode.CustomSize && imageModel.Height ? imageModel.Height : undefined}
            loading="lazy"
            className={imageClass}
            src={selectedImageUrl}
            title={imageModel.Title}
            alt={altAttr}/>
                }
        </span>);
    }
