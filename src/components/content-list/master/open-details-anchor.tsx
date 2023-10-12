'use client'

import React from "react";
import { RestSdkTypes, RestService } from "@/framework/sdk/rest-service";

export function OpenDetailsAnchor(props: {
    item: any;
    model: ListWithSummaryModel;
    className?: string;
    text?: string;
 }) {
    const item = props.item;
    const model = props.model;

    const onDetailsOpen = ((sdkItem) => {
        const selectedContent = props.model.Properties.SelectedItems.Content[0];
        const detailItem: DetailItem = {
            Id: sdkItem.Id,
            ProviderName: sdkItem.Provider,
            ItemType: selectedContent.Type
        };

        if (props.model.Properties.DetailPageMode === "SamePage") {

            const newUrl = window.location.origin + window.location.pathname + sdkItem.ItemDefaultUrl + window.location.search;
            window.history.pushState(detailItem, '', newUrl);
        } else if (props.model.Properties.DetailPage) {
            RestService.getItem(RestSdkTypes.Pages, props.model.Properties.DetailPage.ItemIdsOrdered[0], props.model.Properties.DetailPage.Content[0].Variations[0].Source).then((page: SdkItem) => {
                const newUrl = (page as PageItem).ViewUrl + sdkItem.ItemDefaultUrl;
                window.location.href = newUrl;
            });
        }
    });

    function onDetailItemOpenHandler(event: React.MouseEvent<HTMLAnchorElement>, item: SdkItem) {
        event.preventDefault();
        event.stopPropagation();

        onDetailsOpen(item);
    }

    return (
        <a href="#"
            className={props.className}
            onClick={(e) => onDetailItemOpenHandler(e, item.Original)}
        >{props.text || item.Title.Value}</a>
    )
}
