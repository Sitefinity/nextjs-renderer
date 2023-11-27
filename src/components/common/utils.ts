export const invalidDataAttr = 'data-sf-invalid';

export const serializeForm = (form: HTMLFormElement) => {
    const obj: {
        [key: string]: string;
    } = {};
    const formData: any = new FormData(form);
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
};

export const invalidateElement = (emptyInputs: any, element: HTMLInputElement) => {
    if (element) {
        emptyInputs[element.name] = true;
    }
};

export const redirect = (redirectUrl: Location | (string & Location)) => {
    window.location = redirectUrl;
};

export const isValidEmail = function (email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email);
};
