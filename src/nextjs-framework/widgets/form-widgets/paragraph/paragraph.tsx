import React from 'react';
import { WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';
import { ParagraphClient } from './paragraph-client';
import { TextEntityBase } from '../textfield/interfaces/TextEntityBase';
import { StylingConfig } from '../../styling/styling-config';
import { ParagraphService } from './paragraph.service';
import { FieldSize } from '../../styling/field-size';
import { VisibilityStyle } from '../../styling/visibility-style';

const TextLengthDefaultValidationMessage = '{0} field input is too long';
const RequiredDefaultValidationMessage = '{0} field is required';
const InvalidDefaultValidationMessage = '{0} field is invalid';

export async function Paragraph(props: WidgetContext<ParagraphEntity>) {
    const entity = {
        Label: 'Untitled',
        TextLengthViolationMessage: TextLengthDefaultValidationMessage,
        RequiredErrorMessage: RequiredDefaultValidationMessage,
        FieldSize: FieldSize.None,
        ...props.model.Properties
    };
    const viewModel: any = {...entity};
    viewModel.CssClass = classNames(entity.CssClass, StylingConfig.FieldSizeClasses[entity.FieldSize]);
    viewModel.Label = entity.Label;
    viewModel.PlaceholderText = entity.PlaceholderText;
    viewModel.InstructionalText = entity.InstructionalText;
    viewModel.FieldName = entity.SfFieldName;
    viewModel.PredefinedValue = entity.PredefinedValue;
    viewModel.ValidationAttributes = ParagraphService.buildValidationAttributes(entity);
    viewModel.ViolationRestrictionsJson = {
        maxLength: entity.Range?.Max,
        minLength: entity.Range?.Min
    };
    viewModel.ViolationRestrictionsMessages = {
        invalidLength: entity.TextLengthViolationMessage.replace('{0}', entity.Label),
        required:  entity.RequiredErrorMessage.replace('{0}', entity.Label),
        invalid: InvalidDefaultValidationMessage.replace('{0}', entity.Label)
    };

    const paragraphUniqueId = viewModel.SfFieldName;
    const paragraphErrorMessageId = getUniqueId('ParagraphErrorMessage');
    const paragraphInfoMessageId = getUniqueId('ParagraphInfo');
    let ariaDescribedByAttribute = '';
    if (viewModel.InstructionalText) {

        if (viewModel.InstructionalText) {
            ariaDescribedByAttribute = `${paragraphUniqueId} ${paragraphErrorMessageId}`;
        } else {
            ariaDescribedByAttribute = paragraphErrorMessageId;
        }
    }
    const dataAttributes = htmlAttributes(props);
   const defaultRendering = (<>
     <script data-sf-role={`start_field_${paragraphUniqueId}`} data-sf-role-field-name={paragraphUniqueId} />
     <ParagraphClient viewModel={viewModel}
       paragraphUniqueId={paragraphUniqueId}
       paragraphErrorMessageId={paragraphErrorMessageId}
       paragraphInfoMessageId={paragraphInfoMessageId}
       ariaDescribedByAttribute={ariaDescribedByAttribute}
        />
     <script data-sf-role={`end_field_${paragraphUniqueId}`} />
   </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface ParagraphEntity extends TextEntityBase {
}
