import { OrderBy } from '../../filters/orderby';
import { GetCommonArgs } from './get-common-args';

export interface GetAllArgs extends GetCommonArgs {
    Count?: boolean;
    OrderBy?: OrderBy[],
    Skip?: number;
    Take?: number;
    Filter?: any;
}
