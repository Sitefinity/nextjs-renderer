export class ValueParser{
    public inputType: string;
    public parser: (value: string)=>string;
    public escape: boolean;
    public escapeRegEx: RegExp;

    constructor(inputType :string, parser: (value: string)=>string, escape?: boolean, escapeRegEx?: RegExp) {
        this.inputType = inputType;
        this.parser = parser;
        this.escape = escape || false;
        this.escapeRegEx = escapeRegEx ? escapeRegEx : /[\-\[\]{}()*+?.,\\\^$|#\s]/g;
    }

    public canParse (inputType: string) {
        return this.inputType === inputType;
    };

    public parse(value: string): string {
        let parsedValue = this.parser(value);
        if (this.escape === true && typeof parsedValue === 'string') {
            return parsedValue.replace(this.escapeRegEx, '\\$&');
        }

        return parsedValue;
    };
}
