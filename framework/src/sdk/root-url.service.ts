export class RootUrlService {
    public static rootUrl: string;

    public static getServiceUrl() {
        return `${RootUrlService.rootUrl}api/default/`
    }
}
