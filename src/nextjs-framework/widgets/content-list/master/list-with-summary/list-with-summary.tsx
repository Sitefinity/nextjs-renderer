import React, { Fragment } from 'react';
import { ListWithSummaryModel } from './list-with-summary-model';
import { OpenDetailsAnchor } from '../open-details-anchor';
import { ContentListEntity } from '../../content-list-entity';

export function ListWithSummary(props: { model: ListWithSummaryModel, entity?: ContentListEntity }) {
    const model = props.model as any;
    return (
      <Fragment>
        {model.Items.map((item: any, index: number) => {
                return (
                  <Fragment key={item.Original.Id}>
                    {index !== 0 && <hr />}
                    <div>
                      {item.Title &&
                        <h5 className={item.Title.Css}>
                          {model.OpenDetails ?
                            <OpenDetailsAnchor entity={props.entity} item={item} model={model} /> :
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
                );
            })}
      </Fragment>
    );
}

