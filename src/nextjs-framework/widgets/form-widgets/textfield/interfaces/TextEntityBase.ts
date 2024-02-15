import { FieldSize } from '../../../styling/field-size';
import { NumericRange } from '../../common/NumericRange';

export interface TextEntityBase {
     Label?: string;
     InstructionalText?: string;
     PlaceholderText?: string;
     PredefinedValue?: string;
     Required?: boolean;
     Hidden?: boolean;
     RequiredErrorMessage?: string;
     Range?: NumericRange;
     TextLengthViolationMessage?: string;
     SfViewName?: string;
     FieldSize?: FieldSize;
     CssClass?: string;
     SfFieldType: string;
     SfFieldName: string;
}
