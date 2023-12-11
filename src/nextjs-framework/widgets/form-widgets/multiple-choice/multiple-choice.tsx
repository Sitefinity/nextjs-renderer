import React from 'react';
import { WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';
import { ChoiceEntityBase } from '../interfaces/ChoiceEntityBase';
import { MultipleChoiceClient } from './multiple-choice-client';

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
    const multipleChoiceUniqueId = viewModel.SfFieldName;
    const inputMultipleChoiceUniqueId = getUniqueId(multipleChoiceUniqueId);
    const otherChoiceOptionId = getUniqueId(`choiceOption-other-${multipleChoiceUniqueId}`);
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (
      <>
        <script data-sf-role={`start_field_${multipleChoiceUniqueId}`} data-sf-role-field-name={`${multipleChoiceUniqueId}`} />
        <fieldset data-sf-role="multiple-choice-field-container" className={classNames('mb-3', viewModel.CssClass)}
          aria-labelledby={`choice-field-label-${multipleChoiceUniqueId} choice-field-description-${multipleChoiceUniqueId}`}>
          <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />
          <input type="hidden" data-sf-role="required-validator" value={viewModel.Required} />

          <legend className="h6" id={`choice-field-label-${multipleChoiceUniqueId}`}>{viewModel.Label}</legend>

          { viewModel.InstructionalText &&
            <p className="text-muted small" id={`choice-field-description-${multipleChoiceUniqueId}`}>{viewModel.InstructionalText}</p>
          }
          <MultipleChoiceClient viewModel={viewModel}
            multipleChoiceUniqueId={multipleChoiceUniqueId}
            inputMultipleChoiceUniqueId={inputMultipleChoiceUniqueId}
            otherChoiceOptionId={otherChoiceOptionId}
            innerColumnClass={innerColumnClass}
            layoutClass={layoutClass}
           />
        </fieldset>
        <script data-sf-role={`end_field_${multipleChoiceUniqueId}`} />
      </>
    );
    return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface MultipleChoiceEntity extends ChoiceEntityBase {
     HasAdditionalChoice: boolean,
     ColumnsNumber?: number
}
