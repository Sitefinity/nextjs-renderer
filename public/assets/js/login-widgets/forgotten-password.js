(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var widgetContainer = document.querySelector('[data-sf-role="sf-forgotten-password-container"]');
        var formContainer = widgetContainer.querySelector('[data-sf-role="form-container"]');
        var form = formContainer.querySelector("form");
        var emailInput = form.querySelector("input[name='Email']");
        var successMessageContainer = widgetContainer.querySelector('[data-sf-role="success-message-container"]');
        var errorMessageContainer = widgetContainer.querySelector('[data-sf-role="error-message-container"]');
        var sentEmailLabel = successMessageContainer.querySelector('[data-sf-role="sent-email-label"]');
        var visibilityClassElement = document.querySelector('[data-sf-visibility-hidden]');
        var visibilityClassHidden = visibilityClassElement.dataset ? visibilityClassElement.dataset.sfVisibilityHidden : null;
        var invalidClassElement = document.querySelector('[data-sf-invalid]');
        var classInvalidValue = invalidClassElement.dataset && isNotEmpty(invalidClassElement.dataset.sfInvalid) ? invalidClassElement.dataset.sfInvalid : null;
        var classInvalid = classInvalidValue ? processCssClass(classInvalidValue) : null;
        var invalidDataAttr = "data-sf-invalid";

        function processCssClass(str) {
            var classList = str.split(" ");
            return classList;
        }

        function isNotEmpty(attr) {
            return (attr && attr !== "");
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!validateForm(form)) {
                return;
            }

            var model = { model: serializeForm(form) };
            var submitUrl = form.attributes['action'].value;
            window.fetch(submitUrl, { method: 'POST', body: JSON.stringify(model), headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    sentEmailLabel.innerText = emailInput.value;
                    hideElement(formContainer);
                    showElement(successMessageContainer);
                });
        });

        var validateForm = function (form) {
            var isValid = true;
            hideElement(errorMessageContainer);
            resetValidationErrors(form);

            var requiredInputs = form.querySelectorAll("input[data-sf-role='required']");

            requiredInputs.forEach(function (input) {
                if (!input.value) {
                    invalidateElement(input);
                    isValid = false;
                }
            });

            if (!isValid) {
                errorMessageContainer.innerText = formContainer.querySelector("input[name='FieldIsRequiredMessage']").value;
                showElement(errorMessageContainer);

                return false;
            }

            if (!isValidEmail(emailInput.value)) {
                errorMessageContainer.innerText = formContainer.querySelector("input[name='InvalidEmailFormatMessage']").value;
                invalidateElement(emailInput);
                showElement(errorMessageContainer);
                return false;
            }

            return true;
        };

        var serializeForm = function (form) {
            var obj = {};
            var formData = new FormData(form);
            for (var key of formData.keys()) {
                obj[key] = formData.get(key);
            }
            return obj;
        };

        var invalidateElement = function (element) {
            if (element) {

                if (classInvalid) {
                    element.classList.add(...classInvalid);
                }

                //adding data attribute for queries, to be used instead of a class
                element.setAttribute(invalidDataAttr, "");
            }
        };

        var resetValidationErrors = function (parentElement) {
            var invalidElements = parentElement.querySelectorAll(`[${invalidDataAttr}]`);
            invalidElements.forEach(function (element) {
                if (classInvalid) {
                    element.classList.remove(...classInvalid);
                }

                element.removeAttribute(invalidDataAttr);
            });
        };

        var showElement = function (element) {
            if (element) {
                if (visibilityClassHidden) {
                    element.classList.remove(visibilityClassHidden);
                } else {
                    element.style.display = "";
                }
            }
        };

        var hideElement = function (element) {
            if (element) {
                if (visibilityClassHidden) {
                    element.classList.add(visibilityClassHidden);
                } else {
                    element.style.display = "none";
                }
            }
        };

        var isValidEmail = function (email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email);
        };
    });
})();
