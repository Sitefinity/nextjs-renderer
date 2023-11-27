import { WidgetModel } from '@progress/sitefinity-react-framework';

export interface ColumnHolder {
    Children: Array<ComponentContainer>
    Attributes: { [key: string]: string },
    Style?: { [key: string]: string },
}

export interface ComponentContainer {
    model: WidgetModel<any>;
}
