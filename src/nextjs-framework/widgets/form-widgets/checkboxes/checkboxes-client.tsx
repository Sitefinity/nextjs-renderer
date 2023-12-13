'use client';

import React, { useContext, useState } from 'react';
import { FormContext } from '../../form/form-container';
import { ChoiceOption } from '../common/ChoiceOption';
import { classNames } from '../../../editor';

export function CheckboxesClient(props: any) {
    const {viewModel, checkboxUniqueId,
        inputCheckboxUniqueId,
        otherChoiceOptionId, innerColumnClass, layoutClass} = props;

    const [inputValues, setInputValues] = React.useState(viewModel.Choices);
    const { formViewModel, sfFormValueChanged } = useContext(FormContext);
    const [errorMessageText, setErrorMessageText] = useState('');
    const [otherInputText, setOtherInputText] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);
    let delayTimer: ReturnType<typeof setTimeout>;
    function dispatchValueChanged() {
       clearTimeout(delayTimer);
       delayTimer = setTimeout(function () {
            sfFormValueChanged();
       }, 300);
    }

    function clearErrorMessage() {
        setErrorMessageText('');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearErrorMessage();

        const newInputValues = [...inputValues].map((input:ChoiceOption)=>{
            return {
                ...input,
                Selected: event.target.value.toString() === input.Value.toString() ? event.target.checked : input.Selected
            };
        });
        setInputValues(newInputValues);

        dispatchValueChanged();
    };

    function handleOtherChange(event: React.ChangeEvent<HTMLInputElement>) {
        setShowOtherInput(event.target.checked);
        dispatchValueChanged();
    }

    function handleOtherInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value){
            clearErrorMessage();
        } else {
            setErrorMessageText(viewModel.RequiredErrorMessage.replace('{0}', viewModel.Label));
        }

        dispatchValueChanged();
    }

    function handleOtherInputInput(event: React.ChangeEvent<HTMLInputElement>) {
        setOtherInputText(event.target.value);
    }

    const hasValueSelected = React.useMemo(()=>{
        return inputValues.some((i: ChoiceOption)=>i.Selected);
    },[inputValues]);

    return (<>
      <div className={layoutClass}>
        { inputValues.map((choiceOption: ChoiceOption, idx: number)=>{
                let choiceOptionId = `choiceOption-${idx}-${inputCheckboxUniqueId}`;

                return (<div className={`form-check ${innerColumnClass}`} key={idx}>
                  <input className="form-check-input" type="checkbox" name={checkboxUniqueId} id={choiceOptionId}
                    value={choiceOption.Value} data-sf-role="multiple-choice-field-input" required={viewModel.Required && !hasValueSelected}
                    checked={!!choiceOption.Selected}
                    onChange={handleChange}
                    />
                  <label className="form-check-label" htmlFor={choiceOptionId}>
                    {choiceOption.Name}
                  </label>
                </div>);
            })
        }
        { viewModel.HasAdditionalChoice &&
        <div className={`form-check ${innerColumnClass}`}>
          <input className="form-check-input mt-1" type="checkbox" name={checkboxUniqueId} id={otherChoiceOptionId}
            data-sf-role="multiple-choice-field-input" required={viewModel.Required && !hasValueSelected}
            checked={showOtherInput}
            onChange={handleOtherChange}/>
          <label className="form-check-label" htmlFor={otherChoiceOptionId}>Other</label>
          {showOtherInput && <input type="text"
            className={classNames('form-control',{
                [formViewModel.InvalidClass!]: formViewModel.InvalidClass && viewModel.Required && !otherInputText && !hasValueSelected
            })}
            data-sf-role="choice-other-input"
            value={otherInputText}
            required={viewModel.Required}
            onChange={handleOtherInputChange}
            onInput={handleOtherInputInput}
          />}
        </div>
        }
      </div>

      {errorMessageText && <div data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" >
        {errorMessageText}
        </div>
        }
    </>);
}
