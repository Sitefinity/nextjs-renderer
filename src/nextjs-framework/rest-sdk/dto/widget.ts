import { Dictionary } from '../../typings/dictionary';

export interface Widget {
    Id: string;
    SiblingId: string;
    Name: string;
    PlaceHolder: string;
    Caption: string;
    Lazy: boolean;
    Properties: Dictionary;
    Children: Widget[];
}
