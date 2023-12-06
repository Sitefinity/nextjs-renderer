import React from 'react';
import { WidgetContext, classNames, getUniqueId } from '../../../editor';
import { ChoiceEntityBase } from '../interfaces/ChoiceEntityBase';

export async function MultipleChoice(props: WidgetContext<MultipleChoiceEntity>) {
    const entity = {
        Label: 'Select a choice',
        RequiredErrorMessage: '{0} field is required',
        ColumnsNumber: 1,
        ...props.model.Properties
    };
    const viewModel: any = {...entity};

    let layoutClass = '';
    let innerColumnClass = '';
    switch (viewModel.ColumnsNumber) {
        case 0:
            layoutClass = 'd-flex flex-wrap';
            innerColumnClass = 'me-2';
            break;
        case 2:
            layoutClass = 'row m-0';
            innerColumnClass = 'col-6';
            break;
        case 3:
            layoutClass = 'row m-0';
            innerColumnClass = 'col-4';
            break;
        default:
            break;
    }
    const otherChoiceOptionId = getUniqueId(`choiceOption-other-${viewModel.FieldName}`);
    return (<>
      <script data-sf-role={`start_field_${viewModel.FieldName}`} data-sf-role-field-name={`${viewModel.FieldName}`} />
      <fieldset data-sf-role="multiple-choice-field-container" className={classNames('mb-3', viewModel.CssClass)}
        aria-labelledby={`choice-field-label-${viewModel.FieldName} choice-field-description-${viewModel.FieldName}`}>
        <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />
        <input type="hidden" data-sf-role="required-validator" value={viewModel.Required} />

        <legend className="h6" id={`choice-field-label-${viewModel.FieldName}`}>{viewModel.Label}</legend>

        { viewModel.InstructionalText &&
        <p className="text-muted small" id={`choice-field-description-${viewModel.FieldName}`}>{viewModel.InstructionalText}</p>
                }

        <div className={layoutClass}>
          { viewModel.Choices.map((choiceOption: {Name: string, Value: string}, idx: number)=>{
                let choiceOptionId = getUniqueId(`choiceOption-${idx}-${viewModel.FieldName}`);

                return (<div className={`form-check ${innerColumnClass}`} key={idx}>
                  <input className="form-check-input" type="radio" name={viewModel.FieldName} id={choiceOptionId}
                    value={choiceOption.Value} data-sf-role="multiple-choice-field-input" required={viewModel.Required} />
                  <label className="form-check-label" htmlFor={choiceOptionId}>
                    {choiceOption.Name}
                  </label>
                </div>);
            })
        }
          { viewModel.HasAdditionalChoice &&

          <div className={`form-check ${innerColumnClass}`}>
            <input className="form-check-input mt-1" type="radio" name={viewModel.FieldName} id={otherChoiceOptionId}
              data-sf-role="multiple-choice-field-input" required={viewModel.Required} />
            <label className="form-check-label" htmlFor={otherChoiceOptionId}>Other</label>
            <input type="text" style={{display: 'none'}} className="form-control" data-sf-role="choice-other-input" />
          </div>
                    }
        </div>
        <div data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" />
      </fieldset>
      <script data-sf-role={`end_field_${viewModel.FieldName}`} />
    </>);
}

export interface MultipleChoiceEntity extends ChoiceEntityBase {
     HasAdditionalChoice: boolean,
     ColumnsNumber?: number
}
