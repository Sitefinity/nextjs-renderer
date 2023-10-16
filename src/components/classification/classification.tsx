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

const mapTaxonProperties = (taxon: any, taxonomyName: string, viewUrl?: string) =>{
    const children = [];

    taxon.SubTaxa.forEach((t) =>{
        child.SubTaxa = mapTaxonProperties(child, taxonomyName);
        child.UrlName = getTaxaUrl(taxonomyName, child.UrlName, viewUrl);
        children.push(child);
    });

    return children;
}

const getTaxaUrl = (taxonomyName: string, taxonUrl: string, viewUrl?: string) => {
    if (viewUrl === null)
    {
        return "#";
    }
    let queryString = ''
    // we need to think how to add the query
    // IQueryCollection queryCollection = this.httpContextAccessor.HttpContext.Request.Query;
    // if (queryCollection != null && queryCollection.Count > 0)
    // {
    //     var whitelistedQueryParams = new[] { QueryParams.Action, QueryParamNames.Site, QueryParamNames.Provider, QueryParamNames.Culture };
    //     var filteredQueryCollection = queryCollection?.Where(x => whitelistedQueryParams.Contains(x.Key));
    //     queryString = QueryString.Create(filteredQueryCollection).ToString();
    // }

    if (taxonUrl.startsWith('/'))
    {
        taxonUrl = taxonUrl.substring(1);
    }

     return `${viewUrl}/-in-${taxonomyName},${taxonUrl.replaceAll("/", ",")}` + queryString;
}

export async function Classification(props: WidgetContext<ClassificationEntity>) {
    const model = props.model;
    const properties = model.Properties;
    const settings = properties.ClassificationSettings;
    const pageNode = props.requestContext.pageNode
    const dataAttributes = htmlAttributes(props);
    const tokens = await ClassificationRestService.getTokens(model.Properties, model);
    const viewUrl = pageNode ? pageNode.Fields.ViewUrl : '';

    const updatedTokens = tokens.value.map (taxon => {
        return {
            ...taxon,
            SubTaxa: mapTaxonProperties(taxon, settings.selectedTaxonomyName, viewUrl),
            UrlName: getTaxaUrl(settings.selectedTaxonomyName, taxon.UrlName, viewUrl),
        }
    })

    const sanitizer = dompurify.sanitize;
    const showItemCount = model.ShowItemCount || true;
    const defaultClass =  properties.CssClass;
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    const classificationCustomAttributes = getCustomAttributes(properties.Attributes, 'Classification');
    dataAttributes["className"] = classNames(
        defaultClass,
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
            {...classificationCustomAttributes}
            >
            {
            updatedTokens.map((item: any, idx: number) => {
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
