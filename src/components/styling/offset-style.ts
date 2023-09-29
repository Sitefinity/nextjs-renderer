import { OffsetSize } from "./offset-size";
import { VerticalOffsetStyle } from "./vertical-offset-style";

export interface OffsetStyle extends VerticalOffsetStyle {
    Left: OffsetSize,
    Right: OffsetSize,
}
