import React, { Fragment } from "react"
import { ListWithImageModel } from "./list-with-image-model";
import Image from "next/image";
import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item";
import { OpenDetailsAnchor } from '../open-details-anchor';
import { ContentListEntity } from "../../content-list-entity";

export function ListWithImage(props: { model: ListWithImageModel, entity?: ContentListEntity }) {
    const model = props.model as any;

    return (
        <Fragment>
            {model.Items.map((item: any, index: number) => {
                return (
                    <Fragment key={item.Original.Id}>
                        {index !== 0 && <hr />}
                        <div className="d-flex">
                            <div className="flex-shrink-0">
                                {/* <Image className={item.Image.Css} src={item.Image.Url} alt={item.Image.AlternativeText} title={item.Image.Title} /> */}
                                {
                                     /* eslint-disable-next-line @next/next/no-img-element */
                                    <img className={item.Image.Css} src={item.Image.Url} alt={item.Image.AlternativeText} title={item.Image.Title} />
                                }
                            </div>
                            <div className="flex-grow-1 ms-3">
                                {item.Title && <h5 className={item.Title.Css}>{item.Title.Value}</h5>}
                                {item.Text && <p className={item.Text.Css}>{item.Text.Value}</p>}
                                {model.OpenDetails && <OpenDetailsAnchor entity={props.entity} className="btn btn-primary" item={item} model={model} text={'Learn more'} />}
                            </div>
                        </div>
                    </Fragment>
                )

            })}
        </Fragment>
    )
}
