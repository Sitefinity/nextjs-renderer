import React from 'react';
import { DocumentListEntity } from './document-list-entity';
import { DocumentListRestService } from './document-list-rest.service';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { DetailItem } from 'sitefinity-react-framework/sdk/services/detail-item';
import { RestSdkTypes, RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { SdkItem } from 'sitefinity-react-framework/sdk/dto/sdk-item';
import { StyleGenerator } from '../styling/style-generator.service';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { DocumentListModelMaster } from './interfaces/DocumentListModelMaster';
import { RequestContext } from 'sitefinity-react-framework/services/request-context';
import { DocumentListModelDetail } from './interfaces/DocumentListDetailModel';
import { PageTitleMode } from './interfaces/PageTitleMode';
import { ContentViewDisplayMode } from './interfaces/DisplayMode';
import { DetailPageSelectionMode } from './interfaces/DetailPageSelectionMode';

const getFileSize = (item: SdkItem) => {
    const size = item['TotalSize'];
    if (size < 1024) {
        return `${size} B`;
    }

    const sizeKB = Math.ceil(size / 1024);
    return `${sizeKB} KB`;
};

const getExtension = (item: SdkItem) => {
    const extension = item['Extension'];

    if (extension) {
        return extension.replace('.', '');
    }

    return extension;
};

const getFileExtensionCssClass = (extension: string) => {
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

export async function DocumentList(props: WidgetContext<DocumentListEntity>) {
    const entity = {
        Attributes: {},
        CssClasses: [],
        SeoEnabled: true,
        DownloadLinkLabel: 'Download',
        TitleColumnLabel: 'Title',
        TypeColumnLabel: 'Type',
        SizeColumnLabel: 'Size',
        OpenGraphType: 'website',
        PageTitleMode: PageTitleMode.Replace,
        OpenGraphEnabled:true,
        ContentViewDisplayMode: ContentViewDisplayMode.Automatic,
        ...props.model.Properties
    };
    const context = props.requestContext;
    const dataAttributes = htmlAttributes(props);
   // const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);

    dataAttributes['className'] = classNames(
      //  defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: any = {
        detailModel: null,
        listModel: null,
        Attributes: entity.Attributes,
        Labels: {}
    };
    viewModel.CssClasses = entity.CssClasses;
   // viewModel.DetailItemUrl = new Uri(context.PageNode?.ViewUrl ?? string.Empty, UriKind.RelativeOrAbsolute);
    viewModel.RenderLinks = !(entity.ContentViewDisplayMode === ContentViewDisplayMode.Master &&
         entity.DetailPageMode === DetailPageSelectionMode.SamePage);
    viewModel.DownloadLinkLabel = entity.DownloadLinkLabel;
    viewModel.SizeColumnLabel = entity.SizeColumnLabel;
    viewModel.TitleColumnLabel = entity.TitleColumnLabel;
    viewModel.TypeColumnLabel = entity.TypeColumnLabel;

    // properties.DetailPageMode = properties.DetailPageMode || 'SamePage';
    // properties.ContentViewDisplayMode = properties.ContentViewDisplayMode || 'Automatic';
    // properties.Attributes = properties.Attributes || {};
    // properties.CssClasses = properties.CssClasses || [];
    // properties.ListFieldMapping = properties.ListFieldMapping || [];
    // properties.OrderBy = properties.OrderBy || 'PublicationDate DESC';
    // properties.ListSettings = properties.ListSettings || {};
    // properties.ListSettings.DisplayMode = properties.ListSettings.DisplayMode || 'All';
    // properties.ListSettings.ItemsPerPage = properties.ListSettings.ItemsPerPage || 20;
    // properties.ListSettings.LimitItemsCount = properties.ListSettings.LimitItemsCount || 20;
    // properties.SelectExpression = properties.SelectExpression || '*';
    // properties.SelectionGroupLogicalOperator = properties.SelectionGroupLogicalOperator || 'AND';
    // properties.SfViewName = properties.SfViewName || 'CardsList';

    // if (properties.ContentViewDisplayMode === 'Automatic') {
         if (context.detailItem) {
             viewModel.detailModel = await handleDetailView(context.detailItem, entity);
         } else {
             viewModel.listModel = await handleListView(entity, context);
         }
    // } else if (properties.ContentViewDisplayMode === 'Detail') {
    //     if (properties.SelectedItems && properties.SelectedItems.Content && properties.SelectedItems.Content.length > 0) {
    //         const selectedContent = properties.SelectedItems.Content[0];
    //         const itemIdsOrdered = properties.SelectedItems.ItemIdsOrdered;
    //         const detailModel = await handleDetailView({
    //             Id: itemIdsOrdered ? itemIdsOrdered![0]: '',
    //             ItemType: selectedContent.Type,
    //             ProviderName: selectedContent.Variations![0].Source
    //         }, props);
    //         data.detailModel = detailModel;
    //     }
    // } else if (properties.ContentViewDisplayMode === 'Master') {
    //     data.listModel = await handleListView(props);
    // }
   //  console.log('viewModel.listModel', viewModel.listModel)
    return (
      <div
        {...dataAttributes}
      >
        {/* {data.detailModel && <ContentListDetail entity={properties} detailModel={data.detailModel} />}
        {data.listModel && <DocumentListMaster  entity={properties} model={data.listModel} />} */}
        { viewModel.listModel &&
        viewModel.listModel.Items.Items.map((item: SdkItem, idx: number) => {
            const title = item['Title'];
            const fileSize = getFileSize(item);
            const extension = getExtension(item);
            const url = item['Url'];
            const itemUrl = 'test'; // Model.GetItemUrl(context, item);
            const extensionStyle = {
                backgroundColor: `var(${getFileExtensionCssClass(extension)})`
            };
            return  (<div className="d-flex gap-3 align-items-center mb-3" key={idx}>
              <div className="position-relative pt-1">
                <svg xmlns="https://www.w3.org/2000/svg" width="36" viewBox="0 0 384 512" fill="#a7acb1">
                  <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
                </svg>
                <span style={extensionStyle}
                  className="sc-file-icon-extension text-uppercase ps-1 pe-1 mb-2 text-white small"
                  >{extension}</span>
              </div>
              <div className="flex-grow-1">

                { title && <>


                  <div>
                    {itemUrl && viewModel.RenderLinks ?
                        (
                          <a href={itemUrl.toString()}>{title}</a> // sanitize
                        )
                        : (title) // sanitize
                        }
                    <span className="text-muted small">({extension})</span>
                  </div>
                  </>
                    }
                <div>
                  <a href={url} target="_blank" className="text-muted small">{viewModel.DownloadLinkLabel}</a>
                  <span className="text-muted small">({fileSize})</span>
                </div>
              </div>
            </div>);
        })
        }
      </div>
    );
}

function getAttributesWithClasses(entity: DocumentListEntity, fieldName: string, additionalClasses: string | null): Array<{ Key: string, Value: string}> {
    const viewCss = entity.CssClasses!.find(x => x.FieldName === fieldName);

    const contentListAttributes = entity.Attributes!['ContentList'] || [];
    let classAttribute = contentListAttributes.find(x => x.Key === 'class');
    if (!classAttribute) {
        classAttribute = {
            Key: 'className',
            Value: ''
        };

        contentListAttributes.push(classAttribute);
    }

    if (viewCss) {
        classAttribute.Value += ` ${viewCss.CssClass}`;
    }

    if (additionalClasses) {
        classAttribute.Value += ` ${additionalClasses}`;
    }

    return contentListAttributes;
}

function handleDetailView(detailItem: DetailItem, entity: DocumentListEntity) {
    const contentListAttributes = getAttributesWithClasses(entity, 'Details view', null);

    const detailModel = {
        Attributes: contentListAttributes,
        DetailItem: detailItem,
        ViewName: entity.SfDetailViewName
    } as DocumentListModelDetail;

    return detailModel;
}

 async function handleListView(entity: DocumentListEntity, context: RequestContext) {
    const listFieldMapping: {[key: string]: string} = {};
    // entity.ListFieldMapping.forEach((entry) => {
    //     listFieldMapping[entry.FriendlyName] = entry.Name;
    // });

    const fieldCssClassMap: {[key: string]: string} = {};
    entity.CssClasses!.forEach((entry) => {
        fieldCssClassMap[entry.FieldName] = entry.CssClass;
    });

     const items = await DocumentListRestService.getItems(entity, context.detailItem);
  //  console.log('items', items);
    let DocumentListMasterModel: DocumentListModelMaster = {

        OpenDetails: !(entity.ContentViewDisplayMode === 'Master' && entity.DetailPageMode === 'SamePage'),
        FieldCssClassMap: fieldCssClassMap,
        FieldMap: listFieldMapping,
        Items: items,
        ViewName: entity.SfViewName as any,
        Attributes: getAttributesWithClasses(entity, 'Content list', 'row row-cols-1 row-cols-md-3')
    };

     return DocumentListMasterModel;
 }
