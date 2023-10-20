export interface WidgetModel<T> {
    Id: string;
    Name: string;
    Caption: string;

    Lazy: boolean;
    ViewName: string;
    PlaceHolder: string;
    Properties: T;
    Children: WidgetModel<any>[];
}
