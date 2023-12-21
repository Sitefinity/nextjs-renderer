import React from 'react';
import { WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';
import { TextType } from './interfaces/TextType';
import { StylingConfig } from '../../styling/styling-config';
import { FieldSize } from '../../styling/field-size';
import { TextFieldService } from './textfield.service';
import { TextEntityBase } from './interfaces/TextEntityBase';
import { TextFieldContainer } from './textfield-client';

const TextLengthDefaultValidationMessage = '{0} field input is too long';
const RequiredDefaultValidationMessage = '{0} field is required';
const InvalidDefaultValidationMessage = '{0} field is invalid';
const RegularExpressionDefaultValidationMessage = 'Please match the requested format';

export async function TextField(props: WidgetContext<TextFieldEntity>) {

    const entity = {
        Label: 'Untitled',
        TextLengthViolationMessage: TextLengthDefaultValidationMessage,
        RequiredErrorMessage: RequiredDefaultValidationMessage,
        RegularExpressionViolationMessage: RegularExpressionDefaultValidationMessage,
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
    viewModel.ValidationAttributes = TextFieldService.buildValidationAttributes(entity);
    viewModel.ViolationRestrictionsJson = {
        maxLength: entity.Range?.Max,
        minLength: entity.Range?.Min
    };
    viewModel.ViolationRestrictionsMessages = {
        invalidLength: entity.TextLengthViolationMessage.replace('{0}', entity.Label),
        required:  entity.RequiredErrorMessage.replace('{0}', entity.Label),
        invalid: InvalidDefaultValidationMessage.replace('{0}', entity.Label),
        regularExpression: entity.RegularExpressionViolationMessage.replace('{0}', entity.Label)
    };
    const textBoxUniqueId = viewModel.SfFieldName;
    const textBoxErrorMessageId = getUniqueId('TextboxErrorMessage');
    const ariaDescribedByAttribute = viewModel.HasDescription ? `${textBoxUniqueId} ${textBoxErrorMessageId}` : textBoxErrorMessageId;
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<>
      <script data-sf-role={`start_field_${textBoxUniqueId}`} data-sf-role-field-name={textBoxUniqueId} />
      <div className={classNames('mb-3', viewModel.CssClass)} data-sf-role="text-field-container">
        <label className="h6" htmlFor={textBoxUniqueId}>{viewModel.Label}</label>
        <TextFieldContainer viewModel={viewModel}
          textBoxUniqueId={textBoxUniqueId}
          textBoxErrorMessageId={textBoxErrorMessageId}
          ariaDescribedByAttribute={ariaDescribedByAttribute}
            />
      </div>
      <script data-sf-role={`end_field_${textBoxUniqueId}`} />
    </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface TextFieldEntity extends TextEntityBase {
    InputType: TextType;
    RegularExpression: string;
    RegularExpressionViolationMessage?: string;
}
