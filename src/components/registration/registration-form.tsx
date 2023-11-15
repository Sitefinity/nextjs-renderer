'use client';

import React from 'react';
import { VisibilityStyle } from '../styling/visibility-style';
import { classNames } from 'sitefinity-react-framework/utils/classNames';

const invalidDataAttr = 'data-sf-invalid';
const isValidEmail = function (email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email);
};

const redirect = function (redirectUrl) {
    window.location = redirectUrl;
};

const RegistrationForm = (props: any) => {
    const { viewModel, context, firstNameInputId, lastNameInputId,
        answerInputId, questionInputId, repeatPasswordInputId, passwordInputId,
         emailInputId, formContainerServer, confirmServer, ...others } = props;
    const labels = viewModel.Labels;
    const visibilityClassHidden = viewModel.VisibilityClasses[VisibilityStyle.Hidden];
    const formRef = React.useRef<HTMLFormElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const [invalidInputs, setInvalidInputs] = React.useState<any>({});
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

    const onRegistrationError = (errorMessage) => {
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

        url = url || form.attributes['action'].value;

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

    const resetValidationErrors = () => {
        setInvalidInputs({});
    };

    const validateForm = (form) => {
        let isValid = true;
        resetValidationErrors();
        const emptyInputs = {};

        let requiredInputs = form.querySelectorAll('input[data-sf-role=\'required\']');

        requiredInputs.forEach(function (input) {
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

        let emailInput = form.querySelector('input[name=\'Email\']');
        if (!isValidEmail(emailInput.value)) {
            invalidateElement(emptyInputs, emailInput);
            setInvalidInputs(emptyInputs);
            setErrorMessage(labels.ValidationInvalidEmailMessage);
            return false;
        }

        let passwordFields = form.querySelectorAll('[type=\'password\']');

        if (passwordFields[0].value !== passwordFields[1].value) {
            invalidateElement(emptyInputs, passwordFields[1]);
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
        setActivationLinkMessage(activationLinkLabel + ' ' + email);
    };

    const serializeForm = function (form) {
        const obj = {};
        const formData = new FormData(form);
        for (let key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    };

    const handleSendAgain = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const resendUrl = viewModel.ResendConfirmationEmailHandlerPath;

        event.preventDefault();
        submitFormHandler(formRef.current!, resendUrl, postResendAction);
    };

    return (
      <>
        <div data-sf-role="form-container"
          className={classNames({
            [visibilityClassHidden]: !showFormContainer
          })}
          style={{
            display: !visibilityClassHidden ? showFormContainer ? '' : 'none' : ''
          }}
        >
          <h2 className="mb-3">{labels.Header}</h2>
          <div data-sf-role="error-message-container"
            className={classNames('alert alert-danger my-3', {
            [visibilityClassHidden]: !errorMessage
          })}
            style={{
            display: !visibilityClassHidden ? errorMessage ? '' : 'none' : ''
          }}
            role="alert" aria-live="assertive" />
          <form ref={formRef} {...others} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor={firstNameInputId} className="form-label">{labels.FirstNameLabel}</label>
              <input id={firstNameInputId} type="text"
                className={classNames('form-control',{
                    [viewModel.InvalidClass]: invalidInputs['FirstName']
                    }
                )}
                {...{
                    [invalidDataAttr]: invalidInputs['FirstName']
                }}
                name="FirstName" data-sf-role="required"/>
            </div>
            <div className="mb-3">
              <label htmlFor={lastNameInputId} className="form-label">{labels.LastNameLabel}</label>
              <input id={lastNameInputId} type="text"
                className={classNames('form-control',{
                    [viewModel.InvalidClass]: invalidInputs['LastName']
                    }
                )}
                {...{
                    [invalidDataAttr]: invalidInputs['LastName']
                }}
                name="LastName" data-sf-role="required"/>
            </div>
            <div className="mb-3">
              <label htmlFor={emailInputId} className="form-label">{labels.EmailLabel}</label>
              <input id={emailInputId} type="email"
                className={classNames('form-control',{
                    [viewModel.InvalidClass]: invalidInputs['Email']
                    }
                )}
                {...{
                    [invalidDataAttr]: invalidInputs['Email']
                }}
                name="Email" data-sf-role="required"/>
            </div>
            <div className="mb-3">
              <label htmlFor={passwordInputId} className="form-label">{labels.PasswordLabel}</label>
              <input id={passwordInputId} type="password"
                className={classNames('form-control',{
                    [viewModel.InvalidClass]: invalidInputs['Password']
                    }
                )}
                {...{
                    [invalidDataAttr]: invalidInputs['Password']
                }}
                name="Password" data-sf-role="required" autoComplete="on"/>
            </div>
            <div className="mb-3">
              <label htmlFor={repeatPasswordInputId} className="form-label">{labels.RepeatPasswordLabel}</label>
              <input id={repeatPasswordInputId} type="password"
                className={classNames('form-control',{
                    [viewModel.InvalidClass]: invalidInputs['RepeatPassword']
                    }
                )}
                {...{
                    [invalidDataAttr]: invalidInputs['RepeatPassword']
                }}
                name="RepeatPassword" data-sf-role="required" autoComplete="on"/>
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
          className={classNames({
            [visibilityClassHidden]: !showSuccessContainer
          })}
          style={{
            display: !visibilityClassHidden ? showSuccessContainer ? '' : 'none' : ''
          }}
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
