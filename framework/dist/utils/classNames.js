/**
 * @hidden
 */
export const classNames = (...args) => {
    const result = {};
    const addLeafKeys = (arg) => typeof arg === 'object' ? Object
        .keys(arg)
        .forEach(key => {
        result[key] = arg[key];
    }) : result[arg] = true;
    ;
    const addKeys = (list) => list
        .filter((arg) => arg !== true && !!arg)
        .map((arg) => Array.isArray(arg) ?
        addKeys(arg) :
        addLeafKeys(arg));
    addKeys(args);
    return Object
        .keys(result)
        .map((key) => (result[key] && key) || null)
        .filter(el => el !== null)
        .join(' ');
};
