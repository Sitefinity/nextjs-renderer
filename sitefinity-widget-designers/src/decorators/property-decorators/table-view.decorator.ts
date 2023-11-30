import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { DataType, KnownFieldTypes } from '..';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export class TableViewSettings {
    ColumnTitle: string | null = null;
    Enabled: boolean = true;
    Reorderable: boolean = false;
    Selectable: boolean = false;
    MultipleSelect: boolean = false;
    AllowEmptyState: boolean = false;
}

export function TableView(config: TableViewSettings): any;
export function TableView(config: TableViewSettings, addManyFileName: string): any;
export function TableView(columnTitle: string) : any;
export function TableView(args: unknown, addManyFileName?: string) {
    let config: { [key: string]: any } = new TableViewSettings();

    if (typeof(args) === 'string') {
        config.ColumnTitle = args;
    } else if (typeof(args) === 'object') {
        config = Object.assign(config, args);
        if (addManyFileName) {
            config['AddManyFileName'] = addManyFileName;
        }
    }
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.tableView, config);
        DataType(KnownFieldTypes.Complex)(target, propName);
    });
}
