import { processFormRules } from '../process-form-rules';

export const  formHiddenFieldsInitialization = (formContainer: HTMLDivElement) => {
    let hiddenFieldsInput = formContainer.querySelector('[data-sf-role="form-rules-hidden-fields"]');
    if (hiddenFieldsInput) {
        let hiddenFieldsInputValue = (hiddenFieldsInput as HTMLInputElement).value;
        if (hiddenFieldsInputValue) {
            let hiddenFields = hiddenFieldsInputValue.split(',');
            hiddenFields.forEach((hiddenField) => {
                let scriptWrapper = formContainer.querySelector('script[data-sf-role="start_field_' + hiddenField + '"]');
                if (scriptWrapper) {
                    let fieldName = scriptWrapper.getAttribute('data-sf-role-field-name');
                    let fieldElement = scriptWrapper.querySelector('[name="' + fieldName + '"]');
                    if (fieldElement) {
                        fieldElement.setAttribute('disabled', 'disabled');
                    }

                    let sibling = scriptWrapper.nextElementSibling!;
                    while (!sibling.matches('script[data-sf-role="end_field_' + hiddenField + '"]')) {
                        // toggleShowStyles(sibling, false);
                        // toggleHideStyles(sibling);
                        sibling = sibling.nextElementSibling!;
                    }
                }
            });
        }
    }

    processFormRules(formContainer);

    let wrapper = formContainer.closest('[data-sf-role="form-visibility-wrapper"]');
    if (wrapper) {
        Array.from(wrapper.children).forEach((child) => {
            wrapper!.parentElement!.insertBefore(child, wrapper);
        });
        wrapper.remove();
    }
};
