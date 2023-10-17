import { CardsListModel } from "./cards-list-model";
import React from "react";
import dompurify from "isomorphic-dompurify";
import Image from "next/image";
import { SdkItem } from "sitefinity-react-framework/sdk/dto/sdk-item";
import { OpenDetailsAnchor } from '../open-details-anchor.tsx';

export async function CardsList(props: { model: CardsListModel }) {
    const model = props.model;
    const sanitizer = dompurify.sanitize;
    const items = await model.Items;
    return (
        <div {...model.Attributes as any}>
            {items.map((item) => {
                const content = sanitizer(item.Text.Value);
                return (<div key={item.Original.Id} className="col">
                    <div className="card h-100">
                        {/* Nuxt Image needs width and height - if we can bring them (or use some defaults) we can use it
                        <Image className={item.Image.Css} src={item.Image.Url} alt={item.Image.AlternativeText} title={item.Image.Title} />
                         */}
                        {
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img className={item.Image.Css} src={item.Image.Url} alt={item.Image.AlternativeText} title={item.Image.Title} />
                        }
                        <div className="card-body">
                            <h5 className={item.Title.Css}>
                                {model.OpenDetails ?
                                    <OpenDetailsAnchor item={item} model={model} /> :
                                    (item.Title.Value)
                                }
                            </h5>
                            {item.Text && <div className={item.Text.Css} dangerouslySetInnerHTML={{__html: content}}></div>}
                        </div>
                    </div>
                </div>)
            })}
        </div>
    )
}
