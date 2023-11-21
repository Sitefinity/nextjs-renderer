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
import { List } from './list';
import { Grid } from './grid';

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
    console.log('props', props);
    console.log('entity', entity);
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
    const isGrid = entity.SfViewName === 'DocumentTable';
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
        { viewModel.listModel && (isGrid
            ?  <Grid items={viewModel.listModel.Items.Items} viewModel={viewModel} />
            :  <List items={viewModel.listModel.Items.Items} viewModel={viewModel} />)
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
