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
import { PageItem } from 'sitefinity-react-framework/sdk/dto/page-item';
import { getPageQueryString, getWhiteListQueryList } from './common/utils';
import { DetailsItem } from './details-item';

export async function DocumentList(props: WidgetContext<DocumentListEntity>) {
    const entity = {
        Attributes: {},
        CssClasses: [],
        SeoEnabled: true,
        DetailPageMode: DetailPageSelectionMode.SamePage,
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
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);

    dataAttributes['className'] = classNames(
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
    viewModel.RenderLinks = !(entity.ContentViewDisplayMode === ContentViewDisplayMode.Master &&
         entity.DetailPageMode === DetailPageSelectionMode.SamePage);
    viewModel.DownloadLinkLabel = entity.DownloadLinkLabel;
    viewModel.SizeColumnLabel = entity.SizeColumnLabel;
    viewModel.TitleColumnLabel = entity.TitleColumnLabel;
    viewModel.TypeColumnLabel = entity.TypeColumnLabel;

     if (entity.ContentViewDisplayMode === 'Automatic') {
         if (context.detailItem) {
            viewModel.detailModel = await handleDetailView(context.detailItem, entity, context);
         } else {
             viewModel.listModel = await handleListView(entity, context);
         }
     } else if (entity.ContentViewDisplayMode === 'Detail') {
        if (entity.SelectedItems && entity.SelectedItems.Content && entity.SelectedItems.Content.length > 0) {
            const selectedContent = entity.SelectedItems.Content[0];
            const itemIdsOrdered = entity.SelectedItems.ItemIdsOrdered;
            const detailModel = await handleDetailView({
                Id: itemIdsOrdered ? itemIdsOrdered![0]: '',
                ItemType: selectedContent.Type,
                ProviderName: selectedContent.Variations![0].Source
            }, entity, context);
            viewModel.detailModel = detailModel;
        }
    } else if (entity.ContentViewDisplayMode === 'Master') {
        viewModel.listModel = await handleListView(entity, context);
    }

   let url: string = '';
   const whitelistedQueryParams = ['sf_site','sfaction','sf_provider','sf_culture'];
   const queryList = getWhiteListQueryList(context, whitelistedQueryParams);
   let queryString = '?' + queryList.toString();

   if (entity && entity.DetailPageMode === 'SamePage') {
        url = context.pageNode.Fields ? context.pageNode.Fields.ViewUrl : context.pageNode.MetaInfo.CanonicalUrl;
    } else if (entity && entity.DetailPage) {
        const page = await RestService.getItem(
                RestSdkTypes.Pages,
                entity.DetailPage.ItemIdsOrdered![0],
                entity.DetailPage.Content[0].Variations![0].Source
            );

        url = page.RelativeUrlPath;
        queryString = getPageQueryString(page as PageItem);
    }
    return (
      <div
        {...dataAttributes}
      >
        {viewModel.detailModel && <DetailsItem entity={entity} viewModel={viewModel} />}
        { viewModel.listModel && (isGrid
            ?  <Grid url={url} queryString={queryString}  viewModel={viewModel} />
            :  <List url={url} queryString={queryString} viewModel={viewModel} />)
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

 const handleDetailView = async (
    detailItem: DetailItem,
    entity: DocumentListEntity,
    context: RequestContext
 ) => {
    const contentListAttributes = getAttributesWithClasses(entity, 'Details view', null);

    let item;
    if (context.detailItem) {
        item = await RestService.getItem(
            detailItem.ItemType,
            detailItem.Id,
            detailItem.ProviderName
        );
    } else {
        const items = await DocumentListRestService.getItems(entity, detailItem);
        item = items.Items[0];
    }

    const detailModel = {
        Attributes: contentListAttributes,
        DetailItem: detailItem,
        item: item,
        ViewName: entity.SfDetailViewName
    } as DocumentListModelDetail;

    return detailModel;
};

 const handleListView = async (entity: DocumentListEntity, context: RequestContext) => {
    const listFieldMapping: {[key: string]: string} = {};
    const fieldCssClassMap: {[key: string]: string} = {};
    entity.CssClasses!.forEach((entry) => {
        fieldCssClassMap[entry.FieldName] = entry.CssClass;
    });

    const items = await DocumentListRestService.getItems(entity, context.detailItem);
    const DocumentListMasterModel: DocumentListModelMaster = {

        OpenDetails: !(entity.ContentViewDisplayMode === 'Master' && entity.DetailPageMode === 'SamePage'),
        FieldCssClassMap: fieldCssClassMap,
        FieldMap: listFieldMapping,
        Items: items,
        ViewName: entity.SfViewName as any,
        Attributes: getAttributesWithClasses(entity, 'Document list', 'row row-cols-1 row-cols-md-3')
    };

     return DocumentListMasterModel;
 };
