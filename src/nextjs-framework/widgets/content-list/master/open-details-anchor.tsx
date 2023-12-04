'use client';

import React from 'react';
import { ContentListEntity } from '../content-list-entity';
import { ListWithSummaryModel } from './list-with-summary/list-with-summary-model';
import { PageItem, RestSdkTypes, RestService, SdkItem } from '../../../rest-sdk';
import { DetailItem } from '../../../editor';

export function OpenDetailsAnchor(props: {
    item: any;
    model: ListWithSummaryModel;
    entity?: ContentListEntity;
    className?: string;
    text?: string;
 }) {
    const item = props.item;
    const model = props.model;
    const entity = props.entity;

    const onDetailsOpen = ((sdkItem: any) => {
        const selectedContent = entity!.SelectedItems!.Content[0];
        const detailItem: DetailItem = {
            Id: sdkItem.Id,
            ProviderName: sdkItem.Provider,
            ItemType: selectedContent.Type
        };

        if (entity && entity.DetailPageMode === 'SamePage') {

            const newUrl = window.location.origin + window.location.pathname + sdkItem.ItemDefaultUrl + window.location.search;
            window.history.pushState(detailItem, '', newUrl);
        } else if (entity && entity.DetailPage) {
            RestService.getItem(
                RestSdkTypes.Pages,
                entity.DetailPage.ItemIdsOrdered![0],
                entity.DetailPage.Content[0].Variations![0].Source
            ).then((page: SdkItem) => {
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
    );
}
