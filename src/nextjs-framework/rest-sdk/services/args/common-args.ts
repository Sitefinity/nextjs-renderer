import { RequestArgs } from './request-args';

export interface CommonArgs extends RequestArgs {
    Type: string;
    Provider?: string;
    Culture?: string;
}
