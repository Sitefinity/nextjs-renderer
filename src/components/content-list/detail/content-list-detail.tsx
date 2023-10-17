import React from "react";
import { ContentListModelDetail } from "./content-list-detail-model";
import { RestService } from "sitefinity-react-framework/sdk/rest-service";
import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item";

export async function ContentListDetail(props: { detailModel: ContentListModelDetail }) {
    const model = props.detailModel;

    let queryParams: { [key: string]: string } = {};
    new URLSearchParams(window.location.search).forEach((val, key) => {
        queryParams[key] = val;
    });

    let dataItem: SdkItem;
    if (queryParams.hasOwnProperty("sf-content-action")) {
        dataItem = await RestService.getItemWithStatus(
            model.DetailItem.ItemType, model.DetailItem.Id,
            model.DetailItem.ProviderName, queryParams
        )
    } else {
        dataItem = await RestService.getItem(
            model.DetailItem.ItemType,
            model.DetailItem.Id,
            model.DetailItem.ProviderName
        );
    }
    let detailViewModel: State
    let attributes: { [key: string]: string } = {};
    if (model.Attributes) {
        model.Attributes.forEach((pair) => {
            attributes[pair.Key] = pair.Value;
        });
    }

    detailViewModel = {
        Attributes: attributes,
        ViewName: model.ViewName,
        DetailItem: dataItem
    };

    return (
        <div {...detailViewModel?.Attributes as any}>
            {detailViewModel?.ViewName === 'News' &&
            <h3>
                <span>{detailViewModel?.DetailItem.Title}</span>
            </h3>
            }
        </div>
    )
}

interface State {
    ViewName: string;
    DetailItem: SdkItem,
    Attributes: { [key: string]: string };
}
