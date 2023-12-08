'use client';

import React, { useContext, useState } from 'react';
import { classNames } from '../../../editor';
import { FormContext } from '../../form/form-container';

export function ParagraphClient(props: any) {
    const {viewModel, paragraphUniqueId, paragraphInfoMessageId,
        paragraphErrorMessageId, ariaDescribedByAttribute} = props;
    const [inputValue, setInputValue] = React.useState(viewModel.PredefinedValue);
    const { formViewModel, sfFormValueChanged } = useContext(FormContext);
    const [errorMessageText, setErrorMessageText] = useState('');
    let delayTimer: ReturnType<typeof setTimeout>;
    function dispatchValueChanged() {
       clearTimeout(delayTimer);
       delayTimer = setTimeout(function () {
            sfFormValueChanged();
       }, 300);
    }

    function setErrorMessage(_input: HTMLInputElement, message: string) {
        setErrorMessageText(message);
    }

    function clearErrorMessage() {
        setErrorMessageText('');
    }

    const handleTextValidation = (source: React.ChangeEvent<HTMLInputElement>) => {
        const target = source.target as HTMLInputElement;
        const validationMessages = viewModel.ViolationRestrictionsMessages;
        const validationRestrictions = viewModel.ViolationRestrictionsJson;
        setInputValue((target as HTMLInputElement).value);

        if (validationRestrictions && Object.keys(validationRestrictions).length) {
            let isValidLength = target.value.length >= validationRestrictions.minLength;

            if (validationRestrictions.maxLength > 0){
                isValidLength = target.value.length <= validationRestrictions.maxLength;
            }

            isValidLength = isValidLength || target.value.length === 0;
            if (!isValidLength) {
                setErrorMessage(target, validationMessages.invalidLength);
                return;
            }
        }

        if (target.required && target.validity.valueMissing) {
            setErrorMessage(target, validationMessages.required);
        } else if (target.validity.patternMismatch) {
            setErrorMessage(target, validationMessages.regularExpression);
        } else if (!target.validity.valid) {
            setErrorMessage(target, validationMessages.invalid);
        } else {
            clearErrorMessage();
        }
    };
    const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((e.target as HTMLInputElement).value);
        handleTextValidation(e);
        dispatchValueChanged();
    };

    return (<>
      <textarea id={paragraphUniqueId}
        className={classNames('form-control',{
                [formViewModel.InvalidClass!]: formViewModel.InvalidClass && errorMessageText
            })}
        name={viewModel.FieldName}
        placeholder={viewModel.PlaceholderText}
        value={inputValue}
        data-sf-role="paragraph-text-field-textarea"
        readOnly={viewModel.Readonly}
        aria-describedby={ariaDescribedByAttribute}
        onChange={handleTextValidation}
        onInput={handleInputEvent}
        onInvalid={handleTextValidation}
        {...viewModel.ValidationAttributes}>{viewModel.PredefinedValue}</textarea>
      { viewModel.HasDescription &&
        <div id={paragraphInfoMessageId} className="form-text">{viewModel.InstructionalText}</div>
            }
      {errorMessageText && <div id={paragraphErrorMessageId} data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" >

        {errorMessageText}
      </div>}

    </>);
}
