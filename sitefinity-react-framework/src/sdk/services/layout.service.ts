import { RestService } from '../rest-service';
import { RootUrlService } from '../root-url.service';
import { PageLayoutServiceResponse } from './layout-service.response';
import { LazyComponentsResponse } from './lazy-components.response';

export class LayoutService {

    public static get(pagePath: string, action: string | null, headers: { [key: string]: string } = {}): Promise<PageLayoutServiceResponse> {
        let url = null;

        let indexOfSitefinityTemplate = pagePath.indexOf('Sitefinity/Template/');
        if (indexOfSitefinityTemplate > 0) {
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
            url = `/api/default/pages/Default.Model(url=@param)?@param='${encodeURIComponent(pagePath)}'`;
        }

        if (action) {
            let concatChar = '?';
            if (url.indexOf(concatChar) !== -1) {
                concatChar = '&';
            }

            url += `${concatChar}sfaction=${action}`;
        }

        return RestService.sendRequest({ url: RootUrlService.rootUrl + url, headers });
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

