import { RenderWidgetService } from '@progress/sitefinity-react-framework';
import { htmlAttributes } from '@progress/sitefinity-react-framework';
import { WidgetContext } from '@progress/sitefinity-react-framework';
import { ImageItem } from '@progress/sitefinity-react-framework';
import { VideoItem } from '@progress/sitefinity-react-framework';
import { RestService, RestSdkTypes } from '@progress/sitefinity-react-framework';
import { RootUrlService } from '@progress/sitefinity-react-framework';
import { StyleGenerator } from '../styling/style-generator.service';
import { StylingConfig } from '../styling/styling-config';
import { ColumnHolder, ComponentContainer } from './column-holder';
import { SectionHolder } from './section-holder';
import { SectionEntity } from './section.entity';
const ColumnNamePrefix = 'Column';
const sectionKey = 'Section';

export async function Section(props: WidgetContext<SectionEntity>) {
    props.model.Properties.ColumnsCount = props.model.Properties.ColumnsCount || 1;
    props.model.Properties.ColumnProportionsInfo = props.model.Properties.ColumnProportionsInfo || '[12]';
    const columns = populateColumns(props);
    const section = await populateSection(props.model.Properties);

    const dataAttributes = htmlAttributes(props);
    section.Attributes = Object.assign(section.Attributes, dataAttributes);

    return (
      <section {...section.Attributes} style={section.Style}>
        {section.ShowVideo && section.VideoUrl &&
        <video className="sc-video__element" autoPlay={true} muted={true} loop={true}>
          <source src={section.VideoUrl} />
        </video>
            }
        {columns.map((x, i) => {
                return (
                  <div key={i} {...x.Attributes} style={section.Style}>
                    {x.Children.map(y => {
                            return RenderWidgetService.createComponent(y.model, props.requestContext);
                        })}
                  </div>
                );
            })}
      </section>
    );
}

function populateColumns(context: WidgetContext<SectionEntity>): ColumnHolder[] {
    let columns: ColumnHolder[] = [];
    const properties = context.model.Properties;

    for (let i = 0; i < properties.ColumnsCount; i++) {
        let currentName = `${ColumnNamePrefix}${i + 1}`;

        const classAttribute = `col-md-${properties.ColumnProportionsInfo[i]}`;
        const classAttributes = [classAttribute];
        let children: Array<ComponentContainer> = [];
        if (context.model.Children) {
            children = context.model.Children.filter(x => x.PlaceHolder === currentName).map((x => {
                let ret: WidgetContext<any> = {
                    model: x,
                    metadata: RenderWidgetService.widgetRegistry.widgets[x.Name],
                    requestContext: context.requestContext
                };

                return ret;
            }));
        }

        const column: ColumnHolder = {
            Attributes: { },
            Children: children
        };

        if (context.requestContext.isEdit) {
            column.Attributes['data-sfcontainer'] = currentName;

            let currentTitle = null;
            if (properties.Labels && properties.Labels.hasOwnProperty(currentName)) {
                currentTitle = properties.Labels[currentName].Label;
            } else {
                currentTitle = currentName;
            }

            column.Attributes['data-sfplaceholderlabel'] = currentTitle;
        }

        if (properties.Attributes && properties.Attributes.hasOwnProperty(currentName)) {
            properties.Attributes[currentName].forEach((attribute) => {
                column.Attributes[attribute.Key] = attribute.Value;
            });
        }

        if (properties.ColumnsBackground && properties.ColumnsBackground.hasOwnProperty(currentName)) {
            const backgroundStyle = properties.ColumnsBackground[currentName];
            if (backgroundStyle.BackgroundType === 'Color') {
                column.Style = { '--sf-background-color': `${backgroundStyle.Color}` };
            }
        }

        if (properties.ColumnsPadding && properties.ColumnsPadding.hasOwnProperty(currentName)) {
            const columnPadding = properties.ColumnsPadding[currentName];
            const paddings = StyleGenerator.getPaddingClasses(columnPadding);
            if (paddings) {
                column.Attributes['className'] = paddings;
                classAttributes.push(paddings);
            }
        }

        if (properties.CustomCssClass && properties.CustomCssClass.hasOwnProperty(currentName)) {
            const columnCssClass = properties.CustomCssClass[currentName];
            if (columnCssClass && columnCssClass.Class) {
                classAttributes.push(columnCssClass.Class);
            }
        }

        if (column.Attributes['className']) {
            classAttributes.push(column.Attributes['className']);
        }

        column.Attributes['className'] = classAttributes.filter(x => x).join(' ');

        columns.push(column);
    }

    return columns;
}

function populateSection(properties: SectionEntity): Promise<SectionHolder> {
    const sectionObject: SectionHolder = {
        Attributes: {}
    };

    let attributes = properties.Attributes;
    if (attributes && attributes.hasOwnProperty(sectionKey)) {
        attributes[sectionKey].forEach((attribute) => {
            sectionObject.Attributes[attribute.Key] = attribute.Value;
        });
    }

    const sectionClasses: string[] = ['row'];
    if (properties.SectionPadding) {
        const paddingClasses = StyleGenerator.getPaddingClasses(properties.SectionPadding);
        sectionClasses.push(paddingClasses);
    }

    if (properties.SectionMargin) {
        const marginClasses = StyleGenerator.getPaddingClasses(properties.SectionMargin);
        sectionClasses.push(marginClasses);
    }

    if (properties.CustomCssClass && properties.CustomCssClass.hasOwnProperty(sectionKey)) {
        sectionClasses.push(properties.CustomCssClass[sectionKey].Class);
    }

    if (!properties.SectionBackground) {
        sectionObject.Attributes['className'] = sectionClasses.filter(x => x).join(' ');
        return Promise.resolve(sectionObject);
    }

    if (!properties.SectionBackground) {
        sectionObject.Attributes['className'] = sectionClasses.filter(x => x).join(' ');
        return Promise.resolve(sectionObject);
    }

    if (properties.SectionBackground.BackgroundType === 'Video') {
        if (properties.SectionBackground.VideoItem && properties.SectionBackground.VideoItem.Id) {
            sectionClasses.push(StylingConfig.VideoBackgroundClass);
            return RestService.getItemWithFallback<VideoItem>(RestSdkTypes.Video, properties.SectionBackground.VideoItem.Id, properties.SectionBackground.VideoItem.Provider).then((video) => {
                sectionObject.ShowVideo = true;
                const videoUrl = `${RootUrlService.rootUrl}/${video.Url.substring(1)}`;
                sectionObject.VideoUrl = videoUrl;
                sectionObject.Attributes['className'] = sectionClasses.filter(x => x).join(' ');

                return sectionObject;
            });
        }
    } else if (properties.SectionBackground.BackgroundType === 'Image' && properties.SectionBackground.ImageItem && properties.SectionBackground.ImageItem.Id) {
        const imagePosition = properties.SectionBackground.Position || 'Fill';
        sectionClasses.push(StylingConfig.ImageBackgroundClass);
        return RestService.getItemWithFallback<ImageItem>(RestSdkTypes.Image, properties.SectionBackground.ImageItem.Id, properties.SectionBackground.ImageItem.Provider).then((image) => {
            let style: { [key: string]: string } = {};
            switch (imagePosition) {
                case 'Fill':
                    style['--sf-background-size'] = '100% auto';
                    break;
                case 'Center':
                    style['--sf-background-position'] = 'center';
                    break;
                default:
                    style['--sf-background-size'] = 'cover';
                    break;
            }

            const imageUrl = `${RootUrlService.rootUrl}/${image.Url.substring(1)}`;
            style['--sf-background-image'] = `url(${imageUrl})`;
            sectionObject.Style = style;
            sectionObject.Attributes['className'] = sectionClasses.filter(x => x).join(' ');
            return sectionObject;
        });
    } else if (properties.SectionBackground.BackgroundType === 'Color' && properties.SectionBackground.Color) {
        sectionObject.Style = { '--sf-background-color': `${properties.SectionBackground.Color}` };
    }

    sectionObject.Attributes['className'] = sectionClasses.filter(x => x).join(' ');
    return Promise.resolve(sectionObject);
}

