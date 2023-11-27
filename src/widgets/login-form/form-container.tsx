'use client';

import React from 'react';
import { VisibilityStyle } from '../styling/visibility-style';
import { ExternalLoginBase } from '../external-login-base';
import { classNames } from '@progress/sitefinity-react-framework';

const invalidDataAttr = 'data-sf-invalid';
const isValidEmail = function (email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email);
};

const FormContainer = (props: any) => {
    const { viewModel, context } = props;
    const labels = viewModel.Labels;
    const visibilityClassHidden = viewModel.VisibilityClasses[VisibilityStyle.Hidden];
    const returnUrl = viewModel.RedirectUrl ?? ExternalLoginBase.GetDefaultReturnUrl(context);
    const returnErrorUrl = ExternalLoginBase.GetDefaultReturnUrl(context, {isError:true, shouldEncode:false});
    const passResetColumnSize = viewModel.RememberMe ? 'col-md-6 text-end' : 'col-12';
    const formRef = React.useRef<HTMLFormElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const [invalidInputs, setInvalidInputs] = React.useState<{[key: string]: boolean | undefined;}>({});
    const [showErrorMessage, setShowErrorMessage] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>(labels.ErrorMessage);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAntiforgeryTokens().then(res => {
            if (validateForm(formRef.current!)) {
                (event.target as HTMLFormElement).submit();
            }
        }, err => {
            showError('Antiforgery token retrieval failed');
        });
    };

    const validateForm = (form: HTMLFormElement) => {
        let isValid = true;
        setInvalidInputs({});
        setShowErrorMessage(false);

        let requiredInputs = form.querySelectorAll('input[data-sf-role=\'required\']');
        const emptyInputs = {};
        (requiredInputs as NodeListOf<HTMLInputElement>).forEach((input: HTMLInputElement) => {
            if (!input.value) {
                invalidateElement(emptyInputs, input);
                isValid = false;
            }
        });

        if (!isValid) {
            setErrorMessage(labels.ValidationRequiredMessage);
            setShowErrorMessage(true);
            setInvalidInputs(emptyInputs);

            return isValid;
        }

        let emailInput = emailInputRef.current!;
        if (!isValidEmail(emailInput.value)) {
            setErrorMessage(labels.ValidationInvalidEmailMessage);
            invalidateElement(emptyInputs, emailInput);
            setShowErrorMessage(true);
            setInvalidInputs(emptyInputs);

            return false;
        }

        return isValid;
    };

    const invalidateElement = (emptyInputs: any, element: HTMLInputElement) => {

        if (element) {
            emptyInputs[element.name] = true;
        }
    };

    const setAntiforgeryTokens = () => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/sitefinity/anticsrf');
            xhr.setRequestHeader('X-SF-ANTIFORGERY-REQUEST', 'true');
            xhr.responseType = 'json';
            xhr.onload = function () {
                const response = xhr.response;
                if (response != null) {
                    const token = response.Value;
                    document.querySelectorAll('input[name = \'sf_antiforgery\']').forEach((i: any) => i.value = token);
                    resolve('');
                } else {
                    resolve('');
                }
            };
            xhr.onerror = function () {
                reject();
            };
            xhr.send();
        });
    };

    const showError = (err: string) => {
        setErrorMessage(err);
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
      <div data-sf-role="form-container">
        <h2 className="mb-3">{labels.Header}</h2>
        <div id="errorContainer"
          style={{
                    display: showErrorMessage ? '' : 'none'
                }}
          className={classNames('alert alert-danger my-3',{
                    ['d-block']: ExternalLoginBase.isError(context) || showErrorMessage,
                    [visibilityClassHidden]: !(ExternalLoginBase.isError(context) || showErrorMessage)
                })}
          role="alert" aria-live="assertive" data-sf-role="error-message-container">
          {errorMessage}
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action={viewModel.LoginHandlerPath} method="post" role="form" noValidate={true}>
          <div className="mb-3">
            <label htmlFor={props.usernameInputId} className="form-label">{labels.EmailLabel}</label>
            <input type="email" ref={emailInputRef}
              id={props.usernameInputId} data-sf-role="required"
              {...inputValidationAttrs('username')}/>
          </div>

          <div className="mb-3">
            <label htmlFor={props.passwordInputId} className="form-label">{labels.PasswordLabel}</label>
            <input type="password"
              id={props.passwordInputId} data-sf-role="required"
              autoComplete="on"
              {...inputValidationAttrs('password')}/>
          </div>
          {(viewModel.RememberMe !== undefined || viewModel.ForgottenPasswordLink) &&
          <div className="row mb-3">
            {viewModel.RememberMe !== undefined &&
            <div className="checkbox col-md-6 m-0">
              <label>
                <input defaultChecked={viewModel.RememberMe} data-val="true"
                  data-val-required="The RememberMe field is required." id={props.rememberInputId}
                  name="RememberMe" type="checkbox" defaultValue={viewModel.RememberMe} />
                <label htmlFor={props.rememberInputId}>{labels.RememberMeLabel}</label>
              </label>
            </div>
            }
            {viewModel.ForgottenPasswordLink &&
            <div className={passResetColumnSize}>
              <a href={viewModel.ForgottenPasswordLink}
                className="text-decoration-none">{labels.ForgottenPasswordLinkLabel}</a>
            </div>
            }
          </div>
        }
          <input type="hidden" name="RedirectUrl" value={returnUrl} />
          <input type="hidden" name="ErrorRedirectUrl" value={returnErrorUrl} />
          <input type="hidden" name="MembershipProviderName" value={viewModel.MembershipProviderName} />
          <input type="hidden" value="" name="sf_antiforgery" />
          <input className="btn btn-primary w-100" type="submit" value={labels.SubmitButtonLabel} />
        </form>
        <input type="hidden" name="ValidationInvalidEmailMessage" value={labels.ValidationInvalidEmailMessage} />
        <input type="hidden" name="ValidationRequiredMessage" value={labels.ValidationRequiredMessage} />
      </div>);
};

export { FormContainer };
