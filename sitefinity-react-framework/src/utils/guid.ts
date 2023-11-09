/* eslint-disable no-bitwise */

/**
 * @hidden
 */
export const guid: Function = (): string => {
    let id: string = '';
    let i: number;
    let random: number;

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += '-';
        }
        id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return id;
};
