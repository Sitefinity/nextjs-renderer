'use client'

import React, { useEffect, useState } from "react";
import { ContentListEntity } from "./content-list-entity";
import { ContentListRestService } from "./content-list-rest.service";
import { ContentListDetail } from "./detail/content-list-detail";
import { ContentListModelDetail } from "./detail/content-list-detail-model";
import { ContentListMaster } from "./master/content-list-master";
import { ContentListModelMaster } from "./master/content-list-master-model";
import { WidgetContext } from "@/framework/widgets/widget-context";
import { htmlAttributes } from "@/framework/widgets/attributes";
import { DetailItem } from "@/framework/sdk/services/detail-item";
import { RestSdkTypes, RestService } from "@/framework/sdk/rest-service";
import { PageItem } from "@/framework/sdk/dto/page-item";
import { SdkItem } from "@/framework/sdk/dto/sdk-item";

export function ContentList(props: WidgetContext<ContentListEntity>) {
    const attributes = htmlAttributes(props);
    const [data, setData] = useState<State>({ detailModel: null, listModel: null, attributes });

    props.model.Properties.DetailPageMode = props.model.Properties.DetailPageMode || "SamePage";
    props.model.Properties.ContentViewDisplayMode = props.model.Properties.ContentViewDisplayMode || "Automatic";
    props.model.Properties.Attributes = props.model.Properties.Attributes || {};
    props.model.Properties.CssClasses = props.model.Properties.CssClasses || [];
    props.model.Properties.ListFieldMapping = props.model.Properties.ListFieldMapping || [];
    props.model.Properties.OrderBy = props.model.Properties.OrderBy || "PublicationDate DESC";
    props.model.Properties.ListSettings = props.model.Properties.ListSettings || {};
    props.model.Properties.ListSettings.DisplayMode = props.model.Properties.ListSettings.DisplayMode || "All";
    props.model.Properties.ListSettings.ItemsPerPage = props.model.Properties.ListSettings.ItemsPerPage || 20;
    props.model.Properties.ListSettings.LimitItemsCount = props.model.Properties.ListSettings.LimitItemsCount || 20;
    props.model.Properties.SelectExpression = props.model.Properties.SelectExpression || "*";
    props.model.Properties.SelectionGroupLogicalOperator = props.model.Properties.SelectionGroupLogicalOperator || "AND";
    props.model.Properties.SfViewName = props.model.Properties.SfViewName || "CardsList";

    useEffect(() => {
        if (props.model.Properties.ContentViewDisplayMode === "Automatic") {
            if (props.requestContext.detailItem) {
                const detailModel = handleDetailView(props.requestContext.detailItem, props);
                setData({ detailModel, listModel: null, attributes });
            } else {
                const listModel = handleListView(props);
                setData({ detailModel: null, listModel, attributes });
            }
        } else if (props.model.Properties.ContentViewDisplayMode === "Detail") {
            if (props.model.Properties.SelectedItems && props.model.Properties.SelectedItems.Content && props.model.Properties.SelectedItems.Content.length > 0) {
                const selectedContent = props.model.Properties.SelectedItems.Content[0];
                const detailModel = handleDetailView({
                    Id: props.model.Properties.SelectedItems.ItemIdsOrdered[0],
                    ItemType: selectedContent.Type,
                    ProviderName: selectedContent.Variations[0].Source
                }, props);
                setData({ detailModel, listModel: null, attributes });
            }
        } else if (props.model.Properties.ContentViewDisplayMode === "Master") {
            const listModel = handleListView(props);
            setData({ detailModel: null, listModel, attributes });
        }
    }, [props]);


    return (
        <div {...data.attributes as any}>
            {data.detailModel && <ContentListDetail detailModel={data.detailModel}></ContentListDetail>}
            {data.listModel && <ContentListMaster model={data.listModel}></ContentListMaster>}
        </div>
    );
}

function getAttributesWithClasses(props: WidgetContext<ContentListEntity>, fieldName: string, additionalClasses: string | null): Array<{ Key: string, Value: string}> {
    const viewCss = props.model.Properties.CssClasses.find(x => x.FieldName === fieldName);

    const contentListAttributes = props.model.Properties.Attributes["ContentList"] || [];
    let classAttribute = contentListAttributes.find(x => x.Key === "class");
    if (!classAttribute) {
        classAttribute = {
            Key: "class",
            Value: ''
        };

        contentListAttributes.push(classAttribute);
    }

    if (viewCss) {
        classAttribute.Value += ` ${viewCss.CssClass}`;
    }

    if (additionalClasses)
        classAttribute.Value += ` ${additionalClasses}`;

    return contentListAttributes;
}

function handleDetailView(detailItem: DetailItem, props: WidgetContext<ContentListEntity>) {
    const contentListAttributes = getAttributesWithClasses(props, "Details view", null);

    const detailModel = {
        Attributes: contentListAttributes,
        DetailItem: detailItem,
        ViewName: props.model.Properties.SfDetailViewName
    } as ContentListModelDetail;

    return detailModel;
}

function handleListView(props: WidgetContext<ContentListEntity>) {
    const listFieldMapping: {[key: string]: string} = {};
    props.model.Properties.ListFieldMapping.forEach((entry) => {
        listFieldMapping[entry.FriendlyName] = entry.Name;
    });

    const fieldCssClassMap: {[key: string]: string} = {};
    props.model.Properties.CssClasses.forEach((entry) => {
        fieldCssClassMap[entry.FieldName] = entry.CssClass;
    });

    const items = ContentListRestService.getItems(props.model.Properties, props.requestContext.detailItem);

    let contentListMasterModel: ContentListModelMaster = {
        OnDetailsOpen: ((sdkItem) => {
            const selectedContent = props.model.Properties.SelectedItems.Content[0];
            const detailItem: DetailItem = {
                Id: sdkItem.Id,
                ProviderName: sdkItem.Provider,
                ItemType: selectedContent.Type
            };

            if (props.model.Properties.DetailPageMode === "SamePage") {
                handleDetailView(detailItem, props);

                const newUrl = window.location.origin + window.location.pathname + sdkItem.ItemDefaultUrl + window.location.search;
                window.history.pushState(detailItem, '', newUrl);
            } else if (props.model.Properties.DetailPage) {
                RestService.getItem(RestSdkTypes.Pages, props.model.Properties.DetailPage.ItemIdsOrdered[0], props.model.Properties.DetailPage.Content[0].Variations[0].Source).then((page: SdkItem) => {
                    const newUrl = (page as PageItem).ViewUrl + sdkItem.ItemDefaultUrl;
                    window.location.href = newUrl;
                });
            }
        }),
        OpenDetails: !(props.model.Properties.ContentViewDisplayMode === "Master" && props.model.Properties.DetailPageMode === "SamePage"),
        FieldCssClassMap: fieldCssClassMap,
        FieldMap: listFieldMapping,
        Items: items,
        ViewName: props.model.Properties.SfViewName as any,
        Attributes: getAttributesWithClasses(props, "Content list", "row row-cols-1 row-cols-md-3")
    };

    return contentListMasterModel;
}

interface State {
    detailModel: ContentListModelDetail | null;
    listModel: ContentListModelMaster | null;
    attributes: { [key: string]: string }
}
