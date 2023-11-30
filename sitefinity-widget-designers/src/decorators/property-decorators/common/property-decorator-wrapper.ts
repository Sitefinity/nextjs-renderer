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
