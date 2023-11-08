export class RootUrlService {
    static rootUrl;
    static getServiceUrl() {
        return `${RootUrlService.rootUrl}api/default/`;
    }
}
