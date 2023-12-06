import React from 'react';
import { WidgetContext, classNames } from '../../../editor';

export async function Dropdown(props: WidgetContext<DropdownEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};

    return (<>
      <script data-sf-role={`start_field_${viewModel.FieldName}`} data-sf-role-field-name={viewModel.FieldName} />
      <fieldset data-sf-role="dropdown-list-field-container" className={classNames('mb-3', viewModel.CssClass)}
        aria-labelledby={`choice-field-label-${viewModel.FieldName} choice-field-description-${viewModel.FieldName}`}>
        <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />

        <legend className="h6" id={`choice-field-label-${viewModel.FieldName}`}>{viewModel.Label}</legend>

        <select className="form-select" data-sf-role="dropdown-list-field-select" name={viewModel.FieldName} required={viewModel.Required}>

          { viewModel.Choices.map((choiceOption: {Name: string, Value: string}, idx: number) =>{
            return <option key={idx} value={choiceOption.Value}>{choiceOption.Name}</option>;
            })
        }
        </select>

        { viewModel.InstructionalText &&
          <p className="text-muted small mt-1" id={`choice-field-description-${viewModel.FieldName}`}>{viewModel.InstructionalText}</p>
        }
        <div data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" />
      </fieldset>
      <script data-sf-role={`end_field_${viewModel.FieldName}`} />
    </>);
}

export interface DropdownEntity {
}
