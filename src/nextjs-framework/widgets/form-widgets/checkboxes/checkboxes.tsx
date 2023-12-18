import React from 'react';
import { WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';
import { ChoiceEntityBase } from '../interfaces/ChoiceEntityBase';
import { CheckboxesClient } from './checkboxes-client';

export async function Checkboxes(props: WidgetContext<CheckboxesEntity>) {
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
    const checkboxUniqueId = viewModel.SfFieldName;
    const inputCheckboxUniqueId = getUniqueId(checkboxUniqueId);
    const otherChoiceOptionId = getUniqueId(`choiceOption-other-${checkboxUniqueId}`);
    const dataAttributes = htmlAttributes(props);

    const defaultRendering = (<>
      <script data-sf-role={`start_field_${checkboxUniqueId}`} data-sf-role-field-name={`${checkboxUniqueId}`} />
      <fieldset data-sf-role="checkboxes-field-container" className={classNames('mb-3', viewModel.CssClass)}
        aria-labelledby={`choice-field-label-${checkboxUniqueId} choice-field-description-${checkboxUniqueId}`}>
        <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />
        <input type="hidden" data-sf-role="required-validator" value={viewModel.Required} />
        <CheckboxesClient viewModel={viewModel}
          checkboxUniqueId={checkboxUniqueId}
          inputCheckboxUniqueId={inputCheckboxUniqueId}
          otherChoiceOptionId={otherChoiceOptionId}
          innerColumnClass={innerColumnClass}
          layoutClass={layoutClass}
           />
      </fieldset>
      <script data-sf-role={`end_field_${checkboxUniqueId}`} />
    </>
    );
    return  (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface CheckboxesEntity extends ChoiceEntityBase {
    HasAdditionalChoice: boolean,
    ColumnsNumber?: number
}
