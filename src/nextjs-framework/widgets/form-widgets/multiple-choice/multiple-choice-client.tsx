'use client';

import React, { useContext, useState } from 'react';
import { FormContext } from '../../form/form-container';
import { ChoiceOption } from '../common/ChoiceOption';
import { classNames } from '../../../editor';

export function MultipleChoiceClient(props: any) {
    const {viewModel, multipleChoiceUniqueId,
        inputMultipleChoiceUniqueId,
        otherChoiceOptionId, innerColumnClass, layoutClass} = props;

    const [inputValues, setInputValues] = React.useState(viewModel.Choices);
    const { formViewModel, sfFormValueChanged, hiddenInputs } = useContext(FormContext);
    const isVisible = (hiddenInputs ? !hiddenInputs[multipleChoiceUniqueId] : true);
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
                Selected: event.target.value.toString() === input.Value.toString()
            };
        });
        setInputValues(newInputValues);
        setShowOtherInput(false);
        dispatchValueChanged();
    };

    function handleOtherChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newInputValues = [...inputValues].map(input=>{
            return {
                ...input,
                Selected: false
            };
        });
        setInputValues(newInputValues);
        setShowOtherInput(true);
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

    return (isVisible && <>
      <legend className="h6" id={`choice-field-label-${multipleChoiceUniqueId}`}>{viewModel.Label}</legend>
        { viewModel.InstructionalText &&
        <p className="text-muted small" id={`choice-field-description-${multipleChoiceUniqueId}`}>{viewModel.InstructionalText}</p>
        }
      <div className={layoutClass}>
        { inputValues.map((choiceOption: ChoiceOption, idx: number)=>{
                let choiceOptionId = `choiceOption-${idx}-${inputMultipleChoiceUniqueId}`;

                return (<div className={`form-check ${innerColumnClass}`} key={idx}>
                  <input className="form-check-input" type="radio" name={multipleChoiceUniqueId} id={choiceOptionId}
                    value={choiceOption.Value} data-sf-role="multiple-choice-field-input" required={viewModel.Required && !hasValueSelected}
                    checked={choiceOption.Selected}
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
          <input className="form-check-input mt-1" type="radio" name={multipleChoiceUniqueId} id={otherChoiceOptionId}
            data-sf-role="multiple-choice-field-input" required={viewModel.Required && !hasValueSelected}
            checked={showOtherInput}
            onChange={handleOtherChange}/>
          <label className="form-check-label" htmlFor={otherChoiceOptionId}>Other</label>
          {showOtherInput && <input type="text"
            className={classNames('form-control',{
                [formViewModel.InvalidClass!]: formViewModel.InvalidClass && viewModel.Required && !otherInputText
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
      </div>}
    </>);
}
