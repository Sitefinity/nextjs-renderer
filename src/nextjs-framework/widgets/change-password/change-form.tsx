'use client';

import React from 'react';
import { VisibilityStyle } from '../styling/visibility-style';
import { invalidDataAttr, invalidateElement, redirect, serializeForm } from '../common/utils';
import { ChangePasswordViewModel } from './interfaces/ChangePasswordViewModel';
import { classNames } from '../../editor';

interface ChageFormProps {
    viewModel: ChangePasswordViewModel,
    oldPasswordInputId: string;
    newPasswordInputId: string;
    repeatPasswordInputId: string;
}

const ChangeForm = (props: ChageFormProps) => {
    const { viewModel, oldPasswordInputId, newPasswordInputId, repeatPasswordInputId  } = props;
    const labels = viewModel.Labels;
    const visibilityClassHidden = viewModel.VisibilityClasses[VisibilityStyle.Hidden];
    const formRef = React.useRef<HTMLFormElement>(null);
    const newPassInputRef = React.useRef<HTMLInputElement>(null);
    const oldPassInputRef = React.useRef<HTMLInputElement>(null);
    const repeatPassInputRef = React.useRef<HTMLInputElement>(null);
    const [invalidInputs, setInvalidInputs] = React.useState<{[key: string]: boolean | undefined;}>({});
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm(formRef.current!)) {
            return;
        }

        const model = { model: serializeForm(formRef.current!) };
        const submitUrl = (formRef.current!.attributes as any)['action'].value;
        window.fetch(submitUrl, { method: 'POST', body: JSON.stringify(model), headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const status = response.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    formRef.current!.reset();
                    postPasswordChangeAction();
                } else {
                    response.json().then((res) => {
                        const errorMessage = res.error.message;
                        let element;

                        if (status === 400) {
                            element = newPassInputRef.current!;
                        } else if (status === 403) {
                            element = oldPassInputRef.current!;
                        }
                        const emptyInputs = {};
                        invalidateElement(emptyInputs, element!);
                        setInvalidInputs(emptyInputs);
                        setErrorMessage(errorMessage);
                    });
                }
            });
    };

    const postPasswordChangeAction = () => {
        const action = viewModel.PostPasswordChangeAction;

        if (action === 'ViewAMessage') {
            const message = viewModel.PostPasswordChangeMessage || '';

            setSuccessMessage(message);
        } else if (action === 'RedirectToPage') {
            const redirectUrl = viewModel.RedirectUrl || '';

            redirect(redirectUrl as Location | (string & Location));
        }
    };

    const validateForm = (form: HTMLFormElement) => {
        setInvalidInputs({});
        const requiredInputs = form.querySelectorAll('input[data-sf-role=\'required\']');
        const emptyInputs = {};
        let isValid = true;

        (requiredInputs as NodeListOf<HTMLInputElement>).forEach((input: HTMLInputElement) => {
            if (!input.value) {
                invalidateElement(emptyInputs, input);
                isValid = false;
            }
        });

        if (!isValid) {
            const errorMessage = labels.ValidationRequiredMessage || '';
            setErrorMessage(errorMessage);
            setInvalidInputs(emptyInputs);

            return isValid;
        }

        const newPassword = newPassInputRef.current!;
        const repeatPassword = repeatPassInputRef.current!;

        if (isValid && repeatPassword.value !== newPassword.value) {
            invalidateElement(emptyInputs, repeatPassword);
            setInvalidInputs(emptyInputs);
            isValid = false;

            const errorMessage = labels.ValidationMismatchMessage || '';
            setErrorMessage(errorMessage);
        }

        return isValid;
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

    const errorMessageClass = classNames('alert alert-danger my-3', {
        [visibilityClassHidden]: !errorMessage
    });
    const errorMessageStyles = {
        display: !visibilityClassHidden ? errorMessage ? '' : 'none' : ''
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        action={viewModel.ChangePasswordHandlerPath} method="post" role="form">
        <h2 className="mb-3">{labels.Header}</h2>
        { <div data-sf-role="error-message-container"
          className={errorMessageClass}
          style={errorMessageStyles}
          role="alert" aria-live="assertive" >
          {errorMessage}
        </div>}
        { <div data-sf-role="success-message-container"
          className={classNames('alert alert-success my-3', {
            [visibilityClassHidden]: !successMessage
          })}
          style={{
            display: !visibilityClassHidden ? successMessage ? '' : 'none' : ''
          }}
          role="alert" aria-live="assertive">
          {successMessage}
        </div>}
        <div className="mb-3">
          <label htmlFor={oldPasswordInputId} className="form-label">{labels.OldPassword}</label>
          <input ref={oldPassInputRef} type="password"
            className={classNames('form-control',{
            [viewModel.InvalidClass]: invalidInputs['OldPassword']
            }
        )}
            id={oldPasswordInputId} name="OldPassword" data-sf-role="required"
            {...{
                [invalidDataAttr]: invalidInputs['OldPassword']
            }} />
        </div>
        <div className="mb-3">
          <label htmlFor={newPasswordInputId} className="form-label">{labels.NewPassword}</label>
          <input ref={newPassInputRef} type="password"
            id={newPasswordInputId} data-sf-role="required"
            {...inputValidationAttrs('NewPassword')}/>
        </div>
        <div className="mb-3">
          <label htmlFor={repeatPasswordInputId} className="form-label">{labels.RepeatPassword}</label>
          <input ref={repeatPassInputRef} type="password"
            id={repeatPasswordInputId} data-sf-role="required"
            {...inputValidationAttrs('RepeatPassword')}/>
        </div>

        <input className="btn btn-primary w-100" type="submit" value={labels.SubmitButtonLabel} />
      </form>);
};

export { ChangeForm };
