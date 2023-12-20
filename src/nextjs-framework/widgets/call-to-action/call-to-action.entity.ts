
import { OffsetStyle } from '../styling/offset-style';
import { Alignment } from '../styling/alignment';
import { ButtonType } from '../styling/button-types';
import { LinkModel } from '../../editor/widget-framework/link-model';

export class CallToActionEntity {
    PrimaryActionLabel?: string;
    PrimaryActionLink?: LinkModel;
    SecondaryActionLabel?: string;
    SecondaryActionLink?: LinkModel;
    Style?: {
        Primary?: {
            DisplayStyle: ButtonType
        },
        Secondary?: {
            DisplayStyle: ButtonType
        }
    };
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    Position?: {
        CTA: {
            Alignment: Alignment
        }
    };
    CssClass?: string;
    Margins?: OffsetStyle;
}
