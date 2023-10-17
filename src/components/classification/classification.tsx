import React from "react";
import { generateAnchorAttrsFromLink, getCustomAttributes, htmlAttributes } from "sitefinity-react-framework/widgets/attributes";
import { WidgetContext } from "sitefinity-react-framework/widgets/widget-context";
import { classNames } from "sitefinity-react-framework/utils/classNames";
import { LinkModel } from "sitefinity-react-framework/interfaces/LinkModel";
import { StyleGenerator } from "../styling/style-generator.service";
import { OffsetStyle } from "../styling/offset-style";
import { Alignment } from "../styling/alignment";
import { ButtonType } from "../styling/button-types";
import { ClassificationRestService } from './classification.service'
import dompurify from "isomorphic-dompurify";

const mapTaxonProperties = (taxon: any, taxonomyName: string, viewUrl?: string, searchParams?: any) =>{
    const children = [];

    taxon.SubTaxa.forEach((t) =>{
        child.SubTaxa = mapTaxonProperties(child, taxonomyName);
        child.UrlName = getTaxaUrl(taxonomyName, child.UrlName, viewUrl, searchParams);
        children.push(child);
    });

    return children;
}

const getTaxaUrl = (taxonomyName: string, taxonUrl: string, viewUrl?: string, searchParams?: any) => {
    if (viewUrl === null)
    {
        return "#";
    }

    let queryString = ''

    if (searchParams && Object.keys(searchParams).length)
    {
        const whitelistedQueryParams = ["sf_site","sfaction","sf_provider","sf_culture"];
        const filteredQueryCollection = {};
        whitelistedQueryParams.forEach(param => {
            const searchParamValue = searchParams[param];
            if(searchParamValue) {
                filteredQueryCollection[param] = searchParamValue;
            }
        });

        queryString =  new URLSearchParams(filteredQueryCollection);
    }

    if (taxonUrl.startsWith('/'))
    {
        taxonUrl = taxonUrl.substring(1);
    }

     return `${viewUrl}/-in-${taxonomyName},${taxonUrl.replaceAll("/", ",")}?` + queryString;
}

export async function Classification(props: WidgetContext<ClassificationEntity>) {
    const model = props.model;
    const properties = model.Properties;
    const settings = properties.ClassificationSettings;
    const pageNode = props.requestContext.pageNode
    const dataAttributes = htmlAttributes(props);
    const tokens = await ClassificationRestService.getTaxons(model.Properties, model);
    const viewUrl = pageNode ? pageNode.Fields.ViewUrl : '';
    const searchParams = props.requestContext.searchParams;

    const updatedTokens = tokens.value.map (taxon => {
        return {
            ...taxon,
            SubTaxa: mapTaxonProperties(taxon, settings.selectedTaxonomyName, viewUrl, searchParams),
            UrlName: getTaxaUrl(settings.selectedTaxonomyName, taxon.UrlName, viewUrl, searchParams),
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
