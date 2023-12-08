import { Attributes, Category, Choices, ConditionalVisibility, ContentSection, ContentSectionTitles, DataModel, DataType, DefaultValue, Description, DescriptionExtened, DisplayName, KnownFieldTypes, Margins, MediaItem, Required, SdkItemModel, ViewSelector, WidgetEntity, WidgetLabel } from '@progress/sitefinity-widget-designers';
import { LinkModel } from '../../editor';
import { OffsetStyle } from '../styling/offset-style';
import { ImageClickAction, ImageClickActionChoices } from './interfaces/ImageClickAction';
import { ImageDisplayChoices, ImageDisplayMode } from './interfaces/ImageDisplayMode';
import { CustomSizeModel } from './interfaces/CustomSizeModel';
import { SdkItem, ThumbnailItem } from '../../rest-sdk';

@WidgetEntity('SitefinityImage', 'Image')
export class ImageEntity {
    @MediaItem('images', false, true)
    @DataType('media')
    @DisplayName('')
    @DefaultValue(null)
    @DataModel(SdkItemModel)
    Item?: SdkItem;

    @DescriptionExtened({ InlineDescription: '(for current page)' })
    @DataType('string')
    @DefaultValue(null)
    Title?: string;

    @DisplayName('Alternative text')
    @DescriptionExtened({ InlineDescription: '(for current page)' })
    @DefaultValue(null)
    @DataType('string')
    AlternativeText?: string;

    @DisplayName('When image is clicked...')
    @Choices(ImageClickActionChoices)
    ClickAction: ImageClickAction = ImageClickAction.DoNothing;

    @DisplayName('Link to...')
    @ConditionalVisibility('{"conditions":[{"fieldName":"ClickAction","operator":"Equals","value":"OpenLink"}]}')
    @Required('Please select a link')
    @DataType('linkSelector')
    @DefaultValue(null)
    ActionLink?: LinkModel;

    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    @DisplayName('Image size')
    @Choices(ImageDisplayChoices)
    ImageSize: ImageDisplayMode = ImageDisplayMode.Responsive;

    @DisplayName('Fit to container')
    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    @DefaultValue(true)
    @DataType(KnownFieldTypes.CheckBox)
    FitToContainer: boolean = true;

    @DisplayName('')
    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    @ConditionalVisibility('{"conditions":[{"fieldName":"ImageSize","operator":"Equals","value":"CustomSize"}]}')
    @DataType('customSize')
    @DataModel(CustomSizeModel)
    CustomSize: CustomSizeModel | null = null;

    @DisplayName('Thumbnail')
    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    @ConditionalVisibility('{"conditions":[{"fieldName":"ImageSize","operator":"Equals","value":"Thumbnail"}]}')
    @DataType('thumbnail')
    @DataModel(ThumbnailItem)
    Thumnail: ThumbnailItem | null = null;

    @DisplayName('Image template')
    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    @ViewSelector([{ Value: 'Image' }])
    @DefaultValue('Image')
    ViewName?: string;

    @Margins('Image')
    @ContentSection(ContentSectionTitles.DisplaySettings, 1)
    Margins?: OffsetStyle | null = null;

    @WidgetLabel()
    SfWidgetLabel: string = 'Image';

    @Category('Advanced')
    @DisplayName('CSS class')
    @DataType('string')
    @DefaultValue(null)
    CssClass?: string;

    @Attributes('Image')
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
}
