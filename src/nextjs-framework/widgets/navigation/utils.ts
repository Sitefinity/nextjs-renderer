import { PageViewModel } from './interfaces/PageViewModel';

export const getClass = (node: PageViewModel) => {
    if (node.IsCurrentlyOpened) {
        return 'active';
    }

    return null;
};
