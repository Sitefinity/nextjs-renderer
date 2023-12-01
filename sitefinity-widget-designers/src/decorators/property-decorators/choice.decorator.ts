import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export class ChoiceItem {
    Title?: string;
    Name?: string;
    Value: any = null;
    Icon?: string | null = null;
}

export class ChoiceSettings {
    Choices?: ChoiceItem[] | null = null;
    ServiceUrl?: string | null = null;
    ServiceCallParameters?: string | null = null;
    ServiceWarningMessage?: string | null = null;
    ShowFriendlyName?: boolean = false;
    ActionTitle?: string | null = null;
    ButtonTitle?: string | null = null;
    NotResponsive?: boolean = false;
    SideLabel?: string | null = null;
    AllowMultiple?: boolean = false;
}

export function Choices(choices: ChoiceItem[]): any
export function Choices(choices: ChoiceItem[], allowMultiple: boolean): any
export function Choices(settings: ChoiceSettings): any;
export function Choices(args: unknown, allowMultiple: boolean = false) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        let config: { [key: string]: any} = {
            Choices: null,
            AllowMultiple: allowMultiple
        };

        if (!Array.isArray(args)) {
            const baseChoices = new ChoiceSettings();
            (args as ChoiceSettings).Choices?.forEach(c => {
                const choice = new ChoiceItem();
                choice.Name = c.Name || c.Value;
                baseChoices.Choices?.push(Object.assign(choice, c));
            });

            config = Object.assign(baseChoices, args as ChoiceSettings);

            delete(config['AllowMultiple']);
        } else if (Array.isArray(args)) {
            config.Choices = [];

            args.forEach(c => {
                const choice = new ChoiceItem();
                choice.Name = c.Name || c.Value;
                config.Choices.push(Object.assign(choice, c));
            });
        }


        if (Array.isArray(config.Choices)) {
            (config.Choices as any) = JSON.stringify(config.Choices);
        }

        const assignableKey = Array.isArray(args) ? keys.choices : keys.choice;

        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, assignableKey, config);
    });
}
