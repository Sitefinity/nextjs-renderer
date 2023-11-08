import { PageLayoutServiceResponse } from './layout-service.response';
import { LazyComponentsResponse } from './lazy-components.response';
export declare class LayoutService {
    static get(pagePath: string, action: string | null, headers?: {
        [key: string]: string;
    }): Promise<PageLayoutServiceResponse>;
    static getLazyComponents(pagePathAndQuery: string): Promise<LazyComponentsResponse>;
}
