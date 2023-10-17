import React, { Fragment, useEffect, useState } from "react";
import { ContentListModelMaster } from "./content-list-master-model";
import { ContentListModelbase } from "./content-list-model-base";
import { ItemModel, ListWithSummaryModel } from "./list-with-summary/list-with-summary-model";
import { ListWithImage } from "./list-with-image/list-with-image";
import { ListWithImageModel } from "./list-with-image/list-with-image-model";
import { ListWithSummary } from "./list-with-summary/list-with-summary";
import { CardsList } from "./cards-list/cards-list";
import { CardsListModel } from "./cards-list/cards-list-model";
import { ImageItem } from "sitefinity-react-framework/sdk/dto/image-item";

export function ContentListMaster(props: { model: ContentListModelMaster }) {
    const [data, setData] = useState<{ viewName: string, model: ContentListModelbase }>();

    const model = props.model;

    useEffect(() => {
        let attributes: { [key: string]: string } = {};
        if (model.Attributes) {
            model.Attributes.forEach((pair) => {
                attributes[pair.Key] = pair.Value;
            });
        }

        model.Items.then((dataItems) => {
            if (model.ViewName === 'CardsList' || model.ViewName === 'ListWithImage') {
                const viewModel = {
                    OnDetailsOpen: model.OnDetailsOpen,
                    Attributes: attributes,
                    OpenDetails: model.OpenDetails,
                    Items: dataItems.Items.map((x) => {
                        let url!: string;
                        const imageProp: ImageItem[] = x[model.FieldMap["Image"]];
                        let image: ImageItem | null = null;
                        if (imageProp && imageProp.length > 0) {
                            image = imageProp[0];
                            if (image.Thumbnails && image.Thumbnails.length > 0) {
                                url = image.Thumbnails[0].Url;
                            } else {
                                url = image.Url;
                            }
                        }

                        return {
                            Title: {
                                Value: x[model.FieldMap["Title"]],
                                Css: 'card-title' + (x[model.FieldCssClassMap["Title"]] || ''),
                                Link: ""
                            },
                            Image: {
                                Title: image?.Title,
                                Url: url,
                                AlternativeText: image?.AlternativeText,
                                Css: x[model.FieldCssClassMap["Image"]],
                            },
                            Text: {
                                Value: x[model.FieldMap["Text"]],
                                Css: 'card-text ' + `${x[model.FieldCssClassMap["Text"]] || ''}`,
                            },
                            Original: x
                        }
                    })
                };

                setData({ viewName: model.ViewName, model: viewModel });
            } else if (model.ViewName === 'ListWithSummary') {
                const viewModel = {
                    OnDetailsOpen: model.OnDetailsOpen,
                    Attributes: attributes,
                    OpenDetails: model.OpenDetails,
                    Items: dataItems.Items.map((x) => {
                        const itemModel = {
                            Title: {
                                Value: x[model.FieldMap["Title"]],
                                Css: 'card-title' + (x[model.FieldCssClassMap["Title"]] || ''),
                                Link: ""
                            },
                            PublicationDate: {
                                Value: x[model.FieldMap["Publication date"]],
                                Css: x[model.FieldCssClassMap["Publication date"]],
                            },
                            Text: {
                                Value: x[model.FieldMap["Text"]],
                                Css: 'card-text ' + `${x[model.FieldCssClassMap["Text"]] || ''}`,
                            },
                            Original: x
                        } as ItemModel;

                        if (!itemModel.PublicationDate.Css)
                            itemModel.PublicationDate.Css = "";
                        itemModel.PublicationDate.Css += " text-muted";
                        return itemModel;
                    })
                };

                setData({ viewName: model.ViewName, model: viewModel });
            }
        });
    }, [model]);

    return (
        <Fragment>
            {(data?.model && data?.viewName === 'ListWithImage') &&
                <ListWithImage model={data?.model as ListWithImageModel}></ListWithImage>
            }

            {(data?.model && data?.viewName === 'ListWithSummary') &&
                <ListWithSummary model={data?.model as ListWithSummaryModel}></ListWithSummary>
            }

            {(data?.model && data?.viewName === 'CardsList') &&
                <CardsList model={data?.model as CardsListModel}></CardsList>
            }
        </Fragment>
    )
}
