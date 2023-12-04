import React from 'react';
import { ContentListEntity } from './content-list-entity';
import { ContentListRestService } from './content-list-rest.service';
import { ContentListDetail } from './detail/content-list-detail';
import { ContentListModelDetail } from './detail/content-list-detail-model';
import { ContentListMaster } from './master/content-list-master';
import { ContentListModelMaster } from './master/content-list-master-model';
import { DetailItem, WidgetContext, htmlAttributes } from '../../editor';

export async function ContentList(props: WidgetContext<ContentListEntity>) {
    const attributes = htmlAttributes(props);
    const properties = props.model.Properties;

    let data: any = {
        detailModel: null,
        listModel: null,
        attributes
    };

    if (properties.ContentViewDisplayMode === 'Automatic') {
        if (props.requestContext.detailItem) {
            data.detailModel = await handleDetailView(props.requestContext.detailItem, props);
        } else {
            data.listModel = await handleListView(props);
        }
    } else if (properties.ContentViewDisplayMode === 'Detail') {
        if (properties.SelectedItems && properties.SelectedItems.Content && properties.SelectedItems.Content.length > 0) {
            const selectedContent = properties.SelectedItems.Content[0];
            const itemIdsOrdered = properties.SelectedItems.ItemIdsOrdered;
            const detailModel = await handleDetailView({
                Id: itemIdsOrdered ? itemIdsOrdered![0]: '',
                ItemType: selectedContent.Type,
                ProviderName: selectedContent.Variations![0].Source
            }, props);
            data.detailModel = detailModel;
        }
    } else if (properties.ContentViewDisplayMode === 'Master') {
        data.listModel = await handleListView(props);
    }

    return (
      <div {...data.attributes as any}>
        {data.detailModel && <ContentListDetail entity={properties} detailModel={data.detailModel} />}
        {data.listModel && <ContentListMaster  entity={properties} model={data.listModel} />}
      </div>
    );
}

function getAttributesWithClasses(props: WidgetContext<ContentListEntity>, fieldName: string, additionalClasses: string | null): Array<{ Key: string, Value: string}> {
    const viewCss = props.model.Properties.CssClasses!.find(x => x.FieldName === fieldName);

    const contentListAttributes = props.model.Properties.Attributes!['ContentList'] || [];
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

function handleDetailView(detailItem: DetailItem, props: WidgetContext<ContentListEntity>) {
    const contentListAttributes = getAttributesWithClasses(props, 'Details view', null);

    const detailModel = {
        Attributes: contentListAttributes,
        DetailItem: detailItem,
        ViewName: props.model.Properties.SfDetailViewName
    } as ContentListModelDetail;

    return detailModel;
}

function handleListView(props: WidgetContext<ContentListEntity>) {
    const listFieldMapping: {[key: string]: string} = {};
    props.model.Properties.ListFieldMapping?.forEach((entry) => {
        listFieldMapping[entry.FriendlyName!] = entry.Name!;
    });

    const fieldCssClassMap: {[key: string]: string} = {};
    props.model.Properties.CssClasses!.forEach((entry) => {
        fieldCssClassMap[entry.FieldName] = entry.CssClass;
    });

    const items = ContentListRestService.getItems(props.model.Properties, props.requestContext.detailItem);

    let contentListMasterModel: ContentListModelMaster = {

        OpenDetails: !(props.model.Properties.ContentViewDisplayMode === 'Master' && props.model.Properties.DetailPageMode === 'SamePage'),
        FieldCssClassMap: fieldCssClassMap,
        FieldMap: listFieldMapping,
        Items: items,
        ViewName: props.model.Properties.SfViewName as any,
        Attributes: getAttributesWithClasses(props, 'Content list', 'row row-cols-1 row-cols-md-3')
    };

    return contentListMasterModel;
}

interface State {
    detailModel: ContentListModelDetail | null;
    listModel: ContentListModelMaster | null;
    attributes: { [key: string]: string }
}
