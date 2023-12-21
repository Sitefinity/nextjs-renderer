export class FieldSelector {
    public fieldContainerDataSfRole;
    public elementSelector;
    public additionalFilter;

    constructor(fieldContainerDataSfRole: string, elementSelector :string, additionalFilter?: string) {
        this.fieldContainerDataSfRole = fieldContainerDataSfRole;
        this.elementSelector = elementSelector;
        this.additionalFilter = additionalFilter;
    }

    public getFieldContainerDataSfRole () {
        return this.fieldContainerDataSfRole;
    };

    public getFieldValues(fieldContainer: Element) {
        let selector = this.elementSelector;
        if (this.additionalFilter) {
            selector += this.additionalFilter;
        }

        let elements = fieldContainer.querySelectorAll(selector);
        let fieldValues: string[] = [];
        elements.forEach((element) => {
            let value = (element as HTMLInputElement)?.value?.replace(/^\s+|\s+$/g, '');
            fieldValues.push(value);
        });

        return fieldValues;
    };

    public getFieldValueElements(fieldContainer: HTMLDivElement): NodeListOf<Element> {
        return fieldContainer.querySelectorAll(this.elementSelector);
    };

    public getFieldValueElement(fieldContainer: HTMLDivElement): Element | null {
        return fieldContainer.querySelector(this.elementSelector);
    };

    public canGetValues (fieldContainer: HTMLDivElement) {
        return this.fieldContainerDataSfRole === fieldContainer.getAttribute('data-sf-role');
    };
}
