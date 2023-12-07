import React from 'react';
import { WidgetContext, classNames, htmlAttributes } from '../../../editor';

export async function Dropdown(props: WidgetContext<DropdownEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};
    const dropdownUniqueName = viewModel.SfFieldName;
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<>
      <script data-sf-role={`start_field_${dropdownUniqueName}`} data-sf-role-field-name={dropdownUniqueName} />
      <fieldset data-sf-role="dropdown-list-field-container" className={classNames('mb-3', viewModel.CssClass)}
        aria-labelledby={`choice-field-label-${dropdownUniqueName} choice-field-description-${dropdownUniqueName}`}>
        <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />

        <legend className="h6" id={`choice-field-label-${dropdownUniqueName}`}>{viewModel.Label}</legend>

        <select className="form-select" data-sf-role="dropdown-list-field-select" name={dropdownUniqueName} required={viewModel.Required}>

          { viewModel.Choices.map((choiceOption: {Name: string, Value: string}, idx: number) =>{
            return <option key={idx} value={choiceOption.Value}>{choiceOption.Name}</option>;
            })
        }
        </select>

        { viewModel.InstructionalText &&
          <p className="text-muted small mt-1" id={`choice-field-description-${dropdownUniqueName}`}>{viewModel.InstructionalText}</p>
        }
        <div data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" />
      </fieldset>
      <script data-sf-role={`end_field_${dropdownUniqueName}`} />
    </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface DropdownEntity {
}
