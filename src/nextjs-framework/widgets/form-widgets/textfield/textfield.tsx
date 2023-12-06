import React from 'react';
import { WidgetContext, classNames, getUniqueId } from '../../../editor';

export async function TextField(props: WidgetContext<TextFieldEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};
    const textBoxUniqueId = viewModel.FieldName;
    const textBoxErrorMessageId = getUniqueId('TextboxErrorMessage');
    const ariaDescribedByAttribute = viewModel.HasDescription ? `${textBoxUniqueId} ${textBoxErrorMessageId}` : textBoxErrorMessageId;
    return (<>
      <script data-sf-role={'start_field_$(textBoxUniqueId)'} data-sf-role-field-name={textBoxUniqueId} />
      <div className={classNames('mb-3', viewModel.CssClass)} data-sf-role="text-field-container">
        <input data-sf-role="violation-restrictions" type="hidden" value={viewModel.ViolationRestrictionsJson} />
        <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />

        <label className="h6" htmlFor={textBoxUniqueId}>{viewModel.Label}</label>
        <input id={textBoxUniqueId}
          type={viewModel.InputType}
          className="form-control"
          name={viewModel.FieldName}
          placeholder={viewModel.PlaceholderText}
          value={viewModel.PredefinedValue}
          data-sf-role="text-field-input"
          readOnly={viewModel.Readonly}
          aria-describedby={ariaDescribedByAttribute}
          {...viewModel.ValidationAttributes} />
        { viewModel.HasDescription &&
        <div id={getUniqueId('TextboxInfo')} className="form-text">{viewModel.InstructionalText}</div>
    }

        <div id={textBoxErrorMessageId} data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" />
      </div>
      <script data-sf-role={`end_field_${textBoxUniqueId}`} />
    </>);
}

export interface TextFieldEntity {
}
