import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export class ChoiceItem {
    Title?: string;
    Name?: string;
    Value: any = null;
    Icon?: string;
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
}

export function Choices(settings: ChoiceSettings) {
    return function (target: any, propName: string) {
        const baseChoices = new ChoiceSettings();
        settings.Choices?.forEach(c => {
            const choice = new ChoiceItem();
            baseChoices.Choices?.push(Object.assign(choice, c));
        });

        if (Array.isArray(baseChoices.Choices)) {
            (baseChoices.Choices as any) = JSON.stringify(baseChoices.Choices);
        }

        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.choices, Object.assign(baseChoices, settings));
    };
}
