import { WidgetModel } from "@/framework/widgets/widget-model";

export interface ColumnHolder {
    Children: Array<ComponentContainer>
    Attributes: { [key: string]: string },
    Style?: { [key: string]: string },
}

export interface ComponentContainer {
    model: WidgetModel<any>;
}
