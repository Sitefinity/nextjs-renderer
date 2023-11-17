'use client';

import React from 'react';
import { VisibilityStyle } from '../styling/visibility-style';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { invalidDataAttr, invalidateElement, isValidEmail, serializeForm } from '../common/utils';

const ForgottenForm = (props: any) => {
    const { viewModel, emailInputId } = props;
    const labels = viewModel.Labels;
    const visibilityClassHidden = viewModel.VisibilityClasses[VisibilityStyle.Hidden];
    const formRef = React.useRef<HTMLFormElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const [invalidInputs, setInvalidInputs] = React.useState<{[key: string]: boolean | undefined;}>({});
    const [showFormContainer, setFormContainer] = React.useState<boolean>(true);
    const [showSuccessContainer, setSuccessContainer] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>(labels.ErrorMessage);
    const [sentEmailLabelMessage, setSentEmailLabelMessage] = React.useState<string>('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm(formRef.current!)) {
            return;
        }

        let model = { model: serializeForm(formRef.current!) };
        let submitUrl = (formRef.current!.attributes as any)['action'].value;
        window.fetch(submitUrl, { method: 'POST', body: JSON.stringify(model), headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                setSentEmailLabelMessage(emailInputRef.current!.value);
                setFormContainer(false);
                setSuccessContainer(true);
            });
    };

    const validateForm = function (form: HTMLFormElement) {
        let isValid = true;
        setInvalidInputs({});
        setErrorMessage('');
        const emptyInputs = {};

        let requiredInputs = form.querySelectorAll('input[data-sf-role=\'required\']');

        (requiredInputs as NodeListOf<HTMLInputElement>).forEach((input: HTMLInputElement) => {
            if (!input.value) {
                invalidateElement(emptyInputs, input);
                setInvalidInputs(emptyInputs);
                isValid = false;
            }
        });

        if (!isValid) {
            setErrorMessage(labels.FieldIsRequiredMessage);

            return false;
        }

        if (!isValidEmail(emailInputRef.current!.value)) {
            invalidateElement(emptyInputs, emailInputRef.current!);
            setInvalidInputs(emptyInputs);
            setErrorMessage(labels.InvalidEmailFormatMessage);
            return false;
        }

        return true;
    };

    const errorMessageClass = classNames('alert alert-danger my-3', {
        [visibilityClassHidden]: !errorMessage
    });
    const errorMessageStyles = {
        display: !visibilityClassHidden ? errorMessage ? '' : 'none' : ''
    };

    const successContainerClass = classNames('mt-3',{
        [visibilityClassHidden]: !showSuccessContainer
    });
    const successContainerStyle = {
        display: !visibilityClassHidden ? showSuccessContainer ? '' : 'none' : ''
    };

    return (<>
      <div data-sf-role="error-message-container"
        className={errorMessageClass}
        style={errorMessageStyles}
        role="alert" aria-live="assertive" >
        {errorMessage}
      </div>
      <div data-sf-role="form-container"
        className={classNames({
        [visibilityClassHidden]: !showFormContainer
      })}
        style={{
        display: !visibilityClassHidden ? showFormContainer ? '' : 'none' : ''
      }}
      >
        <p>{labels.ForgottenPasswordLabel}</p>
        <form ref={formRef} onSubmit={handleSubmit} action={viewModel.SendResetPasswordEmailHandlerPath} role="form" noValidate={true}>
          <div className="mb-3">
            <label className="form-label" htmlFor={emailInputId}>{labels.EmailLabel}</label>
            <input ref={emailInputRef} id={emailInputId} type="email"
              className={classNames('form-control',{
                [viewModel.InvalidClass]: invalidInputs['Email']
                }
              )}
              {...{
                [invalidDataAttr]: invalidInputs['Email']
              }}
              name="Email" data-sf-role="required" />
          </div>
          <input className="btn btn-primary w-100" type="submit" value={labels.SendButtonLabel} />
          <input type="hidden" name="ResetPasswordUrl" value={viewModel.ResetPasswordUrl} />
        </form>

        <input type="hidden" name="InvalidEmailFormatMessage" value={labels.InvalidEmailFormatMessage} />
        <input type="hidden" name="FieldIsRequiredMessage" value={labels.FieldIsRequiredMessage} />
      </div>
      <div data-sf-role="success-message-container"
        className={successContainerClass}
        style={successContainerStyle}>
        <p>{labels.ForgottenPasswordSubmitMessage} <strong data-sf-role="sent-email-label" >{sentEmailLabelMessage}</strong></p>
        <p>{labels.ForgottenPasswordLinkMessage}</p>
      </div>
    </>);
};

export { ForgottenForm };
