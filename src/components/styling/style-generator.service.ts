import { Alignment } from './alignment';
import { ButtonType } from './button-types';
import { OffsetStyle } from './offset-style';
import { StylingConfig } from './styling-config';


export class StyleGenerator {
    public static getPaddingClasses(offsetStyle: OffsetStyle) {
        const topPaddingKey = `PaddingTop${(offsetStyle.Top || StylingConfig.DefaultPadding).toUpperCase()}`;
        const bottomPaddingKey = `PaddingBottom${(offsetStyle.Bottom || StylingConfig.DefaultPadding).toUpperCase()}`;
        const leftPaddingKey = `PaddingLeft${(offsetStyle.Left || StylingConfig.DefaultPadding).toUpperCase()}`;
        const rightPaddingKey = `PaddingRight${(offsetStyle.Right || StylingConfig.DefaultPadding).toUpperCase()}`;

        const allKeys = [topPaddingKey, bottomPaddingKey, leftPaddingKey, rightPaddingKey];
        const allClassNames = allKeys.map((key) => {
            const className = (StylingConfig.OffsetClasses as { [key: string]: string })[key];
            return className;
        });

        const joinedClasses = allClassNames.filter(x => x).join(' ');
        return joinedClasses;
    }

    public static getMarginClasses(offsetStyle: OffsetStyle) {
        const topMarginKey = `MarginTop${(offsetStyle.Top || StylingConfig.DefaultMargin).toUpperCase()}`;
        const bottomMarginKey = `MarginBottom${(offsetStyle.Bottom || StylingConfig.DefaultMargin).toUpperCase()}`;
        const leftMarginKey = `MarginLeft${(offsetStyle.Left || StylingConfig.DefaultMargin).toUpperCase()}`;
        const rightMarginKey = `MarginRight${(offsetStyle.Right || StylingConfig.DefaultMargin).toUpperCase()}`;

        const allKeys = [topMarginKey, bottomMarginKey, leftMarginKey, rightMarginKey];
        const allClassNames = allKeys.map((key) => {
            const className = (StylingConfig.OffsetClasses as { [key: string]: string })[key];
            return className;
        });

        const joinedClasses = allClassNames.filter(x => x).join(' ');
        return joinedClasses;
    }

    public static getAlignmentClasses(alignment: Alignment) {
        const className = (StylingConfig.AlignmentClasses as { [key: string]: string })[alignment];
        return className;
    }

    public static getButtonClasses(buttonType: ButtonType) {
        const className = (StylingConfig.ButtonClasses)[buttonType]!.Value || buttonType;
        return className;
    }
}
