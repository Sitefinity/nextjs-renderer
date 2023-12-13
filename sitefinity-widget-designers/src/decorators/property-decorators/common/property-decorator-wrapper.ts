/**
 * A property decorator function wrapper to provide forward compatibility for changes in the property decorator parameters.
 * @param func Callback function to be executed in the property decorator.
 */
export function PropertyDecoratorBase(func: (target: any, propName: string) => any) {
    return (target: any, arg: any) => {
        let propName: string = '';
        if (typeof(arg) === 'object') {
            propName = (arg as ClassFieldDecoratorContext).name.toString();
        } else {
            propName = arg as string;
        }

        func(target, propName);
    };
}
