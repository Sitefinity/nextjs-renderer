import { ListDisplayMode } from './list-display-mode';

export class ContentListSettings {
    ItemsPerPage: number = 20;
    LimitItemsCount: number = 20;
    DisplayMode: ListDisplayMode = ListDisplayMode.All;
}
