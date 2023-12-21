import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { ClassificationRestService } from './classification.service';
import { PageViewModel } from '../navigation/interfaces/PageViewModel';
import { WidgetContext, classNames, getCustomAttributes, htmlAttributes } from '../../editor';
import { ClassificationEntity } from './classification-entity';

export interface TaxaPageViewModel extends PageViewModel {
    AppliedTo: string;
    UrlName: string;
    SubTaxa: TaxaPageViewModel[];

}

const mapTaxonProperties = (taxon: TaxaPageViewModel, taxonomyName: string, viewUrl?: string, searchParams?: { [key: string]: string; }) =>{
    const children: TaxaPageViewModel[] = [];

    taxon.SubTaxa.forEach((child: TaxaPageViewModel) =>{
        child.SubTaxa = mapTaxonProperties(child as TaxaPageViewModel, taxonomyName);
        child.UrlName = getTaxaUrl(taxonomyName, child.UrlName, viewUrl, searchParams);
        children.push(child);
    });

    return children;
};

const getTaxaUrl = (taxonomyName: string, taxonUrl: string, viewUrl?: string, searchParams?: { [key: string]: string; }) => {
    if (viewUrl === null) {
        return '#';
    }

    let queryString = '';

    if (searchParams && Object.keys(searchParams).length) {
        const whitelistedQueryParams = ['sf_site','sfaction','sf_provider','sf_culture'];
        const filteredQueryCollection: { [key: string]: string; } = {};
        whitelistedQueryParams.forEach(param => {
            const searchParamValue = searchParams[param];
            if (searchParamValue) {
                filteredQueryCollection[param] = searchParamValue;
            }
        });
        const queryList = new URLSearchParams(filteredQueryCollection);
        queryString = queryList.toString();
    }

    if (taxonUrl.startsWith('/')) {
        taxonUrl = taxonUrl.substring(1);
    }

     return `${viewUrl}/-in-${taxonomyName},${taxonUrl.replaceAll('/', ',')}?` + queryString;
};

export async function Classification(props: WidgetContext<ClassificationEntity>) {
    const model = props.model;
    const properties = model.Properties;
    const settings = properties.ClassificationSettings;
    const dataAttributes = htmlAttributes(props);
    const tokens = await ClassificationRestService.getTaxons(model.Properties);
    const viewUrl = props.requestContext.layout.Fields['ViewUrl'] || '';
    const searchParams = props.requestContext.searchParams;

    const updatedTokens = tokens.value.map (taxon => {
        return {
            ...taxon,
            SubTaxa: mapTaxonProperties(taxon as TaxaPageViewModel, settings!.selectedTaxonomyName!, viewUrl, searchParams),
            UrlName: getTaxaUrl(settings!.selectedTaxonomyName!, taxon.UrlName, viewUrl, searchParams)
        };
    });

    const showItemCount = properties.ShowItemCount || true;
    const defaultClass =  properties.CssClass;
    const marginClass = properties.Margins && StyleGenerator.getMarginClasses(properties.Margins);
    const classificationCustomAttributes = getCustomAttributes(properties.Attributes, 'Classification');
    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyicontext'] = 'Select classification';
    dataAttributes['data-sfhasquickeditoperation'] = true;
    dataAttributes['data-sf-role'] = 'classification';

    const renderSubTaxa = (taxa: TaxaPageViewModel[], show: boolean) => {

        return (<ul>
          {
            taxa.map((t: TaxaPageViewModel, idx: number) =>{
               const count = show ? `(${t.AppliedTo})` : '';
               return (<li key={idx} className="list-unstyled">
                 <a className="text-decoration-none" href={t.UrlName}>{t.Title}</a>
                 {count}
                 {
                        t.SubTaxa && renderSubTaxa(t.SubTaxa, show)
                    }
               </li>);
              })
            }
        </ul>);
    };

    return (
      <ul
        {...dataAttributes}
        {...classificationCustomAttributes}
            >
        {
            updatedTokens.map((item: TaxaPageViewModel, idx: number) => {
                    const count = showItemCount ? `(${item.AppliedTo})` : '';
                    return (<li key={idx} className="list-unstyled">
                      <a className="text-decoration-none" href={item.UrlName}>{item.Title}</a>
                      {count}
                      {
                           item.SubTaxa && renderSubTaxa(item.SubTaxa, showItemCount)
                        }
                    </li>);
                }
            )
            }
      </ul>
    );
}
