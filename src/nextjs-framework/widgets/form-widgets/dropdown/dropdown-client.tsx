'use client';

import React from 'react';
import { classNames } from '../../../editor';
import { FormContext } from '../../form/form-container';
import { StylingConfig } from '../../styling/styling-config';
import { VisibilityStyle } from '../../styling/visibility-style';

export function DropdownFieldSet(props: { viewModel: any, dropdownUniqueId: string}) {
    const {viewModel, dropdownUniqueId} = props;
    const { formViewModel, sfFormValueChanged, hiddenInputs, skippedInputs } = React.useContext(FormContext);
    const initiallySelectedItem = viewModel.Choices.find((ch: {Selected: boolean})=>ch.Selected);
    const [selectValue, setSelectValue] = React.useState(initiallySelectedItem ? initiallySelectedItem.Value : '');
    const [errorMessageText, setErrorMessageText] = React.useState('');
    const isHidden = hiddenInputs[dropdownUniqueId];
    const isSkipped = skippedInputs[dropdownUniqueId];
    let delayTimer: ReturnType<typeof setTimeout>;
    function dispatchValueChanged() {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
             sfFormValueChanged();
        }, 300);
     }

    function handleDropdownValidation(event: React.ChangeEvent<HTMLSelectElement>) {
        if (viewModel.Required && event.target.value === '') {
            setErrorMessageText(viewModel.RequiredErrorMessage.replace('{0}', viewModel.Label));
        } else {
            setErrorMessageText('');
        }

        const selectedItem = viewModel.Choices.find((ch: {Value: string})=>ch.Value === event.target.value);

        setSelectValue(selectedItem ? selectedItem.value : '');
        dispatchValueChanged();
    }

    return (
      <fieldset data-sf-role="dropdown-list-field-container" className={classNames(
        'mb-3',
        viewModel.CssClass,
        isHidden
            ? StylingConfig.VisibilityClasses[VisibilityStyle.Hidden]
            : StylingConfig.VisibilityClasses[VisibilityStyle.Visible]
        )}
        aria-labelledby={`choice-field-label-${dropdownUniqueId} choice-field-description-${dropdownUniqueId}`}>
        <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />

        <legend className="h6" id={`choice-field-label-${dropdownUniqueId}`}>{viewModel.Label}</legend>

        <select
          className={classNames('form-select',{
                [formViewModel.InvalidClass!]: formViewModel.InvalidClass && viewModel.Required && errorMessageText
            })}
          data-sf-role="dropdown-list-field-select"
          name={dropdownUniqueId}
          required={viewModel.Required}
          value={selectValue}
          disabled={isHidden || isSkipped}
          onChange={handleDropdownValidation}>
          { viewModel.Choices.map((choiceOption: {Name: string, Value: string}, idx: number) =>{
            return <option key={idx} value={choiceOption.Value || ''}>{choiceOption.Name}</option>;
            })
        }
        </select>

        { viewModel.InstructionalText &&
        <p className="text-muted small mt-1" id={`choice-field-description-${dropdownUniqueId}`}>{viewModel.InstructionalText}</p>
        }
        {errorMessageText && <div data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" >
          {errorMessageText}
        </div>
        }
      </fieldset>
    );
}

export interface DropdownEntity {
}
