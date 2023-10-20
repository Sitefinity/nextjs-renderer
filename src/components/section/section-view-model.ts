import { ColumnHolder } from './column-holder';
import { SectionHolder } from './section-holder';

export interface SectionViewModel {
    Columns: ColumnHolder[],
    Section: SectionHolder
}
