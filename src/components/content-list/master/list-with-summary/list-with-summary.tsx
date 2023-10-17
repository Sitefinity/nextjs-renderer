import React, { Fragment } from "react"
import { ListWithSummaryModel } from "./list-with-summary-model";
import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item";
import { OpenDetailsAnchor } from '../open-details-anchor.tsx';

export function ListWithSummary(props: { model: ListWithSummaryModel }) {
    const model = props.model;

    return (
        <Fragment>
            {model.Items.map((item, index) => {
                return (
                    <Fragment key={item.Original.Id}>
                        {index !== 0 && <hr />}
                        <div>
                            {item.Title &&
                                <h5 className={item.Title.Css}>
                                    {model.OpenDetails ?
                                        <OpenDetailsAnchor item={item} model={model} /> :
                                        (item.Title.Value)
                                    }
                                </h5>}
                            {item.PublicationDate &&
                                <p className={item.PublicationDate.Css}>
                                    <small>{item.PublicationDate.Value}</small>
                                </p>
                            }
                            {item.Text && <p className={item.Text.Css}>{item.Text.Value}</p>}
                        </div>
                    </Fragment>
                )
            })}
        </Fragment>
    )
}

