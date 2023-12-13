import React from 'react';
import { MixedContentContext, WidgetContext, classNames } from '../../../editor';
import { Dropdown } from '../dropdown/dropdown';
import { Checkboxes } from '../checkboxes/checkboxes';
import { FieldSize } from '../../styling/field-size';
import { ClassificationSettings } from './interfaces/ClassificationSettings';
import { Selection } from './interfaces/selection';
import { StylingConfig } from '../../styling/styling-config';
import { DynamicListService } from './dynamic-list.service';
import { OrderBy } from '../../../rest-sdk';

export async function DynamicList(props: WidgetContext<DynamicListEntity>) {
    const entity = {
        Label: 'Select a choice',
        OrderByContent: 'PublicationDate DESC',
        RequiredErrorMessage: '{0} field is required',
        OrderBy: 'Title ASC',
        SfViewName: 'Dropdown',
        ListType: Selection.Content,
        ColumnsNumber: 1,
        ...props.model.Properties
    };
    const viewModel: any = {
        Label: entity.Label,
        InstructionalText: entity.InstructionalText,
        Required: entity.Required,
        FieldName: entity.SfFieldName,
        ViolationRestrictionsMessages: {
            required:  entity.RequiredErrorMessage.replace('{0}', entity.Label)
        },
        CssClass: classNames(entity.CssClass, StylingConfig.FieldSizeClasses[entity.FieldSize])
    };
    const restService = props.restService || DynamicListService;
    viewModel.Choices = await restService.getChoiceItems(entity);

    const newProps = {...props};
    newProps.model.Properties  = {...newProps.model.Properties, Choices: viewModel.Choices } as any;

    return (viewModel.SfViewName === 'Dropdown'
        ? <Dropdown {...newProps}  />
        : <Checkboxes {...newProps as any} />);

}

export interface DynamicListEntity {
    Label?: string;
    InstructionalText?: string;
    SfViewName?: string;
    CssClass?: string;
    SfFieldType?: string;
    SfFieldName?: string;
    ListType?: Selection;
    SelectedContent: MixedContentContext;
    Required?: boolean;
    Hidden?: boolean;
    RequiredErrorMessage?: string;
    OrderByContent?: string;
    ClassificationSettings: ClassificationSettings;
    OrderBy?: OrderBy;
    SortExpression?: string;
    FieldSize: FieldSize;
    ColumnsNumber?: number;
    ValueFieldName?: string;
}
