export function getBasicType(type: string) {
    if (type === 'string' || type === 'number' || type === 'boolean') {
        if (type === 'boolean') {
            type = 'bool';
        }

        return type;
    }

    return undefined;
}
