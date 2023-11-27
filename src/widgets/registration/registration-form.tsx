'use client';

import React from 'react';
import { VisibilityStyle } from '../styling/visibility-style';
import { invalidDataAttr, isValidEmail, redirect, serializeForm } from '../common/utils';
import { classNames } from '@progress/sitefinity-react-framework';

const RegistrationForm = (props: any) => {
    const { viewModel, context, firstNameInputId, lastNameInputId,
        answerInputId, questionInputId, repeatPasswordInputId, passwordInputId,
         emailInputId, formContainerServer, confirmServer, ...others } = props;
    const labels = viewModel.Labels;
    const visibilityClassHidden = viewModel.VisibilityClasses[VisibilityStyle.Hidden];
    const formRef = React.useRef<HTMLFormElement>(null);
    const passwordInputRef = React.useRef<HTMLInputElement>(null);
    const repeatPasswordInputRef = React.useRef<HTMLInputElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const [invalidInputs, setInvalidInputs] = React.useState<{[key: string]: boolean | undefined;}>({});
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [showFormContainer, setShowFormContainer] = React.useState<boolean>(true);
    const [showSuccessContainer, setSuccessContainer] = React.useState<boolean>(false);
    const [activationLinkMessage, setActivationLinkMessage] = React.useState<string>('');

    const postRegistrationAction = () => {
        let action = viewModel.PostRegistrationAction;
        let activationMethod = viewModel.ActivationMethod;

        if (action === 'ViewMessage') {
            if (activationMethod === 'AfterConfirmation') {
                showSuccessAndConfirmationSentMessage();
            } else {
                showSuccessMessage();
            }
        } else if (action === 'RedirectToPage') {
            let redirectUrl = viewModel.RedirectUrl;

            redirect(redirectUrl);
        }
    };

    const onRegistrationError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm(formRef.current!)) {
            return;
        }

        submitFormHandler(formRef.current!, '', postRegistrationAction, onRegistrationError);
    };

    const submitFormHandler = (
        form: HTMLFormElement,
        url: RequestInfo | URL,
        onSuccess: ()=>void,
        onError?: (err: string)=>void
    ) => {

        url = url || (form.attributes as any)['action'].value;

        let model = { model: serializeForm(form) };

        window.fetch(url, {
            method: 'POST',
            body: JSON.stringify(model),
            headers: { 'Content-Type': 'application/json'}
        }).then((response) => {
            let status = response.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                response.json().then((res) => {
                    let message = res.error.message;

                    if (onError) {
                        onError(message);
                    }
                });
            }
        });
    };

    const postResendAction = () => {
        const sendAgainLabel = labels.SendAgainLabel;
        const formData = new FormData(formRef.current!);
        const email = formData.get('Email');
        setActivationLinkMessage(sendAgainLabel.replace('{0}', email));
    };

    const invalidateElement = (emptyInputs: any, element: HTMLInputElement) => {
        if (element) {
            emptyInputs[element.name] = true;
        }
    };

    const validateForm = (form: HTMLFormElement) => {
        let isValid = true;
        setInvalidInputs({});
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
            setErrorMessage(labels.ValidationRequiredMessage);
            return isValid;
        }

        let emailInput = emailInputRef.current!;
        if (!isValidEmail(emailInput.value)) {
            invalidateElement(emptyInputs, emailInput);
            setInvalidInputs(emptyInputs);
            setErrorMessage(labels.ValidationInvalidEmailMessage);
            return false;
        }

        if (passwordInputRef.current!.value !== repeatPasswordInputRef.current!.value) {
            invalidateElement(emptyInputs, repeatPasswordInputRef.current!);
            setInvalidInputs(emptyInputs);
            setErrorMessage(labels.ValidationMismatchMessage);

            return false;
        }

        return isValid;
    };

    const showSuccessMessage = () => {
        setErrorMessage('');
        setShowFormContainer(false);
        setSuccessContainer(true);
    };

    const showSuccessAndConfirmationSentMessage = () => {
        setShowFormContainer(false);
        setSuccessContainer(true);

        const activationLinkLabel = labels.ActivationLinkLabel;
        const formData = new FormData(formRef.current!);
        const email = formData.get('Email');
        setActivationLinkMessage(`${activationLinkLabel} ${email}`);
    };

    const handleSendAgain = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const resendUrl = viewModel.ResendConfirmationEmailHandlerPath;

        event.preventDefault();
        submitFormHandler(formRef.current!, resendUrl, postResendAction);
    };

    const formContainerClass = classNames({
        [visibilityClassHidden]: !showFormContainer
    });
    const formContainerStyle = {
        display: !visibilityClassHidden ? showFormContainer ? '' : 'none' : ''
    };

    const errorMessageClass = classNames('alert alert-danger my-3', {
        [visibilityClassHidden]: !errorMessage
    });
    const errorMessageStyles = {
        display: !visibilityClassHidden ? errorMessage ? '' : 'none' : ''
    };

    const confirmContainerClass = classNames({
        [visibilityClassHidden]: !showSuccessContainer
    });
    const confirmContainerStyle = {
        display: !visibilityClassHidden ? showSuccessContainer ? '' : 'none' : ''
    };

    const inputValidationAttrs = (name: string) => {
        return {
            className: classNames('form-control',{
                [viewModel.InvalidClass]: invalidInputs[name]
                }
            ),
            [invalidDataAttr]: invalidInputs[name],
            name: name
        };
    };

    return (
      <>
        <div data-sf-role="form-container"
          className={formContainerClass}
          style={formContainerStyle}
        >
          <h2 className="mb-3">{labels.Header}</h2>
          <div data-sf-role="error-message-container"
            className={errorMessageClass}
            style={errorMessageStyles}
            role="alert" aria-live="assertive" >
            {errorMessage}
          </div>
          <form ref={formRef} {...others} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor={firstNameInputId} className="form-label">{labels.FirstNameLabel}</label>
              <input id={firstNameInputId} type="text"
                data-sf-role="required"
                {...inputValidationAttrs('FirstName')}/>
            </div>
            <div className="mb-3">
              <label htmlFor={lastNameInputId} className="form-label">{labels.LastNameLabel}</label>
              <input id={lastNameInputId} type="text"
                data-sf-role="required"
                {...inputValidationAttrs('LastName')}/>
            </div>
            <div className="mb-3">
              <label htmlFor={emailInputId} className="form-label">{labels.EmailLabel}</label>
              <input ref={emailInputRef} id={emailInputId} type="email"
                data-sf-role="required"
                {...inputValidationAttrs('Email')}/>
            </div>
            <div className="mb-3">
              <label htmlFor={passwordInputId} className="form-label">{labels.PasswordLabel}</label>
              <input ref={passwordInputRef} id={passwordInputId} type="password"
                data-sf-role="required" autoComplete="on"
                {...inputValidationAttrs('Password')}/>
            </div>
            <div className="mb-3">
              <label htmlFor={repeatPasswordInputId} className="form-label">{labels.RepeatPasswordLabel}</label>
              <input ref={repeatPasswordInputRef} id={repeatPasswordInputId} type="password"
                data-sf-role="required" autoComplete="on"
                {...inputValidationAttrs('RepeatPassword')}/>
            </div>

            {viewModel.RequiresQuestionAndAnswer &&
            <div className="mb-3">
              <label htmlFor={questionInputId} className="form-label">{labels.SecretQuestionLabel}</label>
              <input id={questionInputId} type="text"

                name="Question" data-sf-role="required"/>
            </div>
                    }
            {viewModel.RequiresQuestionAndAnswer &&
            <div className="mb-3">
              <label htmlFor={answerInputId} className="form-label">{labels.SecretAnswerLabel}</label>
              <input id={answerInputId} type="text"

                name="Answer" data-sf-role="required"/>
            </div>
            }

            <input className="btn btn-primary w-100" type="submit" defaultValue={labels.RegisterButtonLabel} />
            <input type="hidden" name="ActivationPageUrl" defaultValue={viewModel.ActivationPageUrl} />
          </form>
          {formContainerServer}
        </div>
        <div data-sf-role="success-registration-message-container" className="d-none">
          <h3>{labels.SuccessHeader}</h3>
          <p>{labels.SuccessLabel}</p>
        </div>

        <div data-sf-role="confirm-registration-message-container"
          className={confirmContainerClass}
          style={confirmContainerStyle}
        >
          <h3>{labels.ActivationLinkHeader}</h3>
          <p data-sf-role="activation-link-message-container" >
            {activationLinkMessage}
          </p>
          <a data-sf-role="sendAgainLink" onClick={handleSendAgain} className="btn btn-primary">
            {labels.SendAgainLink}
          </a>
          {confirmServer}
        </div>
      </>);
};

export { RegistrationForm };
