
import { SdkItem } from '../dto/sdk-item';
import { RestService } from '../rest-service';
import { RootUrlService } from '../root-url.service';
import { PageLayoutServiceResponse } from './layout-service.response';
import { LazyComponentsResponse } from './lazy-components.response';

export class LayoutService {

    public static async get(pagePath: string, queryParams: { [key: string]: string } = {}): Promise<PageLayoutServiceResponse> {
        let url = null;

        const whiteListedParams = ['sfaction', 'sf_version', 'segment', 'isBackend', 'sf_site', 'sf_site_temp', 'sf-auth', 'abTestVariationKey', 'sf-content-action', 'sf-lc-status'];
        let whitelistedParamDic: { [key:string]: string | undefined } = {};
        whiteListedParams.forEach(x => {
            whitelistedParamDic[x] = queryParams[x];
        });

        let indexOfSitefinityForms = pagePath.indexOf('Sitefinity/Forms/');
        if (indexOfSitefinityForms !== -1) {
            let name = null;
            let indexOfFormName = indexOfSitefinityForms + 'Sitefinity/Forms/'.length;
            let nextIndexOfSlash = pagePath.indexOf('/', indexOfFormName);
            if (nextIndexOfSlash === -1) {
                name = pagePath.substring(indexOfFormName);
            } else {
                name = pagePath.substring(indexOfFormName, nextIndexOfSlash);
            }

            const formResponse = await RestService.sendRequest<{ value: SdkItem[] }>({
                url: RootUrlService.rootUrl + `/sf/system/forms?$filter=Name eq \'${name}\'`
            });

            url = `/api/default/forms(${formResponse.value[0].Id})/Default.Model()`;
        } else {
            let indexOfSitefinityTemplate = pagePath.indexOf('Sitefinity/Template/');
            if (indexOfSitefinityTemplate > -1) {
                let id = null;
                let indexOfGuid = indexOfSitefinityTemplate + 'Sitefinity/Template/'.length;
                let nextIndexOfSlash = pagePath.indexOf('/', indexOfGuid);
                if (nextIndexOfSlash === -1) {
                    id = pagePath.substring(indexOfGuid);
                } else {
                    id = pagePath.substring(indexOfGuid, nextIndexOfSlash);
                }

                url = `/api/default/templates/${id}/Default.Model()`;
            } else {
                url = '/api/default/pages/Default.Model(url=@param)';

                let pageParamsDic: { [key:string]: string | undefined } = {};
                Object.keys(queryParams).filter(x => !whiteListedParams.some(y => y === x)).forEach(x => {
                    pageParamsDic[x] = queryParams[x];
                });

                let pagePramsQueryString = RestService.buildQueryParams(pageParamsDic);

                whitelistedParamDic['@param'] = `'${encodeURIComponent(pagePath + pagePramsQueryString)}'`;
            }
        }

        let sysParamsQueryString = RestService.buildQueryParams(whitelistedParamDic);
        url += `${sysParamsQueryString}`;

        return RestService.sendRequest({ url: RootUrlService.rootUrl + url });
    }

    public static getLazyComponents(pagePathAndQuery: string): Promise<LazyComponentsResponse> {
        let headers: {[key: string]: string} = {};
        let referrer = document.referrer;
        if (referrer && referrer.length > 0) {
            headers['SF_URL_REFERER'] = referrer;
        } else {
            headers['SF_NO_URL_REFERER'] = 'true';
        }

        let serviceUrl = `${RootUrlService.getServiceUrl()}/Default.LazyComponents(url=@param)?@param='${encodeURIComponent(pagePathAndQuery)}'`;
        serviceUrl += '&correlationId=' + (window as any)['sfCorrelationId'];

        return RestService.sendRequest({ url: serviceUrl, headers });
    }
}

