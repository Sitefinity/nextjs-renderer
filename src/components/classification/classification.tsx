import React from "react";
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from "@/framework/widgets/attributes";
import { WidgetContext } from "@/framework/widgets/widget-context";
import { classNames } from "@/framework/utils/classNames";
import { LinkModel } from "@/framework/interfaces/LinkModel";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { Alignment } from "../styling/alignment";
import { ButtonType } from "../styling/button-types";
import { ClassificationRestService } from './classification.service'
import dompurify from "isomorphic-dompurify";

export async function Classification(props: WidgetContext<ClassificationEntity>) {
    const model = props.model;
    const properties = model.Properties;
    const dataAttributes = htmlAttributes(props);
    const tokens = await ClassificationRestService.getTokens(model.Properties, model);
    const sanitizer = dompurify.sanitize;
    const showItemCount = model.ShowItemCount || true;
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);

    dataAttributes["className"] = classNames(

        marginClass
        );
    dataAttributes["data-sfemptyicontext"] = "Select classification";
    dataAttributes["data-sfhasquickeditoperation"] = true;
    dataAttributes["data-sf-role"] = "classification";


    const renderSubTaxa = (taxa: PageViewModel[], show: boolean) => {

        return <ul>
            {
            taxa.map((t: any, idx: number) =>{
               const count = show ? `(${t.AppliedTo})` : '';
               return <li key={idx} className="list-unstyled">
                    <a className="text-decoration-none" href={t.UrlName}>{sanitise(t.Title)}</a>
                    {count}
                    {
                        t.SubTaxa && renderSubTaxa(t.SubTaxa, show)
                    }
                </li>
              })
            }
            </ul>
    }

    return (
        <ul
            {...dataAttributes}
            //     class="@Model.CssClass"
            //
            // @Html.BuildAttributes(Model.Attributes)
            >
            {
            tokens.value.map((item: any, idx: number) => {
                    const count = showItemCount ? `(${item.AppliedTo})` : '';
                    return <li key={idx} className="list-unstyled">
                        <a className="text-decoration-none" href={item.UrlName}>{sanitizer(item.Title)}</a>
                        {count}
                        {
                           item.SubTaxa && renderSubTaxa(item.SubTaxa, showItemCount)
                        }
                    </li>
                }
            )
            }
        </ul>
    );
}

export interface ClassificationSettingsInterface {
    selectedTaxonomyId: string;
    selectedTaxonomyUrl: string;
    selectedTaxonomyName: string;
    selectedTaxonomyTitle: string;
    selectionMode: string;
    byContentType: string;
    selectedTaxaIds: string [];
  }

export class ClassificationEntity {
    ClassificationSettings: ClassificationSettingsInterface;
    CssClass?: string;
    Margins?: OffsetStyle;
    OrderBy: string;
    ShowItemCount?: boolean;
    ShowEmpty?: boolean;
    SfViewName?: string;
    SortExpression?: string;
    Attributes?: any[];
}
