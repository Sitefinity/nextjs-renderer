import { OffsetStyle } from "./offset-style";
import { StylingConfig } from "./styling-config";

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

        const joinedClasses = allClassNames.filter(x => x).join(" ");
        return joinedClasses;
    }
}
