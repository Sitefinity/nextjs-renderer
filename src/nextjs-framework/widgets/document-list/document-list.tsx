import React from 'react';
import { DocumentListEntity } from './document-list-entity';
import { DocumentListRestService } from './document-list-rest.service';
import { StyleGenerator } from '../styling/style-generator.service';
import { DocumentListModelMaster } from './interfaces/DocumentListModelMaster';
import { DocumentListModelDetail } from './interfaces/DocumentListDetailModel';
import { PageTitleMode } from './interfaces/PageTitleMode';
import { ContentViewDisplayMode } from './interfaces/DisplayMode';
import { DetailPageSelectionMode } from './interfaces/DetailPageSelectionMode';
import { List } from './list';
import { Grid } from './grid';
import { getPageQueryString, getWhiteListSearchParams } from './common/utils';
import { DetailsItem } from './details-item';
import { DocumentListViewModel } from './interfaces/DocumentListViewModel';
import { DetailItem, RequestContext, WidgetContext, classNames, getCustomAttributes, htmlAttributes } from '../../editor';
import { PageItem, RestSdkTypes, RestService } from '../../rest-sdk';

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
    const documentListCustomAttributes = getCustomAttributes(entity.Attributes, 'Document list');
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    let defaultClass =  '';
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;
    const isGrid = entity.SfViewName === 'DocumentTable';
    const viewModel: DocumentListViewModel = {
        detailModel: null,
        listModel: null
    };
    viewModel.RenderLinks = !(entity.ContentViewDisplayMode === ContentViewDisplayMode.Master &&
         entity.DetailPageMode === DetailPageSelectionMode.SamePage);
    viewModel.DownloadLinkLabel = entity.DownloadLinkLabel;
    viewModel.SizeColumnLabel = entity.SizeColumnLabel;
    viewModel.TitleColumnLabel = entity.TitleColumnLabel;
    viewModel.TypeColumnLabel = entity.TypeColumnLabel;

     if (entity.ContentViewDisplayMode === 'Automatic') {
         if (context.detailItem) {
            const viewCss = entity.CssClasses!.find(x => x.FieldName === 'Details view');
            defaultClass = viewCss ? viewCss.CssClass : '';
            viewModel.detailModel = await handleDetailView(context.detailItem, entity, context);
         } else {
            const fieldName = isGrid ? 'Document table' : 'Document list';
            const viewCss = entity.CssClasses!.find(x => x.FieldName === fieldName);
            defaultClass = viewCss ? viewCss.CssClass : '';
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
            const viewCss = entity.CssClasses!.find(x => x.FieldName === 'Details view');
            defaultClass = viewCss ? viewCss.CssClass : '';
        }
    } else if (entity.ContentViewDisplayMode === 'Master') {
        viewModel.listModel = await handleListView(entity, context);
    }

   let url: string = '';
   const whitelistedQueryParams = ['sf_site','sfaction','sf_provider','sf_culture'];
   const queryList = new URLSearchParams(getWhiteListSearchParams(context.searchParams || {}, whitelistedQueryParams));
   let queryString = '?' + queryList.toString();

   if (entity && entity.DetailPageMode === 'SamePage' && context.layout) {
        url = context.layout.Fields ? context.layout.Fields.ViewUrl : context.layout.MetaInfo.CanonicalUrl;
    } else if (entity && entity.DetailPage) {
        const page = await RestService.getItem(
                RestSdkTypes.Pages,
                entity.DetailPage.ItemIdsOrdered![0],
                entity.DetailPage.Content[0].Variations![0].Source
            );

        url = page.RelativeUrlPath;
        queryString = getPageQueryString(page as PageItem);
    }

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass,
        documentListCustomAttributes.class
    );

    return (
      <div
        {...documentListCustomAttributes}
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


 const handleDetailView = async (
    detailItem: DetailItem,
    entity: DocumentListEntity,
    context: RequestContext
 ) => {
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
        DetailItem: detailItem,
        item: item,
        ViewName: entity.SfDetailViewName
    } as DocumentListModelDetail;

    return detailModel;
};

 const handleListView = async (entity: DocumentListEntity, context: RequestContext) => {
    const items = await DocumentListRestService.getItems(entity, context.detailItem);
    const DocumentListMasterModel: DocumentListModelMaster = {
        OpenDetails: !(entity.ContentViewDisplayMode === 'Master' && entity.DetailPageMode === 'SamePage'),
        Items: items
    };

     return DocumentListMasterModel;
 };
