import { guid } from './guid';
/**
 * @hidden
 */
export const getUniqueId = (name) => {
    if (!name) {
        return guid();
    }
    return `${name}-${guid().substring(0, 4)}`;
};
