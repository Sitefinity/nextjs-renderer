import { ChoiceItem } from '@progress/sitefinity-widget-designers-sdk';

export enum ImageClickAction {
    DoNothing = 'DoNothing',
    OpenLink = 'OpenLink',
    OpenOriginalSize = 'OpenOriginalSize'
}

export const ImageClickActionChoices: ChoiceItem[] = [
    { Value: 'DoNothing', Title: 'Nothing happens'},
    { Value: 'OpenLink', Title: 'Opens a link'},
    { Value: 'OpenOriginalSize', Title: 'Opens image in original size'}
];
