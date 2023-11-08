/// <reference types="react" />
import { LinkModel } from '../interfaces/LinkModel';
import { WidgetContext } from './widget-context';
export type CustomAttribute = {
    Key: string;
    Value: string;
};
export declare function htmlAttributes(widgetContext: WidgetContext<any>, error?: string | undefined): any;
export declare const generateAnchorAttrsFromLink: (linkModel?: LinkModel | null, classList?: string) => import("react").AnchorHTMLAttributes<HTMLAnchorElement> | null;
export declare const getCustomAttributes: (attributes: any, part: string) => any;
