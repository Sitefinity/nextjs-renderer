import { ItemArgs } from './item-args';

export interface CreateWidgetArgs extends ItemArgs {
    Name: string;
    SiblingKey?: string;
    ParentPlaceholderKey?: string;
    PlaceholderName: string;
    Properties?: { [key: string]: string }
}
